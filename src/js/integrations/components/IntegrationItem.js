import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { string } from 'prop-types';
import { Item, ItemColumn } from 'theme-claire/src/atoms/Grid';

export default class IntegrationItem extends Component {
  static propTypes = {
    name: string.isRequired,
    status: string.isRequired,
    uuid: string.isRequired,
  }

  render() {
    const { status, name, uuid } = this.props;

    return (
      <Item>
        <ItemColumn flex={2}>
          <p><Link to={`/integrations/${uuid}`}>{name}</Link></p>
        </ItemColumn>
        <ItemColumn flex={1}>
          <p>{status === 'private' ? 'Not Distributed' : 'Distributed'}</p>
        </ItemColumn>
      </Item>
    );
  }
}
