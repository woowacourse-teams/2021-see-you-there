import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { Icon, InputUnderline, Notice } from '../../components';
import { EditForm, ButtonGroup } from './style';
import { ProfileFormContext } from '../../contexts';
import { useProfileNicknameInput, useProfileMemberIdInput, useMutateProfile } from '../../hooks';
import { isViewWiderThan } from '../../utils';

export const ProfileEditForm = (props) => {
  const { closeForm } = props;
  const { INPUT, MESSAGE, isComplete, isUpdated, noticeMessage, setNoticeMessage } = useContext(ProfileFormContext);
  const { nickname, handleChangeNickname } = useProfileNicknameInput();
  const { memberId, handleChangeMemberId } = useProfileMemberIdInput();
  const { updateProfile } = useMutateProfile();

  const isWebView = isViewWiderThan(LAYOUT.DEVICE_WIDTH_TABLET);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isComplete) {
      setNoticeMessage(MESSAGE.NOTICE_INCOMPLETE_FORM);
      return;
    }
    if (!isUpdated) {
      setNoticeMessage(MESSAGE.NOTICE_NOT_UPDATED_FORM);
      return;
    }

    updateProfile({ nickname, memberId });
    closeForm();
  };

  return (
    <EditForm>
      <InputUnderline
        name={INPUT.NICKNAME.KEY}
        label={INPUT.NICKNAME.LABEL}
        placeholder={INPUT.NICKNAME.PLACEHOLDER}
        value={nickname}
        onChange={handleChangeNickname}
        Icon={<Icon.Star width="18" />}
        autoFocus={isWebView}
      />
      <InputUnderline
        name={INPUT.MEMBER_ID.KEY}
        label={INPUT.MEMBER_ID.LABEL}
        placeholder={INPUT.MEMBER_ID.PLACEHOLDER}
        value={memberId}
        onChange={handleChangeMemberId}
        Icon={<Icon.ID width="18" />}
      />
      <Notice>{noticeMessage}</Notice>
      <ButtonGroup>
        <button type="button" onClick={closeForm}>
          취소
        </button>
        <button type="submit" onClick={handleSubmit}>
          확정
        </button>
      </ButtonGroup>
    </EditForm>
  );
};

ProfileEditForm.propTypes = {
  closeForm: PropTypes.func.isRequired,
};
