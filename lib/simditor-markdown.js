'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SimditorMarkdown = function (_Simditor$Button) {
    _inherits(SimditorMarkdown, _Simditor$Button);

    function SimditorMarkdown() {
        _classCallCheck(this, SimditorMarkdown);

        return _possibleConstructorReturn(this, (SimditorMarkdown.__proto__ || Object.getPrototypeOf(SimditorMarkdown)).apply(this, arguments));
    }

    _createClass(SimditorMarkdown, [{
        key: '_init',
        value: function _init() {
            var _this2 = this;

            _get(SimditorMarkdown.prototype.__proto__ || Object.getPrototypeOf(SimditorMarkdown.prototype), '_init', this).call(this);

            this.markdownEl = $('<div class="markdown-editor" />').insertBefore(this.editor.body);
            this.textarea = $('<textarea/>').attr('placeholder', this.editor.opts.placeholder).appendTo(this.markdownEl);

            this.textarea.on('focus', function (e) {
                return _this2.editor.el.addClass('focus');
            }).on('blur', function (e) {
                return _this2.editor.el.removeClass('focus');
            });

            this.editor.on('valuechanged', function (e) {
                if (!_this2.editor.markdownMode) {
                    return;
                }
                return _this2._initMarkdownValue();
            });

            this.markdownChange = this.editor.util.throttle(function () {
                _this2._autosizeTextarea();
                return _this2._convert();
            }, 200);

            if (this.editor.util.support.oninput) {
                this.textarea.on('input', function (e) {
                    return _this2.markdownChange();
                });
            } else {
                this.textarea.on('keyup', function (e) {
                    return _this2.markdownChange();
                });
            }

            if (this.editor.opts.markdown) {
                return this.editor.on('initialized', function () {
                    return _this2.el.mousedown();
                });
            }
        }
    }, {
        key: 'status',
        value: function status() {}
    }, {
        key: 'command',
        value: function command() {
            this.editor.blur();
            this.editor.el.toggleClass('simditor-markdown');
            this.editor.markdownMode = this.editor.el.hasClass('simditor-markdown');

            if (this.editor.markdownMode) {
                this.editor.inputManager.lastCaretPosition = null;
                this.editor.hidePopover();
                this.editor.body.removeAttr('contenteditable');
                this._initMarkdownValue();
            } else {
                this.textarea.val('');
                this.editor.body.attr('contenteditable', 'true');
            }

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = Array.from(this.editor.toolbar.buttons)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var button = _step.value;

                    if (button.name === 'markdown') {
                        button.setActive(this.editor.markdownMode);
                    } else {
                        button.setDisabled(this.editor.markdownMode);
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            return null;
        }
    }, {
        key: '_initMarkdownValue',
        value: function _initMarkdownValue() {
            var _this3 = this;

            this._fileterUnsupportedTags();
            new upndown().convert(this.editor.getValue(), function (err, markdown) {
                _this3.textarea.val(markdown);
                _this3._autosizeTextarea();
            });
            return this._autosizeTextarea();
        }
    }, {
        key: '_autosizeTextarea',
        value: function _autosizeTextarea() {
            if (!this._textareaPadding) {
                this._textareaPadding = this.textarea.innerHeight() - this.textarea.height();
            }
            return this.textarea.height(this.textarea[0].scrollHeight - this._textareaPadding);
        }
    }, {
        key: '_convert',
        value: function _convert() {
            var text = this.textarea.val();
            var markdownText = markdownit.render(text);

            this.editor.textarea.val(markdownText);
            this.editor.body.html(markdownText);

            this.editor.formatter.format();
            return this.editor.formatter.decorate();
        }
    }, {
        key: '_fileterUnsupportedTags',
        value: function _fileterUnsupportedTags() {
            return this.editor.body.find('colgroup').remove();
        }
    }], [{
        key: 'initClass',
        value: function initClass() {

            this.prototype.name = 'markdown';

            this.prototype.icon = 'markdown';

            this.prototype.needFocus = false;
        }
    }]);

    return SimditorMarkdown;
}(Simditor.Button);

exports.default = SimditorMarkdown;

SimditorMarkdown.initClass();
Simditor.Toolbar.addButton(SimditorMarkdown);

window.SimditorMarkdown = SimditorMarkdown;
