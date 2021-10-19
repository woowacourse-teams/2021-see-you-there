/* eslint no-undef: "off" */
import { useContext } from 'react';

import { ParticipantContext } from '../contexts';
import { getId } from '../utils';
import { LINK_SHARE_TEMPLATE_ID } from '../constants';

const keys = ['name', 'x', 'y', 'addressName', 'src', 'avatarId'];

export const useShareLink = () => {
  const { participants } = useContext(ParticipantContext);

  const getSearch = () => {
    const params = new URLSearchParams();
    const searchObj = participants.reduce(
      (acc, cur) => {
        keys.forEach((key) => acc[key].push(cur[key]));
        return acc;
      },
      { name: [], x: [], y: [], addressName: [], src: [], avatarId: [] }
    );

    Object.entries(searchObj).forEach(([key, value]) => params.set(key, value.join(',')));

    return params.toString();
  };

  const getParticipants = (search) => {
    const params = new URLSearchParams(search);
    const [names, xs, ys, addressNames, srcs, avatarIds] = keys.map((key) => params.get(key)?.split(','));
    const participants = names.map((name, i) => ({
      id: getId(),
      name,
      x: Number(xs[i]),
      y: Number(ys[i]),
      addressName: addressNames[i],
      src: srcs?.[i],
      avatarId: avatarIds?.[i],
    }));

    return participants;
  };

  const share = (placeName) => {
    Kakao.Link.sendCustom({
      templateId: LINK_SHARE_TEMPLATE_ID,
      templateArgs: {
        placeName,
        path: `share?${getSearch()}`,
      },
    });
  };

  return { getSearch, getParticipants, share };
};
