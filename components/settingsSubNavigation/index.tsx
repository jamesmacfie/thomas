import React from 'react';
import cn from 'classnames';
import { withRouter, SingletonRouter } from 'next/router';
import Link from 'next/link';

interface SubNavigationItem {
  url: string;
  title: string;
}

interface Props {
  router: SingletonRouter;
}

const items: SubNavigationItem[] = [
  {
    url: '/settings/accounts',
    title: 'Accounts'
  },
  {
    url: '/settings/test',
    title: 'Something else'
  },
  {
    url: '/settings/test2',
    title: 'Another thing'
  }
];

const SubNavigation = ({ router }: Props) => {
  return (
    <ul className="list-reset h-full relative double-border-right w-48">
      {items.map(item => {
        const aClasses = cn('p-3 w-full', {
          'text-white': router.pathname === item.url,
          'text-grey-darker': router.pathname !== item.url
        });
        return (
          <li key={item.url} className="w-full relative double-border-bottom h-16 flex items-center">
            <Link href={item.url}>
              <a className={aClasses}>{item.title}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default withRouter(SubNavigation);
