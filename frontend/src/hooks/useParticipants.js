import { useState } from 'react';
import { PARTICIPANT } from '../constants';

export const useParticipants = (initialState = []) => {
  const [list, setList] = useState(initialState);

  const add = (participant) => {
    setList((list) => [...list, participant]);
  };

  const remove = (id) => {
    setList((list) => list.filter((v) => v.id !== id));
  };

  const isFull = list.length === PARTICIPANT.MAX_LENGTH;
  const isLack = list.length < PARTICIPANT.MIN_LENGTH;

  return { participant: { list, add, remove, isFull, isLack } };
};
