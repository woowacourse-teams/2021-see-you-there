import React, { useState, useRef, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import { ParticipantContext } from '.';
import { httpRequest } from '../utils';
import { API_URL } from '../constants';

const STATION = '지하철역';
const MIDPOINT = '중간지점';

const fetchMidpoint = async ({ queryKey }) => {
  const [_, participants] = queryKey;
  const locations = participants.map(({ x, y }) => ({ x, y }));
  const res = await httpRequest.post(API_URL.MIDPOINT, { body: { locations } });

  return await res.json();
};

const fetchCategory = async ({ queryKey }) => {
  const [category, midpoint] = queryKey;
  const res = await httpRequest.get(API_URL.CATEGORY(category, midpoint));

  return await res.json();
};

export const MapViewContext = createContext();

export const MapViewContextProvider = ({ children }) => {
  const { participants } = useContext(ParticipantContext);
  const { pathname } = useLocation();
  const mapObj = useRef(null);
  const mapViewRef = useRef(null);
  const [category, setCategory] = useState(null);

  const { data: midpoint, isLoading: isMidpointLoading } = useQuery([MIDPOINT, participants], fetchMidpoint, {
    enabled: pathname === '/midpoint',
    staleTime: Infinity,
  });

  const { data: stations, isLoading: isStationsLoading } = useQuery([STATION, midpoint], fetchCategory, {
    enabled: !!midpoint,
    staleTime: Infinity,
  });

  const [station] = stations?.data || [];

  const { data: categoryPlace, isLoading: isCategoryPlaceLoading } = useQuery([category, station], fetchCategory, {
    enabled: !!station && !!category,
    staleTime: Infinity,
  });

  return (
    <MapViewContext.Provider
      value={{
        mapObj,
        mapViewRef,

        midpoint,
        isMidpointLoading,

        station,
        stations,
        isStationsLoading,

        category,
        setCategory,
        categoryPlace,
        isCategoryPlaceLoading,
      }}
    >
      {children}
    </MapViewContext.Provider>
  );
};

MapViewContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
