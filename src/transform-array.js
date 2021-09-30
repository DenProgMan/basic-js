import { NotImplementedError } from '../extensions/index.js';

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */

function doubleNext(arr, index, result) {
    if (arr[index + 1] && typeof(arr[index + 1]) === 'number') {
        result.push(arr[index + 1]);
    }
}

function doublePrev(arr, index, result) {
    if (arr[index - 1] && typeof(arr[index - 1]) === 'number') {
        if (arr[index - 2] && arr[index - 2] === '--discard-next') {
            return;
        }
        result.push(arr[index - 1]);
    }
}

function discardPrev(arr, index, result) {
    if (arr[index - 2] && arr[index - 2] === '--double-next') {
        result.pop();
    }
}

export default function transform(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('\'arr\' parameter must be an instance of the Array!');
    }

    const result = [];
    for (let index = 0; index < arr.length; index++) {
        const el = arr[index];
        if (typeof el === 'string') {
            switch (el) {
                case '--discard-next':
                    index++
                    break;
                case '--discard-prev':
                    discardPrev(arr, index, result);
                    break;
                case '--double-next':
                    doubleNext(arr, index, result);
                    break;
                case '--double-prev':
                    doublePrev(arr, index, result);
                    break;
                default:
                    result.push(el);
            }
        } else {
            result.push(el);
        }
    }

    return result;
}
