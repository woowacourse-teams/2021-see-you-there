import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';

import { httpRequest, storage } from '../utils';
import { API_URL, STORAGE_KEY, ROUTE, STATUS, QUERY_KEY } from '../constants';

const INITIAL_TOKEN = storage.local.get(STORAGE_KEY.TOKEN);

const INITIAL_STATE = {
  id: null,
  nickname: null,
  profileImage: null,
  token: null,
};

const fetchUserAddressList = async (token) => {
  const response = await httpRequest.get(API_URL.ADDRESS, { token });

  // TODO: 에러 처리
  if (response.status === 401) {
    throw new Error(STATUS.INVALID_TOKEN_ERROR);
  }
  return await response.json();
};

const fetchUserInfo = async (token) => {
  const response = await httpRequest.get(API_URL.TOKEN_VALIDATION, { token });

  if (response.status === 401) {
    throw new Error(STATUS.INVALID_TOKEN_ERROR);
  }
  return await response.json();
};

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const history = useHistory();
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

  const { data: userInfo, errorTokenValidation } = useQuery(
    QUERY_KEY.TOKEN_VALIDATION,
    () => fetchUserInfo(INITIAL_TOKEN),
    {
      enabled: !!INITIAL_TOKEN,
    }
  );

  const { data: userAddressList, errorUserAddressList } = useQuery(
    QUERY_KEY.ADDRESS,
    () => fetchUserAddressList(token),
    {
      enabled: isLogin,
    }
  );

  // TODO: 접근제한 페이지 관리 추가하기

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    setUser({ ...userInfo, token: INITIAL_TOKEN });
  }, [userInfo]);

  useEffect(() => {
    const hasInvalidTokenError = [errorTokenValidation, errorUserAddressList]
      .map((error) => error?.message)
      .includes(STATUS.INVALID_TOKEN_ERROR);

    if (hasInvalidTokenError) {
      forceLogout();
    }
  }, [errorTokenValidation, errorUserAddressList]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,

        id,
        nickname,
        profileImage,
        token,
        userAddressList,

        login,
        logout,
        isLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
