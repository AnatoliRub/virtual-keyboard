import { createEl } from '../helpers/helpers';
import keyboardService from '../services/keyboard-service';

class Screen {
    textAreaEl = createEl('textarea', ['keyboard-textarea']);

    prevValue = '';

    funcKeys = [
        'ShiftLeft',
        'ShiftRight',
        'Backspace',
        'Tab',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'AltLeft',
        'AltRight',
        'Delete',
        'CapsLock',
    ];

    isCapsLock = false;

    constructor() {
        this.keyboardService = keyboardService;
        this.keyboardService.keydownObserver.subscribe(
            this.keyDownHandler.bind(this)
        );
        // this.keyboardService.clickObserver.subscribe(this.log.bind(this));
        this.keyboardService.keyupObserver.subscribe(
            this.keyupHandler.bind(this)
        );
    }

    get TextArea() {
        return this.textAreaEl;
    }

    keyupHandler() {
        this.clearPreviousValue();
    }

    clearPreviousValue() {
        this.prevValue = '';
    }

    getCursorPosition(cb) {
        const cursorPosition = this.textAreaEl.selectionStart;
        const pos = cb(cursorPosition);
        this.textAreaEl.setSelectionRange(pos, pos);
        this.textAreaEl.focus();
    }

    keyDownHandler(e) {
        e.preventDefault();
        console.log(e.code);
        this.textAreaEl.focus();
        if (!this.prevValue) this.prevValue = e.code;

        if (e.code === 'Enter') {
            this.textAreaEl.textContent += '\n';
            this.getCursorPosition((cursorPosition) => cursorPosition - 1);
            return;
        }

        if (e.code === 'Space') {
            this.textAreaEl.textContent += ' ';
            this.getCursorPosition((cursorPosition) => cursorPosition - 1);
            return;
        }

        if (e.code === 'CapsLock') {
            this.isCapsLock = !this.isCapsLock;
            console.log(this.isCapsLock);
        }

        if (e.code === 'Tab') {
            this.textAreaEl.textContent += '\t';
            this.getCursorPosition((cursorPosition) => cursorPosition - 1);
        }

        if (e.code === 'Backspace') {
            const cursorPosition = this.textAreaEl.selectionStart;
            this.textAreaEl.textContent =
                this.textAreaEl.textContent.slice(0, cursorPosition - 1) +
                this.textAreaEl.textContent.slice(cursorPosition);
            this.textAreaEl.setSelectionRange(
                cursorPosition - 1,
                cursorPosition - 1
            );
            this.textAreaEl.focus();
            // this.getCursorPosition((cursorPosition) => cursorPosition - 1);
        }

        if (e.code === 'Delete') {
            const cursorPosition = this.textAreaEl.selectionStart;
            this.textAreaEl.textContent =
                this.textAreaEl.textContent.slice(0, cursorPosition) +
                this.textAreaEl.textContent.slice(cursorPosition + 1);
            this.textAreaEl.setSelectionRange(cursorPosition, cursorPosition);
            this.textAreaEl.focus();
        }

        if (e.code === 'ArrowLeft') {
            this.getCursorPosition((cursorPosition) =>
                cursorPosition - 1 >= 0 ? cursorPosition - 1 : 0
            );
        }

        if (e.code === 'ArrowRight') {
            this.getCursorPosition((cursorPosition) => cursorPosition + 1);
        }

        if (e.code === 'ArrowUp') {
            const cursorPosition = this.textAreaEl.selectionStart;
            console.log(cursorPosition)
            console.log(this.textAreaEl.textContent.split('\n'));
            const sections = this.textAreaEl.textContent.split('\n');
            const currentSection = sections.reduce((acc)

        }

        if (
            (e.shiftKey && (e.code === 'AltLeft' || e.code === 'AltRight')) ||
            ((this.prevValue === 'AltLeft' || this.prevValue === 'AltRight') &&
                (e.code === 'ShiftLeft' || e.code === 'ShiftRight'))
        ) {
            this.keyboardService.toggleLayer();
            return;
        }

        if (!this.funcKeys.includes(e.code)) {
            const register = () =>
                e.shiftKey || !this.isCapsLock ? 'small' : 'shift';
            console.log(register());
            this.TextArea.textContent += this.keyboardService.keyLayer.find(
                (key) => e.code === key.code
            )[register()];
            this.getCursorPosition((cursorPosition) => cursorPosition - 1);
        }
    }
}

export default Screen;
