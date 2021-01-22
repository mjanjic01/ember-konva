import Konva from 'konva';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import applyNodeProps from 'ember-konva/utils/apply-node-props';
import updatePicture from 'ember-konva/utils/update-picture';

const defaults = {
  x: Math.random() * 200,
  y: Math.random() * 200,
  draggable: true,
  name: 'object',
};

// * config
export default class KonvaLabel extends Component {
  constructor() {
    super(...arguments);

    this.konvaNode = new Konva.Label({
      ...defaults,
      ...this.args
    });

    this.args.parent.add(this.konvaNode);

    updatePicture(this.konvaNode);
    this.oldProps = {...this.args};
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.konvaNode.destroy();
  }

  @action
  updateKonva([newProps]) {
    const oldProps = this.oldProps || {...this.args};
    const props = {
      ...oldProps,
      ...newProps
    };
    applyNodeProps(this.konvaNode, props, oldProps);
    this.oldProps = props;
  }
}
