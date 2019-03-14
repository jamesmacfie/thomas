import React from 'react';
import { inject } from 'mobx-react';
import Store from '../../store';

interface Props {
  store: Store;
}

@inject('store')
export default class Temperature extends React.Component<Props, {}> {
  render() {
    console.log(this.props);
    return <p>Temp</p>;
  }
}
