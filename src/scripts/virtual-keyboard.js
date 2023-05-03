import Screen from './components/screen';
import Keyboard from './components/keyboard';
import { createEl, appendEl } from './helpers/helpers';

class VirtualKeyboard {
    root = createEl('main', ['root'], [['id', 'root']]);

    screen = new Screen();

    keyboard = new Keyboard();

    bootstrap() {
        appendEl(document.body, this.root);
        appendEl(this.root, this.screen.TextArea);
        appendEl(this.root, this.keyboard.Keyboard);
    }
}

export default VirtualKeyboard;
