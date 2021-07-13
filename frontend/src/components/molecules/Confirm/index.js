import React from 'react';
import PropTypes from 'prop-types';

import { Modal } from '../../';
import { ButtonGroup, CancelButton, ApproveButton, Container } from './style';

export const Confirm = (props) => {
  const { onCancel, onApprove, children } = props;

  return (
    <Modal size="small">
      <Container>
        {children}
        <ButtonGroup>
          <CancelButton onClick={onCancel}>취소</CancelButton>
          <ApproveButton onClick={onApprove}>확인</ApproveButton>
        </ButtonGroup>
      </Container>
    </Modal>
  );
};

Confirm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onApprove: PropTypes.func.isRequired,
};
