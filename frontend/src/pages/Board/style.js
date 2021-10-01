import styled, { css } from 'styled-components';

import { COLOR, CONTENT_AREA, LAYOUT, ARTICLE } from '../../constants';

const styleWidth = {
  base: css`
    width: ${LAYOUT.CONTENT_WIDTH_MAX};

    @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
      width: ${LAYOUT.CONTENT_WIDTH_RESPONSIVE};
      max-width: ${LAYOUT.CONTENT_WIDTH_MAX};
    }
  `,
  board: css`
    width: ${LAYOUT.CONTENT_BOARD_WIDTH_MAX};

    @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
      width: ${LAYOUT.CONTENT_WIDTH_RESPONSIVE};
      max-width: ${LAYOUT.CONTENT_WIDTH_MAX};
    }
  `,
};

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
  ${styleWidth.board};

  display: flex;
  justify-content: flex-end;
  margin-top: 1.25rem;
`;

export const ListSection = styled.section`
  ${styleWidth.board};

  display: flex;
  flex-direction: column;
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
    background-color: ${(props) => (props.type === ARTICLE.TYPE.SUGGESTION ? COLOR.PRIMARY : COLOR.ACCENT)};
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
  & > a {
    display: flex;
    align-items: center;
    padding: 2.5rem 2rem;
    gap: 1.75rem;
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    & > a {
      flex-direction: column;
      align-items: flex-start;
      padding: 1.5rem 0.5rem;
      gap: 0.5rem;
    }
  }
`;

/* 제목 그룹 */
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

/* 태그 그룹 */
export const TagGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  order: 3;
  gap: 0.25rem;
  width: fit-content;
  height: 3rem;

  & span {
    padding: 0.1rem 0.5rem;

    text-align: center;
    font-size: 0.75rem;
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    flex-direction: row-reverse;
    order: 1;
    height: auto;
  }
`;

export const TypeTag = styled.span`
  color: ${(props) => (props.type === ARTICLE.TYPE.SUGGESTION ? COLOR.PRIMARY : COLOR.ACCENT)};
  border: 1.5px solid ${(props) => (props.type === ARTICLE.TYPE.SUGGESTION ? COLOR.PRIMARY : COLOR.ACCENT)};
`;

export const StatusTag = styled.span`
  display: ${(props) => (props.status ? 'block' : 'none')};
  color: ${COLOR.PARAGRAPH_LIGHT};
  border: 1.5px solid ${COLOR.PARAGRAPH_LIGHT};
`;

/* 상세정보 그룹 */
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

/* ArticleView.js */
export const ArticleSection = styled.section`
  ${styleWidth.board};

  display: flex;
  flex-direction: column;
`;

export const ArticleHeader = styled.section`
  position: relative;
  margin: 2rem 0 0.5rem;

  & h3 {
    margin: 1rem 0;

    text-align: left;
    white-space: normal;
  }
`;

export const ArticleBody = styled.section`
  position: relative;
  margin: 1.5rem 0;
  height: auto;

  font-size: 0.9rem;

  & > p {
    visibility: ${(props) => (props.isEditing ? 'hidden' : 'visible')};
    min-height: 12rem;

    line-height: 3;
    white-space: normal;
  }

  & > form {
    display: ${(props) => (props.isEditing ? 'block' : 'none')};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    & > textarea {
      line-height: 2.9;
      white-space: normal;
    }
  }
`;

export const CommentSection = styled.section`
  ${styleWidth.board};

  margin-bottom: 2rem;
`;

export const CommentHeader = styled.section`
  position: relative;

  & h4 {
    margin: 2.5rem 0 1.5rem;
  }
`;

export const CommentBody = styled.section`
  position: relative;
  margin: 1.5rem 0;
  height: auto;

  font-size: 0.9rem;

  & > p {
    visibility: ${(props) => (props.isEditing ? 'hidden' : 'visible')};
    min-height: 5rem;

    line-height: 2;
    white-space: normal;
  }

  & > form {
    display: ${(props) => (props.isEditing ? 'block' : 'none')};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    & > textarea {
      line-height: 1.9;
      white-space: normal;
    }
  }
`;

export const EditButtonGroup = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  align-self: flex-end;
  display: flex;
  gap: 0.25rem;

  & button {
    padding: 0 0.5rem;
    color: ${COLOR.PARAGRAPH_LIGHT};

    &:hover {
      color: ${COLOR.PARAGRAPH};
    }
  }

  & button:nth-child(2) {
    color: ${(props) => (props.isEditing ? COLOR.PRIMARY : COLOR.PARAGRAPH_LIGHT)};

    &:hover {
      color: ${(props) => (props.isEditing ? COLOR.PRIMARY_DARK : COLOR.PARAGRAPH)};
    }
  }
`;

export const Divider = styled.hr`
  border-top: 1px solid #eee;
  margin: 0.5rem 0;
`;

/* ArticleNew.js */
export const ArticleNewForm = styled.form`
  ${styleWidth.board};

  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 2.5rem;
  font-size: 0.9rem;

  /* 주의사항 */
  & > p {
    margin: 0 0.25rem;
    white-space: normal;
  }

  & > button {
    align-self: flex-end;
  }
`;

export const ArticleTypeSelector = styled.div`
  display: flex;
  align-self: center;
  justify-content: center;
  width: 20rem;
  gap: 1rem;
  padding: 0.75rem 0;

  background-color: ${COLOR.PRIMARY_BACKGROUND};
  border-radius: 8px;

  & > label {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
  }
`;

export const ArticleFormLabel = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  /* 글자수 */
  > span {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.8rem;
    color: ${COLOR.PARAGRAPH_LIGHT};
  }

  /* globalStyle의 input 스타일과 같음 */
  > input {
    padding: 1rem;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    border: 1px solid ${COLOR.BORDER_LIGHT};
    resize: none;
    white-space: normal;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  > textarea {
    height: 12rem;
  }
`;
