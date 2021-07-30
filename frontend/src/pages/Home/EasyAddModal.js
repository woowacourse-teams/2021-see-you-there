/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Icon, Modal } from '../../components';
import { Top, ModalListSection, NoItem, List, ProfileImage, FriendInfo, AddressName } from './style';
import { UserContext, ParticipantContext } from '../../contexts';
import { getId } from '../../utils';
import { COLOR } from '../../constants';
import { Image } from '../../assets';

export const EasyAddModal = (props) => {
  const { isModalOpen, closeModal } = props;
  const { userFriendList = [], userAddressList, user } = useContext(UserContext);
  const { addParticipant, participants, isFullParticipants } = useContext(ParticipantContext);

  const hasNoneOfMyAddress = userAddressList?.length === 0;
  const hasNoFriend = userFriendList?.length === 0;
  const hasNoFriendWithAddress = userFriendList?.every((friend) => friend.addresses.length === 0);
  const noItemMessage = hasNoneOfMyAddress
    ? { situation: `아직 주소를 추가하지 않으셨군요!`, subject: '나의 첫 주소', action: '를 추가하고' }
    : hasNoFriend
    ? { situation: '아직 친구를 추가하지 않으셨군요!', subject: '친구 아이디', action: '로 친구 추가하고' }
    : hasNoFriendWithAddress
    ? { situation: '친구분들이 아직 주소를 등록하지 않았군요!', subject: '더 많은 친구 아이디', action: '를 추가하고' }
    : null;

  const escapeModal = () => {
    closeModal();
  };

  const handleClickAddButton = ({ nickname, profileImage, address }) => {
    if (isFullParticipants) {
      // TODO: 스낵바 알림
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
          {noItemMessage && (
            <NoItem>
              <span>{noItemMessage.situation}</span>
              <img src={Image.avatarWonder} alt="놀라는 표정 일러스트" />
              <span>
                <strong>{noItemMessage.subject}</strong>
                {noItemMessage.action}
                <br />
                간편하게 이용해보세요 :)
              </span>
            </NoItem>
          )}
        </ModalListSection>
      </Modal>
    )
  );
};

EasyAddModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
};
