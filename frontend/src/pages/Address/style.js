import styled, { css } from 'styled-components';

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
  overflow-y: auto;

  z-index: ${Z_INDEX.CONTENT};

  & > h2 {
    line-height: 2rem;
    margin-bottom: 1rem;
  }
`;

/* 주소아이템 & 폼 공통 */
const itemStyle = css`
  margin-bottom: ${LAYOUT.MARGIN};
  padding: ${LAYOUT.PADDING};
  width: ${LAYOUT.CONTENT_WIDTH_MAX};
  height: 11rem;

  box-shadow: 5px 5px 14px rgba(0, 0, 0, 0.12);
  border-radius: 10px;

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: ${LAYOUT.CONTENT_WIDTH_RESPONSIVE};
    max-width: ${LAYOUT.CONTENT_WIDTH_MAX};
  }
`;

export const ButtonGroup = styled.div`
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

/* 주소아이템 */
export const ListItem = styled.li`
  ${itemStyle}

  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

  & > img {
    width: 1.875rem;
    height: 1.875rem;
    margin-bottom: 0.75rem;
  }

  & > ${ButtonGroup} {
    visibility: ${(props) => (props.isButtonVisible ? 'visible' : 'hidden')};
    align-self: flex-end;
  }
`;

export const Nickname = styled.span`
  margin-bottom: 0.75rem;

  color: ${COLOR.PARAGRAPH};
  letter-spacing: 0.03rem;
`;

export const AddressName = styled.span`
  color: ${COLOR.PRIMARY_LIGHT};
  font-size: 0.85rem;
`;

export const FullAddress = styled.span`
  margin: 0.375rem 0;

  color: ${COLOR.PARAGRAPH_LIGHT};
  font-size: 0.625rem;
`;

/* 추가수정 폼 */
export const AddSection = styled.div`
  & > button {
    margin-top: 1rem;
    width: calc(${LAYOUT.CONTENT_WIDTH_MAX} - 1.5rem);

    @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
      width: ${LAYOUT.CONTENT_WIDTH_RESPONSIVE};
      max-width: calc(${LAYOUT.CONTENT_WIDTH_MAX} - 1.5rem);
    }
  }
`;

export const AddForm = styled.form`
  ${itemStyle}

  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${LAYOUT.PADDING};

  & > ${ButtonGroup} {
    position: absolute;
    bottom: ${LAYOUT.MARGIN};
    right: ${LAYOUT.MARGIN};
  }
`;
