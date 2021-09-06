import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Icon, Picture } from '../../components';
import { ParticipantChipContainer, ParticipantChipList, ParticipantChip, Avatar, Name } from './style';

export const ParticipantChips = (props) => {
  const { items, participantId, setParticipant } = props;
  const [chipIndex, setChipIndex] = useState(0);
  const isLeftButtonDisabled = chipIndex === 0;
  const isRightButtonDisabled = chipIndex + 4 >= items.length;

  return (
    <ParticipantChipContainer>
      <button disabled={isLeftButtonDisabled} onClick={() => setChipIndex((index) => --index)}>
        <Icon.TriangleLeft width="16" />
      </button>
      <ParticipantChipList chipLength={items.length} shiftCount={chipIndex}>
        {items.map((item) => {
          const { id, name, avatar } = item;

          return (
            <li key={id}>
              <ParticipantChip onClick={() => setParticipant(item)}>
                <Avatar isSelected={id === participantId}>
                  <Picture image={avatar} alt={name} />
                </Avatar>
                <Name>{name}</Name>
              </ParticipantChip>
            </li>
          );
        })}
      </ParticipantChipList>
      <button disabled={isRightButtonDisabled} onClick={() => setChipIndex((index) => ++index)}>
        <Icon.TriangleRight width="16" />
      </button>
    </ParticipantChipContainer>
  );
};

ParticipantChips.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      avatar: PropTypes.string,
    })
  ).isRequired,
  participantId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  setParticipant: PropTypes.func,
};
