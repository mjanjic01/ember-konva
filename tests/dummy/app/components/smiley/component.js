import Component from '@glimmer/component';

export default class SmileyComponent extends Component {

  get eyeY() {
    return this.args.y - this.args.radius/5;
  }

  get mouthY() {
    return this.args.y - this.args.radius*.96;
  }

  get leftEyeX() {
    return this.args.x - this.args.radius/2;
  }

  get rightEyeX() {
    return this.args.x + this.args.radius/2;
  }

  get nameX() {
    return this.args.x - this.args.radius;
  }

  get nameWidth() {
    return 2 * this.args.radius;
  }

  get nameY() {
    return this.args.y + this.args.radius + 3;
  }
}
