ember-konva
==============================================================================

Ember component bindings for the [Konva](https://konvajs.org/) canvas library



Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above
* Node.js v8 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-konva
```


Usage
------------------------------------------------------------------------------

Installation

```
ember install ember-konva
```

Examples

```js
```

```hbs
{{!-- app/components/konva-example.hbs --}}

<Konva::Stage
  @width={{1440}}
  @height={{800}}
  as |stage|
>
  <stage.Layer as |layer|>
    <layer.Text
      @text="Hello ember-konva!"
      @x={{200}}
      @y={{100}}
      @fill="#A5D6FF"
    />
  </stage.Layer>
</Konva::Stage>
```
Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
