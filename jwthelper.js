#!/usr/bin/env node
require('@fonos/certs/dist/run.js')

const { waitFile } = require('wait-file')
const { join } = require('path')
const { homedir } = require('os')
const { copy } = require('fs-extra')
const fs = require('fs')
const src = join(homedir(), '.fonos')
const dest = join(homedir(), '/access')
const pathToConfig = join(src, 'config')

waitFile({resources: [pathToConfig, join(src, 'jwt.salt')]})

function printAccessInfo() {
  const data = fs.readFileSync(pathToConfig)
  const formatted = JSON.stringify(JSON.parse(data), undefined, 2)
  console.log()
  console.log('ACCESS CONFIG:')
  console.log()
  console.log(formatted)
  console.log()
}

function main() {
  copy(src, dest, function (err) {
    if (err){
        console.log('An error occured while copying the folder.')
        return console.error(err)
    }
    if (process.env.PRINT_ACCESS_INFO === 'true') printAccessInfo()
  })
}

main()
