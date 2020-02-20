import React, { useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as UIStoreContext } from 'stores/ui';
import { Helmet } from 'react-helmet';

interface Props {
  children: ReactNode;
}

const themes: { [key: string]: Theme } = {
  dark: {
    green: 'red',
    'text-primary': '#fff',
    'text-secondary': '#d1d5da'
  },
  light: {
    green: 'blue',
    'text-primary': '#000',
    'text-secondary': '#d1d5da'
  }
};

const PageWrapper = observer(({ children }: Props) => {
  const UIStore = useContext(UIStoreContext);
  const style = (
    <style type="text/css">{`
    :root {
      ${Object.keys(themes[UIStore.theme])
        .map((key: string) => `--${key}: ${themes[UIStore.theme][key]};`)
        .join(' ')}
    }
  `}</style>
  );

  return (
    <>
      <Helmet>{style}</Helmet>
      {children}
    </>
  );
});

export default PageWrapper;
