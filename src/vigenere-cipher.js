import { NotImplementedError } from '../extensions/index.js';

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 *
 * @example
 *
 * const directMachine = new VigenereCipheringMachine();
 *
 * const reverseMachine = new VigenereCipheringMachine(false);
 *
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 *
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 *
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 *
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 *
 */
export default class VigenereCipheringMachine {
    constructor(direction) {
        this.direction = direction || typeof(direction) === 'undefined';
        this.aCode = 'A'.codePointAt(0);
        this.zCode = 'Z'.codePointAt(0);
    }

    encrypt(text, key) {
        return this.encryptDecrypt(text, key, this.encryptSymbol.bind(this));
    }

    decrypt(crypt, key) {
        return this.encryptDecrypt(crypt, key, this.decryptSymbol.bind(this));
    }

    encryptDecrypt(text, key, cb) {
        if (!text || !key) {
            throw new Error('Incorrect arguments!');
        }
        text = text.toUpperCase();
        key = key.toUpperCase();

        const textArray = text.split('');
        const result = [];
        let keyIndex = 0;

        for (const symbol of textArray) {
            if (!this.isValidSymbol(symbol)) {
                result.push(symbol);
                continue;
            }

            result.push(cb(symbol, key[keyIndex]));
            keyIndex++;
            if (keyIndex >= key.length) {
                keyIndex = 0;
            }
        }

        return this.direction
            ? result.join('')
            : result.reverse().join('');
    }

    isValidSymbol(symbol) {
        const symbolCode = symbol.codePointAt(0);
        return symbolCode >= this.aCode && symbolCode <= this.zCode;
    }

    encryptSymbol(text, key) {
        const textCode = text.codePointAt(0);
        const keyCode = key.codePointAt(0);
        if (!this.isValidSymbol(text)) {
            return text;
        }

        let alphaCode = textCode +  keyCode - this.aCode;
        return String.fromCodePoint(alphaCode > 90 ? alphaCode - this.zCode + this.aCode - 1 : alphaCode);
    }

    decryptSymbol(crypt, key) {
        const cryptCode = crypt.codePointAt(0);
        const keyCode = key.codePointAt(0);
        if (!this.isValidSymbol(crypt)) {
            return crypt;
        }

        let alphaCode = cryptCode - keyCode;
        return String.fromCodePoint(alphaCode < 0 ? this.zCode + alphaCode + 1 : alphaCode + this.aCode);
    }
}
