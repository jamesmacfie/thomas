import React, { ReactNode } from 'react';
import { Helmet } from 'react-helmet';
import DeviceWrapper from 'containers/wrappers/devices';

import ApplicationWrapper from 'containers/wrappers/application';
import Page from 'containers/page';

interface Props {
  title: string;
  children: ReactNode;
}

const PageWrapper = ({ title, children }: Props) => {
  return (
    <>
      <Helmet>
        <title>Thomas{title.length ? ` - ${title}` : ''}</title>
      </Helmet>
      <ApplicationWrapper>
        <DeviceWrapper>
          <Page>{children}</Page>
        </DeviceWrapper>
      </ApplicationWrapper>
    </>
  );
};

export default PageWrapper;
