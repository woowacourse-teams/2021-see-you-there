import React, { useEffect, useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';

import { ParticipantContext } from '../../contexts';
import { useShareLink } from '../../hooks';
import { ROUTE } from '../../constants';

export const Share = () => {
  const { search } = useLocation();

  const { getParticipants } = useShareLink();
  const { setParticipants } = useContext(ParticipantContext);

  useEffect(() => {
    if (!search) {
      return;
    }

    const participants = getParticipants(search);

    setParticipants(participants);
  }, []);

  if (!search) {
    return <Redirect to={ROUTE.NOT_FOUND.PATH} />;
  }

  return <Redirect to={ROUTE.MIDPOINT.PATH} />;
};
