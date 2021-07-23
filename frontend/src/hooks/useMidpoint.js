import { useContext, useState } from 'react';
import { useQuery } from 'react-query';

import { ParticipantContext } from '../contexts';
import { API_URL } from '../constants';
import { httpRequest } from '../utils';

const INITIAL_STATE = null;
const MIDPOINT = '중간지점';
const STATION = '지하철역';

export const useMidpoint = () => {
  const { participants } = useContext(ParticipantContext);
  const [category, setCategory] = useState(INITIAL_STATE);

  const fetchMidpoint = async ({ queryKey }) => {
    const [_, participants] = queryKey;
    const locations = participants.map(({ x, y }) => ({ x, y }));
    const res = await httpRequest.post(API_URL.MIDPOINT, { body: { locations } });

    return await res.json();
  };
  const { data: midpoint } = useQuery([MIDPOINT, participants], fetchMidpoint, { staleTime: Infinity });

  const fetchCategory = async ({ queryKey }) => {
    const [category, midpoint] = queryKey;
    const res = await httpRequest.get(API_URL.CATEGORY(category, midpoint));

    return await res.json();
  };

  const { data: categoryData } = useQuery([category, midpoint], fetchCategory, {
    enabled: !!midpoint && !!category,
    staleTime: Infinity,
  });

  const { data: stations } = useQuery([STATION, midpoint], fetchCategory, {
    enabled: !!midpoint,
    staleTime: Infinity,
  });

  const [closestStation] = stations?.data || [];

  return {
    midpoint,
    category,
    setCategory,
    stations,
    closestStation,
    categoryData,
  };
};
