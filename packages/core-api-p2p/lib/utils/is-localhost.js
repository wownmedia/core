'use strict';

/**
 * [description]
 * @param  {*} value
 * @return {boolean}
 */
module.exports = (value) => (value === '::1' || value === '127.0.0.1' || value === '::ffff:127.0.0.1')