import Konva from 'konva';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import updatePicture from 'ember-konva/utils/update-picture';

export default class KonvaStage extends Component {
  @tracked konvaNode

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
    if (!Konva.isBrowser) {
      return;
    }

    this.konvaNode = new Konva.Stage({
      ...this.args,
      container: element,
    });

    updatePicture(this.konvaNode);
    this.args.afterNodeInit?.(this.konvaNode);
  }
}
