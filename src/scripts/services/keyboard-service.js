import EventObserver from '../helpers/event-observer';
import Key from '../components/key';
import languageService from './language-service';
import keyLayouts from '../helpers/key-layouts';
import { createEl } from '../helpers/helpers';

class KeyboardService {
    keyLayers = keyLayouts;

    keyboard = createEl('div', ['keyboard-container']);

    keydownObserver = new EventObserver();

    keyupObserver = new EventObserver();

    clickObserver = new EventObserver();

    isShifted = false;

    isCapslock = false;

    constructor() {
        this.languageService = languageService;
        this.keyLayer = this.LanguageLayer.map((keyInfo) => new Key(keyInfo));
        this.keydownObserver.subscribe(this.highlightKey.bind(this));
        this.keydownObserver.subscribe(this.rotateKeys.bind(this));
        this.keyupObserver.subscribe(this.clearPrevVal.bind(this));
    }

    get LanguageLayer() {
        return this.keyLayers[this.languageService.lang];
    }

    toggleLayer() {
        this.languageService.toggleLanguage();
        const lang = this.LanguageLayer;
        this.keyLayer = this.keyLayer.map((key, ind) => {
            key.updateKey(lang[ind]);
            return key;
        });
    }

    rotateKeys(e) {
        if (
            this.prevValue ||
            this.prevValue === 'ShiftLeft' ||
            this.prevValue === 'ShiftRight'
        )
            return;
        if (e.code !== 'ShiftLeft' && e.code !== 'ShiftRight' && e.code !== 'CapsLock') return;
        this.prevValue = e.code;
        this.keyboard.classList.toggle('rotate');
    }

    clearPrevVal() {
        if (
            !(this.prevValue === 'ShiftLeft' || this.prevValue === 'ShiftRight')
        )
            return;
        this.prevValue = '';
        this.keyboard.classList.toggle('rotate');
    }

    highlightKey(e) {
        if(e.code === 'CapsLock') {
            this.rotateKeys(e);
            const key = this.keyLayer.find((el) => el.code === 'CapsLock');
            key.highlightKey();
            return;
        }

        const key = this.keyLayer.find((el) => el.code === e.code);
        key.highlightKey();
        setTimeout(() => {
            key.highlightKey();
        }, 500);
    }
}

const keyboardService = new KeyboardService();

export default keyboardService;
