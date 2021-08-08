import React from 'react';
import PropTypes from 'prop-types';

import { ListSection, List, Item, Nickname, MemberId, ProfileImage, FriendInfo, ButtonGroup } from './style';
import { Confirm, Notice } from '../../components';
import { useConfirm, useMutateFriend } from '../../hooks';
import { COLOR, MESSAGE } from '../../constants';

export const ListUserFriend = (props) => {
  const { isVisible, list } = props;
  const { deleteFriend } = useMutateFriend();
  const { isConfirmOpen, openConfirm, approveConfirm, cancelConfirm } = useConfirm({
    approve: deleteFriend,
  });

  return (
    <ListSection isVisible={isVisible}>
      <h3>나와 주소를 공유한 친구들이에요.</h3>
      <List>
        {list?.map((friend) => {
          const { profileImage, memberId, nickname } = friend;

          return (
            <Item key={memberId}>
              <ProfileImage src={profileImage} alt="친구 프로필 이미지" />
              <FriendInfo>
                <Nickname>{nickname}</Nickname>
                <MemberId>{memberId}</MemberId>
              </FriendInfo>
              <ButtonGroup>
                <button onClick={() => openConfirm(memberId)}>삭제</button>
              </ButtonGroup>
            </Item>
          );
        })}
      </List>
      <Confirm isConfirmOpen={isConfirmOpen} onCancel={cancelConfirm} onApprove={approveConfirm}>
        {MESSAGE.USER_FRIEND.CONFIRM_DELETE}
        <Notice color={COLOR.PRIMARY_LIGHT} style={{ marginLeft: 0 }}>
          {MESSAGE.USER_FRIEND.CONFIRM_DELETE_DETAIL}
        </Notice>
      </Confirm>
    </ListSection>
  );
};

ListUserFriend.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  list: PropTypes.array,
};
