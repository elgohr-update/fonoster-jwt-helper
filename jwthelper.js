#!/usr/bin/env node
require('@fonos/certs/dist/run.js')

const { waitFile } = require('wait-file')
const { join } = require('path')
const { homedir } = require('os')
const { copy } = require('fs-extra')
const src = join(homedir(), '.fonos')
const dest = '/certs'

waitFile({resources: [join(src, 'config'), join(src, 'jwt.salt')]})

async function main() {
  copy(src, dest, function (err) {
    if (err){
        console.log('An error occured while copying the folder.')
        return console.error(err)
    }
    console.log('Certificate creation completed')
  })
}

main()
