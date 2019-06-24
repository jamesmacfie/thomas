import React, { Component } from 'react';
import PageWrapper from '../../components/pageWrapper';
import SubNavigation from '../../components/settingsSubNavigation';
import LayoutEntity from '../../components/layoutEntity';
import Layout, { Content } from '../../components/layout';
// import { H1 } from '../../components/text';

export default class System extends Component {
  render() {
    return (
      <PageWrapper title="Network" contentsClassName="flex">
        <SubNavigation />
        <Content>
          <Layout title="Network" rows={5} columns={1} columnSpan={1} rowSpan={1} className="mr-6">
            <LayoutEntity
              entity_id="sensor.speedtest_download"
              title="Download"
              unitOfMeasurementAlignment="BOTTOM"
              textSize="MEDIUM"
            />
            <LayoutEntity
              entity_id="sensor.speedtest_upload"
              title="Upload"
              unitOfMeasurementAlignment="BOTTOM"
              textSize="MEDIUM"
            />
            <LayoutEntity
              entity_id="sensor.speedtest_ping"
              title="Ping"
              unitOfMeasurementAlignment="BOTTOM"
              textSize="MEDIUM"
            />
          </Layout>
          <Layout title="Pi-hole" rows={5} columns={1} columnSpan={1} rowSpan={1} className="mr-6">
            <LayoutEntity
              entity_id="sensor.pihole_dns_queries_today"
              title="DNS queries today"
              unitOfMeasurement={null}
              unitOfMeasurementAlignment="BOTTOM"
              textSize="MEDIUM"
            />
            <LayoutEntity
              entity_id="sensor.pihole_ads_blocked_today"
              title="Ads blocked today"
              unitOfMeasurement={null}
              unitOfMeasurementAlignment="BOTTOM"
              textSize="MEDIUM"
            />
            <LayoutEntity
              entity_id="sensor.pihole_ads_percentage_blocked_today"
              title="% ads blocked today"
              unitOfMeasurementAlignment="BOTTOM"
              textSize="MEDIUM"
            />
          </Layout>
          <Layout title="Host" rows={5} columns={1} columnSpan={1} rowSpan={1} className="mr-6">
            <LayoutEntity
              entity_id="sensor.processor_use"
              title="CPU"
              unitOfMeasurementAlignment="BOTTOM"
              textSize="MEDIUM"
            />
            <LayoutEntity
              entity_id="sensor.memory_use_percent"
              title="Memory"
              unitOfMeasurementAlignment="BOTTOM"
              textSize="MEDIUM"
            />
            <LayoutEntity
              entity_id="sensor.disk_use_percent_"
              title="Disk usage"
              unitOfMeasurementAlignment="BOTTOM"
              textSize="MEDIUM"
            />
          </Layout>
        </Content>
      </PageWrapper>
    );
  }
}
