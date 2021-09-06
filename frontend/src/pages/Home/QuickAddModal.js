/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

import { Icon, Modal, ButtonRound, Picture } from '../../components';
import { Top, ModalListSection, NoItem, List, ProfileImage, FriendInfo, AddressName } from './style';
import { UserContext, ParticipantContext } from '../../contexts';
import { getId } from '../../utils';
import { ROUTE, COLOR, MESSAGE } from '../../constants';
import { Image } from '../../assets';

export const QuickAddModal = (props) => {
  const { isModalOpen, closeModal } = props;
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const { userFriendList = [], userAddressList, user, isLogin } = useContext(UserContext);
  const { addParticipant, participants, isFullParticipants } = useContext(ParticipantContext);

  const hasNoneOfMyAddress = userAddressList?.length === 0;
  const hasNoFriend = userFriendList?.length === 0;
  const hasNoFriendWithAddress = userFriendList?.every((friend) => friend.addresses.length === 0);
  const noItemMessage = !isLogin
    ? {
        situation: `간편추가 기능은 로그인 후 이용 가능합니다.`,
        subject: '여기서만나',
        action: '에 로그인하고',
        buttonText: '로그인으로 이동',
        path: ROUTE.LOGIN.PATH,
      }
    : hasNoneOfMyAddress
    ? {
        situation: `아직 ${user.nickname}님의 주소를 등록하지 않으셨군요!`,
        subject: '나의 첫 주소',
        action: '를 등록해두고',
        buttonText: '내 주소목록으로 이동',
        path: ROUTE.ADDRESS.PATH,
      }
    : hasNoFriend
    ? {
        situation: '아직 친구를 등록하지 않으셨군요!',
        subject: '친구 아이디',
        action: '로 친구 등록해두고',
        buttonText: '내 친구목록으로 이동',
        path: ROUTE.FRIEND.PATH,
      }
    : hasNoFriendWithAddress
    ? {
        situation: '친구분들이 아직 주소를 등록하지 않았군요!',
        subject: '더 많은 친구 아이디',
        action: '를 등록해두고',
        buttonText: '내 친구목록으로 이동',
        path: ROUTE.FRIEND.PATH,
      }
    : null;

  const escapeModal = () => {
    closeModal();
  };

  const handleClickAddButton = ({ nickname, profileImage, address }) => {
    if (isFullParticipants) {
      enqueueSnackbar(MESSAGE.SNACKBAR_MAX_PARTICIPANT, { variant: 'error' });
      return;
    }

    const newParticipant = {
      id: getId(),
      avatar: profileImage,
      name: nickname,
      ...address,
    };

    addParticipant(newParticipant);
    escapeModal();
  };

  const Item = (props) => {
    const { memberId, profileImage, nickname, address } = props;
    const isAdded = participants.some(
      (participant) => participant.name === nickname && address.addressName === participant.addressName
    );

    return (
      <li key={address.id}>
        <button onClick={() => handleClickAddButton({ memberId, profileImage, nickname, address })} disabled={isAdded}>
          <ProfileImage src={profileImage} alt={`${nickname} 프로필 이미지`} />
          <FriendInfo>
            &#39;{nickname}&#39;&nbsp;의&nbsp;
            <AddressName>{address.addressName}</AddressName>
          </FriendInfo>
          {isAdded ? '추가됨' : <Icon.Check width="18" color={COLOR.PRIMARY} />}
        </button>
      </li>
    );
  };

  return (
    isModalOpen && (
      <Modal escape={escapeModal}>
        <Top>
          <button onClick={escapeModal}>
            <Icon.Close />
          </button>
        </Top>

        <ModalListSection>
          {isLogin && (
            <>
              <List>
                {userAddressList.map((address) => (
                  <Item key={address.id} profileImage={user.profileImage} nickname="나" address={address}></Item>
                ))}
              </List>
              <List>
                {userFriendList.map((friend) => {
                  const { nickname, profileImage, addresses } = friend;

                  return addresses.map((address) => (
                    <Item key={address.id} profileImage={profileImage} nickname={nickname} address={address} />
                  ));
                })}
              </List>
            </>
          )}
          {noItemMessage && (
            <NoItem>
              <span>{noItemMessage.situation}</span>
              <Picture image={Image.avatarWonder} alt="놀라는 표정 일러스트" />
              <span>
                <strong>{noItemMessage.subject}</strong>
                {noItemMessage.action}
                <br />
                간편하게 이용해보세요 :)
              </span>
              <ButtonRound size="sm" onClick={() => history.push(noItemMessage.path)}>
                {noItemMessage.buttonText}
              </ButtonRound>
            </NoItem>
          )}
        </ModalListSection>
      </Modal>
    )
  );
};

QuickAddModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};
