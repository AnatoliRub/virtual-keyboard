import { appendEl, createEl } from '../helpers/helpers';

class Key {
    mdButtons = ['Backspace', 'Tab', 'Delete', 'CapsLock', 'ShiftLeft'];

    xlButtons = ['Enter', 'ShiftRight'];

    key;

    subtitle;

    title;

    constructor(key) {
        this.small = key.small;
        this.shift = key.shift;
        this.code = key.code;
        this.createKey();
    }

    get Key() {
        return this.key;
    }

    highlightKey() {
        this.key.classList.toggle('highlight');
    }

    createKey() {
        const subtitle = createEl('div', ['key-subtitle']);
        const title = createEl('div', ['key-title']);
        const keyWrapper = createEl('div', ['key-wrapper']);
        this.key = createEl('button', ['key']);

        subtitle.innerHTML = this.shift;
        title.innerHTML = this.small;
        appendEl(keyWrapper, subtitle);
        appendEl(keyWrapper, title);
        appendEl(this.key, keyWrapper);
        this.setSizeButton();
        this.setSpecialClasses();

        this.subtitle = subtitle;
        this.title = title;
    }

    setSpecialClasses() {
        if (this.code.match(/[0-9]/)) {
            this.key.classList.add('key__number');
            return;
        }

        if (
            this.code.match(
                /Del|Backsp|Tab|Caps|ShiftL|ShiftR|Enter|Contr|Win|Alt|ArrowRight|ArrowLeft|ArrowDown|ArrowUp/
            )
        ) {
            this.key.classList.add('key__func');
            return;
        }

        this.key.classList.add('key__letter');
    }

    setSizeButton() {
        if (this.mdButtons.includes(this.code))
            this.key.classList.add('button-md');

        if (this.xlButtons.includes(this.code))
            this.key.classList.add('button-xl');

        if (this.code === 'Space') this.key.classList.add('button-xxl');
    }

    updateKey(info) {
        this.small = info.small;
        this.shift = info.shift;
        this.code = info.code;

        this.subtitle.innerHTML = this.shift;
        this.title.innerHTML = this.small;
    }
}

export default Key;
