import moment from 'moment';

interface typeReturn {
  timeMin: string;
  timeMax: string;
}

export const getDateRangeByType: (type: string) => typeReturn = type => {
  switch (type) {
    case 'daily':
      // Agenda is next 7 days. Also use this as the defaule
      return {
        timeMin: moment()
          .startOf('day')
          .toISOString(),
        timeMax: moment()
          .endOf('day')
          .toISOString()
      };
    case 'weekly':
      // Agenda is next 7 days. Also use this as the defaule
      return {
        timeMin: moment()
          .startOf('week')
          .toISOString(),
        timeMax: moment()
          .endOf('week')
          .toISOString()
      };
    case 'monthly':
      // Agenda is next 7 days. Also use this as the defaule
      return {
        timeMin: moment()
          .startOf('month')
          .toISOString(),
        timeMax: moment()
          .endOf('month')
          .toISOString()
      };
    default:
    case 'agenda':
      // Agenda is next 7 days. Also use this as the defaule
      return {
        timeMin: moment()
          .startOf('day')
          .toISOString(),
        timeMax: moment()
          .endOf('week')
          .toISOString()
      };
  }
};
