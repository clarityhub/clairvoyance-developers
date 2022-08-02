import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  sidebar,
  sidebarList,
  sidebarItem,
  sidebarItemHeader,
} from './LeftSidebar.scss';

const Item = ({ children }) => (
  <li className={sidebarItem}>{children}</li>
);

const ItemHeader = ({ children }) => (
  <li className={sidebarItemHeader}>{children}</li>
);

const LeftSidebar = ({
  handleClickDashboard,
  handleClickChats,
  handleClickApps,
  handleLogOut,
  handleClickSettings,
}) => (
  <div className={sidebar}>
    <ul className={sidebarList}>
      <ItemHeader>Getting Started</ItemHeader>
      <Item>
        <Link to="/">Building Integrations</Link>
      </Item>
    </ul>
  </div>
);

export default connect(
  () => ({}),
  (dispatch) => ({
  })
)(LeftSidebar);
