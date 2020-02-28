import React, { useState, useRef, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import Panel from 'components/panel';
import Switch from 'components/switch';
import { H3 } from 'components/text';
import Temps from './temps';
import { Props as PanelProps } from 'components/panel';
import './styles.css';

interface Props {
  isActive: boolean;
  minTemp: string;
  maxTemp: string;
  targetTemp: string;
  onToggle: () => void;
  label?: string;
  unit?: string;
  panelProps?: PanelProps;
}
const Climate = ({ isActive, minTemp, maxTemp, targetTemp, onToggle, panelProps, label, unit = '°C' }: Props) => {
  const scrollEl = useRef(null);
  const [doScroll, setDoScroll] = useState(false);
  const [tempTarget, setTempTarget] = useState(targetTemp);
  useEffect(() => {
    const el: any = scrollEl.current;
    if (!el) {
      // Not sure what to do here. Just return. This should always be set
      return;
    }
    // Initial render. Scroll to temp in use
    const temperatureElements = el.querySelectorAll('li');
    const scrollOffset = el.scrollTop;
    const childHeight = temperatureElements[0].clientHeight;
    let currentIndex = 0;
    for (var i = 0; i < temperatureElements.length; i++) {
      if (temperatureElements[i].innerText.replace(unit, '') === tempTarget) {
        currentIndex = i;
        break;
      }
    }

    el.scrollTo({
      top: scrollOffset + childHeight * currentIndex
    });
  }, []);
  const [debouncedOnScroll] = useDebouncedCallback((target: HTMLDivElement) => {
    if (!doScroll) {
      setDoScroll(true);
      return;
    }
    setDoScroll(false);
    // Calculate padding details
    const paddingTopPx = window.getComputedStyle(target.querySelector('ul')!, null).getPropertyValue('padding-top');
    const paddingTop = parseInt(paddingTopPx.replace('px', ''));

    // Calculate height of an individual temperature
    const temperatureElements = target.querySelectorAll('li');
    const childHeight = temperatureElements[0].clientHeight;

    // Based off scroll offset, which temperature value is in the center?
    const scrollOffset = target.scrollTop;
    const centerIdx = Math.round(scrollOffset / childHeight);
    const centerTempElement = temperatureElements[centerIdx];

    setTempTarget(centerTempElement.innerText);

    // Scroll temperature to actual center (not sure about the 9 at the end. This was just a guess. Odd)
    target.scrollTo({
      top: centerTempElement.offsetTop - childHeight / 2 - paddingTop / 2 - 9
    });
  }, 200);

  return (
    <Panel {...panelProps} className="pb-8 relative" label={label}>
      <div className="flex flex-col w-full max-h-full absolute-full">
        <div className="flex-grow flex justify-center overflow-hidden relative">
          <div
            ref={scrollEl}
            className="w-32 max-h-full overflow-scroll"
            onScroll={(e: any) => debouncedOnScroll(e.target as HTMLDivElement)}
          >
            <div className="pointer-events-none absolute-center-h w-32 top-0 h-1/2 climate-scroll-top" />
            <Temps unit={unit} min={minTemp} max={maxTemp} target={tempTarget} />
            <div className="pointer-events-none absolute-center-h w-32 bottom-0 h-1/2 climate-scroll-bottom" />
          </div>
        </div>
        <div className="h-24 flex-shrink-0 flex pt-3">
          <div className="flex-grow flex flex-col items-center">
            <Switch active={isActive} onChange={onToggle} />
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
