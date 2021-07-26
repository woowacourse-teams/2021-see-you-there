import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import { storage } from '../utils';
import { PARTICIPANT, STORAGE_KEY } from '../constants';

const INITIAL_STATE = storage.session.get(STORAGE_KEY.PARTICIPANT) ?? [];

export const ParticipantContext = createContext();

export const ParticipantContextProvider = ({ children }) => {
  const [participants, setParticipants] = useState(INITIAL_STATE);

  const addParticipant = (participant) => {
    const newParticipants = [...participants, participant];

    storage.session.set(STORAGE_KEY.PARTICIPANT, newParticipants);
    setParticipants(newParticipants);
  };

  const removeParticipant = (id) => {
    const newParticipants = participants.filter((v) => v.id !== id);

    storage.session.set(STORAGE_KEY.PARTICIPANT, newParticipants);
    setParticipants(newParticipants);
  };

  const isFullParticipants = participants.length === PARTICIPANT.MAX_LENGTH;
  const isLackParticipants = participants.length < PARTICIPANT.MIN_LENGTH;

  return (
    <ParticipantContext.Provider
      value={{
        participants,
        addParticipant,
        removeParticipant,
        isFullParticipants,
        isLackParticipants,
      }}
    >
      {children}
    </ParticipantContext.Provider>
  );
};

ParticipantContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
