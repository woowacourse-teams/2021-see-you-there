import React, { useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

import { Nav, Title, TitleText, LeftButton, RightButton, MenuList } from './style';
import { ArrowLeftIcon, HamburgerIcon, PersonCircleIcon } from '../../';
import { COLOR, LAYOUT, ROUTE, ROUTES_WITHOUT_MAP, PRIVATE_ROUTES } from '../../../constants';

const HamburgerMenu = (props) => {
  const { isVisible } = props;

  return (
    <MenuList isVisible={isVisible}>
      {PRIVATE_ROUTES.map((ROUTE, index) => (
        <li key={index}>{ROUTE.NAME}</li>
      ))}
    </MenuList>
  );
};

export const NavBar = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const isLogin = false;
  const canGoBack = pathname !== ROUTE.HOME.PATH;
  const hasMapView = ROUTES_WITHOUT_MAP.map((ROUTE) => ROUTE.PATH).includes(pathname);

  return (
    <Nav hasMapView={hasMapView}>
      {canGoBack && (
        <LeftButton onClick={() => history.goBack()}>
          <ArrowLeftIcon width={LAYOUT.NAV_ICON_SIZE} color={COLOR.ON_PRIMARY} />
        </LeftButton>
      )}

      <NavLink to={ROUTE.HOME.PATH}>
        <Title>
          {/* <TitleLogo /> */}
          <TitleText>여기서만나</TitleText>
        </Title>
      </NavLink>

      {isLogin ? (
        <RightButton onClick={() => setIsMenuVisible((isMenuVisible) => !isMenuVisible)}>
          <HamburgerIcon width={LAYOUT.NAV_ICON_SIZE} color={COLOR.ON_PRIMARY} />
        </RightButton>
      ) : (
        <NavLink to={ROUTE.LOGIN.PATH}>
          <RightButton>
            <PersonCircleIcon width={LAYOUT.NAV_ICON_SIZE} color={COLOR.ON_PRIMARY} />
          </RightButton>
        </NavLink>
      )}

      <HamburgerMenu isVisible={isMenuVisible} />
    </Nav>
  );
};
