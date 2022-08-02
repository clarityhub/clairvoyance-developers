import React from 'react';
import { header } from './Header.scss';

export default ({ children }) => (
  <div className={header}>
    {children}
  </div>
);
