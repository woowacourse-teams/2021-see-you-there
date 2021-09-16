import React, { useState, useContext } from 'react';

import { ListUserFriend } from './ListUserFriend';
import { ListRequestFriend } from './ListRequestFriend';
import { ListReceiveFriend } from './ListReceiveFriend';
import { FriendSearchModal } from './FriendSearchModal';
import { ContentArea, MyMemberId, ButtonSection, FriendTabs, FriendTab } from './style';
import { ButtonRound, Icon, Picture } from '../../components';
import { UserContext } from '../../contexts';
import { useModal } from '../../hooks';

import { drawingFriend, drawingFriendTablet } from '../../assets';
import { COLOR } from '../../constants';

const FRIEND_LIST = 'friendList';
const REQUEST_LIST = 'requestList';
const RECEIVE_LIST = 'receiveList';

const FriendPage = () => {
  const { memberId, userFriendList, requestFriendList, receiveFriendList, hasReceiveFriend } = useContext(UserContext);
  const { isModalOpen, openModal, closeModal } = useModal();
  const [isMemberIdCopied, setIsMemberIdCopied] = useState(false);
  const [tab, setTab] = useState(FRIEND_LIST);

  const handleClickCopyButton = () => {
    navigator.clipboard.writeText(memberId);
    setIsMemberIdCopied(true);
  };

  return (
    <main>
      <ContentArea>
        <h2>내 친구들이에요.</h2>
        <MyMemberId>
          <span>내 아이디: {memberId}</span>
          <button onClick={handleClickCopyButton}>
            {isMemberIdCopied ? (
              <Icon.Check width="16" color={COLOR.PRIMARY_LIGHT} />
            ) : (
              <Icon.Copy width="16" hoverColor={COLOR.PRIMARY_LIGHT} />
            )}
          </button>
        </MyMemberId>
        <ButtonSection>
          <ButtonRound type="submit" size="xs" Icon={<Icon.People width="18" color="#fff" />} onClick={openModal}>
            친구 추가
          </ButtonRound>
          <FriendSearchModal isModalOpen={isModalOpen} closeModal={closeModal} />
        </ButtonSection>

        <FriendTabs>
          <FriendTab isSelected={tab === FRIEND_LIST} onClick={() => setTab(FRIEND_LIST)}>
            내 친구
            <span>{userFriendList?.length}명</span>
          </FriendTab>
          <FriendTab isSelected={tab === REQUEST_LIST} onClick={() => setTab(REQUEST_LIST)}>
            보낸 요청
            <span>{requestFriendList?.length}명</span>
          </FriendTab>
          <FriendTab isSelected={tab === RECEIVE_LIST} hasCount={hasReceiveFriend} onClick={() => setTab(RECEIVE_LIST)}>
            받은 요청
            <span>{receiveFriendList?.length}명</span>
          </FriendTab>
        </FriendTabs>

        <ListUserFriend list={userFriendList} isVisible={tab === FRIEND_LIST} />
        <ListRequestFriend list={requestFriendList} isVisible={tab === REQUEST_LIST} />
        <ListReceiveFriend list={receiveFriendList} isVisible={tab === RECEIVE_LIST} />

        <Picture
          image={drawingFriend}
          tabletImage={drawingFriendTablet}
          minType="webp"
          alt="내 친구목록 페이지 일러스트"
        />
      </ContentArea>
    </main>
  );
};

export default FriendPage;
