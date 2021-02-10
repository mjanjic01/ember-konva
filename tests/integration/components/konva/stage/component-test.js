import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | konva/stage', function(hooks) {
  setupRenderingTest(hooks, {});

  test('should render correctly', async function(assert) {
    await render(hbs`
      <Konva::Stage
        @width={{200}}
        @height={{180}}
        data-test-konva-stage
      />
    `);

    const stageEl = this.element.querySelector('[data-test-konva-stage] > .konvajs-content');
    assert.ok(stageEl, 'Should initialize element with konva');
    assert.equal(stageEl.style.width, '200px', 'Should set correct width on stage element');
    assert.equal(stageEl.style.height, '180px', 'Should set correct height on stage element');
  });

  test('should render multiple layers as canvas elements', async function(assert) {
    await render(hbs`
      <Konva::Stage
        @width={{200}}
        @height={{180}}
        data-test-konva-stage
        as |s|
      >
        <s.Layer />
        <s.Layer />
      </Konva::Stage>
    `);

    const stageEl = this.element.querySelector('[data-test-konva-stage] > .konvajs-content');
    assert.equal(stageEl.querySelectorAll('canvas').length, 2, 'Should initialize layers as multiple canvas elements');
  });
});
