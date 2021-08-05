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
    padding-bottom: 0;
  }

  & > img {
    position: fixed;
    bottom: 0;
    width: 70rem;
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
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
  grid-template-columns: repeat(1, 1fr);
  row-gap: 1.25rem;
  column-gap: 1.25rem;
  margin: 1.25rem 0;
  width: ${LAYOUT.CONTENT_WIDTH_MAX};

  z-index: ${Z_INDEX.ON_IMAGE};

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: ${LAYOUT.CONTENT_WIDTH_RESPONSIVE};
    max-width: ${LAYOUT.CONTENT_WIDTH_MAX};
  }
`;

export const Item = styled.li`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: ${LAYOUT.PADDING};

  background-color: ${COLOR.BACKGROUND};
  box-shadow: 5px 5px 14px rgba(0, 0, 0, 0.12);
  border-radius: 10px;

  > button {
    font-size: 0.75rem;
    color: ${COLOR.PARAGRAPH_LIGHT};

    position: absolute;
    top: 1.5rem;
    right: 1.5rem;

    &:hover {
      color: ${COLOR.PARAGRAPH};
    }
  }
`;

export const ProfileImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;

  margin-bottom: 0rem;
  margin-right: 0.75rem;

  background-color: #bbb;
  border-radius: 100%;
  padding: 0.25rem;
`;

export const FriendInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Nickname = styled.span`
  font-size: 0.9rem;
  color: ${COLOR.PARAGRAPH};
`;

export const MemberId = styled.span`
  margin-top: 0.125rem;

  color: ${COLOR.PRIMARY_LIGHT};
  font-size: 0.75rem;
`;

/* 친구 ID 검색 모달 */

export const Top = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  & > button {
    width: fit-content;
  }
`;

export const ResultSection = styled.section`
  height: 16rem;
`;

export const SearchResult = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${LAYOUT.PADDING};
  height: 100%;

  background-color: ${COLOR.BACKGROUND};

  & > ${ProfileImage} {
    margin: 0;
    width: 4.5rem;
    height: 4.5rem;
  }

  & > ${FriendInfo} {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 1rem 0 1.75rem;
  }
`;

export const NoResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  font-size: 0.875rem;
  line-height: 1.75;

  & strong {
    color: ${COLOR.PRIMARY_LIGHT};
  }
`;
