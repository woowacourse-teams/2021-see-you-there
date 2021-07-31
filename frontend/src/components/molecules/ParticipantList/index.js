import React from 'react';
import PropTypes from 'prop-types';

import { Icon } from '../../';
import { List, Item, DeleteButton, Avatar, Name, Address } from './style';
import { COLOR } from '../../../constants';

export const ParticipantList = (props) => {
  const { items, onClickToDelete } = props;

  return (
    <List>
      {items.map(({ id, name, addressName, avatar }) => (
        <Item key={id}>
          {onClickToDelete && (
            <DeleteButton onClick={() => onClickToDelete(id)}>
              <Icon.RemoveCircle width="20" color={COLOR.PRIMARY} hoverColor={COLOR.PRIMARY_DARK} />
            </DeleteButton>
          )}
          <Avatar>
            <img src={avatar} alt={name} />
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
