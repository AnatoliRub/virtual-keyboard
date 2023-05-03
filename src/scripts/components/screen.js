import keyboardService from '../services/keyboard-service';
import screenService from '../services/screen-service';

class Screen {
    constructor() {
        this.screenService = screenService;
        this.keyboardService = keyboardService;

        this.textAreaEl = this.screenService.textAreaEl;

        this.keyboardService.keydownObserver.subscribe(
            this.keyDownHandler.bind(this)
        );
        this.keyboardService.keyupObserver.subscribe(
            this.keyUpHandler.bind(this)
        );

        this.keyboardService.mouseDownObserver.subscribe(
            this.mouseDownHandler.bind(this)
        );
        this.keyboardService.mouseUpObserver.subscribe(
            this.mouseUpHandler.bind(this)
        );
    }

    get TextArea() {
        return this.textAreaEl;
    }

    getCode(e) {
        if (e.target.classList.contains('key-title')) {
            return e.target.getAttribute('data-code');
        }

        if (e.target.classList.contains('key-subtitle')) {
            return e.target.nextSibling.getAttribute('data-code');
        }

        if (e.target.classList.contains('key')) {
            const wrapper = e.srcElement.childNodes[0];
            const title = wrapper.childNodes[1];
            return title.getAttribute('data-code');
        }

        if (e.target.classList.contains('key-wrapper')) {
            return e.srcElement.lastChild.getAttribute('data-code');
        }

        return '';
    }

    funcKeysHandler(code) {
        this.screenService.prevValue = code;

        if (code === 'AltLeft' || code === 'AltRight') {
            this.screenService.altKeyHandler();
            if (this.screenService.isShift) {
                this.keyboardService.toggleLayer();
                this.keyboardService.hideHighlightNew(code);
                this.keyboardService.hideHighlightNew(
                    this.screenService.prevValue
                );
            }
            return;
        }

        if (code === 'Enter') {
            this.screenService.enterKeyHandler();
            return;
        }

        if (code === 'Space') {
            this.screenService.spaceKeyHandler();
            return;
        }

        if (code === 'Delete') {
            this.screenService.deleteKeyHandler();
            return;
        }

        if (code === 'Backspace') {
            this.screenService.backspaceKeyHandler();
            return;
        }

        if (code === 'Tab') {
            this.screenService.tabKeyHandler();
            return;
        }

        if (code === 'ArrowLeft') {
            this.screenService.arrowLeftKeyHandler();
            return;
        }

        if (code === 'ArrowRight') {
            this.screenService.arrowRightKeyHandler();
            return;
        }

        if (code === 'ArrowUp') {
            this.screenService.arrowUpKeyHandler();
            return;
        }

        if (code === 'ArrowDown') {
            this.screenService.arrowDownKeyHandler();
            return;
        }

        if (code === 'CapsLock') {
            this.screenService.capsLockKeyHandler();
            this.keyboardService.highlightKeyNew(code);
            this.keyboardService.rotateKeys();
            return;
        }

        if (!this.screenService.funcKeys.includes(code)) {
            this.screenService.inputSymbolHandler(
                code,
                this.keyboardService.keyLayer
            );
        }
    }

    keyDownHandler(e) {
        if (
            ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') &&
                this.screenService.prevValue === 'ShiftLeft') ||
            this.screenService.prevValue === 'ShiftRight'
        ) {
            return;
        }

        if (
            (e.code === 'ShiftLeft' || e.code === 'ShiftRight') &&
            this.screenService.prevValue !== 'ShiftLeft' &&
            this.screenService.prevValue !== 'ShiftRight'
        ) {
            this.screenService.isShift = !this.screenService.isShift;
            this.keyboardService.rotateKeys();
            this.screenService.prevValue = e.code;
            this.keyboardService.highlightKeyNew(e.code);
            return;
        }

        e.preventDefault();
        this.funcKeysHandler(e.code);
        this.keyboardService.highlightKeyNew(e.code);
    }

    keyUpHandler(e) {
        e.preventDefault();

        if (e.code === 'CapsLock' && this.screenService.isCapsLock) {
            this.keyboardService.hideHighlightNew(e.code);
            return;
        }

        if (
            e.code === 'ShiftLeft' ||
            (e.code === 'ShiftRight' && e.type !== 'mouseout')
        ) {
            this.screenService.isShift = !this.screenService.isShift;
            this.keyboardService.rotateKeys();
            this.keyboardService.hideHighlightNew(e.code);
            this.screenService.prevValue = '';
            return;
        }

        if (e.code !== 'CapsLock')
            this.keyboardService.hideHighlightNew(e.code);
    }

    mouseDownHandler(e) {
        const code = this.getCode(e);

        if (code === 'ShiftLeft' || code === 'ShiftRight') {
            this.screenService.shiftKeyHandler();
            this.keyboardService.highlightKeyNew(code);
            this.keyboardService.rotateKeys();

            if (this.screenService.isAlt) {
                this.keyboardService.toggleLayer();
                this.keyboardService.hideHighlightNew(code);
                this.keyboardService.hideHighlightNew(
                    this.screenService.prevValue
                );
            }
            return;
        }

        this.funcKeysHandler(code);
        this.keyboardService.highlightKeyNew(code);
    }

    mouseUpHandler(e) {
        const code = this.getCode(e);
        if (
            (code === 'CapsLock' && this.screenService.isCapsLock) ||
            (code === 'ShiftLeft' && this.screenService.isShift) ||
            (code === 'ShiftLeft' && this.screenService.isShift) ||
            (code === 'AltLeft' && this.screenService.isAlt) ||
            (code === 'AltLeft' && this.screenService.isAlt)
        )
            return;

        this.keyboardService.hideHighlightNew(code);
    }
}

export default Screen;
