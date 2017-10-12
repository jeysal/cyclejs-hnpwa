import { mockDOMSource } from '@cycle/dom';
import o2p from 'observable-to-promise';
import { select } from 'snabbdom-selector';
import xs from 'xstream';

import HeaderCategory from './header-category';

test('renders the basic category list item correctly', async () => {
  const doms = await o2p(
    HeaderCategory('content', '#', false)({
      DOM: mockDOMSource({}),
      active$: xs.of(false),
    }).DOM,
  );

  expect(doms).toMatchSnapshot();
});

test('adds the pull right style if requested', async () => {
  const doms = await o2p(
    HeaderCategory('content', '#', true)({
      DOM: mockDOMSource({}),
      active$: xs.of(false),
    }).DOM,
  );
  expect((doms[0].data as any).props.className).toEqual(
    expect.stringContaining('pullRight'),
  );
});

test('updates the active style', async () => {
  const doms = await o2p(
    HeaderCategory('content', '#', false)({
      DOM: mockDOMSource({}),
      active$: xs.of(false, true),
    }).DOM,
  );

  expect((select('a', doms[0])[0].data as any).props.className).not.toEqual(
    expect.stringContaining('current'),
  );
  expect((select('a', doms[1])[0].data as any).props.className).toEqual(
    expect.stringContaining('current'),
  );
});

test('emits a navigation event on click', async () => {
  const navigations = await o2p(
    HeaderCategory('content', '#', false)({
      DOM: mockDOMSource({ li: { click: xs.of({}) } }),
      active$: xs.of(false),
    }).navigate$,
  );

  expect(navigations).toHaveLength(1);
});
