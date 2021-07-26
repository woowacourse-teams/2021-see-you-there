import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import { httpRequest, storage } from '../utils';
import { API_URL, STORAGE_KEY } from '../constants';
import { useQuery } from 'react-query';

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
    return 'INVALID_TOKEN_ERROR';
  }
  return await response.json();
};

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
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

  const { data: userInfo, error } = useQuery(['토큰유효성검사', INITIAL_TOKEN], fetchUserInfo, {
    enabled: !!INITIAL_TOKEN,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    if (userInfo === 'INVALID_TOKEN_ERROR') {
      logout();
    }
    setUser({ ...userInfo, token: INITIAL_TOKEN });
  }, [userInfo]);

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
