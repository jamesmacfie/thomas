import React, { useContext } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { StoreContext as UIStoreContext } from 'stores/ui';
import Icon from 'components/icon';
import useLongPress from 'hooks/useLongPress';

export type Props = {
  id: string;
  icon: string;
  href?: string;
  addNewClick?: boolean;
  text: string;
  hidePencil?: boolean;
  onAddNewClick?: () => void;
};

const NavigationItem = observer(({ id, href, icon, hidePencil, addNewClick, onAddNewClick }: Props) => {
  const { asPath } = useRouter();
  const uiStore = useContext(UIStoreContext);
  const longPress = useLongPress(() => {
    uiStore.startEditMode();
  }, 500);
  const onLinkClick = (event: any) => {
    if (uiStore.editMode) {
      // We have a long press registered or we are in edit more. Don't follow the anchor
      event.preventDefault();
    }
  };

  const onPencilClick = () => {
    alert(`This will edit ${id}`);
  };

  const isActive = asPath === href;
  const anchorClasses = cn('cursor-pointer current-stroke flex items-center justify-center', {
    'text-white': isActive || uiStore.editMode,
    'text-grey-darker hover:text-white': !isActive
  });
  const showEditControls = uiStore.editMode && !hidePencil;
  const iconCmp = <Icon icon={icon as any} className="text-3xl" />;
  return (
    <span {...longPress}>
      {showEditControls && (
        <div
          onClick={onPencilClick}
          className="cursor-pointer p-1 h-6 w-6 absolute text-grey-darker hover:text-blue pin-edit border border-grey-light bg-grey-lighter rounded-full flex items-center justify-center"
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
  );
});

export default NavigationItem;
