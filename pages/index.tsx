import React, { ReactNode } from 'react';
import PageWrapper from '../components/pageWrapper';
import LayoutEntity from '../components/layoutEntity';
import LayoutForecast from '../components/layoutForecast';
import LayoutIcon from '../components/layoutIcon';
import Layout, { Content } from '../components/layout';

import DoorClosed from '../svg/door-closed.svg';
import DoorOpen from '../svg/door-open.svg';

function Home() {
  return (
    <PageWrapper title="Home">
      <Content>
        <Layout rows={3} columns={2} columnSpan={1} rowSpan={1} title="Temperature" className="mr-6">
          <LayoutForecast width={2} height={3} title="Forecast" unitOfMeasurement="°C" />
        </Layout>
        <Layout rows={4} columns={2} columnSpan={1} rowSpan={1} title="Temperature" className="mr-6">
          <LayoutEntity title="Living room" entity_id="sensor.temperature_158d00025f0927" unitOfMeasurement="°C" />
          <LayoutEntity title="Kitchen" entity_id="sensor.kitchen_temp" unitOfMeasurement="°C" />
          <LayoutEntity title="Kid's Room" entity_id="sensor.kids_room_temp" unitOfMeasurement="°C" />
          <LayoutEntity title="Thomas' Room" entity_id="sensor.thomas_room_temp" unitOfMeasurement="°C" />
          <LayoutEntity
            title="Mum and Dad's Room"
            entity_id="sensor.temperature_158d00025ed7d0"
            unitOfMeasurement="°C"
          />
          <LayoutEntity title="Bathroom" entity_id="sensor.temperature_158d00025efd69" unitOfMeasurement="°C" />
          <LayoutEntity title="Office" entity_id="sensor.office_temp" unitOfMeasurement="°C" />
        </Layout>
        <Layout rows={3} columns={1} rowSpan={1} columnSpan={1} title="Doors" className="mr-6">
          <LayoutIcon
            title="Back door"
            entity_id="binary_sensor.door_window_sensor_158d00028b4a2a"
            subTitle={(s: string) => (s === 'on' ? 'Open' : 'Closed')}
            icon={(s: string | number): ReactNode => (s === 'on' ? <DoorOpen /> : <DoorClosed />)}
          />
          <LayoutIcon
            title="French doors"
            entity_id=" binary_sensor.door_window_sensor_158d0002bfa31a "
            subTitle={(s: string) => (s === 'on' ? 'Open' : 'Closed')}
            icon={(s: string | number): ReactNode => (s === 'on' ? <DoorOpen /> : <DoorClosed />)}
          />
          <LayoutIcon
            title="Front door"
            entity_id="binary_sensor.door_window_sensor_158d0002c62ed0"
            subTitle={(s: string) => (s === 'on' ? 'Open' : 'Closed')}
            icon={(s: string | number): ReactNode => (s === 'on' ? <DoorOpen /> : <DoorClosed />)}
          />
        </Layout>
        <Layout rows={1} columns={1} rowSpan={1} columnSpan={1} title="Windows" className="mr-6">
          <LayoutIcon
            title="Bathroom basin"
            entity_id="binary_sensor.door_window_sensor_158d0002c7b9c5"
            subTitle={(s: string) => (s === 'on' ? 'Open' : 'Closed')}
            icon={(s: string | number): ReactNode => (s === 'on' ? <DoorOpen /> : <DoorClosed />)}
          />
        </Layout>
      </Content>
    </PageWrapper>
  );
}

export default Home;
