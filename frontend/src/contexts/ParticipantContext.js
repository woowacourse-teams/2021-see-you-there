import React, { useState, createContext } from 'react';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

import { storage } from '../utils';
import { PARTICIPANT, STORAGE_KEY, MESSAGE } from '../constants';

const INITIAL_STATE = storage.session.get(STORAGE_KEY.PARTICIPANT) ?? [];

export const ParticipantContext = createContext();

export const ParticipantContextProvider = ({ children }) => {
  const [participants, setParticipants] = useState(INITIAL_STATE);
  const [lastParticipant, setLastParticipant] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const addParticipant = (participant) => {
    const newParticipants = [...participants, participant];

    storage.session.set(STORAGE_KEY.PARTICIPANT, newParticipants);
    setParticipants(newParticipants);
    setLastParticipant(participant);
    enqueueSnackbar(MESSAGE.PARTICIPANT.SNACKBAR_CREATE);
  };

  const removeParticipant = (id) => {
    const newParticipants = participants.filter((v) => v.id !== id);

    storage.session.set(STORAGE_KEY.PARTICIPANT, newParticipants);
    setParticipants(newParticipants);
    setLastParticipant(null);
    enqueueSnackbar(MESSAGE.PARTICIPANT.SNACKBAR_DELETE);
  };

  const resetParticipants = () => setParticipants([]);
  const resetLastParticipant = () => setLastParticipant(null);

  const isFullParticipants = participants.length === PARTICIPANT.MAX_LENGTH;
  const isLackParticipants = participants.length < PARTICIPANT.MIN_LENGTH;

  return (
    <ParticipantContext.Provider
      value={{
        participants,
        setParticipants,
        addParticipant,
        removeParticipant,
        resetParticipants,

        lastParticipant,
        resetLastParticipant,

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
