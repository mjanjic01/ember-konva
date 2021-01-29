import Konva from 'konva';
import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';

export default class BookingComponent extends Component {
  @tracked selectionRectX
  @tracked selectionRectY
  @tracked selectionRectWidth
  @tracked selectionRectHeight
  @tracked selectionRectVisible

  constructor() {
    super(...arguments);

    this.transformer = new Konva.Transformer();
    this.args.layer.add(this.transformer);
    this.args.layer.draw();

    this.selectionRectangle = new Konva.Rect({
      fill: 'rgba(0,0,255,0.5)',
    });
    this.args.layer.add(this.selectionRectangle);

    this.args.stage.on('mousedown touchstart', this.onMouseDown);
    this.args.stage.on('mousemove touchmove', this.onMouseMove);
    this.args.stage.on('mouseup touchend', this.onMouseUp)

  }

  @action
  onMouseDown(e) {
    // do nothing if we mousedown on any shape
    if (e.target !== this.stage) {
      return;
    }

    this.x1 = this.args.stage.getPointerPosition().x;
    this.y1 = this.args.stage.getPointerPosition().y;
    this.x2 = this.args.stage.getPointerPosition().x;
    this.y2 = this.args.stage.getPointerPosition().y;

    this.selectionRectangleVisible = true;
    this.selectionRectangleWidth = 0;
    this.selectionRectangleHeight = 0;
  }

  @action
  onMouseMove(e) {
    // do nothing if we didn't start selection
    if (!this.selectionRectVisible) {
      return;
    }

    this.x2 = this.args.stage.getPointerPosition().x;
    this.y2 = this.args.stage.getPointerPosition().y;

    this.selectionRectangleX = Math.min(this.x1, this.x2);
    this.selectionRectangleY = Math.min(this.y1, this.y2);
    this.selectionRectangleWidth = Math.abs(this.x2 - this.x1);
    this.selectionRectangleHeight = Math.abs(this.y2 - this.y1);
  }

  @action
  onMouseUp(e) {
    // do nothing if we didn't start selection
    if (!this.selectionRectVisible) {
      return;
    }

    // update visibility in timeout, so we can check it in click event
    setTimeout(() => {
      this.selectionRectangleVisible = false;
    });

    const shapes = this.args.stage.find('.rect').toArray();
    const box = this.selectionRectangle.getClientRect();
    const selected = shapes.filter((shape) =>
      Konva.Util.haveIntersection(box, shape.getClientRect())
    );

    this.transformer.nodes(selected);
    this.args.layer.batchDraw();
  }
}

// stage.on('mouseup touchend', () => {
//   // no nothing if we didn't start selection
//   if (!tselectionRectangle.visible()) {
//     return;
//   }
//   // update visibility in timeout, so we can check it in click event
//   setTimeout(() => {
//     tselectionRectangle.visible(false);
//     layer.batchDraw();
//   });

//   var shapes = stage.find('.rect').toArray();
//   var box = selectionRectangle.getClientRect();
//   var selected = shapes.filter((shape) =>
//     Konva.Util.haveIntersection(box, shape.getClientRect())
//   );
//   tr.nodes(selected);
//   layer.batchDraw();
// });
