import React from 'react';
import PageWrapper from '../components/pageWrapper';
import Entity from '../components/entity';
import Temperature from '../components/temperature';
import Layout, { Content } from '../components/layout';
import Iframe from '../components/iframe';

function Home() {
  return (
    <PageWrapper title="Home">
      <Content>
        <Layout rows={3} columns={2} title="Living room">
          <Layout rows={1} columns={2} columnSpan={1} rowSpan={1}>
            <Entity title="Temperature" entity_id=" sensor.darksky_temperature" />
            <Entity title="Humidity" entity_id="sensor.darksky_humidity" />
          </Layout>
          <Layout rowSpan={2}>
            <Iframe url="https://github.com/JedWatson/classnames" />
          </Layout>
        </Layout>
        <Layout columnSpan={2} rowSpan={0} title="Bubs room">
          <Layout>
            <Temperature title="Temperature" entity_id=" sensor.darksky_temperature" />
          </Layout>
        </Layout>
        <Layout rows={2} columnSpan={1} rowSpan={1} title="Network">
          <Entity title="Network In" entity_id="sensor.network_in_eth0" />
          <Entity title="Network Out" entity_id="sensor.network_out_eth0" />
        </Layout>
      </Content>
    </PageWrapper>
  );
}

export default Home;
