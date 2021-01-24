// adapted FROM: https://github.com/lavrton/react-konva/blob/master/src/react-konva-fiber.js

import updatePicture from 'ember-konva/utils/update-picture';

const propsToSkip = { parent: true };

export default function applyNodeProps(
  instance,
  props = {},
  oldProps = {}
) {
  var updatedProps = {};
  var hasUpdates = false;
  for (let key in oldProps) {
    if (propsToSkip[key]) {
      continue;
    }
    var isEvent = key.slice(0, 2) === 'on';
    var propChanged = oldProps[key] !== props[key];
    if (isEvent && propChanged) {
      var eventName = key.substr(2).toLowerCase();
      instance.off(eventName, oldProps[key]);
    }
    var toRemove = !props.hasOwnProperty(key);
    if (toRemove) {
      instance.setAttr(key, undefined);
    }
  }
  for (let key in props) {
    if (propsToSkip[key]) {
      continue;
    }
    let isEvent = key.slice(0, 2) === 'on';
    var toAdd = oldProps[key] !== props[key];
    if (isEvent && toAdd) {
      let eventName = key.substr(2).toLowerCase();
      if (props[key]) {
        instance.off(eventName);
        instance.on(eventName, props[key]);
      }
    }
    if (!isEvent && props[key] !== oldProps[key]) {
      hasUpdates = true;
      updatedProps[key] = props[key];
    }
  }

  if (hasUpdates) {
    instance.setAttrs(updatedProps);
    updatePicture(instance);
  }
}
