import React from 'react';
import PropTypes from 'prop-types';

import { ListSection, List, Item, Nickname, MemberId, ProfileImage, FriendInfo, ButtonGroup } from './style';
import { Confirm } from '../../components';
import { useConfirm, useMutateFriend } from '../../hooks';
import { MESSAGE } from '../../constants';

const formId = 'USER_FRIEND';

export const ListRequestFriend = (props) => {
  const { isVisible, list } = props;
  const { deleteFriend } = useMutateFriend();
  const { isConfirmOpen, openConfirm, approveConfirm, cancelConfirm } = useConfirm({
    approve: deleteFriend,
  });

  return (
    <ListSection isVisible={isVisible}>
      <h3>친구가 되면, 서로의 주소가 공개됩니다.</h3>
      <List>
        {list?.map(({ receiver }) => {
          const { profileImage, memberId, nickname } = receiver;

          return (
            <Item key={memberId}>
              <ProfileImage src={profileImage} alt="친구 프로필 이미지" />
              <FriendInfo>
                <Nickname>{nickname}</Nickname>
                <MemberId>{memberId}</MemberId>
              </FriendInfo>
              <ButtonGroup>
                <button onClick={() => openConfirm(memberId)}>취소</button>
              </ButtonGroup>
            </Item>
          );
        })}
      </List>
      <Confirm isConfirmOpen={isConfirmOpen} onCancel={cancelConfirm} onApprove={approveConfirm}>
        {MESSAGE[formId].CONFIRM_DELETE}
      </Confirm>
    </ListSection>
  );
};

ListRequestFriend.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  list: PropTypes.array,
};
