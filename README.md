Polymer as proper JavaScript dependency
============================

Unfortunately Polymer comes only as HTML source, so to properly Polymer you need to generate the polymer.js yourself.
Instead of just exposing a global, this package gives you a CommonJS module!

Use your favorite JS dependency manager to install it

```
jspm i github:greenify/polymer-js
```

bower:

```
bower install polymer-js
```

```
npm install polymer-js
```

Warning
-------

This is an unofficial fork, it might be not updates as regularly.
I would be very happy if the Polymer team includes a `Polymer.js` into their build toolchain.

Building
--------

Basically this small script concatenates polymer-micro, polymer-mini and polymer.
Afterwards it strips `<script>` tags, HTML comments and included `<link>` for HTML Imports.
