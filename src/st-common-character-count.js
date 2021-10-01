import { NotImplementedError } from '../extensions/index.js';

/**
 * Given two strings, find the number of common characters between them.
 *
 * @param {String} s1
 * @param {String} s2
 * @return {Number}
 *
 * @example
 * For s1 = "aabcc" and s2 = "adcaa", the output should be 3
 * Strings have 3 common characters - 2 "a"s and 1 "c".
 */
export default function getCommonCharacterCount(stringFirst, stringSecond) {
    const s1 = stringFirst.toLowerCase();
    const s2 = stringSecond.toLowerCase();
    const unique = new Set(`${s1}${s2}`.split(''));
    let count = 0;

    unique.forEach(symbol => {
        // count += Math.min((s1.match(new RegExp(symbol, 'g')) || []).length, (s2.match(new RegExp(symbol, 'g')) || []).length);
        count += Math.min(s1.split(symbol).length - 1, s2.split(symbol).length - 1);
    });

    return count;
}
