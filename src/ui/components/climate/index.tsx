import React from 'react';
import Panel, { Props as PanelProps } from 'components/panel';
import Switch from 'components/switch';
import Icon from 'components/icon';
import Button from 'components/button';
import { H3 } from 'components/text';
import Fan from './fan';

interface Props {
  isActive: boolean;
  minTemp: number;
  maxTemp: number;
  targetTemp: number;
  onToggle: (state: boolean) => void;
  setTarget: (target: number) => void;
  label?: string;
  unit?: string;
  panelProps?: PanelProps;
  fanMode: string;
  setFanMode: (nextMode: string) => void;
}
const Climate = ({
  isActive,
  minTemp,
  maxTemp,
  targetTemp,
  setTarget,
  onToggle,
  label,
  panelProps,
  unit = '°C',
  fanMode = 'auto',
  setFanMode
}: Props) => {
  const toggle = () => {
    onToggle(!isActive);
  };

  const reduceTarget = () => {
    setTarget(targetTemp - 1);
  };
  const increaseTarget = () => {
    setTarget(targetTemp + 1);
  };
  const canReduce = targetTemp !== minTemp;
  const canIncrease = targetTemp !== maxTemp;

  return (
    <Panel label={label} {...panelProps} className="pb-8 relative">
      <div className="flex flex-col w-full h-full">
        <div className="flex-grow flex flex-col h-full items-center alig">
          <Button
            disabled={!canIncrease}
            onClick={increaseTarget}
            color="transparent"
            className="pt-4 flex-grow flex justify-center"
          >
            <Icon containerClassName=" text-3xl" icon="chevron-up" />
          </Button>
          <span className="flex-grow text-6xl">
            {targetTemp} {unit}
          </span>
          <Button
            disabled={!canReduce}
            onClick={reduceTarget}
            color="transparent"
            className="pb-4 flex-grow flex justify-center"
          >
            <Icon containerClassName=" text-3xl" icon="chevron-down" />
          </Button>
        </div>
        <div className="h-24 flex-shrink-0 flex pt-3">
          <div className="flex-grow flex flex-col items-center flex-basis-0">
            <Fan onClick={setFanMode} mode={fanMode} />
          </div>
          <div className="flex-grow flex flex-col items-center flex-basis-0">
            <div className="flex-grow">
              <Switch active={isActive} onChange={toggle} />
            </div>
            <H3 className="mb-0 mt-2" margin={false}>
              {isActive ? 'ON' : 'OFF'}
            </H3>
          </div>
        </div>
      </div>
    </Panel>
  );
};

export default Climate;
