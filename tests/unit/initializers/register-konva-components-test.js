import { module, test } from 'qunit';
import Resolver from 'ember-resolver';
import Application from '@ember/application';
import { run } from '@ember/runloop';
import { dasherize } from '@ember/string';

import { initialize } from 'dummy/initializers/register-konva-components';

const COMPONENT_NAMES = [
  'Arc',
  'Arrow',
  'Circle',
  'Ellipse',
  'Group',
  'Image',
  'Label',
  'Layer',
  'Line',
  'Path',
  'Rect',
  'RegularPolygon',
  'Ring',
  'Shape',
  'Sprite',
  'Star',
  'Tag',
  'Text',
  'TextPath',
  'Wedge'
];

module('Unit | Initializer | konva-components', function(hooks) {
  hooks.beforeEach(function() {
    this.TestApplication = class TestApplication extends Application {}
    this.TestApplication.initializer({
      name: 'konva-components',
      initialize
    });

    this.application = this.TestApplication.create({ autoboot: false, Resolver });
  });

  hooks.afterEach(function() {
    run(this.application, 'destroy');
  });

  test('it registers konva components', async function(assert) {
    await this.application.boot();

    COMPONENT_NAMES.forEach((componentName) => {
      assert.ok(
        this.application
          .__registry__
          .registrations[`component:konva/${dasherize(componentName)}`],
        `Konva ${componentName} component should be registered`
      );
    });
  });
});
