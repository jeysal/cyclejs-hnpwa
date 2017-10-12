import logo from '../../img/cyclejs.svg';
import styles from './header.css';

export default [
  {
    content: <img src={logo} alt="Cycle.js Logo" className={styles.logo} />,
    pullRight: false,
    href: '#',
    route: '',
  },
  {
    content: 'top',
    pullRight: false,
    href: '#',
    route: 'top',
  },
  {
    content: 'new',
    pullRight: false,
    href: '#',
    route: 'new',
  },
  {
    content: 'show',
    pullRight: false,
    href: '#',
    route: 'show',
  },
  {
    content: 'ask',
    pullRight: false,
    href: '#',
    route: 'ask',
  },
  {
    content: 'jobs',
    pullRight: false,
    href: '#',
    route: 'jobs',
  },
  {
    content: 'about',
    pullRight: true,
    href: 'https://github.com/jeysal/cyclejs-hnpwa',
    route: 'about', // does not actually exist, href is external
  },
];
