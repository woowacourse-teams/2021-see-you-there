import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';

import { Icon } from '../../components';
import { PathDetail, PathList, PathSummary, PathPagination, Divider } from './style';
import { httpRequest } from '../../utils';
import { COLOR, API_URL } from '../../constants';

const fetchPath = async (transport, participant, station) => {
  const response = await httpRequest.get(API_URL.PATH(transport, participant, station));

  return await response.json();
};

export const PersonalPath = (props) => {
  const { transport, participant, station } = props;
  const { data } = useQuery([participant.name, transport, station], () => fetchPath(transport, participant, station), {
    enabled: !!participant && !!station,
  });
  const paths = data?.paths;

  const [pathIndex, setPathIndex] = useState(0);
  const [currentPage, totalPage] = [pathIndex + 1, paths?.length];
  const isLeftButtonDisabled = currentPage === 1;
  const isRightButtonDisabled = currentPage === totalPage;

  const { routes, time, walkTime } = paths?.[pathIndex] ?? {};
  const [firstRoute] = routes ?? [];

  useEffect(() => {
    if (!participant || !transport) {
      return;
    }
    setPathIndex(0);
  }, [transport, participant]);

  return (
    <PathDetail>
      <PathPagination>
        <button disabled={isLeftButtonDisabled} onClick={() => setPathIndex((index) => --index)}>
          <Icon.TriangleLeft width="8" />
        </button>
        {currentPage} / {totalPage}
        <button disabled={isRightButtonDisabled} onClick={() => setPathIndex((index) => ++index)}>
          <Icon.TriangleRight width="8" />
        </button>
      </PathPagination>

      <PathSummary>
        <h3>경로 {currentPage}</h3>
        <div>
          <Icon.Clock width="18" color={COLOR.PRIMARY_LIGHT} />
          <span>약 {time}분 소요</span>
          <span>(도보 {walkTime}분)</span>
        </div>
      </PathSummary>

      <Divider />

      <PathList>
        <li>
          <strong>{firstRoute?.startName}</strong>
        </li>
        {routes?.map((route, index) => (
          <li key={index}>
            <span>{route.routeName}</span>
            <strong>{route.endName}</strong>
          </li>
        ))}
      </PathList>
    </PathDetail>
  );
};

PersonalPath.propTypes = {
  transport: PropTypes.string,
  participant: PropTypes.shape({
    name: PropTypes.string,
    addressName: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
  station: PropTypes.PropTypes.shape({
    placeName: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
  }),
};
