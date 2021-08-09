import React, { useState, createContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useSnackbar } from 'notistack';

import { httpRequest, storage } from '../utils';
import { API_URL, STORAGE_KEY, PATHS, ROUTE, STATUS, QUERY_KEY, MESSAGE } from '../constants';

const INITIAL_TOKEN = storage.local.get(STORAGE_KEY.TOKEN);

const INITIAL_STATE = {
  id: null,
  nickname: null,
  profileImage: null,
  memberId: null,
};

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { enqueueSnackbar } = useSnackbar();

  const [token, setToken] = useState(INITIAL_TOKEN);
  const [user, setUser] = useState(INITIAL_STATE);
  const { id, memberId, nickname, profileImage } = user;

  const login = (userInfo) => {
    const { nickname, token } = userInfo;

    storage.local.set(STORAGE_KEY.TOKEN, token);
    setToken(token);
    enqueueSnackbar(MESSAGE.AUTH.LOGIN(nickname));
  };

  const logout = () => {
    storage.local.remove(STORAGE_KEY.TOKEN);
    storage.session.remove(STORAGE_KEY.PARTICIPANT);
    setUser(INITIAL_STATE);
    setToken(null);
    enqueueSnackbar(MESSAGE.AUTH.LOGOUT(nickname));
  };

  const forceLogout = () => {
    storage.local.remove(STORAGE_KEY.TOKEN);
    storage.session.remove(STORAGE_KEY.PARTICIPANT);
    setUser(INITIAL_STATE);
    setToken(null);

    enqueueSnackbar(MESSAGE.ERROR.INVALID_TOKEN, { variant: 'error' });
    if (PATHS.PRIVATE.includes(pathname)) {
      history.push(ROUTE.LOGIN.PATH);
    }
  };

  /* 유저정보 */

  const fetchUserInfo = async (token) => {
    if (!token) {
      return null;
    }
    const response = await httpRequest.get(API_URL.USER, { token });

    if (response.status === 401) {
      forceLogout();
      throw new Error(STATUS.INVALID_TOKEN_ERROR);
    }
    return await response.json();
  };

  const { data: userInfo, isLoading: isUserInfoLoading } = useQuery([QUERY_KEY.TOKEN_VALIDATION, token], () =>
    fetchUserInfo(token)
  );

  /* 내 주소목록 */

  const fetchUserAddressList = async (token) => {
    const response = await httpRequest.get(API_URL.ADDRESS, { token });

    if (response.status === 401) {
      forceLogout();
      throw new Error(STATUS.INVALID_TOKEN_ERROR);
    }
    return await response.json();
  };

  const { data: userAddressList } = useQuery(QUERY_KEY.ADDRESS, () => fetchUserAddressList(token), {
    enabled: !!userInfo,
  });

  /* 내 친구목록 */

  const fetchUserFriendList = async (token) => {
    const response = await httpRequest.get(API_URL.FRIEND_USER, { token });

    if (response.status === 401) {
      forceLogout();
      throw new Error(STATUS.INVALID_TOKEN_ERROR);
    }
    return await response.json();
  };

  const { data: userFriendList } = useQuery(QUERY_KEY.FRIEND, () => fetchUserFriendList(token), {
    enabled: !!userInfo,
    refetchInterval: pathname === ROUTE.FRIEND.PATH ? 10_000 : 300_000,
  });

  /* 보낸 친구요청 */

  const fetchRequestFriendList = async (token) => {
    const response = await httpRequest.get(API_URL.FRIEND_REQUEST_LIST, { token });

    if (response.status === 401) {
      forceLogout();
      throw new Error(STATUS.INVALID_TOKEN_ERROR);
    }
    return await response.json();
  };

  const { data: requestFriendList } = useQuery(QUERY_KEY.FRIEND_REQUEST, () => fetchRequestFriendList(token), {
    enabled: !!userInfo,
    refetchInterval: pathname === ROUTE.FRIEND.PATH ? 10_000 : 300_000,
  });

  /* 받은 친구요청 */

  const fetchReceiveFriendList = async (token) => {
    const response = await httpRequest.get(API_URL.FRIEND_RECEIVE_LIST, { token });

    if (response.status === 401) {
      forceLogout();
      throw new Error(STATUS.INVALID_TOKEN_ERROR);
    }
    return await response.json();
  };

  const { data: receiveFriendList } = useQuery(QUERY_KEY.FRIEND_RECEIVE, () => fetchReceiveFriendList(token), {
    enabled: !!userInfo,
    refetchInterval: pathname === ROUTE.FRIEND.PATH ? 10_000 : 300_000,
  });

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    setUser({ ...userInfo });
  }, [userInfo]);

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
        requestFriendList,
        receiveFriendList,
        hasReceiveFriend: receiveFriendList?.length > 0,

        login,
        logout,
        isLogin: !!userInfo,

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
