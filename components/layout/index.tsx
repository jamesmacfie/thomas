import React, { ReactNode } from 'react';
import cn from 'classnames';
import { H2 } from '../text';

const getTemplateColumns = (columnSpan: number, rowSpan: number) => {
  const templateColumns: { [key: number]: string } = {
    1: '9rem',
    2: '18rem',
    3: '27rem'
  };
  return new Array(rowSpan).fill(templateColumns[columnSpan]).join(' ');
};

const getTemplateRows = (rowSpan: number, columnSpan: number) => {
  const templateRows: { [key: number]: string } = {
    1: '9rem',
    2: '18rem',
    3: '27rem'
  };
  return new Array(columnSpan).fill(templateRows[rowSpan]).join(' ');
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
  const classes = cn('grid over-x-scroll', className);
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
        <H2 className="mt-6">{title}</H2>
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
  return <div className={cn('flex px-6', className)}>{children}</div>;
};
