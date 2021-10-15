/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Icon, Modal } from '../../components';
import { NoticeModalHeader, NoticeModalBody } from './style';
import { useModal } from '../../hooks';
import { ROUTE } from '../../constants';
import { logo, avatarCry } from '../../assets';

export const NoticeModal = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const history = useHistory();
  const title = '수리중';
  const content = `현재 교통 정보를 가져오는 공공 API 서버가 동작하지 않아, 중간지점 추천 기능이 원활하게 동작하지 않습니다.
  빠른 해결을 위해  최선을 다하겠습니다.`;

  useEffect(() => {
    if (title) {
      openModal();
    }
  }, []);

  return (
    isModalOpen && (
      <Modal escape={closeModal}>
        <NoticeModalHeader>
          <img src={logo} />
          <button onClick={closeModal}>
            <Icon.Close />
          </button>
        </NoticeModalHeader>

        <NoticeModalBody>
          <img src={avatarCry} />
          <h2>{title}</h2>
          <p>{content}</p>
          <p>
            기타 문의사항은 로그인 후 <a onClick={() => history.push(ROUTE.BOARD.PATH)}>문의 게시판</a>을 활용해주세요
            :)
          </p>
        </NoticeModalBody>
      </Modal>
    )
  );
};
