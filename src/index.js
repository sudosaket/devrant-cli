#!/usr/bin/env node

import { questions } from './login';

const program = require('commander');
const inquirer = require('inquirer');
const Preferences = require("preferences");
const axios = require('axios');

const prefs = new Preferences("devrant-cli");
const api = axios.create({
    baseURL: 'https://devrant.com/api'
});

program.version('0.0.2');

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
        fetchNotifs();
    });

program
    .command('post')
    .description('post a rant')
    .action(function (opts) {
        console.log("will ask you for text and post it...");
    });

program.parse(process.argv);

function login(opts) {
    inquirer.prompt(questions).then(function () {
        var creds = arguments[0];
        fetchAuthToken(creds.username, creds.password);
    });
}

function fetchAuthToken(username, password) {
    api.post('/users/auth-token', {
        'app': 3,
        'username': username,
        'password': password
    }).then(response => {
        prefs.auth_token = response.data.auth_token;
    }).catch(error => {
        plog(error.response.data);
    });
}

function fetchNotifs() {
    api.get('/users/me/notif-feed', {
        params: {
            'app': 3,
            'token_id': prefs.auth_token.id,
            'token_key': prefs.auth_token.key,
            'user_id': prefs.auth_token.user_id
        }
    }).then(response => {
        plog(response.data.data.unread);
    }).catch(error => {
        plog(error.response.data);
    });
}

function plog(object) {
    console.log(JSON.stringify(object, null, 2));
}
