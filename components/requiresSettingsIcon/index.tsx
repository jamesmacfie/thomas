import React from 'react';
import cn from 'classnames';
import Icon from '../icon';
import { H3 } from '../text';

interface Props {
  className?: string;
  hideLabel?: boolean;
}

const RequiresSettingIcon = ({ className, hideLabel }: Props) => {
  const iconClasses = cn('text-3xl', { 'mb-4': !hideLabel });
  return (
    <div className={cn('flex flex-col justify-center items-center', className)}>
      <Icon icon="cogs" className={iconClasses} />
      {!hideLabel && (
        <H3 className="mb-0" margin={false}>
          Settings required
        </H3>
      )}
    </div>
  );
};

export default RequiresSettingIcon;
