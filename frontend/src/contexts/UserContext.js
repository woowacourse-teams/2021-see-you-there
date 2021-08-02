import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

import { httpRequest, storage } from '../utils';
import { API_URL, STORAGE_KEY, PATHS, ROUTE, STATUS, QUERY_KEY } from '../constants';

const INITIAL_TOKEN = storage.local.get(STORAGE_KEY.TOKEN);

const INITIAL_STATE = {
  id: null,
  nickname: null,
  profileImage: null,
  memberId: null,
};

const fetchUserInfo = async (token) => {
  const response = await httpRequest.get(API_URL.USER, { token });

  if (response.status === 401) {
    throw new Error(STATUS.INVALID_TOKEN_ERROR);
  }
  return await response.json();
};

const fetchUserAddressList = async (token) => {
  const response = await httpRequest.get(API_URL.ADDRESS, { token });

  // TODO: 에러 처리
  if (response.status === 401) {
    throw new Error(STATUS.INVALID_TOKEN_ERROR);
  }
  return await response.json();
};

const fetchUserFriendList = async (token) => {
  const response = await httpRequest.get(API_URL.FRIEND, { token });

  // TODO: 에러 처리
  if (response.status === 401) {
    throw new Error(STATUS.INVALID_TOKEN_ERROR);
  }
  return await response.json();
};

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(INITIAL_STATE);
  const { id, memberId, nickname, profileImage } = user;

  const login = (userInfo) => {
    const { token, ...rest } = userInfo;

    storage.local.set(STORAGE_KEY.TOKEN, token);
    setUser({ ...rest });
    setToken(token);
  };

  const logout = () => {
    storage.local.remove(STORAGE_KEY.TOKEN);
    setUser(INITIAL_STATE);
    setToken(null);
  };

  const forceLogout = () => {
    storage.local.remove(STORAGE_KEY.TOKEN);
    setUser(INITIAL_STATE);
    setToken(null);

    if (PATHS.PRIVATE.includes(pathname)) {
      history.push(ROUTE.LOGIN.PATH);
    }
  };

  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    error: errorTokenValidation,
  } = useQuery(QUERY_KEY.TOKEN_VALIDATION, () => fetchUserInfo(INITIAL_TOKEN), {
    enabled: !!INITIAL_TOKEN,
  });

  const { data: userAddressList, error: errorUserAddressList } = useQuery(
    QUERY_KEY.ADDRESS,
    () => fetchUserAddressList(token),
    {
      enabled: !!token,
    }
  );

  const { data: userFriendList, error: errorUserFriendList } = useQuery(
    QUERY_KEY.FRIEND,
    () => fetchUserFriendList(token),
    {
      enabled: !!token,
      refetchInterval: pathname === ROUTE.FRIEND.PATH ? 3_000 : 300_000,
    }
  );

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    setUser({ ...userInfo });
    setToken(INITIAL_TOKEN);
  }, [userInfo]);

  const errors = [errorTokenValidation, errorUserAddressList, errorUserFriendList];

  useEffect(() => {
    const hasInvalidTokenError = errors.map((error) => error?.message).includes(STATUS.INVALID_TOKEN_ERROR);

    if (hasInvalidTokenError) {
      forceLogout();
    }
  }, errors);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,

        id,
        memberId,
        nickname,
        profileImage,
        token,
        userAddressList,
        userFriendList,

        login,
        logout,
        isLogin: !!token,

        userInfo,
        isUserInfoLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
