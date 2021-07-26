import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import { storage } from '../utils';
import { STORAGE_KEY } from '../constants';

const INITIAL_STATE = {
  id: null,
  nickname: null,
  profileImage: null,
  token: null,
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
