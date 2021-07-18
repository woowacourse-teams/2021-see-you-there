import React, { useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

import { Nav, Title, TitleText, LeftButton, RightButton, MenuList } from './style';
import { Icon } from '../../';
import { COLOR, LAYOUT, ROUTE, ROUTES_WITHOUT_MAP, PRIVATE_ROUTES } from '../../../constants';
import { Image } from '../../../assets';

const HamburgerMenu = (props) => {
  const { isVisible, setIsMenuVisible, history } = props;

  return (
    <MenuList isVisible={isVisible} onClick={() => setIsMenuVisible(false)}>
      {PRIVATE_ROUTES.map((ROUTE, index) => (
        <li key={index}>{ROUTE.NAME}</li>
      ))}
      <li>
        <button onClick={() => history.push(ROUTE.LOGOUT.PATH)}>{ROUTE.LOGOUT.NAME}</button>
      </li>
    </MenuList>
  );
};

export const NavBar = (props) => {
  const { user } = props;
  const { id, nickname, profileImage, token } = user;
  const history = useHistory();
  const { pathname } = useLocation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const isLogin = !!token;
  const isOAuth = [ROUTE.LOGIN.PATH, ROUTE.LOGOUT.PATH, ROUTE.LOGIN_KAKAO.PATH].includes(pathname);
  const canGoBack = ![ROUTE.HOME.PATH, ROUTE.LOGIN_KAKAO.PATH, ROUTE.LOGOUT.PATH].includes(pathname);
  const hasMapView = ROUTES_WITHOUT_MAP.map((ROUTE) => ROUTE.PATH).includes(pathname);

  return (
    <Nav hasMapView={hasMapView}>
      {canGoBack && (
        <LeftButton onClick={() => history.goBack()}>
          <Icon.ArrowLeft width={LAYOUT.NAV_ICON_SIZE} color={COLOR.ON_PRIMARY} />
        </LeftButton>
      )}

      <NavLink to={ROUTE.HOME.PATH}>
        <Title>
          <img src={Image.logo} width="24" alt="logo" />
          <TitleText>여기서만나</TitleText>
        </Title>
      </NavLink>

      {isOAuth ? null : isLogin ? (
        <RightButton onClick={() => setIsMenuVisible((isMenuVisible) => !isMenuVisible)}>
          <Icon.Hamburger width={LAYOUT.NAV_ICON_SIZE} color={COLOR.ON_PRIMARY} />
        </RightButton>
      ) : (
        <NavLink to={ROUTE.LOGIN.PATH}>
          <RightButton>
            <Icon.PersonCircle width={LAYOUT.NAV_ICON_SIZE} color={COLOR.ON_PRIMARY} />
          </RightButton>
        </NavLink>
      )}

      <MenuList isVisible={isMenuVisible} onClick={() => setIsMenuVisible(false)}>
        {PRIVATE_ROUTES.map((ROUTE, index) => (
          <li key={index}>{ROUTE.NAME}</li>
        ))}
        <li>
          <button onClick={() => history.push(ROUTE.LOGOUT.PATH)}>{ROUTE.LOGOUT.NAME}</button>
        </li>
      </MenuList>
    </Nav>
  );
};

NavBar.propTypes = {};
