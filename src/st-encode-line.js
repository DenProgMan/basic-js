import { NotImplementedError } from '../extensions/index.js';

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
export default function encodeLine(str) {
    if (!str.length) return '';

    const getEl = (count, symbol) => {
        return `${count === 1 ? '' : count}${symbol}`;
    }

    let count = 0;
    let lastSymbol = '';
    let result = '';
    for (const symbol of str) {
        if (!count) {
            lastSymbol = symbol;
        }
        if (lastSymbol !== symbol) {
            result += getEl(count, lastSymbol);
            lastSymbol = symbol;
            count = 1;
        } else {
            count++;
        }
    }

    return result + getEl(count, lastSymbol);
}
