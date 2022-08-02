import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, string } from 'prop-types';

import Button from 'theme-claire/src/atoms/Button';
import FormGroup from 'theme-claire/src/atoms/FormGroup';
import Input from 'theme-claire/src/atoms/Input';
import ErrorBlock from 'theme-claire/src/atoms/ErrorBlock';
import FormActions from 'theme-claire/src/atoms/FormActions';

import { update as updateIntegration } from '../actions';

class IntegrationUpdateForm extends Component {
  static propTypes = {
    name: string,
    shortDescription: string.isRequired,
    updateIntegration: func.isRequired,
    uuid: string.isRequired,
  }

  state = {
    error: null,
    success: false,
    waiting: false,
  }

  handleSubmit = (e) => {
    const { uuid, updateIntegration } = this.props;
    const { waiting } = this.state;

    e.preventDefault();

    if (waiting) {
      return;
    }

    if (this.form.name.value.trim() === '') {
      this.setState({
        error: 'Your name cannot be empty',
      });
      return;
    }

    const payload = {
      name: this.form.name.value,
      shortDescription: this.form.shortDescription.value,
      redirectUri: this.form.redirectUri.value,
    };

    this.clarityRequest = updateIntegration(uuid, payload);
    this.clarityRequest.response.then(({ res, body }) => {
      this.setState({
        success: true,
        waiting: false,
      });
    }).catch((err) => {
      this.setState({
        waiting: false,
        error: err.reason || err.message,
      });
    });
  }

  componentWillUnmount() {
    if (this.clarityRequest) {
      this.clarityRequest.cancel();
    }
  }

  render() {
    const { name, shortDescription, redirectUri } = this.props;
    const { error, success, waiting } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        ref={r => (this.form = r)}
      >
        <h2>Integration Settings</h2>
        <FormGroup>
          <Input
            defaultValue={name}
            label="Name"
            type="text"
            name="name"
            fullWidth
          />
        </FormGroup>

        <FormGroup>
          <Input
            defaultValue={shortDescription}
            label="Short Description"
            type="text"
            name="shortDescription"
            fullWidth
          />
        </FormGroup>

        <FormGroup>
          <Input
            defaultValue={redirectUri}
            label="Redirect URI"
            type="text"
            name="redirectUri"
            fullWidth
          />
        </FormGroup>

        <ErrorBlock>{error}</ErrorBlock>

        <FormActions>
          {
            success
              ? <Button disabled success>Success!</Button>
              : <Button primary loading={waiting} type="submit">Update</Button>
          }
        </FormActions>
      </form>

    );
  }
}

export default connect(
  null,
  {
    updateIntegration,
  }
)(IntegrationUpdateForm);
