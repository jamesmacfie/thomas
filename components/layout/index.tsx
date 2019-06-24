import React, { ReactNode } from 'react';
import cn from 'classnames';
import { H2 } from '../text';

const getTemplateColumns = (columnSpan: number, columns: number) => {
  const templateColumns: { [key: number]: string } = {
    1: '7.5rem',
    2: '15rem',
    3: '22.5rem',
    4: '30rem',
    5: '37.5rem',
    6: '45rem',
    7: '52.5rem'
  };
  return `repeat(${columns}, ${templateColumns[columnSpan]}`;
};

const getTemplateRows = (rowSpan: number, rows: number) => {
  const templateRows: { [key: number]: string } = {
    1: '7.5rem',
    2: '15rem',
    3: '22.5rem',
    4: '30rem',
    5: '37.5rem',
    6: '45rem',
    7: '52.5rem'
  };
  return `repeat(${rows}, ${templateRows[rowSpan]}`;
};

interface Props {
  columns?: number;
  columnSpan?: number;
  rows?: number;
  rowSpan?: number;
  className?: string;
  children: ReactNode;
  title?: string;
}

const Layout = ({ rows = 1, columns = 1, columnSpan = 0, rowSpan = 0, className, children, title }: Props) => {
  const classes = cn('grid over-x-scroll content-start', className);
  const styles = {
    gridTemplateColumns: getTemplateColumns(columnSpan, columns),
    gridTemplateRows: getTemplateRows(rowSpan, rows)
  };

  const returnLayout = (
    <div className={classes} style={styles}>
      {children}
    </div>
  );

  if (title) {
    return (
      <div>
        <H2 className="mt-0">{title}</H2>
        {returnLayout}
      </div>
    );
  }

  return returnLayout;
};

export default Layout;

interface ContentProps {
  className?: string;
  children: ReactNode;
}

export const Content = ({ className, children }: ContentProps) => {
  return <div className={cn('flex px-6 py-6', className)}>{children}</div>;
};
