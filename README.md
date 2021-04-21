ember-konva
==============================================================================

![ember-konva Logo](https://github.com/mjanjic01/ember-konva/raw/master/ember-konva.png)

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

npm install konva
# OR
yarn add konva
```


Usage
------------------------------------------------------------------------------

Examples

```hbs
{{!-- app/components/konva-example.hbs --}}

<Konva::Stage
  @width={{1440}}
  @height={{800}}
  as |stage|
>
  <stage.Layer as |layer|>
    <layer.Path
      @x={{50}}
      @y={{50}}
      @data="..."
      @fill="#9B2918"
      @scale={{object x=0.4 y=0.4}}
    />

    <layer.Text
      @text="+"
      @fontSize={{36}}
      @x={{168}}
      @y={{60}}
      @fill="#020202"
    />

    <layer.Image
      @x={{200}}
      @y={{40}}
      @height={{180}}
      @width={{180}}
      @scale={{object x=0.4 y=0.4}}
      @image={{this.image}}
    />

    <layer.Text
      @text="="
      @fontSize={{36}}
      @x={{280}}
      @y={{60}}
      @fill="#020202"
    />

    <layer.Path
      @x={{315}}
      @y={{48}}
      @data="..."
      @stroke="#9B2918"
      @strokeWidth={{8}}
      @lineCap="round"
      @lineJoin="round"
      @scale={{object x=0.25 y=0.25}}
    />
  </stage.Layer>
</Konva::Stage>
```

This addon provides an `object` helper. This helper should be used instead of the ember built-in `hash` helper when passing component properties. \
Konva relies on some object prototype methods which are stripped with the hash helper ([ember apidoc](https://api.emberjs.com/ember/release/classes/Ember.Templates.helpers/methods/hash?anchor=hash))

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
