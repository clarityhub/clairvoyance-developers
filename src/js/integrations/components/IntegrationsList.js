import React from 'react';

import { Grid, Header, HeaderColumn } from 'theme-claire/src/atoms/Grid';

export default ({ integrations, children }) => (
  <Grid>
    <Header>
      <HeaderColumn flex={2}>
        <p>Name</p>
      </HeaderColumn>
      <HeaderColumn flex={1}>
        <p>Distribution Status</p>
      </HeaderColumn>
    </Header>

    {integrations.map((item, i) => children(item, i))}
  </Grid>
);
