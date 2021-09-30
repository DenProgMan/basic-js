import { NotImplementedError } from '../extensions/index.js';

/**
 * Create a repeating string based on the given parameters
 *
 * @param {String} str string to repeat
 * @param {Object} options options object
 * @return {String} repeating string
 *
 *
 * @example
 *
 * repeater('STRING', { repeatTimes: 3, separator: '**',
 * addition: 'PLUS', additionRepeatTimes: 3, additionSeparator: '00' })
 * => 'STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS**STRINGPLUS00PLUS00PLUS'
 *
 */
export default function repeater(str, options) {
    const additionArray = new Array(options.additionRepeatTimes || 1);
    additionArray.fill('' + (typeof(options.addition) !== 'undefined' ? options.addition : ''));
    const addition = additionArray.length ? additionArray.join(options.additionSeparator || '|') : '';

    return options.deep
        ? addition
        : repeater('', {
            deep: true,
            additionRepeatTimes: options.repeatTimes || 1,
            additionSeparator: options.separator || '+',
            addition: '' + str + addition,
        });
}
