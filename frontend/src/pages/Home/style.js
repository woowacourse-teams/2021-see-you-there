import styled from 'styled-components';

import { ButtonRound } from '../../components';
import { COLOR, LAYOUT, Z_INDEX, EFFECT, CONTENT_AREA } from '../../constants';

export const MapViewArea = styled.section`
  width: calc(100% - ${LAYOUT.NAV_WIDTH_RIGHT});
  height: 100%;

  @media (min-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    ${(props) => `#_${props.lastParticipantId}`} {
      ${EFFECT.WAVE_CIRCLE}
    }
  }
`;

export const MapView = styled.div`
  width: 100%;
  height: 100%;
`;

export const ContentArea = styled.section`
  ${CONTENT_AREA.MAP}

  overflow-x: hidden;
  overflow-y: scroll;
`;

/* 참가자 추가 Section */

export const AddSection = styled.section`
  height: 19.5rem;
  background-color: ${COLOR.BACKGROUND};

  > h2 {
    padding-top: 2.5rem;
  }
`;

export const AddForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: ${LAYOUT.CONTENT_WIDTH_RIGHT};

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: ${LAYOUT.CONTENT_WIDTH_RESPONSIVE};
    max-width: ${LAYOUT.CONTENT_WIDTH_MAX};
  }
`;

export const QuickAddButton = styled(ButtonRound)`
  align-self: flex-end;
  margin: 0.125rem 0;
`;

export const InputWithButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  & > button {
    margin-bottom: 0.25rem;
  }
`;

/* 참가자 목록 Section */

export const ListSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: ${LAYOUT.CONTENT_BOTTOM_HEIGHT};

  & > h2 > span {
    padding-left: 0.125rem;
    font-size: 0.875rem;
    color: ${COLOR.PRIMARY_LIGHT};
  }

  & > span {
    position: absolute;
    top: 3.75rem;
    font-size: 0.65rem;
    color: ${COLOR.PLACEHOLDER};
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    padding-bottom: 0;
  }
`;

/* 하단 버튼 Section */

export const BottomSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: ${LAYOUT.CONTENT_BOTTOM_HEIGHT};
  padding: 1.5rem 0 2rem;
  width: inherit;

  background-color: ${COLOR.PRIMARY_BACKGROUND};

  & > button {
    position: relative;
    overflow-x: hidden;
    ${EFFECT.SHINE}

    &:focus {
      border-style: double;
    }
  }

  @media (min-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    position: fixed;
    bottom: 0;
  }
`;

export const NoServiceAreaNotice = styled.p`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0rem;
  width: 100%;
  height: 2.75rem;

  text-align: center;
  font-size: 0.7rem;
  color: ${COLOR.ACCENT};
  background-color: ${COLOR.PRIMARY_BACKGROUND};
`;

/* 간편추가 모달 */

export const Top = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  & > button {
    width: fit-content;
  }
`;

export const ModalListSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 20rem;
  margin: 1.25rem 0;
  overflow-y: auto;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    margin: 1rem 0;
    height: 16rem;
  }
`;

export const List = styled.ul`
  width: 100%;

  /* 스크롤 공간 확보 */
  margin-right: 0;
  padding-right: 1rem;

  z-index: ${Z_INDEX.ON_IMAGE};

  & > li {
    width: 100%;
    border-bottom: 1px solid ${COLOR.BORDER};

    & > button {
      padding: 0.5rem 0;
      display: flex;
      align-items: center;
      width: 100%;

      font-size: 0.75rem;

      & svg {
        margin-right: 0.75rem;
        visibility: hidden;
      }

      &:hover:not(:disabled) {
        background-color: ${COLOR.PRIMARY_BACKGROUND};

        & svg {
          visibility: visible;
        }
      }
    }
  }
`;

export const ProfileImage = styled.img`
  width: 1.75rem;
  height: 1.75rem;

  background-color: #bbb;
  border-radius: 50%;
  padding: 0.125rem;
`;

export const FriendInfo = styled.div`
  flex-grow: 1;
  padding-left: 1rem;

  text-align: start;
  font-size: 0.85rem;
  color: ${COLOR.PARAGRAPH};

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    padding-left: 0.75rem;
    font-size: 0.75rem;
  }
`;

export const AddressName = styled.span`
  margin-left: 0.1rem;
  color: ${COLOR.PRIMARY_LIGHT};

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    display: block;
  }
`;

export const NoItem = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  text-align: center;
  font-size: 0.8rem;
  line-height: 1.75;

  & > span:first-child {
    font-size: 0.875rem;
  }

  & strong {
    color: ${COLOR.PARAGRAPH_LIGHT};
  }

  & > img {
    margin: 0.5rem;
    width: 4rem;
  }

  & > button {
    margin-top: 1.5rem;
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    font-size: 0.625rem;

    & > span:first-child {
      font-size: 0.75rem;
    }

    & > img {
      width: 2rem;
    }
  }
`;

/* 공지사항 모달 */

export const NoticeModalHeader = styled.div`
  position: absolute;
  top: -1px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.5rem;

  background-color: ${COLOR.PRIMARY};
  border-radius: 0.25rem 0.25rem 0 0;

  & img {
    height: 20px;
  }

  & button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }

  & button path {
    fill: ${COLOR.ON_PRIMARY};
  }
`;

export const NoticeModalBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 3rem;

  & img {
    width: 4rem;
  }

  & h2 {
    padding-top: 1.25rem;
    padding-bottom: 2.5rem;
  }

  & p {
    margin-bottom: 1rem;
    width: 30rem;

    line-height: 2;
    text-align: center;
    white-space: normal;
    word-break: keep-all;
    font-size: 0.9rem;

    @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
      width: 16rem;
    }
  }

  & a {
    color: ${COLOR.PRIMARY_LIGHT};

    &:hover {
      color: ${COLOR.PRIMARY_DARK};
    }
  }
`;
