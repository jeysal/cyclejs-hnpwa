import { DOMSource, VNode } from '@cycle/dom';
import { Stream } from 'xstream';

import styles from './header-category.css';

export interface HeaderCategorySources {
  DOM: DOMSource;
  active$: Stream<boolean>;
}

export interface HeaderCategorySinks {
  DOM: Stream<VNode>;
  navigate$: Stream<any>;
}

function HeaderCategory(
  content: VNode | string,
  href: string,
  pullRight: boolean,
): (sources: HeaderCategorySources) => HeaderCategorySinks {
  return ({ DOM, active$ }) => ({
    DOM: active$.map(active => (
      <li className={styles.item + ' ' + (pullRight ? styles.pullRight : '')}>
        <a
          href={href}
          className={`${styles.link} ${active ? styles.current : ''}`}
        >
          {content}
        </a>
      </li>
    )),
    navigate$: DOM.select('li').events('click'),
  });
}

export default HeaderCategory;
