/* global dat */

import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';

export default class GuiComponent extends Component {
  @tracked stageWidth = 1440
  @tracked stageHeight = 1440

  @tracked circleX = 50
  @tracked circleY = 200
  @tracked circleWidth = 50
  @tracked circleHeight = 50
  @tracked circleFill = '#000000'

  @tracked rectX = 100
  @tracked rectY = 175
  @tracked rectWidth = 50
  @tracked rectHeight = 50
  @tracked rectFill = '#000000'

  @tracked textX = 200
  @tracked textY = 200
  @tracked textWidth = 200
  @tracked textHeight = 50
  @tracked textFontSize = 16
  @tracked textFill = '#000000'
  @tracked textContent = 'Hello world'

  @tracked circleVisible = true
  @tracked rectVisible = true
  @tracked textVisible = true

  @tracked isCircleVisible = true
  @tracked isRectVisible = true
  @tracked isTextVisible = true

  @tracked image

  constructor() {
    super(...arguments);

    const image = new Image(20, 20);
    image.src = '/assets/images/konva.png';
    image.onload = this.onImageLoad;


    this.gui = new dat.GUI();

    const stageFolder = this.gui.addFolder('Stage');
    const circleFolder = this.gui.addFolder('Circle');
    const rectFolder = this.gui.addFolder('Rect');
    const textFolder = this.gui.addFolder('Text');

    this.gui.add(this, 'isCircleVisible');
    this.gui.add(this, 'isRectVisible');
    this.gui.add(this, 'isTextVisible');

    stageFolder.add(this, 'stageWidth', 0, 5000);
    stageFolder.add(this, 'stageHeight', 0, 5000);

    circleFolder.add(this, 'circleX', 0, 1000);
    circleFolder.add(this, 'circleY', 0, 1000);
    circleFolder.add(this, 'circleWidth', 0, 1000);
    circleFolder.add(this, 'circleHeight', 0, 1000);
    circleFolder.add(this, 'circleVisible');
    circleFolder.addColor(this, 'circleFill');

    rectFolder.add(this, 'rectX', 0, 1000);
    rectFolder.add(this, 'rectY', 0, 1000);
    rectFolder.add(this, 'rectWidth', 0, 1000);
    rectFolder.add(this, 'rectHeight', 0, 1000);
    rectFolder.add(this, 'rectVisible');
    rectFolder.addColor(this, 'rectFill');

    textFolder.add(this, 'textX', 0, 1000);
    textFolder.add(this, 'textY', 0, 1000);
    textFolder.add(this, 'textWidth', 0, 1000);
    textFolder.add(this, 'textHeight', 0, 1000);
    textFolder.add(this, 'textFontSize', 0, 100);
    textFolder.add(this, 'textContent');
    textFolder.add(this, 'textVisible');
    textFolder.addColor(this, 'textFill');
  }

  @action
  updatePosition(propName, {currentTarget}) {
    this[`${propName}X`] = currentTarget.attrs.x;
    this[`${propName}Y`] = currentTarget.attrs.y;
    this.gui.updateDisplay();
  }

  @action
  onImageLoad({target}) {
    this.image = target;
  }
}
