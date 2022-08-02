import React, { Component } from 'react';
import { func, shape, string } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Button from 'theme-claire/src/atoms/Button';
import FaTrash from 'react-icons/lib/fa/trash';
import Prompt from 'theme-claire/src/molecules/Prompt';
import FormActions from 'theme-claire/src/atoms/FormActions';

import { del as deleteIntegration } from '../actions';

class DeleteIntegration extends Component {
  static propTypes = {
    deleteIntegration: func.isRequired,
    history: shape({
      push: func.isRequired,
    }).isRequired,
    uuid: string.isRequired,
  }

  handleDelete = (e) => {
    const { deleteIntegration, history, uuid } = this.props;

    e && e.preventDefault();

    this.prompt.prompt({
      text: 'Are you sure want to delete this integration?',
      shouldCloseOnOverlayClick: true,
      options: {
        'Delete': {
          buttonProps: {
            danger: true,
          },
          onClick: (e) => {
            const request = deleteIntegration(uuid);

            request.response.then(() => {
              // Redirect
              history.push('/integrations');
            });

            return request;
          },
        },
        'Cancel': {},
      },
    });
  }

  render() {
    return (
      <div>
        <h2>Delete Integration</h2>

        <p>If your integration is listed in the Integration Store,
      please communicate your plans to delete your integration
      with any users that are currently using it.
        </p>

        <FormActions>
          <Button onClick={this.handleDelete} danger><FaTrash /> <span>Delete Integration</span></Button>
        </FormActions>

        <Prompt ref={r => (this.prompt = r)} />
      </div>
    );
  }
}

export default connect(
  null,
  {
    deleteIntegration,
  }
)(withRouter(DeleteIntegration));
