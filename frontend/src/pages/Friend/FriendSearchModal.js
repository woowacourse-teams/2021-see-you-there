import PropTypes from 'prop-types';
import React, { useState } from 'react';

import { InputWithButton, Icon, Modal, ButtonRound } from '../../components';
import { Top, SearchResult, Nickname, MemberId, ProfileImage, FriendInfo, NoResult, ResultSection } from './style';
import { useFriendSearch, useMutateFriend } from '../../hooks';
import { isViewWiderThan } from '../../utils';
import { INPUT, LAYOUT } from '../../constants';

const CANNOT_SEARCH_ONE_SELF = '본인 아이디를 검색할 수 없습니다.';
const NO_SUCH_USER = '존재하지 않는 사용자입니다.';

export const FriendSearchModal = (props) => {
  const { isModalOpen, closeModal } = props;
  const [memberIdInput, setMemberIdInput] = useState('');
  const { searchResult, isLoading, isSuccess, errorMessage, memberIdKeyword, setMemberIdKeyword } = useFriendSearch();
  const { requestFriend } = useMutateFriend();

  const isWebView = isViewWiderThan(LAYOUT.DEVICE_WIDTH_TABLET);

  const escapeModal = () => {
    setMemberIdInput('');
    setMemberIdKeyword('');
    closeModal();
  };

  const handleChangeMemberIdInput = (e) => {
    setMemberIdInput(e.target.value);
  };

  const handleKeyPressMemberIdInput = (e) => {
    if (e.key !== 'Enter') {
      return;
    }
    setMemberIdKeyword(memberIdInput);
  };

  const handleClickButton = () => {
    setMemberIdKeyword(memberIdInput);
  };

  const handleClickAddButton = () => {
    requestFriend(memberIdInput);
    escapeModal();
  };

  return (
    isModalOpen && (
      <Modal escape={escapeModal}>
        <Top>
          <button onClick={escapeModal}>
            <Icon.Close />
          </button>
        </Top>
        <InputWithButton
          name={INPUT.FRIEND_SEARCH.KEY}
          label={INPUT.FRIEND_SEARCH.LABEL}
          placeholder={INPUT.FRIEND_SEARCH.PLACEHOLDER}
          value={memberIdInput}
          onChange={handleChangeMemberIdInput}
          onKeyPress={handleKeyPressMemberIdInput}
          buttonType="button"
          onClickButton={handleClickButton}
          buttonIcon={<Icon.Search width="20" />}
          autoFocus={isWebView}
        />

        <ResultSection>
          {!memberIdKeyword || isLoading ? null : isSuccess ? (
            <SearchResult>
              <ProfileImage src={searchResult.profileImage} alt="검색결과 프로필 이미지" />
              <FriendInfo>
                <Nickname>{searchResult.nickname}</Nickname>
                <MemberId>{searchResult.memberId}</MemberId>
              </FriendInfo>

              <ButtonRound
                type="submit"
                size="xs"
                Icon={<Icon.People width="18" color="#fff" />}
                onClick={handleClickAddButton}
              >
                친구 추가
              </ButtonRound>
            </SearchResult>
          ) : (
            <NoResult>
              <span>{errorMessage}</span>
              {errorMessage === NO_SUCH_USER && (
                <span>
                  <strong>친구 아이디</strong> 를 다시 확인해 주세요!
                </span>
              )}
            </NoResult>
          )}
        </ResultSection>
      </Modal>
    )
  );
};

FriendSearchModal.propTypes = {
  isModalOpen: PropTypes.bool,
  closeModal: PropTypes.func,
};
