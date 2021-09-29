import styled from 'styled-components';

import { COLOR, CONTENT_AREA, LAYOUT, Z_INDEX } from '../../constants';

export const ContentArea = styled.section`
  ${CONTENT_AREA.DEFAULT}

  & > span:nth-child(2) {
    margin-top: -1rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: ${COLOR.PARAGRAPH_LIGHT};
  }
`;

export const ButtonSection = styled.section`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.25rem;
  width: ${LAYOUT.CONTENT_BOARD_WIDTH_MAX};

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: ${LAYOUT.CONTENT_WIDTH_RESPONSIVE};
    max-width: ${LAYOUT.CONTENT_WIDTH_MAX};
  }
`;

export const ListSection = styled.section`
  display: flex;
  flex-direction: column;
  width: ${LAYOUT.CONTENT_BOARD_WIDTH_MAX};

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: ${LAYOUT.CONTENT_WIDTH_RESPONSIVE};
    max-width: ${LAYOUT.CONTENT_WIDTH_MAX};
  }
`;

export const Filter = styled.div`
  display: flex;
  margin-top: ${LAYOUT.MARGIN};
  padding: ${LAYOUT.PADDING_HALF} ${LAYOUT.PADDING};
  width: fit-content;

  font-size: 0.85rem;
  background-color: ${COLOR.PRIMARY_BACKGROUND};
  border-radius: 8px;

  & ul {
    display: flex;
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    justify-content: center;
    width: 100%;
  }
`;

export const FilterItem = styled.li`
  position: relative;
  margin-left: ${LAYOUT.MARGIN_HALF};
  padding-left: ${LAYOUT.PADDING};

  &::before {
    content: '';
    position: absolute;
    top: 0.2rem;
    left: 0.5rem;
    width: 0.625rem;
    height: 0.625rem;
    border-radius: 50%;
    background-color: ${(props) => (props.type === 'suggestion' ? COLOR.PRIMARY : COLOR.ACCENT)};
  }
`;

export const List = styled.ol`
  margin-top: ${LAYOUT.MARGIN};
  font-size: 0.9rem;
  width: 100%;

  & li {
    border-top: 1px solid ${COLOR.BORDER};
  }
  & li:first-child {
    border-top: 1px solid ${COLOR.BORDER_DARK};
  }
  & li:last-child {
    border-bottom: 1px solid ${COLOR.BORDER_DARK};
  }
`;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding: 2.5rem 2rem;
  gap: 1.75rem;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem 0.5rem;
    gap: 0.5rem;
  }
`;

export const TitleGroup = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  order: 1;
  width: 100%;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    order: 2;
  }
`;

export const ArticleId = styled.span`
  margin-right: 0.75rem;
`;

export const ArticleTitle = styled.div`
  flex-grow: 1;
  width: 100%;

  line-height: 1.7;
  overflow-x: hidden;
  text-overflow: ellipsis;
`;

export const TagGroup = styled.div`
  display: flex;
  flex-direction: column;
  order: 3;
  gap: 0.25rem;
  width: fit-content;

  & span {
    padding: 0.1rem 0.5rem;

    text-align: center;
    font-size: 0.75rem;
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    flex-direction: row-reverse;
    order: 1;
  }
`;

export const TypeTag = styled.span`
  color: ${(props) => (props.type === 'suggestion' ? COLOR.PRIMARY : COLOR.ACCENT)};
  border: 1.5px solid ${(props) => (props.type === 'suggestion' ? COLOR.PRIMARY : COLOR.ACCENT)};
`;

export const StatusTag = styled.span`
  display: ${(props) => (props.status ? 'block' : 'none')};
  color: ${COLOR.PARAGRAPH_LIGHT};
  border: 1.5px solid ${COLOR.PARAGRAPH_LIGHT};
`;

export const DetailGroup = styled.div`
  display: flex;
  order: 2;
  gap: 1rem;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    align-self: flex-end;
    order: 3;
    gap: 0.75rem;
  }
`;

export const ArticleWriter = styled.span`
  align-self: flex-end;

  font-size: 0.8rem;
  color: ${COLOR.PARAGRAPH_LIGHT};
  letter-spacing: 0rem;
`;

export const ArticleDate = styled.span`
  align-self: flex-end;
  margin-left: 2px;

  font-size: 0.8rem;
  color: ${COLOR.PARAGRAPH_LIGHT};
`;
