import Konva from 'konva';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import applyNodeProps from 'ember-konva/utils/apply-node-props';
import updatePicture from 'ember-konva/utils/update-picture';

const defaults = {
  x: Math.random() * 200,
  y: Math.random() * 200,
  width: (50 + Math.random()) * 50,
  height: (50 + Math.random()) * 50,
  fill: Konva.Util.getRandomColor(),
  rotation: Math.random() * 360,
  draggable: true,
  name: 'object',
};

// * config
export default class KonvaText extends Component {
  constructor() {
    super(...arguments);

    this.konvaNode = new Konva.Text({
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
