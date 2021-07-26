import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

import { httpRequest, storage } from '../utils';
import { API_URL, STORAGE_KEY, ROUTE, STATUS, PUBLIC_PATHS } from '../constants';

const INITIAL_TOKEN = storage.local.get(STORAGE_KEY.TOKEN);

const INITIAL_STATE = {
  id: null,
  nickname: null,
  profileImage: null,
  token: null,
};

const fetchUserInfo = async ({ queryKey }) => {
  const [_, accessToken] = queryKey;
  const response = await httpRequest.get(API_URL.TOKEN_VALIDATION, { accessToken });

  if (response.status === 401) {
    throw new Error(STATUS.INVALID_TOKEN_ERROR);
  }
  return await response.json();
};

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [user, setUser] = useState(INITIAL_STATE);
  const { id, nickname, profileImage, token } = user;
  const isLogin = !!token;

  const login = (userInfo) => {
    storage.local.set(STORAGE_KEY.TOKEN, userInfo.token);
    setUser(userInfo);
  };

  const logout = () => {
    storage.local.remove(STORAGE_KEY.TOKEN);
    setUser(INITIAL_STATE);
  };

  const forceLogout = () => {
    storage.local.remove(STORAGE_KEY.TOKEN);
    setUser(INITIAL_STATE);
    history.push(ROUTE.LOGIN.PATH);
  };

  const { data: userInfo, error } = useQuery(['토큰유효성검사', INITIAL_TOKEN], fetchUserInfo, {
    enabled: !!INITIAL_TOKEN,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (PUBLIC_PATHS.map((v) => v.PATH).includes(pathname)) {
      return;
    }
    forceLogout();
  }, []);

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    setUser({ ...userInfo, token: INITIAL_TOKEN });
  }, [userInfo]);

  useEffect(() => {
    if (!error) {
      return;
    }
    if (error.message === STATUS.INVALID_TOKEN_ERROR) {
      forceLogout();
    }
  }, [error]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,

        id,
        nickname,
        profileImage,
        token,

        isLogin,

        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
