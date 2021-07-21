import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

import { PARTICIPANT } from '../constants';

const INITIAL_STATE = [];

export const ParticipantContext = createContext();

export const ParticipantContextProvider = ({ children }) => {
  const [participants, setParticipants] = useState(INITIAL_STATE);

  const addParticipant = (participant) => {
    setParticipants((participants) => [...participants, participant]);
  };

  const removeParticipant = (id) => {
    setParticipants((participants) => participants.filter((v) => v.id !== id));
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
