import styled from 'styled-components';

import { COLOR, LAYOUT, Z_INDEX } from '../../constants';

export const ContentArea = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: ${LAYOUT.PADDING} 0;
  padding-top: 4rem;
  width: 100%;
  height: calc(100vh - ${LAYOUT.NAV_HEIGHT});
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;

  z-index: ${Z_INDEX.CONTENT};

  & > h2 {
    line-height: 2rem;
    padding-bottom: 0;
  }

  & > img {
    position: fixed;
    bottom: 0;
    width: 70rem;
  }

  @media (max-height: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    padding-top: 2.5rem;

    & > img {
      width: 45rem;
    }
  }
`;

export const MyMemberId = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;

  & > span {
    color: ${COLOR.PARAGRAPH_LIGHT};
    font-size: 0.75rem;
    margin-right: 0.25rem;
  }

  & > button {
    display: flex;
  }
`;

export const ButtonSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2.25rem;
  width: ${LAYOUT.CONTENT_WIDTH_MAX};

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: ${LAYOUT.CONTENT_WIDTH_RESPONSIVE};
    max-width: ${LAYOUT.CONTENT_WIDTH_MAX};
  }
`;

export const List = styled.ul`
  display: grid;
  row-gap: 1.25rem;
  column-gap: 1.25rem;
  grid-template-columns: repeat(2, 1fr);
  width: ${LAYOUT.CONTENT_WIDTH_MAX};
  margin: 1.25rem 0;

  z-index: ${Z_INDEX.ON_IMAGE};

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    grid-template-columns: repeat(1, 1fr);
    width: ${LAYOUT.CONTENT_WIDTH_RESPONSIVE};
    max-width: ${LAYOUT.CONTENT_WIDTH_MAX};
  }
`;

export const Item = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${LAYOUT.PADDING};

  background-color: ${COLOR.BACKGROUND};
  box-shadow: 5px 5px 14px rgba(0, 0, 0, 0.12);
  border-radius: 10px;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    flex-direction: row;
    justify-content: flex-start;
  }

  > button {
    position: absolute;
    top: ${LAYOUT.MARGIN};
    right: ${LAYOUT.MARGIN};

    font-size: 0.75rem;
    color: ${COLOR.PARAGRAPH_LIGHT};

    &:hover {
      color: ${COLOR.PARAGRAPH};
    }
  }
`;

export const ProfileImage = styled.img`
  margin-left: -0.3rem;
  margin-bottom: 0.75rem;
  width: 2.75rem;
  height: 2.75rem;

  /* 임시로 동그랗게 만드는 코드 */
  background-color: #bbb;
  border-radius: 100%;
  padding: 0.25rem;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    margin-bottom: 0rem;
    margin-right: 0.75rem;
  }
`;

export const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    justify-content: center;
  }
`;

export const Nickname = styled.span`
  font-size: 0.9rem;
  color: ${COLOR.PARAGRAPH};
  letter-spacing: 0.03rem;
`;

export const MemberId = styled.span`
  margin-top: 0.125rem;

  color: ${COLOR.PRIMARY_LIGHT};
  font-size: 0.75rem;
`;

export const FullAddress = styled.span`
  margin: 0.375rem 0;

  color: ${COLOR.PARAGRAPH_LIGHT};
  font-size: 0.625rem;
`;
