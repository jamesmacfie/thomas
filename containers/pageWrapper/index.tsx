import React, { ReactNode } from 'react';
import Head from 'next/head';
import DeviceWrapper from 'containers/deviceWrapper';

import ApplicationWrapper from 'containers/applicationWrapper';
import Page from 'components/page';

interface Props {
  title: string;
  children: ReactNode;
}

const PageWrapper = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>Boiler{title.length ? ` - ${title}` : ''}</title>
      </Head>
      <ApplicationWrapper>
        <DeviceWrapper>
          <Page>{children}</Page>
        </DeviceWrapper>
      </ApplicationWrapper>
    </>
  );
};

export default PageWrapper;
