import {setComponentManager} from '@ember/component';
import KonvaComponentManager from 'ember-konva/component-managers/konva';
import applyNodeProps from 'ember-konva/utils/apply-node-props';
import updatePicture from 'ember-konva/utils/update-picture';

class KonvaComponent {
  static create() {
    return new this(...arguments);
  }

  constructor(KonvaNode, props) {
    this._konvaNode = new KonvaNode(props);
    props.parent.add(this._konvaNode);
    this.setProperties(props)
    props.afterNodeInit?.(this._konvaNode);
  }

  setProperties(props) {
    const oldProps = this.oldProps || {};
    applyNodeProps(this._konvaNode, props, oldProps);
    this.oldProps = props;
  }

  destroy() {
    updatePicture(this._konvaNode);
    this._konvaNode.destroy();
  }
}

export default setComponentManager(owner => new KonvaComponentManager(owner), KonvaComponent);
