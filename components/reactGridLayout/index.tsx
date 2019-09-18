import React, { useContext, ReactNode } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { observer } from 'mobx-react-lite';
import UIStore, { StoreContext } from 'stores/ui';
import './styles.css';

const ReactGridLayout = WidthProvider(RGL);

interface Props {
  layout: ReactGridLayoutConfig[];
  children: ReactNode;
  cols: number;
  rowHeight?: number;
  width?: number;
  isResizable?: boolean;
  onLayoutChange?: (e: ReactGridLayoutConfig[]) => void;
}

const Layout = observer(({ isResizable, layout, width, onLayoutChange, cols, rowHeight, children }: Props) => {
  const { editMode } = useContext(StoreContext) as UIStore;

  return (
    <ReactGridLayout
      width={width}
      measureBeforeMount
      useCSSTransforms={false}
      onLayoutChange={onLayoutChange}
      layout={layout}
      rowHeight={rowHeight}
      cols={cols}
      isDraggable={editMode}
      isRearrangeable={editMode}
      isResizable={isResizable !== undefined ? isResizable : editMode}
    >
      {children}
    </ReactGridLayout>
  );
});

export default Layout;
