import React, { Component } from 'react';
import { connect } from 'react-redux';
import { branch, renderComponent } from 'recompose';
import { bind } from 'react-hocs';

import loader from 'clarity/dist/loader';
import Loading from 'theme-claire/src/atoms/Loading';
import Input from 'theme-claire/src/atoms/Input';
import FormGroup from 'theme-claire/src/atoms/FormGroup';
import Copy from 'theme-claire/src/atoms/Copy';

import { getCredentials } from '../actions';

class IntegrationCredentials extends Component {
  render() {
    const { item, verificationToken } = this.props;

    return (
      <div>
        <h2>Integration Credentials</h2>
        <FormGroup>
          <Input label="Client Id" name="clientId" defaultValue={item.clientId} fullWidth disabled />
          <Copy text={item.clientId} />
        </FormGroup>

        <FormGroup>
          <Input label="Client Secret" name="clientSecret" defaultValue={item.clientSecret} fullWidth disabled />
          <Copy text={item.clientSecret} />
        </FormGroup>

        <FormGroup>
          <Input label="Your Access Token" name="accessToken" defaultValue={item.accessToken} fullWidth disabled />
          <Copy text={item.accessToken} />
          <p>
            Your access token is auto-generated for you. It automatically gives your Integration
            access to your own account.
          </p>
        </FormGroup>

        <FormGroup>
          <Input label="Verification Token" name="verificationToken" defaultValue={verificationToken} fullWidth disabled />
          {<Copy text={verificationToken} />}
          <p>This verification token is used to verify your callback url.</p>
        </FormGroup>
      </div>
    );
  }
}

const enhanceLoading = branch(
  props => (props.item === null || typeof props.item === 'undefined'),
  renderComponent(Loading)
);

export default bind(
  loader(getCredentials, (props) => ([props.uuid]))(),
  connect(
    (state, props) => ({
      state: state.credentials.state,
      item: state.credentials.items[props.uuid],
    })
  )
)(enhanceLoading(IntegrationCredentials));
