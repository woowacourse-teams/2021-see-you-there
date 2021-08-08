import React from 'react';
import PropTypes from 'prop-types';

import { ListSection, List, Item, Nickname, MemberId, ProfileImage, FriendInfo, ButtonGroup } from './style';
import { Confirm } from '../../components';
import { useConfirm, useMutateFriend } from '../../hooks';
import { MESSAGE } from '../../constants';

export const ListRequestFriend = (props) => {
  const { isVisible, list } = props;
  const { cancelFriend } = useMutateFriend();
  const { isConfirmOpen, openConfirm, approveConfirm, cancelConfirm } = useConfirm({
    approve: cancelFriend,
  });

  return (
    <ListSection isVisible={isVisible}>
      <h3>친구가 되면, 서로의 주소가 공개됩니다.</h3>
      <List>
        {list?.map(({ id: requestId, receiver }) => {
          const { profileImage, memberId, nickname } = receiver;

          return (
            <Item key={requestId}>
              <ProfileImage src={profileImage} alt="친구 프로필 이미지" />
              <FriendInfo>
                <Nickname>{nickname}</Nickname>
                <MemberId>{memberId}</MemberId>
              </FriendInfo>
              <ButtonGroup>
                <button onClick={() => openConfirm(requestId)}>취소</button>
              </ButtonGroup>
            </Item>
          );
        })}
      </List>
      <Confirm isConfirmOpen={isConfirmOpen} onCancel={cancelConfirm} onApprove={approveConfirm}>
        {MESSAGE.USER_FRIEND.CONFIRM_CANCEL}
      </Confirm>
    </ListSection>
  );
};

ListRequestFriend.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  list: PropTypes.array,
};
