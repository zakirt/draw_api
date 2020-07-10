'use strict';

const niv = require('node-input-validator');

// const rhinoSpecies = new Map([
//     ['white_rhinoceros', true],
//     ['black_rhinoceros', true],
//     ['indian_rhinoceros', true],
//     ['javan_rhinoceros', true],
//     ['sumatran_rhinoceros', true]
// ]);

// niv.extend('rhinocerosSpecies', ({ value }) => {
//     return rhinoSpecies.has(value);
// });

module.exports = niv;
