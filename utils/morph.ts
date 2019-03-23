import moment from 'moment';
import groupBy from 'lodash/groupBy';

export interface HourlyData {
  last_changed: Date;
  state: string;
}

export const entityHistoryIntoHourlyDataset = (data: Entity[], numHours: number = 24): HourlyData[] => {
  const groupedData = groupBy(data, (d: Entity) => {
    return moment(d.last_changed).format('DD-HH');
  });
  const startHour = moment().subtract(numHours, 'hours');
  const groupedDataWithMissingHours: any = {};
  for (let i = 0; i < numHours; i++) {
    const currentHour = moment(startHour).add(i, 'hours');
    const hourKey = currentHour.format('DD-HH');
    if (groupedData[hourKey]) {
      groupedDataWithMissingHours[hourKey] = groupedData[hourKey];
    } else {
      groupedDataWithMissingHours[hourKey] = [
        {
          last_changed: moment(currentHour).toDate(),
          state: null
        }
      ];
    }
  }

  const hourly = Object.keys(groupedDataWithMissingHours).map(
    (k): HourlyData => {
      const values = groupedDataWithMissingHours[k];
      const total = values.reduce((prev: number, curr: HourlyData) => prev + parseInt(curr.state as string), 0);
      return {
        last_changed: moment(values[0].last_changed)
          .startOf('hour')
          .toDate(),
        state: (total / values.length).toFixed(2)
      };
    }
  );

  return hourly;
};
