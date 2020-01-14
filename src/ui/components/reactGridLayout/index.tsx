// As this touches a store, should this be split into a container that passes props to
// a component?
import React, { ReactNode } from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import { useEditMode } from 'stores/ui/hooks';
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

const Layout = ({ isResizable, layout, width, onLayoutChange, cols, rowHeight, children }: Props) => {
  const editMode = useEditMode();

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
      isResizable={isResizable !== undefined ? isResizable : editMode}
    >
      {children}
    </ReactGridLayout>
  );
};

export default Layout;
