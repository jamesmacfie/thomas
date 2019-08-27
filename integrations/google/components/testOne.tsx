import React from 'react';
import moment from 'moment';
import { observer } from 'mobx-react-lite';
import { useFetch } from 'hooks/useFetch';

const TestOne = observer(({ integrationId }: IntegrationComponentProps) => {
  const timeFrom = moment()
    .subtract(3, 'months')
    .toISOString();
  const timeTo = moment()
    .add(1, 'week')
    .toISOString();

  const [data, loading] = useFetch(
    `/google/api/calendar/events/${integrationId}?timeFrom=${timeFrom}&timeTo=${timeTo}`
  );

  if (loading) {
    return <p>Loading</p>;
  }

  return <p>{data}</p>;
});

export default TestOne;
