import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { withRouter, SingletonRouter } from 'next/router';
import LayoutDashboard from '../../svg/layout-dashboard.svg';
import Cog from '../../svg/cog.svg';

interface Props {
  router: SingletonRouter;
}

const items = [
  {
    icon: LayoutDashboard,
    url: '/'
  },
  null,
  {
    icon: Cog,
    url: '/settings'
  }
];

const Navigation = ({ router }: Props) => {
  return (
    <nav className="w-16 flex-no-shrink double-border-right relative">
      <ul className="list-reset flex flex-col ">
        {items.map(item => {
          if (!item) {
            return <li className="flex-grow" />;
          }
          const Cmp = item.icon;
          const aClasses = cn('current-stroke w-16 h-16 flex items-center justify-center', {
            'text-link': router.pathname === item.url,
            'text-grey-darker': router.pathname !== item.url
          });
          return (
            <li key={item.url}>
              <Link href={item.url}>
                <a className={aClasses}>
                  <Cmp className="w-10 h-10" />
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default withRouter(Navigation);
