import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'theme-claire/src/atoms/Button';
import ModalForm from 'theme-claire/src/molecules/ModalForm';
import { View, ViewTitle, ViewContent } from 'js/app/components/View';
import IntegrationsCreateForm from 'js/integrations/components/IntegrationsCreateForm';

import { button } from './BuildingIntegrations.scss';

export default () => (
  <View>
    <ViewTitle>
      Building Integrations
    </ViewTitle>

    <ViewContent>
      <p>Building integrations into Clarity Hub is fast and easy!</p>

      <p>Integrations allow you and your company to use 3rd party code
        with Clarity Hub. You can read and create chats and messages,
        sync profile data with other applications, and even tap into
        our built-in suggestions.
      </p>

      <h2>Getting Started</h2>

      <p>To get started creating an integration, simply create
        a new integration, give it a name, and you'll have access
        to your account's data.
      </p>

      <ModalForm title="New Integtration" overlay={<IntegrationsCreateForm />}>
        <Button className={button} success>+ New Integration</Button>
      </ModalForm>

      <Link to="/integrations"><Button primary>Your Integrations</Button></Link>

      <h2>Going Further</h2>

      <p>When you create an integration, we set it up so that
        it is easy for you to get started. We remove all of
        the OAuth steps and permission gathering for you.
      </p>
      <p>If you would like to add your integration to our
        {' '}<b>Integrations Store</b> you need to complete a
        few more steps.
      </p>

      <ol>
        <li>First, you need to enable OAuth for your integration.
          You can read the documentation for the OAuth flow
          {' '}<a href="https://api.clarityhub.io/oauth" target="blank">
          on our documentation website</a>.
        </li>
        <li>
          Once you have OAuth set up properly, you will need to
          update your integration's code to be able to handle
          multiple OAuth tokens. You can read our guide on
          handling tokens <a href="https://api.clarityhub.io/oauth/example" target="blank">
          on our documentation website</a>.
        </li>
      </ol>
    </ViewContent>
  </View>
);
