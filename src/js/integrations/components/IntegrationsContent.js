import React from 'react';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import loader from 'clarity/dist/loader';
import { emptyEnhancer, loadingEnhancer } from 'clarity/dist/enhancers';
import Loading from 'theme-claire/src/atoms/Loading';

import { getAll } from '../actions';
import IntegrationsList from './IntegrationsList';
import IntegrationItem from './IntegrationItem';
import NoIntegrations from './NoIntegrations';

const IntegrationsContent = ({ items }) => (
  <IntegrationsList integrations={items}>
    {(item) => (<IntegrationItem {...item} key={item.uuid} />)}
  </IntegrationsList>
);

const enhanceLoading = loadingEnhancer(Loading);
const enhanceEmpty = emptyEnhancer(NoIntegrations);

export default bind(
  loader(getAll)(),
  connect(
    state => ({
      state: state.integrations.state,
      items: Object.values(state.integrations.items)
        .filter(v => !v.deleted),
      // TOOD we should sort by createdAt as well
    }),
  )
)(enhanceLoading(enhanceEmpty(IntegrationsContent)));
