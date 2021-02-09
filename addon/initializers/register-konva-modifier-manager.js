import KonvaModifierManager from 'ember-konva/modifier-managers/konva';

export function initialize(application) {
  application.register('modifier-manager:konva', KonvaModifierManager);
}

export default {
  name: 'register-konva-modifier-manager',
  initialize
};
