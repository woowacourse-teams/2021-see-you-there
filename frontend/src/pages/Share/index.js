import React, { useEffect, useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { ParticipantContext } from '../../contexts';
import { useShareLink } from '../../hooks';
import { ROUTE } from '../../constants';

export const Share = () => {
  const { search } = useLocation();

  if (!search) {
    return <Redirect to={ROUTE.NOT_FOUND.PATH} />;
  }

  const { getParticipants } = useShareLink();
  const { setParticipants } = useContext(ParticipantContext);

  useEffect(() => {
    const participants = getParticipants(search);
    setParticipants(participants);
  }, []);

  return <Redirect to={ROUTE.MIDPOINT.PATH} />;
};
