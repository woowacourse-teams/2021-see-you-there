import React from 'react';
import PropTypes from 'prop-types';

import { ListSection, List, Item, Nickname, MemberId, ProfileImage, FriendInfo, ButtonGroup } from './style';
import { Confirm, Notice } from '../../components';
import { useConfirm, useMutateFriend } from '../../hooks';
import { COLOR, MESSAGE } from '../../constants';

export const ListReceiveFriend = (props) => {
  const { isVisible, list } = props;
  const { acceptFriend, refuseFriend } = useMutateFriend();
  const accept = useConfirm({ approve: acceptFriend });
  const refuse = useConfirm({ approve: refuseFriend });

  return (
    <ListSection isVisible={isVisible}>
      <h3>친구가 되면, 서로의 주소가 공개됩니다.</h3>
      <List>
        {list?.map(({ id: receiveId, requester }) => {
          const { profileImage, memberId, nickname } = requester;

          return (
            <Item key={receiveId}>
              <ProfileImage src={profileImage} alt="친구 프로필 이미지" />
              <FriendInfo>
                <Nickname>{nickname}</Nickname>
                <MemberId>{memberId}</MemberId>
              </FriendInfo>
              <ButtonGroup>
                <button onClick={() => refuse.openConfirm(receiveId)}>거절</button>
                <button onClick={() => accept.openConfirm(receiveId)}>수락</button>
              </ButtonGroup>
            </Item>
          );
        })}
      </List>
      <Confirm isConfirmOpen={accept.isConfirmOpen} onCancel={accept.cancelConfirm} onApprove={accept.approveConfirm}>
        {MESSAGE.USER_FRIEND.CONFIRM_ACCEPT}
        <Notice color={COLOR.PRIMARY_LIGHT} style={{ marginLeft: 0 }}>
          {MESSAGE.USER_FRIEND.CONFIRM_ACCEPT_DETAIL}
        </Notice>
      </Confirm>
      <Confirm isConfirmOpen={refuse.isConfirmOpen} onCancel={refuse.cancelConfirm} onApprove={refuse.approveConfirm}>
        {MESSAGE.USER_FRIEND.CONFIRM_REFUSE}
      </Confirm>
    </ListSection>
  );
};

ListReceiveFriend.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  list: PropTypes.array,
};
