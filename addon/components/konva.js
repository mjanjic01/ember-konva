import {setComponentManager} from '@glimmer/manager';
import KonvaComponentManager from 'ember-konva/component-managers/konva';
import applyNodeProps from 'ember-konva/utils/apply-node-props';
import updatePicture from 'ember-konva/utils/update-picture';

class KonvaComponent {
  konvaNode
  oldProps = {}

  static create() {
    return new this(...arguments);
  }

  constructor(KonvaNode, props) {
    this.konvaNode = new KonvaNode({...props});
    props.parent.add(this.konvaNode);
    this.setProperties(props)
    props.didInsert?.(this.konvaNode);
  }

  setProperties(props) {
    applyNodeProps(this.konvaNode, props, this.oldProps);
    this.oldProps = props;
  }

  destroy() {
    this.oldProps.willDestroy?.(this.konvaNode);
    updatePicture(this.konvaNode);
    this.konvaNode.destroy();
  }
}

export default setComponentManager(owner => new KonvaComponentManager(owner), KonvaComponent);
