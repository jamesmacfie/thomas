import React from 'react';
import Link from 'next/link';

export interface NavItem {
  url: string;
  name: string;
}

interface Props {
  navItems: NavItem[];
}

const Navigation = ({ navItems }: Props) => {
  return (
    <nav className="w-full">
      <ul>
        {navItems.map(n => (
          <li key={n.url}>
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
