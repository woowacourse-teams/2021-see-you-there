import React, { useState, useContext } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';

import { Nav, Button, Title, ProfileImage, MenuList, MenuItem, Divider } from './style';
import { Icon } from '../../';
import { UserContext } from '../../../contexts';
import { COLOR, LAYOUT, ROUTE, ROUTES, PATHS } from '../../../constants';
import { logo } from '../../../assets';

export const NavBar = () => {
  const { user, isLogin, hasReceiveFriend } = useContext(UserContext);
  const history = useHistory();
  const { pathname } = useLocation();
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const isOAuthPage = PATHS.OAUTH.includes(pathname);
  const canGoBack = !PATHS.CANNOT_GO_BACK.includes(pathname);
  const hasMapView = PATHS.MAP_VIEW.includes(pathname);

  return (
    <Nav hasMapView={hasMapView}>
      <div>
        <Button isVisible={canGoBack} onClick={() => history.goBack()}>
          <Icon.ArrowLeft width={LAYOUT.NAV_ICON_SIZE} color={COLOR.ON_PRIMARY} />
        </Button>

        <NavLink to={ROUTE.HOME.PATH}>
          <Title>
            <img src={logo} alt="logo" />
            <h2>여기서만나</h2>
          </Title>
        </NavLink>

        {isLogin ? (
          <Button isVisible={!isOAuthPage} onClick={() => setIsMenuVisible((isMenuVisible) => !isMenuVisible)}>
            <ProfileImage src={user.profileImage} />
            <Icon.Dropdown width="10" color={COLOR.ON_PRIMARY} />
          </Button>
        ) : (
          <NavLink to={ROUTE.LOGIN.PATH}>
            <Button isVisible={!isOAuthPage}>
              <Icon.PersonCircle width={LAYOUT.NAV_ICON_SIZE} color={COLOR.ON_PRIMARY} />
            </Button>
          </NavLink>
        )}

        <MenuList isVisible={isMenuVisible} onClick={() => setIsMenuVisible(false)}>
          <MenuItem>
            <strong>{user.nickname}</strong> 님 안녕하세요!
          </MenuItem>
          <Divider />
          {ROUTES.PRIVATE.map((ROUTE, index) => (
            <MenuItem key={index} hasNotice={ROUTE.NAME === '내 친구관리' && hasReceiveFriend}>
              <NavLink to={ROUTE.PATH}>{ROUTE.NAME}</NavLink>
            </MenuItem>
          ))}
          <Divider />
          <MenuItem>
            <button onClick={() => history.push(ROUTE.LOGOUT.PATH)}>
              로그아웃
              <Icon.Enter width="20" />
            </button>
          </MenuItem>
        </MenuList>
      </div>
    </Nav>
  );
};
