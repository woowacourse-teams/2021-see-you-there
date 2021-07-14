import { useState } from 'react';

export const useParticipants = (initialState = []) => {
  const [list, setList] = useState(initialState);

  const add = (participant) => {
    setList((list) => [...list, participant]);
  };

  const remove = (id) => {
    setList((list) => list.filter((v) => v.id !== id));
  };

  return { participant: { list, add, remove } };
};
