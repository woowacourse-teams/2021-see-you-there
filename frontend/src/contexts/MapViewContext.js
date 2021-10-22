import React, { useState, useRef, createContext, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import { ParticipantContext } from '.';
import { httpRequest } from '../utils';
import { API_URL, QUERY_KEY, STATUS, CAPITAL_AREAS, SEOUL } from '../constants';

const fetchMidpoint = async ({ queryKey }) => {
  const [_, participants, isSubwayOnly] = queryKey;
  const locations = participants.map(({ x, y }) => ({ x, y }));
  const url = isSubwayOnly ? API_URL.MIDPOINT_SUBWAY_ONLY : API_URL.MIDPOINT;
  const response = await httpRequest.post(url, { body: { locations } });
  const body = await response.json();

  if (response.status === 400) {
    console.log('midpoint GET 응답에러:', body.message);
    throw Error(STATUS.NO_MIDPOINT);
  }
  if (!response.ok) {
    throw Error(response.status);
  }
  return body;
};

const fetchCategory = async ({ queryKey }) => {
  const [category, midpoint] = queryKey;
  const response = await httpRequest.get(API_URL.CATEGORY(category, midpoint));
  const body = await response.json();

  if (response.status === 200 && body.length === 0) {
    console.log(`${category} GET 응답에러:`, body.message);
    throw Error(STATUS.NO_CATEGORY);
  }
  if (!response.ok) {
    throw Error(response.status);
  }
  return body;
};

export const MapViewContext = createContext();

export const MapViewContextProvider = ({ children }) => {
  const { participants, isLackParticipants } = useContext(ParticipantContext);
  const { pathname } = useLocation();
  const mapObj = useRef(null);
  const mapViewRef = useRef(null);
  const [isMapViewLoading, setIsMapViewLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const isSubwayOnly = participants.every((p) => p.fullAddress.slice(0, 2) === SEOUL);

  const {
    data: midpoint,
    isLoading: isMidpointLoading,
    isError: isMidpointError,
  } = useQuery([QUERY_KEY.MIDPOINT, participants, isSubwayOnly], fetchMidpoint, {
    enabled: pathname === '/midpoint' && !isLackParticipants,
  });

  const {
    data: stations,
    isLoading: isStationsLoading,
    isError: isStationError,
  } = useQuery([QUERY_KEY.STATION, midpoint], fetchCategory, {
    enabled: !!midpoint?.x && !!midpoint?.y,
  });

  const [station] = stations || [];

  if (station) {
    station.placeName = station.placeName?.split(' ')[0];
  }

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
        isMidpointError,

        station,
        stations,
        isStationsLoading,
        isStationError,

        isError: isMidpointError || isStationError,
        isDataLoading: isMidpointLoading || isStationsLoading,
        isMapViewLoading,
        setIsMapViewLoading,

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
