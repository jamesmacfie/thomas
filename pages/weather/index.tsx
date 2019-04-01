import React from 'react';
import PageWrapper from '../../components/pageWrapper';
import Layout, { Content } from '../../components/layout';
import Iframe from '../../components/iframe';

function Weather() {
  return (
    <PageWrapper title="Weather">
      <Content>
        <Layout rowSpan={4} rows={4} columnSpan={7} columns={7}>
          <Iframe url="https://embed.windy.com/embed2.html?lat=-43.453&lon=172.617&zoom=5&level=surface&overlay=wind&menu=&message=true&marker=true&calendar=24&pressure=&type=map&location=coordinates&detail=true&detailLat=-41.113990&detailLon=175.320770&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1" />
        </Layout>
      </Content>
    </PageWrapper>
  );
}

export default Weather;
