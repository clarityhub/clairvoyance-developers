import React from 'react';

import Toolbar from 'theme-claire/src/atoms/Toolbar';
import Button from 'theme-claire/src/atoms/Button';
import ModalForm from 'theme-claire/src/molecules/ModalForm';

import IntegrationsCreateForm from './IntegrationsCreateForm';

export default () => (
  <Toolbar>
    <ModalForm title="New Integtration" overlay={<IntegrationsCreateForm />}>
      <Button small outline>+ New Integration</Button>
    </ModalForm>
  </Toolbar>
);
