import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'theme-claire/src/atoms/Button';
import FaExternalLink from 'react-icons/lib/fa/external-link';
import {
  headerLinks,
  list,
  item,
} from './HeaderLinks.scss';

export default () => (
  <div className={headerLinks}>
    <ul className={list}>
      <li className={item}>
        <Link to="/integrations"><Button primary>Your Integrations</Button></Link>
      </li>
      <li className={item}>
        <Button outline>Documentation <FaExternalLink /></Button>
      </li>
    </ul>
  </div>
);
