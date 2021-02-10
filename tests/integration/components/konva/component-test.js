import Konva from 'konva';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render } from '@ember/test-helpers';
import {setComponentTemplate} from '@ember/component';
import KonvaComponent from 'ember-konva/components/konva';

module('Integration | Component | konva', function(hooks) {
  setupRenderingTest(hooks, {});

  test('should initialize custom konva components', async function(assert) {
    class TestKonvaComponent extends KonvaComponent {
      constructor(props) {
        super(Konva.Rect, props);
      }
    }
    this.owner.register('component:test-konva', TestKonvaComponent);
    let callCount = 0;

    this.set('didInsert', (node) => {
      callCount++;
      assert.true(node instanceof Konva.Rect);
      assert.equal(node.getAttr('x'), 15);
      assert.equal(node.getAttr('y'), 25);
      assert.equal(node.getAttr('width'), 5);
      assert.equal(node.getAttr('height'), 10);
      assert.equal(node.getAttr('fill'), '#FAFAFA');
    });

    await render(hbs`
      <Konva::Stage
        @width={{100}}
        @height={{100}}
        data-test-konva-stage
        as |stage|
      >
        <stage.Layer as |layer layerNode|>
          <TestKonva
            @parent={{layerNode}}
            @x={{15}}
            @y={{25}}
            @width={{5}}
            @height={{10}}
            @fill="#FAFAFA"
            @didInsert={{this.didInsert}}
          />
        </stage.Layer>
      </Konva::Stage>
    `);

    assert.equal(callCount, 1, 'didInsert should have been called');
    this.owner.unregister('component:test-konva');
  });

  test('should initialize custom konva components with children', async function(assert) {
    class TestKonvaComponent extends KonvaComponent {
      constructor(props) {
        super(Konva.Group, props);
      }
    }
    this.owner.register('component:test-konva', TestKonvaComponent);
    setComponentTemplate(hbs`
      <Konva::Circle
        @parent={{this.konvaNode}}
        @x={{15}}
        @y={{25}}
        @width={{10}}
        @height={{10}}
        @fill="#FAFAFA"
        @didInsert={{@didInsertChildCircle}}
      />
    `, TestKonvaComponent);
    let callCount = 0;

    this.set('didInsertChildCircle', (childCircleNode) => {
      callCount++;
      assert.true(childCircleNode instanceof Konva.Circle);
      assert.equal(childCircleNode.getAttr('x'), 15);
      assert.equal(childCircleNode.getAttr('y'), 25);
      assert.equal(childCircleNode.getAttr('width'), 10);
      assert.equal(childCircleNode.getAttr('height'), 10);
      assert.equal(childCircleNode.getAttr('fill'), '#FAFAFA');
    });

    await render(hbs`
      <Konva::Stage
        @width={{100}}
        @height={{100}}
        data-test-konva-stage
        as |stage|
      >
        <stage.Layer as |layer layerNode|>
          <TestKonva
            @parent={{layerNode}}
            @didInsertChildCircle={{this.didInsertChildCircle}}
          />
        </stage.Layer>
      </Konva::Stage>
    `);

    assert.equal(callCount, 1, 'didInsertChildCircle should have been called');
    this.owner.unregister('component:test-konva');
  });

  test('should work with component actions', async function(assert) {
    let callCount = 0;
    class TestKonvaComponent extends KonvaComponent {
      constructor(props) {
        super(Konva.Group, props);
      }

      onDidChildInit(childCircleNode) {
        callCount++;
        assert.true(childCircleNode instanceof Konva.Circle);
        assert.equal(childCircleNode.getAttr('x'), 15);
        assert.equal(childCircleNode.getAttr('y'), 25);
        assert.equal(childCircleNode.getAttr('width'), 10);
        assert.equal(childCircleNode.getAttr('height'), 10);
        assert.equal(childCircleNode.getAttr('fill'), '#FAFAFA');
      }
    }
    this.owner.register('component:test-konva', TestKonvaComponent);
    setComponentTemplate(hbs`
      <Konva::Circle
        @parent={{this.konvaNode}}
        @x={{15}}
        @y={{25}}
        @width={{10}}
        @height={{10}}
        @fill="#FAFAFA"
        @didInsert={{this.onDidChildInit}}
      />
    `, TestKonvaComponent);

    await render(hbs`
      <Konva::Stage
        @width={{100}}
        @height={{100}}
        data-test-konva-stage
        as |stage|
      >
        <stage.Layer as |layer layerNode|>
          <TestKonva
            @parent={{layerNode}}
          />
        </stage.Layer>
      </Konva::Stage>
    `);

    assert.equal(callCount, 1, 'didInsertChildCircle should have been called');
    this.owner.unregister('component:test-konva');
  });

  test('should ignore attributes', async function(assert) {
    class TestKonvaComponent extends KonvaComponent {
      constructor(props) {
        super(Konva.Rect, props);
      }
    }
    this.owner.register('component:test-konva', TestKonvaComponent);
    let callCount = 0;

    this.set('didInsert', () => {
      callCount++;
    });

    await render(hbs`
      <Konva::Stage
        @width={{100}}
        @height={{100}}
        data-test-konva-stage
        as |stage|
      >
        <stage.Layer as |layer layerNode|>
          <TestKonva
            @parent={{layerNode}}
            x={{15}}
            y={{25}}
            width={{5}}
            height={{10}}
            fill="#FAFAFA"
            didInsert={{this.didInsert}}
          />
        </stage.Layer>
      </Konva::Stage>
    `);

    assert.equal(callCount, 0, 'didInsert should not have been called');
    this.owner.unregister('component:test-konva');
  });
});
