import { DOMSource, VNode } from '@cycle/dom';
import xs, { Stream } from 'xstream';

export interface MainSources {
  DOM: DOMSource;
}

export interface MainSinks {
  DOM: Stream<VNode>;
}

function Main(): (sources: MainSources) => MainSinks {
  return (sources: MainSources) => ({
    DOM: xs.of(<main> </main>),
  });
}

export default Main;
