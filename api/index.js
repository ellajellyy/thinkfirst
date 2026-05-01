'use strict';

// Load env from v1/Prototype/.env before server.js tries its own dotenv call
require('dotenv').config({ path: require('path').join(__dirname, '../v1/Prototype/.env') });

module.exports = require('../v1/Prototype/backend/server');
