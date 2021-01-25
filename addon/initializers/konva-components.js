import Konva from 'konva';
import hbs from 'htmlbars-inline-precompile';
import Component from '@glimmer/component';
import {setComponentTemplate} from '@ember/component';
import { action } from '@ember/object';
import { dasherize } from '@ember/string';

import applyNodeProps from 'ember-konva/utils/apply-node-props';
import updatePicture from 'ember-konva/utils/update-picture';

const KONVA_CONTAINER_CLASSES = [
  'Group',
  'Layer',
  'FastLayer',
  'Label',
  'Transformer'
];

const KONVA_SHAPE_CLASSES = [
  'Arc',
  'Arrow',
  'Circle',
  'Ellipse',
  'Image',
  'Line',
  'Path',
  'Rect',
  'RegularPolygon',
  'Ring',
  'Sprite',
  'Star',
  'Text',
  'Tag',
  'TextPath',
  'Wedge'
];

function createKonvaComponentClass(KonvaNode) {
  return class extends Component {
    constructor() {
      super(...arguments);

      this.konvaNode = new KonvaNode(this.props);
      this.args.parent.add(this.konvaNode);
      this.updateKonva([this.props]);
    }

    get props() {
      return {...this.args};
    }

    willDestroy() {
      super.willDestroy(...arguments);

      updatePicture(this.konvaNode);
      this.konvaNode.destroy();
    }

    @action
    updateKonva([newProps]) {
      const oldProps = this.oldProps || {};
      applyNodeProps(this.konvaNode, newProps, oldProps);
      this.oldProps = newProps;
    }
  }
}


export function initialize(application) {
  KONVA_SHAPE_CLASSES.forEach((konvaClassName) => {
    const ComponentClass = createKonvaComponentClass(Konva[konvaClassName]);
    setComponentTemplate(hbs`{{did-update this.updateKonva this.props}}`, ComponentClass)
    application.register(`component:konva/${dasherize(konvaClassName)}`, ComponentClass);
  });

  KONVA_CONTAINER_CLASSES.forEach((konvaClassName) => {
    const ComponentClass = createKonvaComponentClass(Konva[konvaClassName]);
    setComponentTemplate(hbs`
      {{yield (hash
        Arc=(component "konva/arc" parent=this.konvaNode)
        Arrow=(component "konva/arrow" parent=this.konvaNode)
        Circle=(component "konva/circle" parent=this.konvaNode)
        Ellipse=(component "konva/ellipse" parent=this.konvaNode)
        Group=(component "konva/group" parent=this.konvaNode)
        Image=(component "konva/image" parent=this.konvaNode)
        Label=(component "konva/label" parent=this.konvaNode)
        Line=(component "konva/line" parent=this.konvaNode)
        Path=(component "konva/path" parent=this.konvaNode)
        Rect=(component "konva/rect" parent=this.konvaNode)
        RegularPolygon=(component "konva/regular-polygon" parent=this.konvaNode)
        Ring=(component "konva/ring" parent=this.konvaNode)
        Sprite=(component "konva/sprite" parent=this.konvaNode)
        Star=(component "konva/star" parent=this.konvaNode)
        Tag=(component "konva/tag" parent=this.konvaNode)
        Text=(component "konva/text" parent=this.konvaNode)
        TextPath=(component "konva/text-path" parent=this.konvaNode)
        Transformer=(component "konva/transformer" parent=this.konvaNode)
        Wedge=(component "konva/wedge" parent=this.konvaNode)
      )}}
    `, ComponentClass)
    application.register(`component:konva/${dasherize(konvaClassName)}`, ComponentClass);
  });
}

export default {
  name: 'konva-components',
  initialize
};
