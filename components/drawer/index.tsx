import React, { useContext } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import UIStore, { StoreContext } from 'stores/ui';
import Icon from 'components/icon';
import Button from 'components/button';
import './styles.css';

const Drawer = observer(() => {
  const { toggleEditMode, toggleDrawer, editMode, drawerOpen } = useContext(StoreContext) as UIStore;
  const buttonText = editMode ? 'Finish editing' : 'Edit view';
  const classes = cn('bg-panel h-screen fixed right-0 top-0 bottom-0', {
    'w-64': drawerOpen,
    'w-0': !drawerOpen
  });
  return (
    <div className={classes}>
      <Icon
        className="drawerIcon absolute cursor-pointer ml-4 text-xl white current-stroke"
        icon="cog"
        onClick={toggleDrawer}
      />
      <div className="w-full h-full overflow-hidden p-4">
        <Button className="mx-auto block" color="secondary" onClick={toggleEditMode}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
});

export default Drawer;
