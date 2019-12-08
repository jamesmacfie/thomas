import React, { useState } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEditMode } from 'stores/ui/hooks';
import EditDeviceViewModal from '../editDeviceViewModal/index';
import Icon from 'components/icon';
import logger from 'utils/logger';

export type Props = {
  id: number | string;
  icon: string;
  href?: string;
  addNewClick?: boolean;
  text: string;
  hidePencil?: boolean;
  onAddNewClick?: () => void;
};

const NavigationItem = ({ id, href, icon, hidePencil, addNewClick, onAddNewClick }: Props) => {
  const { asPath } = useRouter();
  const editMode = useEditMode();
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onLinkClick = (event: any) => {
    logger.debug('On <NavigationItem /> link click');
    if (editMode) {
      // We have a long press registered or we are in edit more. Don't follow the anchor
      event.preventDefault();
    }
  };

  const onPencilClick = () => {
    logger.debug('On <NavigationItem /> edit click', { id });
    setModalVisible(true);
  };

  const isActive = asPath === href;
  const anchorClasses = cn('cursor-pointer current-stroke flex items-center justify-center', {
    'text-primary': isActive || editMode,
    'text-grey-darker hover:text-primary': !isActive
  });
  const showEditControls = editMode && !hidePencil;
  const iconCmp = <Icon icon={icon as any} className="text-3xl" />;
  return (
    <>
      <span>
        {showEditControls && (
          <div
            onClick={onPencilClick}
            className="cursor-pointer p-1 h-6 w-6 absolute text-grey-darker hover:text-blue pin-edit border border-grey-light bg-grey-lighter rounded-full flex items-center justify-center z-10"
          >
            <Icon icon="pen" containerClassName="flex" className="text-xs current-stroke" />
          </div>
        )}
        {!!href ? (
          <Link href={href}>
            <a className={anchorClasses} onClick={onLinkClick}>
              {iconCmp}
            </a>
          </Link>
        ) : (
          <div onClick={addNewClick ? onAddNewClick : undefined} className={anchorClasses}>
            {iconCmp}
          </div>
        )}
      </span>
      {modalVisible && <EditDeviceViewModal viewId={id as number} onClose={() => setModalVisible(false)} />}
    </>
  );
};

export default NavigationItem;
