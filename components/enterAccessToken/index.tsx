import React, { useState } from 'react';
import { inject } from 'mobx-react';
import Store from '../../store';

interface Props {
  store?: Store;
}

const EnterAccessToken = ({ store }: Props) => {
  if (!store) return null;
  const [token, setToken] = useState('');
  return (
    <div>
      <label htmlFor="access-toke ">Enter the Access Token</label>
      <input id="access-toke " value={token} onChange={e => setToken(e.target.value)} placeholder="abcd" />
      <button onClick={() => store.setAccessToken(token)}>Set</button>
    </div>
  );
};

export default inject('store')(EnterAccessToken);
