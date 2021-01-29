import { module, test } from 'qunit';
import object from 'ember-konva/helpers/object';


module('Unit | Helpers | object', function() {
  test('it creates objects', async function(assert) {
    assert.ok(object.compute([], {}).__proto__, 'created object should have prototype');
    assert.deepEqual(object.compute([], {}), {}, 'should create empty object');
    assert.deepEqual(object.compute([], {param: 3}), {param: 3}, 'should create object with correct property value');
    assert.deepEqual(object.compute([1, 'foo', function() {}], {}), {}, 'should ignore positional params');
  });
});
