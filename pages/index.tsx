import React, { ReactNode } from 'react';
import PageWrapper from '../components/pageWrapper';
import Entity from '../components/entity';
import Temperature from '../components/temperature';
import Icon from '../components/icon';
import Layout, { Content } from '../components/layout';

import DoorClosed from '../svg/door-closed.svg';
import DoorOpen from '../svg/door-open.svg';

function Home() {
  return (
    <PageWrapper title="Home">
      <Content>
        <Layout rows={3} columns={2} columnSpan={1} rowSpan={1} title="Temperature" className="mr-6">
          {/* <Layout rows={4} columns={2} columnSpan={1} rowSpan={1}> */}
          <Entity title="Living room" entity_id="sensor.temperature_158d00025f0927" unitOfMeasurement="°C" />
          <Entity title="Thomas' Room" entity_id="sensor.thomas_room_temp" unitOfMeasurement="°C" />
          <Entity title="Kid's Room" entity_id="sensor.kids_room_temp" unitOfMeasurement="°C" />
          <Entity title="Mum and Dad's Room" entity_id="sensor.temperature_158d00025ed7d0" unitOfMeasurement="°C" />
          <Entity title="Kitchen" entity_id="sensor.kitchen_temp" unitOfMeasurement="°C" />
          <Entity title="Office" entity_id="sensor.office_temp" unitOfMeasurement="°C" />
          {/* </Layout> */}
        </Layout>
        <Layout rows={3} columns={1} rowSpan={1} columnSpan={1} title="Doors" className="mr-6">
          <Icon
            title="Back door"
            entity_id="binary_sensor.door_window_sensor_158d00028b4a2a"
            subTitle={(s: string) => (s === 'on' ? 'Open' : 'Closed')}
            icon={(s: string | number): ReactNode => (s === 'on' ? <DoorOpen /> : <DoorClosed />)}
          />
          <Icon
            title="French doors"
            entity_id=" binary_sensor.door_window_sensor_158d0002bfa31a "
            subTitle={(s: string) => (s === 'on' ? 'Open' : 'Closed')}
            icon={(s: string | number): ReactNode => (s === 'on' ? <DoorOpen /> : <DoorClosed />)}
          />
          <Icon
            title="Front door"
            entity_id="binary_sensor.door_window_sensor_158d0002c62ed0"
            subTitle={(s: string) => (s === 'on' ? 'Open' : 'Closed')}
            icon={(s: string | number): ReactNode => (s === 'on' ? <DoorOpen /> : <DoorClosed />)}
          />
        </Layout>
        <Layout columnSpan={2} rowSpan={0} title="Graphs" className="mr-6">
          <Layout rows={6} columns={2} columnSpan={2} rowSpan={1}>
            <Temperature title="Living room" entity_id="sensor.temperature_158d00025f0927" unitOfMeasurement="°C" />
            <Temperature title="Thomas' Room" entity_id="sensor.thomas_room_temp" unitOfMeasurement="°C" />
            <Temperature title="Kid's Room" entity_id="sensor.kids_room_temp" unitOfMeasurement="°C" />
            <Temperature
              title="Mum and Dad's Room"
              entity_id="sensor.temperature_158d00025ed7d0"
              unitOfMeasurement="°C"
            />
            <Temperature title="Kitchen" entity_id="sensor.kitchen_temp" unitOfMeasurement="°C" />
            <Temperature title="Office" entity_id="sensor.office_temp" unitOfMeasurement="°C" />
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
