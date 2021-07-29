import React, { useContext, useState } from 'react';

import { FriendSearchModal } from './FriendSearchModal';
import {
  ContentArea,
  MyMemberId,
  ButtonSection,
  Nickname,
  MemberId,
  ProfileImage,
  List,
  Item,
  FriendInfo,
} from './style';
import { ButtonRound, Confirm, Icon } from '../../components';
import { useConfirm, useModal, useMutateFriend } from '../../hooks';
import { getAvatarKey } from '../../utils';
import { Image } from '../../assets';
import { COLOR, MESSAGE } from '../../constants';

const formId = 'USER_FRIEND';

const mockFriendList = [
  {
    memberId: '365kim',
    nickname: '365kim',
    profileImage: Image[getAvatarKey()],
    addresses: [],
  },
  {
    memberId: '0imbean0',
    nickname: '임심바',
    profileImage: Image[getAvatarKey()],
    addresses: [],
  },
  {
    memberId: 'daum7766',
    nickname: '김멍토',
    profileImage: Image[getAvatarKey()],
    addresses: [],
  },
  {
    memberId: 'hybeom0720',
    nickname: '와이빛',
    profileImage: Image[getAvatarKey()],
    addresses: [],
  },
];

const memberId = '검색용 ID 준비중';

export const FriendPage = () => {
  const { deleteFriend } = useMutateFriend();
  const { isModalOpen, openModal, closeModal } = useModal();
  const [isMemberIdCopied, setIsMemberIdCopied] = useState(false);
  const handleClickCopyButton = () => {
    navigator.clipboard.writeText(memberId);
    setIsMemberIdCopied(true);
  };

  const { isConfirmOpen, openConfirm, approveConfirm, cancelConfirm } = useConfirm({
    // approve: deleteFriend,
    approve: (id) => console.log('delete', id),
  });

  return (
    <main>
      <ContentArea>
        <h2>내 친구들이에요.</h2>
        <MyMemberId>
          <span>내 아이디: {memberId}</span>
          <button onClick={handleClickCopyButton}>
            {isMemberIdCopied ? <Icon.Check width="16" color={COLOR.PRIMARY_LIGHT} /> : <Icon.Copy width="16" />}
          </button>
        </MyMemberId>
        <ButtonSection>
          <ButtonRound
            type="submit"
            size="xs"
            Icon={<Icon.People width="18" color="#fff" />}
            onClick={openModal}
            disabled={false}
          >
            친구 추가
          </ButtonRound>
          <FriendSearchModal isModalOpen={isModalOpen} closeModal={closeModal} />
        </ButtonSection>
        <List>
          {mockFriendList.map((friend) => {
            const { profileImage, memberId, nickname } = friend;

            return (
              <Item key={memberId}>
                <button onClick={() => openConfirm(memberId)}>삭제</button>
                <ProfileImage src={profileImage} alt="친구 프로필 이미지" />
                <FriendInfo>
                  <Nickname>{nickname}</Nickname>
                  <MemberId>{memberId}</MemberId>
                </FriendInfo>
              </Item>
            );
          })}
        </List>
        <Confirm isConfirmOpen={isConfirmOpen} onCancel={cancelConfirm} onApprove={approveConfirm}>
          {MESSAGE[formId].CONFIRM_DELETE}
        </Confirm>
        <img src={Image.drawingFriend} alt="내 친구목록 페이지 일러스트" />
      </ContentArea>
    </main>
  );
};
