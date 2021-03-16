'use strict';

module.exports = {
  name: require('./package').name,

  _getAddonOptions() {
    const parentOptions = this.parent && this.parent.options;
    const appOptions = this.app && this.app.options;

    return parentOptions || appOptions || {};
  },

  config(env, baseConfig) {
    const addonOptions = this._getAddonOptions();
    const customOptions = addonOptions['ember-konva'];

    const config = {
      'ember-konva': {
        strictMode: Boolean(customOptions && customOptions.strictMode)
      }
    };

    const updatedConfig = Object.assign({}, baseConfig, config);

    return updatedConfig;
  }
};
