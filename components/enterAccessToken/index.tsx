import React, { useState } from 'react';
import { inject } from 'mobx-react';
import Panel from '../panel';
import Button from '../button';
import Input from '../input';
import { H3 } from '../text';
import Store from '../../store';

interface Props {
  store?: Store;
}

const EnterAccessToken = ({ store }: Props) => {
  if (!store) return null;
  const [token, setToken] = useState('');
  const submitToken = () => store.setAccessToken(token);
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-128">
        <Panel>
          <H3>Enter the Access Token</H3>
          <form onSubmit={submitToken}>
            <Input
              className="w-full"
              value={token}
              onChange={e => setToken((e.target as HTMLInputElement).value)}
              placeholder="abcd1234"
            />
            <Button type="primary" className="block mt-8" onClick={submitToken}>
              Set
            </Button>
          </form>
        </Panel>
      </div>
    </div>
  );
};

export default inject('store')(EnterAccessToken);
