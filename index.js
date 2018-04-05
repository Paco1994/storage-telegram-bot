"use strict";

const request = require("request");
const fs = require("fs");
const Telegraf = require("telegraf");
const Markup = require("telegraf/markup");
const config = require("config");

const doorman = require("./services/doorman");
const controllers = require("./controllers");

if (!config.telegram.token) {
  console.log("Please enter a token");
  process.exit(0);
}

const bot = new Telegraf(config.telegram.token);

// Authorization
bot.use(doorman);

bot.on("photo", controllers.receivePhoto);

bot.on("document", controllers.receiveDocument);

bot.startPolling();
