import React, { useState, useRef, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import { ParticipantContext } from '.';
import { httpRequest } from '../utils';
import { API_URL, QUERY_KEY } from '../constants';

const fetchMidpoint = async ({ queryKey }) => {
  const [_, participants] = queryKey;
  const locations = participants.map(({ x, y }) => ({ x, y }));
  const response = await httpRequest.post(API_URL.MIDPOINT, { body: { locations } });

  return await response.json();
};

const fetchCategory = async ({ queryKey }) => {
  const [category, midpoint] = queryKey;
  const response = await httpRequest.get(API_URL.CATEGORY(category, midpoint));

  return await response.json();
};

export const MapViewContext = createContext();

export const MapViewContextProvider = ({ children }) => {
  const { participants } = useContext(ParticipantContext);
  const { pathname } = useLocation();
  const mapObj = useRef(null);
  const mapViewRef = useRef(null);
  const [category, setCategory] = useState(null);

  const { data: midpoint, isLoading: isMidpointLoading } = useQuery([QUERY_KEY.MIDPOINT, participants], fetchMidpoint, {
    enabled: pathname === '/midpoint',
  });

  const { data: stations, isLoading: isStationsLoading } = useQuery([QUERY_KEY.STATION, midpoint], fetchCategory, {
    enabled: !!midpoint,
  });

  const [station] = stations?.data || [];

  const { data: categoryPlace, isLoading: isCategoryPlaceLoading } = useQuery([category, station], fetchCategory, {
    enabled: !!station && !!category,
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
