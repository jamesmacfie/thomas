import React from 'react';
import PageWrapper from '../../components/pageWrapper';
import LayoutEntity from '../../components/layoutEntity';
import Layout, { Content } from '../../components/layout';
import Iframe from '../../components/iframe';

function Weather() {
  return (
    <PageWrapper title="Weather">
      <Content className="h-full">
        <Layout rows={2} rowSpan={1} columnSpan={1} columns={1} className="mr-6">
          <LayoutEntity title="Sunrise" entity_id="sensor.sunrise" textSize="MEDIUM" />
          <LayoutEntity title="Sunset" entity_id="sensor.sunset" textSize="MEDIUM" />
          <LayoutEntity
            title="UV Index"
            entity_id="sensor.current_uv_index_2"
            unitOfMeasurement={null}
            value={v => parseFloat(v).toFixed(2)}
          />
          <LayoutEntity
            title="UV Burn Time"
            entity_id="sensor.skin_type_3_safe_exposure_time_2"
            unitOfMeasurement="mins"
            unitOfMeasurementAlignment="BOTTOM"
            textSize="MEDIUM"
          />
        </Layout>
        <div className="flex-grow">
          <Iframe
            className="h-full w-full"
            url="https://embed.windy.com/embed2.html?lat=-43.453&lon=172.617&zoom=5&level=surface&overlay=wind&menu=&message=true&marker=true&calendar=24&pressure=&type=map&location=coordinates&detail=true&detailLat=-41.113990&detailLon=175.320770&metricWind=km%2Fh&metricTemp=%C2%B0C&radarRange=-1"
          />
        </div>
      </Content>
    </PageWrapper>
  );
}

export default Weather;
