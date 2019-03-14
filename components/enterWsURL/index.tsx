import React, { useState } from 'react';
import { inject } from 'mobx-react';
import Store from '../../store';

interface Props {
  store?: Store;
}

const EnterWSURL = ({ store }: Props) => {
  if (!store) return null;
  const [url, setUrl] = useState('');
  return (
    <div>
      <label htmlFor="wsurl">Enter the Websocket URL</label>
      <input id="wsurl" value={url} onChange={e => setUrl(e.target.value)} placeholder="wss://your.url" />
      <button onClick={() => store.setWSURL(url)}>Set</button>
    </div>
  );
};

export default inject('store')(EnterWSURL);
