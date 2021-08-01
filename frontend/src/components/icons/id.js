import React from 'react';
import PropTypes from 'prop-types';

import { COLOR } from '../../constants';

export const ID = (props) => {
  const { width, color } = props;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={width} viewBox="0 0 24 24" fill="none">
      <path d="M7 7H9.29572V17H7V7Z" fill={color} />
      <path
        d="M12.5108 16.9796C12.6616 16.9931 12.8143 17 12.9686 17C15.7479 17 18.0009 17 18.0009 12C18.0009 7 15.7479 7 12.9686 7C12.8143 7 12.6616 7.0069 12.5108 7.02041V8.7007C12.6603 8.67844 12.8131 8.66692 12.9685 8.66692C14.7371 8.66692 16.1709 8.66692 16.1709 12.0002C16.1709 15.3336 14.7371 15.3336 12.9685 15.3336C12.8131 15.3336 12.6603 15.3221 12.5108 15.2998V16.9796Z"
        fill={color}
      />
      <path d="M11.1378 7H12.9686V17H11.1378V7Z" fill={color} />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4 1C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4C23 2.34315 21.6569 1 20 1H4ZM4 2C2.89543 2 2 2.89543 2 4V20C2 21.1046 2.89543 22 4 22H20C21.1046 22 22 21.1046 22 20V4C22 2.89543 21.1046 2 20 2H4Z"
        fill={color}
      />
    </svg>
  );
};

ID.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  color: PropTypes.string,
};

ID.defaultProps = {
  width: 24,
  color: COLOR.ICON,
};
