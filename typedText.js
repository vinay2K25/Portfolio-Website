class TypedText {
    constructor(element, config) {
        this._el          = element;
        this._strings     = config.strings       || ['Hello.'];
        this._typingSpeed = config.typingSpeed   || 80; // Delay between typing two characters!    
        this._eraseSpeed  = config.eraseSpeed    || 50; // Delay between erasing two characters!
        this._pauseTime   = config.pauseDuration || 2000; // Delay after typing a full word!

        this._currentIndex  = 0; // Index of current string!   
        this._charIndex     = 0; // Index of current character in current string!
        this._state         = 'typing'; // Current state!

        this._tick();
    }

    _tick() {
        const currentString = this._strings[this._currentIndex];

        if (this._state === 'typing') {
            this._el.textContent = currentString.slice(0, this._charIndex + 1);
            this._charIndex++; // Take all characters upto the current index in the current string when typing!

            if (this._charIndex === currentString.length) {
                this._state = 'pausing';
                setTimeout(() => {
                    this._state = 'erasing';
                    this._tick();
                }, this._pauseTime); // If we've finished typing, then wait for sometime (Pause Delay), and also set the current state to 'erasing'!
            } else {
                setTimeout(() => this._tick(), this._typingSpeed); // Otherwise, wait for sometime(Typing Delay) and stay on the 'typing' state!
            }

        } else if (this._state === 'erasing') {
            this._el.textContent = currentString.slice(0, this._charIndex - 1);
            this._charIndex--; // If current state is 'erasing', then keep all characters from index 0 to current index, and decrement index everytime!

            if (this._charIndex === 0) {
                this._currentIndex = (this._currentIndex + 1) % this._strings.length;
                this._state = 'typing';
                setTimeout(() => this._tick(), this._typingSpeed); // If we've erased the current string, wait for sometime (Typing Delay), and also set current state to typing!
            } else {
                setTimeout(() => this._tick(), this._eraseSpeed); // Otherwise, just wait for delay between erasing two characters!
            }
        }
    }
}
