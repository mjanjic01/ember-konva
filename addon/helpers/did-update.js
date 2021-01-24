import Helper from '@ember/component/helper';
import { assert } from '@ember/debug';

export default class DidUpdateHelper extends Helper {
  didRun = false;

  compute(positional, named) {
    const fn = positional[0];
    assert(
      `\`{{did-update fn}}\` expects a function as the first parameter. You provided: ${fn}`,
      typeof fn === 'function'
    );
    if (!this.didRun) {
      this.didRun = true;

      // Consume individual properties to entangle tracking.
      // https://github.com/emberjs/ember.js/issues/19277
      positional.forEach(() => {});
      Object.values(named);

      return;
    }
    fn(positional.slice(1), named);
  }
}
