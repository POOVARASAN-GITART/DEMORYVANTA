const serverless = require('serverless-http');
const app = require('../../backend/index.js'); // We will export `app` from index.js

module.exports.handler = serverless(app, {
  basePath: '/.netlify/functions/api'
});
