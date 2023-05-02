import { createEl } from '../helpers/helpers';

class ScreenService {
    textAreaEl = createEl(
        'textarea',
        ['keyboard-textarea'],
        [
            [
                'placeholder',
                `This keyboard was created on Windows!
Shift + Alt - language switching 
Click here and start. ^.^,`,
            ],
        ]
    );

    funcKeys = [
        'ShiftLeft',
        'ShiftRight',
        'Backspace',
        'Tab',
        'ArrowLeft',
        'ArrowRight',
        'ArrowUp',
        'ArrowDown',
        'AltLeft',
        'AltRight',
        'Delete',
        'CapsLock',
        'ControlLeft',
        'ControlRight',
        'Win',
    ];

    isShift = false;

    isCapsLock = false;

    isAlt = false;

    prevValue = '';

    constructor() {
        this.textAreaEl.focus();
    }

    getCursorPosition(cb) {
        const cursorPosition = this.textAreaEl.selectionStart;
        const pos = cb(cursorPosition);
        this.textAreaEl.setSelectionRange(pos, pos);
        this.textAreaEl.focus();
    }

    shiftKeyHandler() {
        this.isShift = !this.isShift;
    }

    capsLockKeyHandler() {
        this.isCapsLock = !this.isCapsLock;
    }

    arrowLeftKeyHandler() {
        this.getCursorPosition((cursorPosition) =>
            cursorPosition - 1 >= 0 ? cursorPosition - 1 : 0
        );
        this.textAreaEl.focus();
    }

    altKeyHandler() {
        this.isAlt = !this.isAlt;
    }

    arrowRightKeyHandler() {
        this.getCursorPosition((cursorPosition) => cursorPosition + 1);
    }

    deleteKeyHandler() {
        this.getCursorPosition((cursorPosition) => {
            this.textAreaEl.textContent =
                this.textAreaEl.textContent.slice(0, cursorPosition) +
                this.textAreaEl.textContent.slice(cursorPosition + 1);
            return cursorPosition;
        });
    }

    tabKeyHandler() {
        this.getCursorPosition((cursorPosition) => {
            const left = this.textAreaEl.textContent.slice(0, cursorPosition);
            const right = this.textAreaEl.textContent.slice(cursorPosition);
            this.textAreaEl.textContent = `${left}\t${right}`;
            return cursorPosition + 1;
        });
    }

    backspaceKeyHandler() {
        this.getCursorPosition((cursorPosition) => {
            this.textAreaEl.textContent =
                this.textAreaEl.textContent.slice(0, cursorPosition - 1) +
                this.textAreaEl.textContent.slice(cursorPosition);
            return cursorPosition - 1;
        });
    }

    spaceKeyHandler() {
        this.getCursorPosition((cursorPosition) => {
            const left = this.textAreaEl.textContent.slice(0, cursorPosition);
            const right = this.textAreaEl.textContent.slice(cursorPosition);
            this.textAreaEl.textContent = `${left} ${right}`;
            return cursorPosition + 1;
        });
    }

    enterKeyHandler() {
        this.getCursorPosition((cursorPosition) => {
            const left = this.textAreaEl.textContent.slice(0, cursorPosition);
            const right = this.textAreaEl.textContent.slice(cursorPosition);
            this.textAreaEl.textContent = `${left}\n${right}`;
            return cursorPosition + 1;
        });
    }

    inputSymbolHandler(code, layer) {
        const register =
            (this.isShift && this.isCapsLock) ||
            (!this.isShift && !this.isCapsLock)
                ? 'small'
                : 'shift';

        const key = layer.find((k) => code === k.code);
        if (!key) return;

        const symbol = layer.find((it) => code === it.code)[register];

        this.getCursorPosition((cursorPosition) => {
            const left = this.textAreaEl.textContent.slice(0, cursorPosition);
            const right = this.textAreaEl.textContent.slice(cursorPosition);
            this.textAreaEl.textContent = `${left}${symbol}${right}`;
            return cursorPosition + 1;
        });
        this.textAreaEl.focus();
    }

    arrowUpKeyHandler() {
        this.getCursorPosition((cursorPosition) => {
            const sections = this.textAreaEl.textContent.split('\n');
            const currentSection = sections.reduce(
                (acc, el, ind) => {
                    if (acc.col + el.length + ind < cursorPosition) {
                        const col = acc.col + el.length;
                        acc.col = col;
                        acc.ind = ind;
                    }
                    return acc;
                },
                { col: 0, ind: 0 }
            );

            if (currentSection.col !== 0) {
                const difference =
                    cursorPosition - currentSection.col - currentSection.ind;
                if (sections[currentSection.ind].length < difference) {
                    return currentSection.col + currentSection.ind;
                }

                return (
                    currentSection.col +
                    currentSection.ind -
                    sections[currentSection.ind].length +
                    difference -
                    1
                );
            }

            return cursorPosition;
        });
    }

    arrowDownKeyHandler() {
        this.getCursorPosition((cursorPosition) => {
            // console.log(cursorPosition);
            const sections = this.textAreaEl.textContent.split('\n');
            const currentSection = sections.reduce(
                (acc, el, ind) => {
                    if (acc.col + el.length + ind <= cursorPosition) {
                        // console.log(ind);
                        const col = acc.col + el.length;
                        acc.col = col;
                        acc.ind = ind + 1;
                    }
                    return acc;
                },
                { col: 0, ind: 0 }
            );

            const difference =
                cursorPosition -
                currentSection.col +
                currentSection.ind -
                sections[currentSection.ind].length;
            // console.log(`fdfd${currentSection.col + difference - 1}`);
            //
            // console.log('----------------------');
            // console.log(difference);
            // console.log(currentSection.col);
            // console.log(sections[currentSection.ind].length);
            // console.log(currentSection.ind);
            // console.log('----------------------');

            return (
                sections[currentSection.ind].length -
                difference +
                currentSection.ind +
                1
            );

            // return currentSection.col + sections[currentSection.ind].length + currentSection.ind;
        });
    }
}

const screenService = new ScreenService();

export default screenService;
