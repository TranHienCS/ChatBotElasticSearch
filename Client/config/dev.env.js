'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  URL_ONLINE: '"https://extreme-mistake.glitch.me/"',
  URL_LOCAL: '"http://localhost:4000/"',
})
