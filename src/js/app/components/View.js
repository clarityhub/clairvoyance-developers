import React from 'react';
import {
  view,
  viewInner,
  viewContent,
} from './View.scss';

export const View = ({ children }) => (
  <div className={viewInner}>{ children }</div>
);

export const ViewTitle = ({ children }) => (
  <h1>{ children }</h1>
);

export const ViewContent = ({ children }) => (
  <div className={viewContent}>{ children }</div>
);

export default ({ children }) => (
  <div className={view}>
    {children}
  </div>
);
