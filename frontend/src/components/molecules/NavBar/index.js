import React, { useState, useContext } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

import { Nav, Title, TitleText, LeftButton, RightButton, MenuList } from './style';
import { Icon } from '../../';
import { UserContext } from '../../../contexts';
import { COLOR, LAYOUT, ROUTE, ROUTES_WITHOUT_MAP, PRIVATE_ROUTES } from '../../../constants';
import { Image } from '../../../assets';

export const NavBar = () => {
  /* eslint-disable-next-line no-unused-vars */
  const { user, isLogin } = useContext(UserContext);
  const history = useHistory();
  const { pathname } = useLocation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

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
