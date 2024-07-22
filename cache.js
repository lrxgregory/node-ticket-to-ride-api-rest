// cache.js
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 86400, checkperiod: 120 }); // TTL 24 h (86400 secondes)

module.exports = cache;
