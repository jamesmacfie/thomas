import React from 'react';
import PageWrapper from '../components/pageWrapper';
import Temperature from '../components/temperature';
import Number from '../components/number';
import Layout, { Content } from '../components/layout';
import Iframe from '../components/iframe';

function Home() {
  return (
    <PageWrapper title="Home">
      <Content>
        <Layout rows={3} columns={2} title="Living room">
          <Layout rows={1} columns={2} columnSpan={1} rowSpan={1}>
            <Temperature entity_id="sensor.darksky_daytime_high_temperature_5" />
            <Temperature entity_id="sensor.darksky_daytime_high_temperature_5" />
          </Layout>
          <Layout rowSpan={2}>
            <Iframe url="https://github.com/JedWatson/classnames" />
          </Layout>
        </Layout>
        <Layout columnSpan={1} rowSpan={1} title="Bubs room">
          <Temperature entity_id="sensor.darksky_daytime_high_temperature_5" />
        </Layout>
      </Content>
      <Number entity_id="sensor.network_in_eth0" title="Network In" />
      <Number entity_id="sensor.network_out_eth0" title="Network Out" />
      <Number entity_id="sensor.test" title="Test" />
      <Number entity_id="sensor.test2" title="Test" />
    </PageWrapper>
  );
}

export default Home;
