import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import ToolTip from '@material-ui/core/Tooltip';

const Button = ({ onClick, tipClass, btnClass, title, children, placement }) => {
  return (
    <ToolTip title={title} placement={placement} className={tipClass}>
      <IconButton onClick={onClick} className={btnClass}>
        {children}
      </IconButton>
    </ToolTip>
  );
}

export default Button;