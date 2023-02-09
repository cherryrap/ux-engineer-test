import React from 'react';
import _ from 'lodash';
import b_ from 'b_';
import cn from 'classnames';

import './style.scss';

const b = b_.lock(`Icon`);

const Icon = ({
  className = ``,
  icon = ``,
  onClick = _.noop,
  size = `normal`,
}) => (
  <span className={cn(b({ icon, size }), className)} onClick={onClick} />
);

export default Icon;
