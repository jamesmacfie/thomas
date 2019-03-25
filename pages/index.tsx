import React, { ReactNode } from 'react';
import PageWrapper from '../components/pageWrapper';
import Entity from '../components/entity';
import Temperature from '../components/temperature';
import Icon from '../components/icon';
import Layout, { Content } from '../components/layout';
import Iframe from '../components/iframe';

import DoorClosed from '../svg/door-closed.svg';
import DoorOpen from '../svg/door-open.svg';

function Home() {
  return (
    <PageWrapper title="Home">
      <Content>
        <Layout rows={3} columns={2} title="Temperature" className="mr-6">
          <Layout rows={4} columns={2} columnSpan={1} rowSpan={1}>
            <Entity title="Living room" entity_id="sensor.temperature_158d00025f0927" />
            <Entity title="Thomas' Room" entity_id="sensor.thomas_room_temp" />
            <Entity title="Kid's Room" entity_id="sensor.kids_room_temp" />
            <Entity title="Mum and Dad's Room" entity_id="sensor.temperature_158d00025ed7d0" />
            <Entity title="Kitchen" entity_id="sensor.kitchen_temp" />
            <Entity title="Office" entity_id="sensor.office_temp" />
            <Icon
              title="Test"
              entity_id="sensor.test"
              subTitle={(s: string) => (s === 'on' ? 'Motion' : 'No motion')}
              icon={(s: string | number): ReactNode => {
                console.log('Test state', s);
                return s === 'on' ? <DoorOpen /> : <DoorClosed />;
              }}
            />
            <Icon
              title="Motion"
              entity_id="binary_sensor.motion_sensor_158d0002c635a4"
              subTitle={(s: string) => (s === 'on' ? 'Motion' : 'No motion')}
              icon={(s: string | number): ReactNode => (s === 'on' ? <DoorOpen /> : <DoorClosed />)}
            />
          </Layout>
          <Layout rowSpan={2}>
            <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191997.86324495284!2d174.62177067305853!3d-41.24428516095246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d38b1fc49e974cb%3A0xa00ef63a213b470!2sWellington!5e0!3m2!1sen!2snz!4v1553398143073" />
          </Layout>
        </Layout>
        <Layout columnSpan={2} rowSpan={0} title="Graphs" className="mr-6">
          <Layout rows={6} columns={2} columnSpan={2} rowSpan={1}>
            <Temperature title="Living room" entity_id="sensor.temperature_158d00025f0927" />
            <Temperature title="Thomas' Room" entity_id="sensor.thomas_room_temp" />
            <Temperature title="Kid's Room" entity_id="sensor.kids_room_temp" />
            <Temperature title="Mum and Dad's Room" entity_id="sensor.temperature_158d00025ed7d0" />
            <Temperature title="Kitchen" entity_id="sensor.kitchen_temp" />
            <Temperature title="Office" entity_id="sensor.office_temp" />
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
