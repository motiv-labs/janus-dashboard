import R from 'ramda';
import { openResponseModal } from '../store/actions';

/**
 * @name trace
 * @desc helper function for development only.
 *          It should be used like this:
 * @example (from https://github.com/MostlyAdequate/mostly-adequate-guide/blob/master/ch5.md#debugging)
 *
 * import trace from '../utilz/trace';
 *
 * const dasherize = R.compose(
 *      join('-'),
 *      toLower,
 *      trace('after split'),
 *      split(' '),
 *      replace(/\s{2,}/ig, ' ')
 * );
 *
 * dasherize('The world is a vampire');
 * // after split [ 'The', 'world', 'is', 'a', 'vampire' ]
 */
const trace = R.curry((tag, x) => {
    console.error('trace -> ', tag, x);
    return x;
});

export default trace;
