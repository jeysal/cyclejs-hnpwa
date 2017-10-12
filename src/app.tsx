import { DOMSource, VNode } from '@cycle/dom';
import { HistoryInput } from '@cycle/history';
import isolate from '@cycle/isolate';
import onionify, { Reducer, StateSource } from 'cycle-onionify';
import { routerify } from 'cyclic-router';
import { RouterSource } from 'cyclic-router/xstream-typings';
import switchPath from 'switch-path';
import xs, { Stream } from 'xstream';

import Header from './header/header';
import Main from './main/main';

interface AppSources {
  DOM: DOMSource;
  onion: StateSource<{}>;
  router: RouterSource;
}

interface AppSinks {
  DOM: Stream<VNode>;
  onion: Stream<Reducer<{}>>;
  router: Stream<HistoryInput>;
}

function App({ DOM, onion, router }: AppSources): AppSinks {
  const activeCategory$ = router
    .define({
      '/': '',
      '/:category': (category: string) => category,
    })
    .map(match => match.value);
  const header = isolate(Header())({ DOM, activeCategory$ });

  const main = isolate(Main())({ DOM });

  const view$ = xs
    .combine<VNode, VNode>(header.DOM, main.DOM)
    .map(([headerDom, mainDom]) => (
      <div>
        {headerDom}
        {mainDom}
      </div>
    ));

  return {
    DOM: view$,
    onion: xs.empty(),
    router: header.router,
  };
}

const OnionApp = onionify(App);
const RoutedOnionApp = routerify(OnionApp, switchPath);
export default RoutedOnionApp;
