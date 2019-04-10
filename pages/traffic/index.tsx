import React from 'react';
import PageWrapper from '../../components/pageWrapper';
import Entity from '../../components/entity';
import Layout, { Content } from '../../components/layout';
import Iframe from '../../components/iframe';

function Traffic() {
  return (
    <PageWrapper title="Traffic">
      <Content>
        <Layout rows={2} rowSpan={1} columnSpan={1} columns={1} title="Travel times" className="mr-6">
          <Entity title="To Masterton" entity_id="sensor.time_to_wellington" unitOfMeasurement="mins" />
          <Entity title="To Wellington" entity_id="sensor.time_to_masterton" unitOfMeasurement="mins" />
        </Layout>
        <Layout rowSpan={4} rows={4} columnSpan={6} columns={6} title="Traffic">
          <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191997.86324495284!2d174.62177067305853!3d-41.24428516095246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6d38b1fc49e974cb%3A0xa00ef63a213b470!2sWellington!5e0!3m2!1sen!2snz!4v1553398143073" />
        </Layout>
      </Content>
    </PageWrapper>
  );
}

export default Traffic;
