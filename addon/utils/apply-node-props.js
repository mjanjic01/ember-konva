import updatePicture from 'ember-konva/utils/update-picture';

const propsToSkip = { parent: true, afterNodeInit: true };
const EVENTS_NAMESPACE = 'ember-konva-event';

export default function applyNodeProps(instance, props = {}, oldProps = {}) {
  const updatedProps = {};
  let hasUpdates = false;

  for (let key in oldProps) {
    if (propsToSkip[key]) {
      continue;
    }
    const isEvent = key.slice(0, 2) === 'on';
    const hasPropChanged = oldProps[key] !== props[key];
    if (isEvent && hasPropChanged) {
      const eventName = key.substr(2).toLowerCase();
      instance.off(`${eventName}.${EVENTS_NAMESPACE}`, oldProps[key]);
    }
    const toRemove = !props.hasOwnProperty(key);
    if (toRemove) {
      instance.setAttr(key, undefined);
    }
  }
  for (let key in props) {
    if (propsToSkip[key]) {
      continue;
    }
    const isEvent = key.slice(0, 2) === 'on';
    const shouldAddProp = oldProps[key] !== props[key];
    if (isEvent && shouldAddProp) {
      const eventName = key.substr(2).toLowerCase();
      if (props[key]) {
        instance.off(`${eventName}.${EVENTS_NAMESPACE}`);
        instance.on(`${eventName}.${EVENTS_NAMESPACE}`, props[key]);
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
