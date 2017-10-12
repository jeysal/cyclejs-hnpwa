import { mockDOMSource } from '@cycle/dom';
import isolate from '@cycle/isolate';
import o2p from 'observable-to-promise';
import { select } from 'snabbdom-selector';
import xs from 'xstream';

import Header from './header';

jest.mock('./category/header-category');

afterEach(() => {
  (isolate as any).reset();
});

test('renders the category list correctly', async () => {
  const doms = await o2p(
    Header()({
      DOM: mockDOMSource({}),
      activeCategory$: xs.of('none'),
    }).DOM,
  );

  expect(doms).toMatchSnapshot();
});

test("merges the categories' navigate$s and maps them to their routes", async () => {
  const routes = await o2p(
    Header()({
      DOM: mockDOMSource({}),
      activeCategory$: xs.of('none'),
    }).router,
  );

  expect(routes).toMatchSnapshot();
});

test('activates the currently selected category', async () => {
  const doms = await o2p(
    Header()({
      DOM: mockDOMSource({}),
      activeCategory$: xs.of('top'),
    }).DOM,
  );

  const activeCategories = select('.active-true', doms[0]);
  expect(activeCategories).toHaveLength(1);
  expect(
    (select('.content', activeCategories[0])[0] as any).children[0].text,
  ).toBe('top');
});
