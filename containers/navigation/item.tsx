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

  const isActive = asPath === href;
  const anchorClasses = cn('cursor-pointer current-stroke w-16 h-16 flex items-center justify-center', {
    'text-white': isActive || uiStore.editMode,
    'text-grey-darker hover:text-white': !isActive
  });
  const showPencil = uiStore.editMode && !hidePencil;
  const iconCmp = <Icon icon={icon} className="w-8 h-8" />;
  return (
    <li key={id} {...longPress} className="relative w-full">
      {showPencil && (
        <Icon
          icon="pencil"
          className="w-5 h-5 absolute right-0 top-0 text-green current-stroke border border-green rounded-full p-1"
        />
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
    </li>
  );
});

export default NavigationItem;
