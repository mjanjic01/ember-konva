import Konva from 'konva';
import hbs from 'htmlbars-inline-precompile';
import {setComponentTemplate} from '@ember/component';
import {dasherize} from '@ember/string';
import KonvaComponent from 'ember-konva/components/konva';
import KonvaModifierManager from 'ember-konva/modifier-managers/konva';

const KONVA_CONTAINER_CLASSES = [
  'Group',
  'Layer',
  'FastLayer',
  'Label'
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
  return class extends KonvaComponent {
    constructor() {
      super(KonvaNode, ...arguments);
    }
  }
}


export function initialize(application) {
  KONVA_SHAPE_CLASSES.forEach((konvaClassName) => {
    const ComponentClass = createKonvaComponentClass(Konva[konvaClassName]);
    application.register(`component:konva/${dasherize(konvaClassName)}`, ComponentClass);
  });

  KONVA_CONTAINER_CLASSES.forEach((konvaClassName) => {
    const ComponentClass = createKonvaComponentClass(Konva[konvaClassName]);
    setComponentTemplate(hbs`
      {{yield (hash
        Arc=(component "konva/arc" parent=this._konvaNode)
        Arrow=(component "konva/arrow" parent=this._konvaNode)
        Circle=(component "konva/circle" parent=this._konvaNode)
        Ellipse=(component "konva/ellipse" parent=this._konvaNode)
        Group=(component "konva/group" parent=this._konvaNode)
        Image=(component "konva/image" parent=this._konvaNode)
        Label=(component "konva/label" parent=this._konvaNode)
        Line=(component "konva/line" parent=this._konvaNode)
        Path=(component "konva/path" parent=this._konvaNode)
        Rect=(component "konva/rect" parent=this._konvaNode)
        RegularPolygon=(component "konva/regular-polygon" parent=this._konvaNode)
        Ring=(component "konva/ring" parent=this._konvaNode)
        Sprite=(component "konva/sprite" parent=this._konvaNode)
        Star=(component "konva/star" parent=this._konvaNode)
        Tag=(component "konva/tag" parent=this._konvaNode)
        Text=(component "konva/text" parent=this._konvaNode)
        TextPath=(component "konva/text-path" parent=this._konvaNode)
        Wedge=(component "konva/wedge" parent=this._konvaNode)
      ) this._konvaNode}}
    `, ComponentClass)
    application.register(`component:konva/${dasherize(konvaClassName)}`, ComponentClass);
  });
}

export default {
  name: 'register-konva-components',
  initialize
};
