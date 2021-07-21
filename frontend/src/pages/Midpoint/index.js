import React, { useContext, useEffect } from 'react';

import { ParticipantList } from '../../components';
import { MapViewArea, MapView, ContentArea, ListSection, ResultSection } from './style';
import { ParticipantContext } from '../../contexts';
import { useMapView, useMidpoint } from '../../hooks';

export const MidpointPage = () => {
  const { participants } = useContext(ParticipantContext);
  const { mapViewRef, showMapView, setMarker, setMarkers, setBounds } = useMapView();
  const { stations, closestStation } = useMidpoint();

  useEffect(() => {
    if (closestStation) {
      const { x, y, placeName } = closestStation;

      showMapView(closestStation);
      setMarker({ x, y, name: placeName });
      setMarkers(participants);
      setBounds([closestStation, ...participants]);
    }
  }, [stations]);

  return (
    <>
      <main>
        <MapViewArea>
          <MapView ref={mapViewRef} />
        </MapViewArea>
        <ContentArea>
          <ResultSection>
            <h2>
              <span>{closestStation?.placeName}</span> 에서 만나요!
            </h2>
          </ResultSection>
          <ListSection>
            <h2>
              만나는 사람들 <span>{participants.length}명</span>
            </h2>
            <ParticipantList items={participants} />
          </ListSection>
        </ContentArea>
      </main>
    </>
  );
};
