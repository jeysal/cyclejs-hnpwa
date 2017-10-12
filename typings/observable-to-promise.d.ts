import { Stream } from 'xstream';

declare module 'observable-to-promise' {
  export default function o2p<T>(stream: Stream<T>): Promise<T[]>;
}
