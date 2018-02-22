#!/usr/bin/env node

import { notifs } from "./notifs";
import { login } from "./login";

const program = require('commander');

program.version('0.0.4');

program
    .command('login')
    .description('authenticate yourself')
    .action(function (opts) {
        login(opts);
    });

program
    .command('notifs')
    .description('your notifications')
    .action(function (opts) {
        notifs(opts);
    });

program
    .command('post')
    .description('post a rant')
    .action(function (opts) {
        console.log("will ask you for text and post it...");
    });

program.parse(process.argv);
