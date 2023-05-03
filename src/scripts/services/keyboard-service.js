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

    mouseDownObserver = new EventObserver();

    mouseUpObserver = new EventObserver();

    constructor() {
        this.languageService = languageService;
        this.keyLayer = this.LanguageLayer.map((keyInfo) => new Key(keyInfo));
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

    rotateKeys() {
        this.keyboard.classList.toggle('rotate');
    }

    highlightKeyNew(code) {
        const key = this.keyLayer.find((el) => el.code === code);

        if (key) {
            setTimeout(() => key.highlightKey(), 0);
        }
    }

    hideHighlightNew(code) {
        const key = this.keyLayer.find((el) => el.code === code);

        if (key) {
            setTimeout(() => key.hideKey(), 0);
        }
    }
}

const keyboardService = new KeyboardService();

export default keyboardService;
