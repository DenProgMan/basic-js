import { NotImplementedError } from '../extensions/index.js';

/**
 * Extract season from given date and expose the enemy scout!
 *
 * @param {Date | FakeDate} date real or fake date
 * @returns {String} time of the year
 *
 * @example
 *
 * getSeason(new Date(2020, 02, 31)) => 'spring'
 *
 */
const season = {
    '0': 'winter', //january
    '1': 'winter',
    '2': 'spring',
    '3': 'spring',
    '4': 'spring',
    '5': 'summer',
    '6': 'summer',
    '7': 'summer',
    '8': 'autumn',
    '9': 'autumn',
    '10': 'autumn',
    '11': 'winter',
};

export default function getSeason(date) {
    if (!date) {
        return 'Unable to determine the time of year!';
    }

    let month = 0;
    try {
        month = date.getUTCMonth();
    } catch (error) {
        throw new Error('Invalid date!');
    }

    return season[month];
}
