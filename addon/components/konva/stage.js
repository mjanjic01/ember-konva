import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import applyNodeProps from 'ember-konva/utils/apply-node-props';

export default class KonvaStage extends Component {
  @tracked konvaNode
  oldProps = {}

  get props() {
    return {...this.args};
  }

  async willDestroy() {
    super.willDestroy(...arguments);

    const Konva = await import('konva/konva.min.js');

    if (!Konva.isBrowser) {
      return;
    }

    this.args.willDestroy?.(this.konvaNode);
    this.konvaNode.destroy();
    this.konvaNode = null;
  }

  @action
  async initializeKonva(element) {
    const Konva = await import('konva/konva.min.js');

    if (!Konva.isBrowser) {
      return;
    }

    this.konvaNode = new Konva.Stage({
      ...this.props,
      container: element,
    });

    this.updateKonva(this.props);
    this.args.didInsert?.(this.konvaNode);
  }

  @action
  updateKonva() {
    applyNodeProps(this.konvaNode, this.props, this.oldProps);
    this.oldProps = this.props;
  }
}
