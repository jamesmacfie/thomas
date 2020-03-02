import React from 'react';
import Panel from 'components/panel';
import Switch from 'components/switch';
import Icon from 'components/icon';
import Button from 'components/button';
import { H3 } from 'components/text';
import { Props as PanelProps } from 'components/panel';
import './styles.css';

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
}
const Climate = ({
  isActive,
  minTemp,
  maxTemp,
  targetTemp,
  setTarget,
  onToggle,
  panelProps,
  label,
  unit = '°C'
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
    <Panel {...panelProps} className="pb-8 relative" label={label}>
      <div className="flex flex-col w-full h-full">
        <div className="flex-grow flex flex-col h-full items-center alig">
          <Button
            disabled={!canReduce}
            onClick={reduceTarget}
            color="transparent"
            className="pt-0 flex-grow flex justify-center"
          >
            <Icon containerClassName=" text-3xl" icon="chevron-up" />
          </Button>
          <span className="flex-grow text-6xl">
            {targetTemp} {unit}
          </span>
          <Button
            disabled={!canIncrease}
            onClick={increaseTarget}
            color="transparent"
            className="pb-4 flex-grow flex justify-center"
          >
            <Icon containerClassName=" text-3xl" icon="chevron-down" />
          </Button>
        </div>
        <div className="h-24 flex-shrink-0 flex pt-3">
          <div className="flex-grow flex flex-col items-center">
            <Switch active={isActive} onChange={toggle} />
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
