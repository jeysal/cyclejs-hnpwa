import { DOMSource, VNode } from '@cycle/dom';
import { HistoryInput } from '@cycle/history';
import isolate from '@cycle/isolate';
import xs, { Stream } from 'xstream';

import HeaderCategory from './category/header-category';

import categories from './categories';
import styles from './header.css';

export interface HeaderSources {
  DOM: DOMSource;
  activeCategory$: Stream<string>;
}

export interface HeaderSinks {
  DOM: Stream<VNode>;
  router: Stream<HistoryInput>;
}

const xstream = xs; // necessary until upgrading babel https://github.com/babel/babel/issues/6647

function Header(): (sources: HeaderSources) => HeaderSinks {
  return ({ DOM, activeCategory$ }) => {
    const categoryItems = categories.map(category => ({
      category,
      component: isolate(
        HeaderCategory(category.content, category.href, category.pullRight),
      )({
        DOM,
        active$: activeCategory$.map(
          activeCategory => category.route === activeCategory,
        ),
      }),
    }));
    return {
      router: xstream.merge(
        ...categoryItems.map(item =>
          item.component.navigate$.mapTo(item.category.route),
        ),
      ),
      DOM: xstream
        .combine(...categoryItems.map(item => item.component.DOM))
        .map(categoryItems => (
          <nav className={styles.header}>
            <ol className={styles.list}>{categoryItems}</ol>
          </nav>
        )),
    };
  };
}

export default Header;
