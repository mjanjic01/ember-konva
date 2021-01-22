import Konva from 'konva';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import updatePicture from 'ember-konva/utils/update-picture';

// * config
export default class KonvaStage extends Component {
  @tracked konvaNode
  @tracked s = 20

  constructor() {
    super(...arguments);
    window.stage = this;
  }

  willDestroy() {
    super.willDestroy(...arguments);

    if (!Konva.isBrowser) {
      return;
    }

    this.konvaNode.destroy();
    this.konvaNode = null;
  }

  @action
  initializeKonva(element) {
    this._element = element;

    if (!Konva.isBrowser) {
      return;
    }

    this.konvaNode = new Konva.Stage({
      width: this.args.config.width,
      height: this.args.config.height,
      container: this._element,
    });

    updatePicture(this.konvaNode);
  }
}
