import KonvaComponentManager from 'ember-konva/component-managers/konva';

export function initialize(application) {
  application.register('component-manager:konva', KonvaComponentManager);
}

export default {
  name: 'register-konva-component-manager',
  before: 'register-konva-components',
  initialize
};
