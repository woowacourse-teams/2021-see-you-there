import React, { useState, createContext } from 'react';

import { PARTICIPANT } from '../constants';

const INITIAL_STATE = [];

export const ParticipantContext = createContext();

export const ParticipantContextProvider = ({ children }) => {
  const [list, setList] = useState(INITIAL_STATE);

  const add = (participant) => {
    setList((list) => [...list, participant]);
  };

  const remove = (id) => {
    setList((list) => list.filter((v) => v.id !== id));
  };

  const isFull = list.length === PARTICIPANT.MAX_LENGTH;
  const isLack = list.length < PARTICIPANT.MIN_LENGTH;

  return (
    <ParticipantContext.Provider
      value={{
        participant: { list, add, remove, isFull, isLack },
      }}
    >
      {children}
    </ParticipantContext.Provider>
  );
};
