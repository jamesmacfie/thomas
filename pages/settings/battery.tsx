import React, { Component } from 'react';
import PageWrapper from '../../components/pageWrapper';
import SubNavigation from '../../components/settingsSubNavigation';
import LayoutBattery from '../../components/layoutBattery';
import Layout, { Content } from '../../components/layout';
// import { H1 } from '../../components/text';

export default class Batter extends Component {
  render() {
    return (
      <PageWrapper title="Battery" contentsClassName="flex">
        <SubNavigation />
        <Content>
          <Layout title="Batteries" rows={4} columns={4} columnSpan={1} rowSpan={1} className="mr-6">
            <LayoutBattery entity_id="binary_sensor.door_window_sensor_158d0002c7b9c5" title="Bathroom window" />
            <LayoutBattery entity_id="sensor.temperature_158d00025efd69" title="Bathroom temp" />
            <LayoutBattery entity_id="binary_sensor.door_window_sensor_158d0002bfa31a" title="French doors" />
            <LayoutBattery entity_id="binary_sensor.door_window_sensor_158d00028b4a2a" title="Back door" />
            <LayoutBattery entity_id="binary_sensor.motion_sensor_158d0002c587b6" title="Back room motion" />
            <LayoutBattery entity_id="sensor.temperature_158d00025f0927" title="Living room temp" />
            <LayoutBattery entity_id="binary_sensor.motion_sensor_158d0002c635a4" title="Living room motion" />
            <LayoutBattery entity_id="binary_sensor.switch_158d0002b057d2" title="Bathroom fan button" />
            <LayoutBattery entity_id="sensor.temperature_158d00025ed7d0" title="Mum and Dad room temp" />
            <LayoutBattery entity_id="binary_sensor.door_window_sensor_158d0002c62ed0" title="Front door" />
          </Layout>
        </Content>
      </PageWrapper>
    );
  }
}
