import React, { useState, useContext } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import Panel from '../panel';
import { H4 } from '../text';
import State from '../state';
import Loader from '../loader';
import { Props as EntityProps } from '../entity';
import useEntityHistory from '../../hooks/useEntityHistory';
import { entityHistoryIntoHourlyDataset } from '../../utils/morph';
import Store from '../../store';
import { StoreContext } from '../../store';

const Graph = ({ data }: { data: Entity[] }) => {
  const hourlyData = entityHistoryIntoHourlyDataset(data);
  const hourlyDataValues = hourlyData.map(d => parseFloat(d.state));
  const hourlyDataLabels = hourlyData.map(d => moment(d.last_changed).format('hh:mm a'));
  const graphData = {
    labels: hourlyDataLabels,
    datasets: [
      {
        label: 'Temperature',
        fill: false,
        borderColor: '#fff',
        scaleShowVerticalLines: false,
        pointBorderWidth: 0,
        hoverBorderColor: '#DAE1E7',
        data: hourlyDataValues
      }
    ]
  };

  let classes = '';
  const current = hourlyDataValues[hourlyDataValues.length - 1];
  if (current < 19.9) {
    classes = 'cold-h';
  } else if (current > 24) {
    classes = 'hot-h';
  } else {
    classes = 'neutral-h';
  }

  return (
    <div className={`flex-1 ${classes}`}>
      <Line
        data={graphData}
        width={100}
        height={50}
        legend={{
          display: false
        }}
        options={{
          fill: false,
          maintainAspectRatio: false,
          layout: {
            padding: {
              left: 5,
              right: 5,
              top: 20,
              bottom: 20
            }
          },
          scales: {
            yAxes: [
              {
                display: false,
                padding: 5,
                ticks: {
                  min: 0,
                  max: 40
                }
              }
            ],
            xAxes: [
              {
                display: false,
                padding: 5
              }
            ]
          },
          elements: {
            point: {
              radius: 0,
              hoverRadius: 5
            }
          }
        }}
      />
    </div>
  );
};

const dimensions: { [key: number]: string } = {
  1: '7.5rem',
  2: '15rem',
  3: '22.5rem',
  4: '30rem',
  5: '37.5rem',
  6: '45rem'
};

const Temperature = observer(({ width = 1, height = 1, title = 'Temperature', ...props }: EntityProps) => {
  const store = useContext(StoreContext) as Store;
  const [res, setRes] = useState<Entity[] | null>(null);
  const styles = {
    height: dimensions[height],
    width: dimensions[width]
  };
  useEntityHistory(d => {
    if (d) {
      setRes(d[0]);
    } else {
      setRes([]);
    }
  }, props.entity_id);

  if (store.status !== 'AUTHENTICATED') {
    return <Panel fit={false} className="relative" style={styles} />;
  }

  const graph = !res ? (
    <div className="flex-grow relative">
      <Loader className="absolute pin-center" />
    </div>
  ) : (
    <Graph data={res} />
  );

  const classes = cn('flex relative', {
    'flex-col': height > width
  });
  const pinClasses = cn({
    ['absolute pin-center']: height === width
  });
  const stateClasses = cn('mt-6 whitespace-no-wrap', {
    'text-4xl': height === 1 && width === 1,
    'text-6xl': height === 2 && width === 2
  });

  return (
    <Panel fit={false} className={classes} padding={false} overflow={false}>
      <div className="flex-1">
        <div className="p-4">
          {title && <H4 className="uppercase mb-6 text-grey-dark">{title}</H4>}
          <div className={pinClasses}>
            <p className={stateClasses}>
              <State {...props} />
            </p>
          </div>
        </div>
      </div>
      {height !== width && graph}
    </Panel>
  );
});

export default Temperature;
