#!/usr/bin/env node

const fs = require("fs");
const { join } = require("path");
const { homedir } = require("os");
const { AuthUtils, Jwt } = require("@fonos/auth");
const authUtils = new AuthUtils(new Jwt());

if (!fs.existsSync(join(homedir(), "private_key"))) {
  console.log("Ups did not find private_key. Did you set the volume correctly?");
}

const privateKey = fs.readFileSync(join(homedir(), "private_key"), 'utf8');

authUtils.createToken(
  process.env.ACCESS_KEY_ID || "fonos",
  process.env.ISS || "fonos",
  process.env.ROLE || "USER",
  privateKey,
  process.env.EXPIRATION || "30d")
  .then(result => {
    const access = JSON.stringify({
      accessKeyId: process.env.ACCESS_KEY_ID || "fonos",
      accessKeySecret: result.accessToken
    })

    if (process.env.PRINT_ACCESS_INFO === "true") {
      console.log(access);
    }

    fs.writeFileSync(join(homedir(), "config"), access);
  })
  .catch(console.error);
