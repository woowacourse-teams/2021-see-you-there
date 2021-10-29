import React from 'react';
import PropTypes from 'prop-types';

import { Avatar, Icon } from '../../';
import { List, Item, DeleteButton, Name, Address } from './style';
import { COLOR, ID, CAPITAL_AREAS } from '../../../constants';

export const ParticipantList = (props) => {
  const { items, onClickToDelete } = props;

  return (
    <List data-testid={ID.PARTICIPANT_LIST}>
      {items.map(({ id, name, addressName, fullAddress, avatarId, src }) => {
        const isNoServiceArea = !CAPITAL_AREAS.includes(fullAddress.slice(0, 2));

        return (
          <Item key={id}>
            {onClickToDelete && (
              <DeleteButton onClick={() => onClickToDelete(id)}>
                <Icon.RemoveCircle width="20" color={COLOR.PRIMARY} hoverColor={COLOR.PRIMARY_DARK} />
              </DeleteButton>
            )}
            <Avatar src={src} avatarId={avatarId} alt={name} />
            <Name>{name}</Name>
            <Address accent={isNoServiceArea}>{addressName}</Address>
          </Item>
        );
      })}
    </List>
  );
};

ParticipantList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      addressName: PropTypes.string.isRequired,
      avatarId: PropTypes.string,
      src: PropTypes.string,
    })
  ).isRequired,
  onClickToDelete: PropTypes.func,
};
