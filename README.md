simditor-markdown
=============

Add a markdown editing button for Simditor. Use [markdown-it](https://github.com/markdown-it/markdown-it) as markdown parser and [upndown](https://github.com/netgusto/upndown) as HTML to markdown converter.

*This fork fixed XSS issue in unmaintained package marked, install failed issue with old to-markdown package*


### Usage

Reference button and dependency script on your page with Simditor:

```html
<script type="text/javascript" src="https://unpkg.com/markdown-it@8.3.1/dist/markdown-it.min.js"></script>
<script type="text/javascript" src="https://unpkg.com/upndown@2.1.0/lib/upndown.bundle.min.js"></script>
<script type="text/javascript" src="[path]/simditor-markdown.js"></script>

<link rel="stylesheet" href="[path]/simditor-markdown.css" media="screen" charset="utf-8" />
```

Add markdown button config when you initialize Simditor:

```js
var editor = new Simditor({
  textarea: $('#txt-editor'),
  toolbar: ['bold', 'italic', 'underline', 'color', '|', 'ol', 'ul', '|', 'markdown']
});
```

### Options

If you want to switch to markdown mode right after Simditor initialized, pass `markdown: true` to Simditor init options:

```js
var editor = new Simditor({
  textarea: $('#txt-editor'),
  markdown: true,
  toolbar: ['bold', 'italic', 'underline', 'color', '|', 'ol', 'ul', '|', 'markdown']
});
```
