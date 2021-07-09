import styled, { css } from 'styled-components';
import { COLOR, LAYOUT, Z_INDEX } from '../../../constants';

const styleNavRight = css`
  position: fixed;
  top: 0;
  right: 0;
  width: ${LAYOUT.NAV_RIGHT_WIDTH};
  box-shadow: -4px 0px 8px rgba(0, 0, 0, 0.25);
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
  ${(props) => (props.hasMapView ? styleNavFull : styleNavRight)};

  height: ${LAYOUT.NAV_HEIGHT};
  background-color: ${COLOR.PRIMARY};

  z-index: ${Z_INDEX.NAVBAR};

  @media (max-width: ${LAYOUT.TABLET_WIDTH}) {
    width: 100%;

    box-shadow: 0 0.375rem 0.5rem rgba(0, 0, 0, 0.15);
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const TitleText = styled.span`
  font-family: 'GongGothicMedium';
  font-size: 1.25rem;
  color: ${COLOR.ON_PRIMARY};
  letter-spacing: 0.2rem;
`;

export const RightButton = styled.button`
  position: absolute;
  top: calc((${LAYOUT.NAV_HEIGHT} - ${LAYOUT.NAV_ICON_SIZE}) / 2);
  right: ${LAYOUT.MARGIN};
`;

export const LeftButton = styled.button`
  position: absolute;
  top: calc((${LAYOUT.NAV_HEIGHT} - ${LAYOUT.NAV_ICON_SIZE}) / 2);
  left: ${LAYOUT.MARGIN};
`;

export const MenuList = styled.ul`
  ${({ isVisible }) => (isVisible ? fadeIn : fadeOut)}

  position: fixed;
  top: calc(${LAYOUT.NAV_HEIGHT} + ${LAYOUT.MARGIN} / 2);
  right: calc(${LAYOUT.MARGIN} / 2);
  padding: 1rem 0;

  line-height: 1.6;
  font-size: 16px;
  letter-spacing: -0.009em;
  border-radius: 0.25rem;
  background-color: #fff;
  box-shadow: 0 0.25rem 0.5rem rgb(20 20 84 / 4%), 0 0.5rem 1.125rem rgb(20 20 84 / 8%),
    0 1rem 2rem -0.125rem rgb(20 20 84 / 8%), 0 0 0 0.0625rem rgb(20 20 84 / 12%);
  color: ${COLOR.PARAGRAPH};

  & li {
    padding: 0.25rem 1rem;
    min-width: 9rem;
  }

  z-index: ${Z_INDEX.HAMBURGER_MENU};
`;
