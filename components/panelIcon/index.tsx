import React, { MouseEvent, ReactNode } from 'react';
import cn from 'classnames';
import Link from 'next/link';
import Panel from 'components/panel';
import Icon from 'components/icon';
import { H3 } from 'components/text';

interface Props {
  imgSrc?: string;
  icon?: any;
  title?: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  imageClassName?: string;
}

interface WrapperProps extends Props {
  children: ReactNode;
}

const Wrapper = ({ href, children, onClick }: WrapperProps) => {
  if (href) {
    return (
      <Link href={href}>
        <a>{children}</a>
      </Link>
    );
  }

  return <div onClick={onClick}>{children}</div>;
};

const Image = ({ imgSrc, icon, title, imageClassName }: Props) => {
  const baseClasses = 'm-auto mt-3';
  if (imgSrc) {
    return <img alt={title} src={imgSrc} className={cn(baseClasses, 'h-12 w-12', imageClassName)} />;
  }

  if (icon) {
    return <Icon icon={icon} className={cn('text-4xl current-stroke', baseClasses, imageClassName)} />;
  }

  return <div className={cn(baseClasses, imageClassName)} />;
};

const PanelIcon = (props: Props) => {
  return (
    <Wrapper {...props}>
      <div className="w-40 h-40 mb-4 mr-4 text-center">
        <Panel fit={false}>
          <Image {...props} />
          <H3 className="mt-6">{props.title}</H3>
        </Panel>
      </div>
    </Wrapper>
  );
};

export default PanelIcon;
