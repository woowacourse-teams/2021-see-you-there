import styled from 'styled-components';

import { COLOR, LAYOUT, Z_INDEX } from '../../constants';

export const ContentArea = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${LAYOUT.PADDING} 0;
  padding-top: 4rem;
  width: 100%;
  height: calc(100% - ${LAYOUT.NAV_HEIGHT});
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;

  z-index: ${Z_INDEX.CONTENT};

  & > h2 {
    line-height: 2rem;
    padding-bottom: 2rem;
  }

  & > img {
    position: fixed;
    bottom: 0;
    width: 70rem;
  }
`;

export const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: ${LAYOUT.PADDING};
  width: ${LAYOUT.CONTENT_WIDTH_MAX};
  height: 20rem;

  background-color: ${COLOR.BACKGROUND};
  box-shadow: 5px 5px 14px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
`;

export const ProfileImage = styled.img`
  margin-top: 1.5rem;
  width: 7rem;
  height: 7rem;

  background-color: #ccc;
  border-radius: 50%;
  padding: 0.25rem;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  & > button {
    margin: 1rem 0;

    background-color: ${COLOR.BACKGROUND};
    font-size: 0.75rem;
    color: ${COLOR.PARAGRAPH_LIGHT};

    &:hover {
      color: ${COLOR.PARAGRAPH};
    }
  }
`;

export const Nickname = styled.span`
  color: ${COLOR.PARAGRAPH};
`;

export const MemberId = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.5rem 0 1rem;

  & > span {
    color: ${COLOR.PRIMARY_LIGHT};
    font-size: 0.75rem;
    margin-right: 0.5rem;
    margin-left: 1.5rem;
  }

  & > button {
    display: flex;
  }
`;

export const ButtonSection = styled.section`
  display: flex;
  justify-content: space-around;
  margin-top: 3rem;
  width: ${LAYOUT.CONTENT_WIDTH_MAX};

  & > button:hover {
      color: ${COLOR.BACKGROUND};
      background-color: ${COLOR.PRIMARY_LIGHT};
    }
  }
`;

/* 수정 폼 */
export const EditForm = styled.form`
  padding: 0 ${LAYOUT.PADDING} ${LAYOUT.PADDING};
  width: 98%;

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & > ${ButtonGroup} {
    position: absolute;
    bottom: ${LAYOUT.MARGIN};
    right: ${LAYOUT.MARGIN};
  }
`;

export const ButtonGroup = styled.div`
  position: absolute;
  bottom: calc(${LAYOUT.MARGIN} / 2);
  right: ${LAYOUT.MARGIN};
  display: flex;
  justify-content: space-between;

  width: 3.75rem;

  & > button {
    font-size: 0.75rem;
    color: ${COLOR.PARAGRAPH_LIGHT};

    &:hover {
      color: ${COLOR.PARAGRAPH};
    }
  }
`;
