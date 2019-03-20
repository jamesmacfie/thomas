import React from 'react';
import Link from 'next/link';
import withNavItems from '../withNavItems';
import styles from './styles.css';
export interface NavItem {
  url: string;
  name: string;
}

interface Props {
  navItems: NavItem[];
}

const Navigation = ({ navItems }: Props) => {
  return (
    <nav className="h-screen w-64 flex-no-shrink">
      <ul>
        {navItems.map(n => (
          <li key={n.url} className={styles.active}>
            <Link href={n.url}>
              <a>{n.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default withNavItems(Navigation);
