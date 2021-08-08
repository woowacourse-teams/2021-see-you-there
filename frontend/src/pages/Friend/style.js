import styled from 'styled-components';

import { COLOR, LAYOUT, Z_INDEX, CONTENT_AREA } from '../../constants';

export const ContentArea = styled.section`
  ${CONTENT_AREA.DEFAULT}

  & > h2 {
    padding-bottom: 0;
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
  margin-top: 1.25rem;
  width: ${LAYOUT.CONTENT_WIDTH_MAX};

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: ${LAYOUT.CONTENT_WIDTH_RESPONSIVE};
    max-width: ${LAYOUT.CONTENT_WIDTH_MAX};
  }
`;

export const FriendTabs = styled.div`
  display: flex;
  margin-top: 3rem;

  font-size: 0.95rem;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    font-size: 0.8rem;
  }
`;

export const FriendTab = styled.button`
  position: relative;
  margin: 0 1rem;
  min-width: 6rem;

  font-size: inherit;
  color: ${(props) => (props.isSelected ? COLOR.PARAGRAPH : COLOR.PARAGRAPH_LIGHT)};

  & > span {
    color: inherit;
    margin-left: 0.3rem;
    font-size: 0.7rem;
    letter-spacing: 0.05rem;
  }

  &::after {
    display: ${(props) => (props.hasCount ? 'block' : 'none')};
    content: '';
    position: absolute;
    top: -0.3rem;
    left: 0rem;
    width: 5px;
    height: 5px;
    background-color: ${COLOR.ERROR};
    border-radius: 50%;
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    min-width: 5rem;
    margin: 0 0.6rem;

    & > span {
      font-size: 0.6rem;
    }
  }
`;

export const ListSection = styled.section`
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;

  > h3 {
    font-size: 0.8rem;
  }
`;

export const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;

  margin: 1.75rem 0;
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
  width: 100%;
  height: 7.5rem;

  background-color: ${COLOR.BACKGROUND};
  box-shadow: 5px 5px 14px rgba(0, 0, 0, 0.12);
  border-radius: 10px;
`;

export const ButtonGroup = styled.div`
  position: absolute;
  bottom: ${LAYOUT.MARGIN};
  right: ${LAYOUT.MARGIN};
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;

  > button {
    margin-left: 1.25rem;
    font-size: 0.75rem;
    color: ${COLOR.PARAGRAPH_LIGHT};

    &:hover {
      color: ${COLOR.PARAGRAPH};
    }
  }

  > button:nth-child(2) {
    color: ${COLOR.PRIMARY};

    &:hover {
      color: ${COLOR.PRIMARY_DARK};
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
