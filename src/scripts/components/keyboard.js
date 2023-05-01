import { appendEl } from '../helpers/helpers';
import keyboardService from '../services/keyboard-service';

class Keyboard {
    constructor() {
        this.keyboardService = keyboardService;
        this.keyboard = keyboardService.keyboard;
        this.keyboardService.keyLayer.forEach((key) =>
            appendEl(this.keyboard, key.Key)
        );

        document.addEventListener('keydown', (e) => {
            e.preventDefault();
            this.keyboardService.keydownObserver.broadcast(e);
        });

        document.addEventListener('keyup', (e) => {
            this.keyboardService.keyupObserver.broadcast(e);
        });

        this.keyboard.addEventListener('click', (e) => {
            this.keyboardService.clickObserver.broadcast(e);
        });
    }

    get Keyboard() {
        return this.keyboard;
    }
}

export default Keyboard;
