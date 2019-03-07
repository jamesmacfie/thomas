import Document, { Head, Main, NextScript } from 'next/document';
import { promises as fs } from 'fs';
import capitalize from 'capitalize';
import Navigation, { NavItem } from '../components/navigation';

interface Props {
  navItems: NavItem[];
}

export default class PageDocument extends Document<Props> {
  static async getInitialProps() {
    const files = await fs.readdir('./pages');
    const navItems: NavItem[] = [
      {
        url: '/',
        name: 'Home'
      }
    ];

    for (const file of files) {
      const stat = await fs.lstat(`./pages/${file}`);
      if (stat.isDirectory()) {
        navItems.push({
          url: file,
          name: capitalize.words(file.replace('_', ' '))
        });
      }
    }

    return { navItems } as any;
  }
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link rel="stylesheet" href="/_next/static/styles.css" />
          <title>Thomas</title>
        </Head>
        <body>
          <Navigation navItems={this.props.navItems} />
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
