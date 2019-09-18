import React, { ReactNode } from 'react';
import Head from 'next/head';
import DeviceWrapper from 'containers/wrappers/deviceWrapper';

import ApplicationWrapper from 'containers/wrappers/applicationWrapper';
import Page from 'components/page';

interface Props {
  title: string;
  children: ReactNode;
}

const PageWrapper = ({ title, children }: Props) => {
  return (
    <>
      <Head>
        <title>Thomas{title.length ? ` - ${title}` : ''}</title>
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
