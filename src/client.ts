import { makeDOMDriver } from '@cycle/dom';
import { makeHistoryDriver } from '@cycle/history';
import { run } from '@cycle/run';

import App from './app';

run(App, {
  DOM: makeDOMDriver('#content'),
  history: makeHistoryDriver(),
});
