import React from 'react';

import RefreshToken from 'js/auth/components/RefreshToken';

import { application } from './App.scss';
import Header from './Header';
import Logo from './Logo';
import Content from './Content';
import LeftSidebar from './LeftSidebar';
import View from './View';
import HeaderLinks from './HeaderLinks';

export default ({ children, paths }) => (
  <div className={application}>
    <RefreshToken />

    <Header>
      <Logo />

      <HeaderLinks />
    </Header>
    <Content>
      <LeftSidebar />

      <View>
        {children}
      </View>
    </Content>
  </div>
);
