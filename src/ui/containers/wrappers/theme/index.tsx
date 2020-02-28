import React, { useContext, ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import { StoreContext as UIStoreContext } from 'stores/ui';
import { Helmet } from 'react-helmet';

interface Props {
  children: ReactNode;
}

interface InnerProps {
  theme: string;
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

export const Inner = ({ theme, children }: InnerProps) => {
  const style = (
    <style type="text/css">{`
    :root {
      ${Object.keys(themes[theme])
        .map((key: string) => `--${key}: ${themes[theme][key]};`)
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
};

const PageWrapper = observer(({ children }: Props) => {
  const UIStore = useContext(UIStoreContext);
  return <Inner theme={UIStore.theme}>{children}</Inner>;
});

export default PageWrapper;
