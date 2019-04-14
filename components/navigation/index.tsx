import React from 'react';
import cn from 'classnames';
import Link from 'next/link';
import { withRouter, SingletonRouter } from 'next/router';
import LayoutDashboard from '../../svg/layout-dashboard.svg';
import Cog from '../../svg/cog.svg';
import CarClouds from '../../svg/car-clouds.svg';
import WeatherEtc from '../../svg/weather-cloud-sun-wind.svg';
import Calendar from '../../svg/calendar.svg';

interface Props {
  router: SingletonRouter;
}

const items = [
  {
    icon: LayoutDashboard,
    url: '/'
  },
  {
    icon: Calendar,
    url: '/calendar'
  },
  {
    icon: WeatherEtc,
    url: '/weather'
  },
  {
    icon: CarClouds,
    url: '/traffic'
  },
  null,
  {
    icon: Cog,
    url: '/settings/accounts'
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
            'text-white': router.pathname === item.url,
            'text-grey-darker': router.pathname !== item.url
          });
          return (
            <li key={item.url}>
              <Link href={item.url}>
                <a className={aClasses}>
                  <Cmp className="w-6 h-6" />
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
