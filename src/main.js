import './styles/style.scss';
import Keyboard from './scripts/keyboard';

const root = document.getElementById('root');
const keyboard = new Keyboard(root);
keyboard.bootstrap();
const olololo = (a, b) => a + b;

olololo(4, 4);
