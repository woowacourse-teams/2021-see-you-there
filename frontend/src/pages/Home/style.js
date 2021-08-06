import styled from 'styled-components';

import { COLOR, LAYOUT, Z_INDEX, EFFECT } from '../../constants';

export const MapViewArea = styled.section`
  width: calc(100% - ${LAYOUT.NAV_WIDTH_RIGHT});
  height: 100%;

  @media (min-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    ${(props) => `#${props.lastParticipantId}`} {
      ${EFFECT.WAVE_CIRCLE}
    }
  }
`;

export const MapView = styled.div`
  width: 100%;
  height: 100%;
`;

export const ContentArea = styled.section`
  position: fixed;
  top: ${LAYOUT.NAV_HEIGHT};
  right: 0;
  z-index: ${Z_INDEX.CONTENT};
  width: ${LAYOUT.NAV_WIDTH_RIGHT};
  height: calc(100% - ${LAYOUT.NAV_HEIGHT});
  overflow-y: scroll;

  background-color: ${COLOR.PRIMARY_BACKGROUND};
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.25);

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: 100%;
  }
`;

/* 참가자 추가 Section */

export const AddSection = styled.section`
  height: 22.5rem;
  background-color: ${COLOR.BACKGROUND};
`;

export const AddForm = styled.form`
  margin: 0 auto;
  width: ${LAYOUT.CONTENT_WIDTH_RIGHT};

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: ${LAYOUT.CONTENT_WIDTH_RESPONSIVE};
    max-width: ${LAYOUT.CONTENT_WIDTH_MAX};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 1.25rem;
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
    font-size: 0.625rem;
    color: ${COLOR.PLACEHOLDER};
  }
`;

/* 하단 버튼 Section */

export const BottomSection = styled.section`
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: ${LAYOUT.CONTENT_BOTTOM_HEIGHT};
  padding: 1.5rem 0 2rem;
  width: inherit;

  background-color: ${COLOR.PRIMARY_BACKGROUND};

  & > button {
    ${EFFECT.SHINE}
  }
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
  font-size: 0.75rem;
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
