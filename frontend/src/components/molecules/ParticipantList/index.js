import React from 'react';
import PropTypes from 'prop-types';

import { Icon, Picture } from '../../';
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
            <Picture image={avatar} alt={name} />
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
      avatar: PropTypes.shape({
        x1: PropTypes.string,
        x2: PropTypes.string,
        x3: PropTypes.string,
      }).isRequired,
    })
  ).isRequired,
  onClickToDelete: PropTypes.func,
};
