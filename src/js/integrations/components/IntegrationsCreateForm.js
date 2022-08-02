import React, { Component } from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import { withRouter } from 'react-router-dom';

import Button from 'theme-claire/src/atoms/Button';
import FormGroup from 'theme-claire/src/atoms/FormGroup';
import Input from 'theme-claire/src/atoms/Input';
import ErrorBlock from 'theme-claire/src/atoms/ErrorBlock';
import FormActions from 'theme-claire/src/atoms/FormActions';

import { create as createIntegration } from '../actions';

class IntegrationsCreateForm extends Component {
  static propTypes = {
    close: func.isRequired,
    createIntegration: func.isRequired,
    history: shape({
      push: func.isRequired,
    }),
    onChangeDirty: func.isRequired,
  }

  state = {
    error: null,
    waiting: false,
  }

  handleInput = () => {
    const { onChangeDirty } = this.props;
    const isDirty = Array.from(this.form.getElementsByTagName('input'))
      .map(input => input.value !== '')
      .reduce((a, b) => a || b);

    onChangeDirty(isDirty);
  }

  handleSubmit = (e) => {
    const { close, createIntegration, history, onChangeDirty } = this.props;
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
    };

    this.clarityRequest = createIntegration(payload);
    this.clarityRequest.response.then(({ res, body }) => {
      onChangeDirty(false);

      const { uuid } = body;

      history.push(`/integrations/${uuid}`);

      close();
      this.setState({
        waiting: false,
      });
    }).catch((err) => {
      this.setState({
        waiting: false,
        error: err.reason,
      });
    });
  }

  componentWillUnmount() {
    if (this.clarityRequest) {
      this.clarityRequest.cancel();
    }
  }

  render() {
    const { error, waiting } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        ref={r => (this.form = r)}
      >
        <h2>New Integration</h2>

        <FormGroup>
          <Input
            label="Name"
            type="text"
            name="name"
            onInput={this.handleInput}
            fullWidth
          />
        </FormGroup>

        <FormGroup>
          <Input
            label="Short Description"
            type="text"
            name="shortDescription"
            onInput={this.handleInput}
            fullWidth
          />
        </FormGroup>

        <ErrorBlock>{error}</ErrorBlock>

        <FormActions>
          <Button primary loading={waiting} type="submit">Create</Button>
        </FormActions>
      </form>
    );
  }
}

export default connect(
  null,
  {
    createIntegration,
  }
)(withRouter(IntegrationsCreateForm));
