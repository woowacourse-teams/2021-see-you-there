import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../../';
import { List, Item, DeleteButton, Avatar, Name, Address } from './style';
import { COLOR, ID } from '../../../constants';
import { image2x, image3x } from '../../../utils';

export const ParticipantList = (props) => {
  const { items, onClickToDelete } = props;

  return (
    <List data-testid={ID.PARTICIPANT_LIST}>
      {items.map(({ id, name, addressName, avatar }) => (
        <Item key={id}>
          {onClickToDelete && (
            <DeleteButton onClick={() => onClickToDelete(id)}>
              <Icon.RemoveCircle width="20" color={COLOR.PRIMARY} hoverColor={COLOR.PRIMARY_DARK} />
            </DeleteButton>
          )}
          <Avatar>
            <picture>
              <source type="image/png" src={avatar.x1} srcSet={`${avatar.x1} 1x, ${avatar.x2} 2x, ${avatar.x3} 3x`} />
              <img src={avatar.x1} alt={name} />
            </picture>
          </Avatar>
          <Name>{name}</Name>
          <Address>{addressName}</Address>
        </Item>
      ))}
    </List>
  );
};

ParticipantList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      addressName: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    })
  ).isRequired,
  onClickToDelete: PropTypes.func,
};
