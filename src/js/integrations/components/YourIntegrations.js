import React from 'react';

import { View, ViewTitle, ViewContent } from 'js/app/components/View';
import IntegrationsToolbar from './IntegrationsToolbar';
import IntegrationsContent from './IntegrationsContent';

export default () => (
  <View>
    <ViewTitle>
      Your Integrations
    </ViewTitle>

    <ViewContent>
      <IntegrationsToolbar />
      <IntegrationsContent />
    </ViewContent>
  </View>
);
