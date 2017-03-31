export default class SimditorMarkdown extends Simditor.Button {
    static initClass() {

        this.prototype.name = 'markdown';

        this.prototype.icon = 'markdown';

        this.prototype.needFocus = false;
    }

    _init() {
        super._init();

        this.markdownEl = $('<div class="markdown-editor" />')
            .insertBefore(this.editor.body);
        this.textarea = $('<textarea/>')
            .attr('placeholder', this.editor.opts.placeholder)
            .appendTo(this.markdownEl);

        this.textarea.on('focus', e => {
            return this.editor.el.addClass('focus');
        }).on('blur', e => {
                return this.editor.el.removeClass('focus');
            }
        );

        this.editor.on('valuechanged', e => {
                if (!this.editor.markdownMode) {
                    return;
                }
                return this._initMarkdownValue();
            }
        );

        this.markdownChange = this.editor.util.throttle(() => {
                this._autosizeTextarea();
                return this._convert();
            }
            , 200);

        if (this.editor.util.support.oninput) {
            this.textarea.on('input', e => {
                    return this.markdownChange();
                }
            );
        } else {
            this.textarea.on('keyup', e => {
                    return this.markdownChange();
                }
            );
        }

        if (this.editor.opts.markdown) {
            return this.editor.on('initialized', () => {
                    return this.el.mousedown();
                }
            );
        }
    }

    status() {
    }

    command() {
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

        for (let button of Array.from(this.editor.toolbar.buttons)) {
            if (button.name === 'markdown') {
                button.setActive(this.editor.markdownMode);
            } else {
                button.setDisabled(this.editor.markdownMode);
            }
        }

        return null;
    }

    _initMarkdownValue() {
        this._fileterUnsupportedTags();
        new upndown().convert(this.editor.getValue(), (err, markdown) => {
            this.textarea.val(markdown);
            this._autosizeTextarea();
        });
        return this._autosizeTextarea();
    }

    _autosizeTextarea() {
        if (!this._textareaPadding) {
            this._textareaPadding = this.textarea.innerHeight() - this.textarea.height();
        }
        return this.textarea.height(this.textarea[0].scrollHeight - this._textareaPadding);
    }

    _convert() {
        let text = this.textarea.val();
        let markdownText = markdownit.render(text);

        this.editor.textarea.val(markdownText);
        this.editor.body.html(markdownText);

        this.editor.formatter.format();
        return this.editor.formatter.decorate();
    }

    _fileterUnsupportedTags() {
        return this.editor.body.find('colgroup').remove();
    }
}
SimditorMarkdown.initClass();
Simditor.Toolbar.addButton(SimditorMarkdown);

window.SimditorMarkdown = SimditorMarkdown;