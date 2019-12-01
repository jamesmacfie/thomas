import React, { useRef, useState } from 'react';
import cn from 'classnames';
import { store } from '../store';
import Icon from 'components/icon';
import { H3 } from 'components/text';

interface Props {
  item: ThomasNotification;
}

const colorClasses = {
  info: 'bg-blue border-blue-light',
  success: 'bg-green border-green-light',
  danger: 'bg-red border-red-light'
};

const NotificationItem = ({ item }: Props) => {
  const el = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  const onClose = () => {
    if (!el.current) {
      return;
    }

    // Calculate and set height then set to 0 for animation to kick in
    setHeight(el.current.clientHeight);
    window.setTimeout(() => {
      setHeight(0);
    }, 1);
    window.setTimeout(() => {
      store.clearById(item.id);
    }, 150);
  };

  const classes = cn('animate-height rounded-sm mb-2 cursor-pointer w-full', colorClasses[item.color || 'info'], {
    'overflow-hidden': !!!height
  });

  let image = null;
  if (item.imageSrc) {
    image = <img src={item.imageSrc} className="w-8 h-8 mr-4" />;
  } else if (item.icon) {
    console.log(item.icon);
    image = <Icon icon={item.icon} className="w-8 h-8 mr-4" />;
  }

  return (
    <div ref={el} onClick={onClose} style={{ height: `${height}px` }} className={classes}>
      <div className="flex items-center p-4 relative">
        {image}
        <div className="flex-grow">
          {item.title ? (
            <H3 margin={false} className="mb-2 text-white">
              {item.title}
            </H3>
          ) : null}
          <p className="m-0 text-xs">{item.text}</p>
        </div>
        <Icon icon="times-circle" className="text-white w-8 h-8 absolute pin-close-half" />
      </div>
    </div>
  );
};

export default NotificationItem;
