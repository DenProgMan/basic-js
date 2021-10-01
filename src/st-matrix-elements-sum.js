import { NotImplementedError } from '../extensions/index.js';

/**
 * Given matrix, a rectangular matrix of integers,
 * just add up all the values that don't appear below a "0".
 *
 * @param {Array<Array>} matrix
 * @return {Number}
 *
 * @example
 * matrix = [
 *  [0, 1, 1, 2],
 *  [0, 5, 0, 0],
 *  [2, 0, 3, 3]
 * ]
 *
 * The result should be 9
 */
export default function getMatrixElementsSum(matrix) {
    let result = 0;
    const skip = new Set;

    for (const line of matrix) {
        for (let index = 0; index < line.length; index++) {
            if (line[index] === 0) {
                skip.add(index);
            }
            if (skip.has(index)) {
                continue;
            }

            result += line[index];
        }
    }

    return result;
}
