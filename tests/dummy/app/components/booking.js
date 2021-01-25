import Component from '@glimmer/component';
import {tracked} from '@glimmer/tracking';
import {action} from '@ember/object';

export default class BookingComponent extends Component {
  @tracked image

  constructor() {
    super(...arguments);

    const image = new Image(20, 20);
    image.src = '/assets/images/image.png';
    image.onload = this.onImageLoad;
  }

  @action
  onImageLoad({target}) {
    this.image = target;
  }
}
