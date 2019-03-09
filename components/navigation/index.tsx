import React from 'react';
import Link from 'next/link';
import styles from './styles.css';
export interface NavItem {
  url: string;
  name: string;
}

const Navigation = () => {
  return (
    <nav className="h-screen w-48">
      <ul>
        {((window as any)._thomas_nav_items as [NavItem]).map(n => (
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

export default Navigation;
