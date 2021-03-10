import KonvaComponentManager from 'ember-konva/component-managers/konva';
import KonvaComponentsInitializer from 'ember-konva/initializers/register-konva-components';

export function initialize(application) {
  application.register('component-manager:konva', KonvaComponentManager);
}

export default {
  name: 'register-konva-component-manager',
  before: KonvaComponentsInitializer.name,
  initialize
};
