import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, string } from 'prop-types';
import { branch, renderComponent } from 'recompose';
import { bind } from 'react-hocs';

import loader from 'clarity/dist/loader';
import { INITIAL, FETCHING } from 'clarity/dist/constants/state';
import Loading from 'theme-claire/src/atoms/Loading';
import Checkbox from 'theme-claire/src/atoms/Checkbox';
import Input from 'theme-claire/src/atoms/Input';
import FormGroup from 'theme-claire/src/atoms/FormGroup';
import Button from 'theme-claire/src/atoms/Button';
import ErrorBlock from 'theme-claire/src/atoms/ErrorBlock';
import FormActions from 'theme-claire/src/atoms/FormActions';

import { getAll } from '../actions/events';
import { updateCallbacks } from '../actions';

class IntegrationCallbacks extends Component {
  static propTypes = {
    allEvents: arrayOf(string).isRequired,
    callbackUrl: string,
    events: arrayOf(string),
  }

  state = {
    error: null,
    success: false,
    waiting: false,
  }

  componentWillUnmount() {
    if (this.clarityRequest) {
      this.clarityRequest.cancel();
    }
  }

  handleSubmit = (e) => {
    const { uuid, updateCallbacks } = this.props;
    const { waiting } = this.state;

    e.preventDefault();

    if (waiting) {
      return;
    }

    const payload = {
      callbackUrl: this.form.callbackUrl.value,
      events: Array.from(this.form.events)
        .filter(e => e.checked)
        .map(e => e.value),
    };

    this.clarityRequest = updateCallbacks(uuid, payload);
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

  render() {
    const { callbackUrl, events, allEvents } = this.props;
    const { error, success, waiting } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        ref={r => (this.form = r)}
      >
        <h2>Integration Callbacks</h2>
        <FormGroup>
          <Input name="callbackUrl" label="Callback Url" defaultValue={callbackUrl} fullWidth />
        </FormGroup>

        <FormGroup>
          {
            allEvents.map((e) => {
              return (
                <Checkbox
                  label={e}
                  name="events"
                  value={e}
                  defaultChecked={(events || []).indexOf(e) !== -1}
                />
              );
            })
          }
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

const enhanceLoading = branch(
  props => (props.state === INITIAL || props.state === FETCHING),
  renderComponent(Loading)
);

export default bind(
  loader(getAll)(),
  connect(
    (state) => ({
      state: state.events.state,
      allEvents: state.events.items,
    }),
    {
      updateCallbacks,
    }
  ))(enhanceLoading(IntegrationCallbacks));
