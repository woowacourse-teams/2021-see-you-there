/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Icon, Modal } from '../../components';
import { NoticeModalHeader, NoticeModalBody } from './style';
import { useModal, useNotice } from '../../hooks';
import { storage } from '../../utils';
import { ROUTE, STORAGE_KEY } from '../../constants';
import { logo, avatarCry } from '../../assets';



export const NoticeModal = () => {
  const notice = useNotice();
  const { isModalOpen, openModal, closeModal } = useModal();
  const history = useHistory();

  useEffect(() => {
    storage.session.set(STORAGE_KEY.NOTICE, true);
  }, []);

  useEffect(() => {
    if (notice) {
      openModal();
    }
  }, [notice]);

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
          <h2>{notice.title}</h2>
          <p>{notice.content}</p>
          <p>
            기타 문의사항은 로그인 후 <a onClick={() => history.push(ROUTE.BOARD.PATH)}>문의 게시판</a>을 활용해주세요
            :)
          </p>
        </NoticeModalBody>
      </Modal>
    )
  );
};
