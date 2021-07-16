import React from 'react';
import PropTypes from 'prop-types';

import { useMapView } from '../../hooks';
import { MapViewArea, MapView, ContentArea } from './style';

export const MidpointPage = (props) => {
  const { participant } = props;
  const { mapViewRef } = useMapView();

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
