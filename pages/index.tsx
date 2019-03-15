import React from 'react';
import PageWrapper from '../components/pageWrapper';
import Navigation from '../components/navigation';
import Temperature from '../components/temperature';
import Number from '../components/number';

function Home() {
  return (
    <PageWrapper title="Home">
      <Navigation />
      <p>Home page!</p>
      <Temperature entity_id="sensor.darksky_daytime_high_temperature_5" />
      <Number entity_id="sensor.network_in_eth0" title="Network In" />
      <Number entity_id="sensor.network_out_eth0" title="Network Out" />
      <Number entity_id="sensor.test" title="Test" />
      <Number entity_id="sensor.test2" title="Test" />
    </PageWrapper>
  );
}

export default Home;
