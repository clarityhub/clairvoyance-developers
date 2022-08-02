import React from 'react';
import { connect } from 'react-redux';
import { bind } from 'react-hocs';
import { branch, renderComponent } from 'recompose';
import loader from 'clarity/dist/loader';
import { FETCHING, INITIAL } from 'clarity/dist/constants/state';
import { View, ViewTitle, ViewContent } from 'js/app/components/View';
import Loading from 'theme-claire/src/atoms/Loading';

import IntegrationCredentials from './IntegrationCredentials';
import IntegrationCallbacks from './IntegrationCallbacks';
import IntegrationSteps from './IntegrationSteps';
import IntegrationUpdateForm from './IntegrationUpdateForm';
import DeleteIntegration from './DeleteIntegration';

import { get } from '../actions';

const isLoading = (props) => (
  (props.state === FETCHING || props.state === INITIAL) && (props.item === null || typeof props.item === 'undefined')
);

const isNotFound = (props) => (
  props.state !== FETCHING && props.state !== INITIAL && (props.item === null || typeof props.item === 'undefined')
);

const NotFoundTitle = () => 'Not Found';
const LoadingTitle = () => 'Loading…';
const RealTitle = ({ item }) => item.name;

const enhanceLoadingTitle = branch(
  isLoading,
  renderComponent(LoadingTitle)
);

const enhanceNotFoundTitle = branch(
  isNotFound,
  renderComponent(NotFoundTitle)
);

const NotFoundContent = () => (
  <ViewContent>
    The requested integration could not be found
  </ViewContent>
);

const RealContent = ({ item }) => (
  <div key={item.uuid}>
    <ViewContent>
      <IntegrationSteps {...item} />
    </ViewContent>

    <ViewContent>
      <IntegrationCredentials {...item} />
    </ViewContent>

    <ViewContent>
      <IntegrationCallbacks {...item} />
    </ViewContent>

    <ViewContent>
      <IntegrationUpdateForm {...item} />
    </ViewContent>

    <ViewContent>
      <DeleteIntegration {...item} />
    </ViewContent>
  </div>
);

const LoadingContent = () => (
  <ViewContent>
    <Loading />
  </ViewContent>
);

const enhanceLoadingContent = branch(
  isLoading,
  renderComponent(LoadingContent)
);

const enhanceNotFoundContent = branch(
  isNotFound,
  renderComponent(NotFoundContent)
);

const enhancedTitle = enhanceNotFoundTitle(enhanceLoadingTitle(RealTitle));
const enhancedContent = enhanceNotFoundContent(enhanceLoadingContent(RealContent));

const YourIntegration = (props) => (
  <View>
    <ViewTitle>
      {enhancedTitle(props)}
    </ViewTitle>

    {enhancedContent(props)}
  </View>
);

export default bind(
  loader(get, props => ([props.match.params.uuid]))(),
  connect(
    (state, props) => ({
      state: state.integrations.state,
      item: state.integrations.items[props.match.params.uuid],
    })
  )
)(YourIntegration);
