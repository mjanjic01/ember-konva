import hbs from 'htmlbars-inline-precompile';
import {setComponentTemplate} from '@ember/component';
import {dasherize} from '@ember/string';
import KonvaComponent from 'ember-konva/components/konva';
import KonvaComponentManagerInitializer from 'ember-konva/initializers/register-konva-component-manager';

const KONVA_CONTAINER_CLASSES = [
  'Group',
  'Layer',
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

export async function initialize(application) {
  const Konva = await import('konva/konva.min.js');

  KONVA_SHAPE_CLASSES.forEach((konvaClassName) => {
    const ComponentClass = createKonvaComponentClass(Konva[konvaClassName]);
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
        Wedge=(component "konva/wedge" parent=this.konvaNode)
      ) this.konvaNode}}
    `, ComponentClass)
    application.register(`component:konva/${dasherize(konvaClassName)}`, ComponentClass);
  });
}

export default {
  name: 'register-konva-components',
  after: KonvaComponentManagerInitializer.name,
  initialize
};
