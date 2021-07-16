import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';

import { useMapView } from '../../hooks';
import { MapViewArea, MapView, ContentArea } from './style';
import { API_URL } from '../../constants';
import { httpRequest } from '../../utils';

export const MidpointPage = (props) => {
  const { participant } = props;
  const { mapViewRef, showMapView, setMarker, setMarkers, setBounds } = useMapView();

  const fetchMidpoint = async ({ queryKey }) => {
    const [_, participant] = queryKey;
    const locations = participant.list.map(({ x, y }) => ({ x, y }));
    const res = await httpRequest.post(API_URL.MIDPOINT, { body: { locations } });

    return await res.json();
  };

  const fetchStations = async ({ queryKey }) => {
    const [category, midpoint] = queryKey;
    const res = await httpRequest.get(API_URL.CATEGORY(category, midpoint));

    return await res.json();
  };

  const { data: midpoint } = useQuery(['중간지점', participant], fetchMidpoint, { staleTime: Infinity });
  const { data: stations } = useQuery(['지하철역', midpoint], fetchStations, {
    enabled: !!midpoint,
    staleTime: Infinity,
  });
  const closestStation = stations?.data?.[0];

  useEffect(() => {
    if (closestStation) {
      const { x, y, placeName } = closestStation;

      showMapView(closestStation);
      setMarker({ x, y, name: placeName });
      setMarkers(participant.list);
      setBounds([closestStation, ...participant.list]);
    }
  }, [stations]);

  return (
    <>
      <main>
        <MapViewArea>
          <MapView ref={mapViewRef} />
        </MapViewArea>
        <ContentArea></ContentArea>
      </main>
    </>
  );
};

MidpointPage.propTypes = {
  participant: PropTypes.shape({
    list: PropTypes.array,
    add: PropTypes.func,
    remove: PropTypes.func,
  }),
};
