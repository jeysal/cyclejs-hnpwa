import { VNode } from '@cycle/dom';
import xs from 'xstream';

import { HeaderCategorySinks, HeaderCategorySources } from '../header-category';

export default function HeaderCategory(
  content: string | VNode,
  href: string,
  pullRight: boolean,
): (sources: HeaderCategorySources) => HeaderCategorySinks {
  return ({ active$ }) => ({
    DOM: active$.map(active => (
      <span className={`active-${active}`}>
        <span className="content">{content}</span>
        <span className="href">{href}</span>
        <span className="pullRight">{pullRight}</span>
      </span>
    )),
    navigate$: xs.of('nav'),
  });
}
