import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import { setLocalStorage, removeLocalStorage } from '../utils';

const INITIAL_STATE = {
  id: null,
  nickname: null,
  profileImage: null,
  token: null,
};

const TOKEN = 'token';

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(INITIAL_STATE);
  const { id, nickname, profileImage, token } = user;
  const isLogin = !!token;

  const login = (userInfo) => {
    setLocalStorage(TOKEN, userInfo.token);
    setUser(userInfo);
  };

  const logout = () => {
    removeLocalStorage(TOKEN);
    setUser(INITIAL_STATE);
  };

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
