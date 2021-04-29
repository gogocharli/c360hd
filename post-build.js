/**
 * Solves i18-next config error
 * @see https://github.com/isaachinman/next-i18next/issues/990
 */

const fs = require('fs-extra');

console.log('-> Copying locales directory...');
const localeSrc = './public/locales';
const localeDest = './out/public/locales';
fs.copySync(localeSrc, localeDest, { recursive: true });

const localeSrc1 = './next-i18next.config.js';
const localeDest1 = './out/next-i18next.config.js';
fs.copySync(localeSrc1, localeDest1);

const localeSrc2 = './next.config.js';
const localeDest2 = './out/next.config.js';
fs.copySync(localeSrc2, localeDest2);

console.log('Locale directory was copied successfully');
