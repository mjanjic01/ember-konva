import { capabilities } from '@ember/component';

export default class KonvaComponentManager {
  capabilities = capabilities('3.13', {
    destructor: true,
    updateHook: true
  })

  createComponent(factory, args) {
    return factory.create({...args.named});
  }

  getContext(component) {
    return component;
  }

  updateComponent(component, args) {
    component.setProperties({...args.named});
  }

  destroyComponent(component) {
    component.destroy();
  }
}
