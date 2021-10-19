import PropTypes from 'prop-types';
import React from 'react';

import { Icon } from '../../components';
import { CategoryChipList, CategoryChip } from './style';
import { COLOR, QUERY_KEY } from '../../constants';

const CHIP_LIST = [
  { category: QUERY_KEY.DEFAULT, categoryIcon: Icon.Map },
  { category: QUERY_KEY.CAFE, categoryIcon: Icon.LocalCafe },
  { category: QUERY_KEY.DINING, categoryIcon: Icon.LocalDining },
  { category: QUERY_KEY.PARTY, categoryIcon: Icon.LocalParty },
];

export const CategoryChips = (props) => {
  const { isSelected, handleSelectChip } = props;

  return (
    <CategoryChipList>
      {CHIP_LIST.map(({ category, categoryIcon }) => {
        const isSelectedChip = isSelected(category);
        const ChipIcon = isSelectedChip ? Icon.CheckCircle : categoryIcon;

        return (
          <li key={category} data-testid={category}>
            <CategoryChip selected={isSelectedChip} onClick={() => handleSelectChip(category)}>
              <ChipIcon width="18" color={isSelectedChip ? COLOR.PRIMARY : COLOR.BORDER_DARK} />
              <span>{category}</span>
            </CategoryChip>
          </li>
        );
      })}
    </CategoryChipList>
  );
};

CategoryChips.propTypes = {
  handleSelectChip: PropTypes.func,
  isSelected: PropTypes.func,
};
