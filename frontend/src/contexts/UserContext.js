import React, { useState, createContext, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';

import { ParticipantContext, SnackbarContext } from './';
import { httpRequest, storage } from '../utils';
import { API_URL, STORAGE_KEY, PATHS, ROUTE, QUERY_KEY, MESSAGE } from '../constants';

const INITIAL_TOKEN = storage.local.get(STORAGE_KEY.TOKEN);

const INITIAL_STATE = {
  id: null,
  nickname: null,
  profileImage: null,
  memberId: null,
  adminInfo: null,
};

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { enqueueSnackbar } = useContext(SnackbarContext);
  const { resetParticipants } = useContext(ParticipantContext);

  const [token, setToken] = useState(INITIAL_TOKEN);
  const [user, setUser] = useState(INITIAL_STATE);
  const { id, memberId, nickname, profileImage, adminInfo: isAdmin } = user;

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
    resetParticipants();
    enqueueSnackbar(MESSAGE.AUTH.LOGOUT(nickname));
  };

  const forceLogout = () => {
    storage.local.remove(STORAGE_KEY.TOKEN);
    storage.session.remove(STORAGE_KEY.PARTICIPANT);
    setUser(INITIAL_STATE);
    setToken(null);
    resetParticipants();
    enqueueSnackbar(MESSAGE.ERROR.INVALID_TOKEN, { variant: 'error' });

    if (PATHS.PRIVATE.includes(pathname)) {
      history.push(ROUTE.LOGIN.PATH);
    }
  };

  const httpAuthRequest = async ({ method = 'get', url, body }) => {
    const response = await httpRequest[method](url, { token, body });

    if (response.status === 401) {
      forceLogout();
      return;
    }

    if (!response.ok) {
      const contentType = response.headers.get('content-type');

      if (contentType === 'application/json') {
        const error = await response.json();
        throw new Error(error.message);
      }
      const errorMessage = await response.text();
      throw new Error(errorMessage);
    }

    return response;
  };

  /* 유저정보 */

  const fetchUserInfo = async () => {
    if (!token) {
      return null;
    }
    const response = await httpAuthRequest({ method: 'get', url: API_URL.USER });

    return await response.json();
  };

  const { data: userInfo, isLoading: isUserInfoLoading } = useQuery([QUERY_KEY.TOKEN_VALIDATION, token], fetchUserInfo);

  /* 내 주소목록 */

  const fetchUserAddressList = async () => {
    const response = await httpAuthRequest({ method: 'get', url: API_URL.ADDRESS });

    return await response.json();
  };

  const { data: userAddressList } = useQuery(QUERY_KEY.ADDRESS, fetchUserAddressList, {
    enabled: !!userInfo,
  });

  /* 내 친구목록 */

  const fetchUserFriendList = async () => {
    const response = await httpAuthRequest({ method: 'get', url: API_URL.FRIEND_USER });

    return await response.json();
  };

  const { data: userFriendList } = useQuery(QUERY_KEY.FRIEND, fetchUserFriendList, {
    enabled: !!userInfo,
    refetchInterval: pathname === ROUTE.FRIEND.PATH ? 10_000 : 300_000,
  });

  /* 보낸 친구요청 */

  const fetchRequestFriendList = async () => {
    const response = await httpAuthRequest({ method: 'get', url: API_URL.FRIEND_REQUEST_LIST });

    return await response.json();
  };

  const { data: requestFriendList } = useQuery(QUERY_KEY.FRIEND_REQUEST, fetchRequestFriendList, {
    enabled: !!userInfo,
    refetchInterval: pathname === ROUTE.FRIEND.PATH ? 10_000 : 300_000,
  });

  /* 받은 친구요청 */

  const fetchReceiveFriendList = async () => {
    const response = await httpAuthRequest({ method: 'get', url: API_URL.FRIEND_RECEIVE_LIST });

    return await response.json();
  };

  const { data: receiveFriendList } = useQuery(QUERY_KEY.FRIEND_RECEIVE, fetchReceiveFriendList, {
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
        isAdmin,

        httpAuthRequest,

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
