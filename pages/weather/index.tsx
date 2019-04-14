import React from 'react';
import PageWrapper from '../../components/pageWrapper';
import Iframe from '../../components/iframe';

function Weather() {
  return (
    <PageWrapper title="Weather">
      <div className="full">
        <Iframe url="https://embed.windy.com/embed2.html?lat=-43.453&lon=172.617&zoom=5&level=surface&overlay=wind&menu=&message=true&marker=true&calendar=24&pressure=&type=map&location=coordinates&detail=true&detailLat=-41.113990&detailLon=175.320770&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1" />
      </div>
    </PageWrapper>
  );
}

export default Weather;
