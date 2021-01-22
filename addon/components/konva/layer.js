import Konva from 'konva';
import Component from '@glimmer/component';
import updatePicture from 'ember-konva/utils/update-picture';

// * config
export default class KonvaCircle extends Component {
  constructor() {
    super(...arguments);

    this.konvaNode = new Konva.Layer();

    this.args.parent.add(this.konvaNode);

    updatePicture(this.konvaNode);
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this.konvaNode.destroy();
  }
}
