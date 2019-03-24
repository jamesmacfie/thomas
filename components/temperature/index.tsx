import moment from 'moment';
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import Panel from '../panel';
import { H3 } from '../text';
import State from '../state';
import HistoryLine from '../historyLine';
import Loader from '../loader';
import { Props as EntityProps } from '../entity';
import useEntityHistory from '../../hooks/useEntityHistory';
import { entityHistoryIntoHourlyDataset } from '../../utils/morph';

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

const Temperature = ({ title = 'Temperature', ...props }: EntityProps) => {
  const [res, setRes] = useState<Entity[] | null>(null);
  useEntityHistory(([d]) => setRes(d), props.entity_id);

  const graph = !res ? <Loader /> : <Graph data={res} />;

  return (
    <>
      <Panel fit={false} className="flex" padding={false} overflow={false}>
        <div className="flex-1">
          <div className="p-6">
            {title && <H3 className="mb-6 text-grey-dark">{title}</H3>}
            <p className="text-4xl whitespace-no-wrap">
              <State {...props} />
            </p>
          </div>
        </div>
        {graph}
      </Panel>
      <HistoryLine />
    </>
  );
};

export default Temperature;
