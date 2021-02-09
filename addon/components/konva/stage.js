import Konva from 'konva';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import updatePicture from 'ember-konva/utils/update-picture';

export default class KonvaStage extends Component {
  @tracked _konvaNode

  willDestroy() {
    super.willDestroy(...arguments);

    if (!Konva.isBrowser) {
      return;
    }

    this._konvaNode.destroy();
    this._konvaNode = null;
  }

  @action
  initializeKonva(element) {
    if (!Konva.isBrowser) {
      return;
    }

    this._konvaNode = new Konva.Stage({
      ...this.args,
      container: element,
    });

    updatePicture(this._konvaNode);
    this.args.afterNodeInit?.(this._konvaNode);
  }
}
