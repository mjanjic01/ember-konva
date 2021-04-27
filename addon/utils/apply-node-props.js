// adopted from: https://github.com/konvajs/react-konva/blob/master/src/makeUpdates.js

import config from 'ember-get-config';
import updatePicture from 'ember-konva/utils/update-picture';

const propsToSkip = { parent: true, didInsert: true, willDestroy: true };
const EVENTS_NAMESPACE = 'ember-konva-event';
const useStrictMode = config['ember-konva'].strictMode;

export default function applyNodeProps(instance, props = {}, oldProps = {}) {
  for (const key in oldProps) {
    if (propsToSkip[key]) {
      continue;
    }
    const isEvent = key.slice(0, 2) === 'on';
    const hasPropChanged = oldProps[key] !== props[key];

    if (isEvent && hasPropChanged) {
      let eventName = key.substr(2).toLowerCase();
      if (eventName.substr(0, 7) === 'content') {
        eventName = `content${eventName.substr(7, 1).toUpperCase()}${eventName.substr(8)}`;
      }
      instance.off(eventName, oldProps[key]);
    }

    const toRemove = !props.hasOwnProperty(key);
    if (toRemove) {
      instance.setAttr(key, undefined);
    }
  }

  let hasUpdates = false;
  const strictUpdate = useStrictMode || props._useStrictMode;
  const updatedProps = {};
  const newEvents = {};

  for (const key in props) {
    if (propsToSkip[key]) {
      continue;
    }
    const isEvent = key.slice(0, 2) === 'on';
    const shouldAddProp = oldProps[key] !== props[key];
    if (isEvent && shouldAddProp) {
      let eventName = key.substr(2).toLowerCase();
      if (eventName.substr(0, 7) === 'content') {
        eventName = `content${eventName.substr(7, 1).toUpperCase()}${eventName.substr(8)}`;
      }

      if (props[key]) {
        newEvents[eventName] = props[key];
      }
    }
    if (
      !isEvent &&
      (props[key] !== oldProps[key] ||
      (strictUpdate && props[key] !== instance.getAttr(key)))
    ) {
      hasUpdates = true;
      updatedProps[key] = props[key];
    }
  }

  if (hasUpdates) {
    instance.setAttrs(updatedProps);
    updatePicture(instance);
  }

  for (const eventName in newEvents) {
    instance.on(`${eventName}.${EVENTS_NAMESPACE}`, newEvents[eventName]);
  }
}
