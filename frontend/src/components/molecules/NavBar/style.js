import styled, { css } from 'styled-components';
import { COLOR, LAYOUT, Z_INDEX } from '../../../constants';

const styleNavRight = css`
  position: fixed;
  top: 0;
  right: 0;
  width: ${LAYOUT.NAV_WIDTH_RIGHT};
  box-shadow: -4px 0 8px rgba(0, 0, 0, 0.25);
`;

const styleNavFull = css`
  position: relative;
  width: 100%;
`;

export const fadeIn = css`
  opacity: 1;
  visibility: visible;
  transition: opacity 200ms;
`;

export const fadeOut = css`
  opacity: 0;
  visibility: hidden;
  transition: opacity 300ms, visibility 300ms;
`;

export const Nav = styled.nav`
  ${(props) => (props.hasMapView ? styleNavRight : styleNavFull)};

  margin: 0 auto;
  height: ${LAYOUT.NAV_HEIGHT};

  background-color: ${COLOR.PRIMARY};
  z-index: ${Z_INDEX.NAVBAR};

  & * {
    font-size: 0.9rem;
  }

  @media (max-width: ${LAYOUT.DEVICE_WIDTH_TABLET}) {
    width: 100%;
    box-shadow: 0 0.375rem 0.5rem rgba(0, 0, 0, 0.15);
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;

    & > * {
      margin: 0.125rem 1rem 0;
    }

    @media (max-width: ${LAYOUT.CONTENT_WIDTH_MAX}) {
      width: 100%;

      & > * {
        margin: 0.125rem 0.125rem 0;
      }
    }

    & button {
      display: flex;
      align-items: center;
    }
  }
`;

export const Button = styled.button`
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  & > h2 {
    margin-top: 0.1rem;
    margin-left: 0.25rem;
    min-width: 7rem;
    padding: 0;

    font-family: 'yg-jal-nan';
    font-size: 1.25rem;
    color: ${COLOR.ON_PRIMARY};
    letter-spacing: 0.125rem;
    line-height: 1.25rem;
  }
`;

export const ProfileImage = styled.img`
  margin-right: 0.375rem;
  width: ${LAYOUT.NAV_ICON_SIZE};
  height: ${LAYOUT.NAV_ICON_SIZE};

  border-radius: 50%;
  border-style: outset;
  border: 2px solid ${COLOR.BORDER};
`;

export const MenuList = styled.ul`
  ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)}

  position: fixed;
  top: calc(${LAYOUT.NAV_HEIGHT} + 0.5rem);
  right: 0.5rem;
  padding: 1rem 0;
  min-width: 10rem;

  border-radius: 0.25rem;
  background-color: #fff;
  box-shadow: 0 0.25rem 0.5rem rgb(20 20 84 / 4%), 0 0.5rem 1.125rem rgb(20 20 84 / 8%),
    0 1rem 2rem -0.125rem rgb(20 20 84 / 8%), 0 0 0 0.0625rem rgb(20 20 84 / 12%);

  & > li {
    padding: 0.25rem 1rem;
    min-width: 9rem;
    line-height: 1.7;
    letter-spacing: -0.009em;
    color: ${COLOR.PARAGRAPH};

    &:not(:first-child):hover * {
      color: ${COLOR.PARAGRAPH_LIGHT};

      & path {
        fill: ${COLOR.PARAGRAPH_LIGHT};
      }
    }

    & button {
      display: flex;
      align-items: center;

      & svg {
        margin-left: 0.25rem;
      }
    }
  }

  z-index: ${Z_INDEX.HAMBURGER_MENU};
`;

export const Greeting = styled.li`
  & strong {
    color: ${COLOR.PRIMARY_LIGHT};
  }
`;

export const Divider = styled.hr`
  border-top: 1px solid #eee;
  margin: 0.5rem 0;
`;
