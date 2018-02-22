import { plog } from "./common";

const Preferences = require("preferences");
const axios = require('axios');
const inquirer = require('inquirer');

const prefs = new Preferences("devrant-cli");
const api = axios.create({
    baseURL: 'https://devrant.com/api'
});

const questions = [
    {
        name: 'username',
        type: 'input',
        message: 'Enter your devRant username or email address:',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter your devRant username or email address';
            }
        }
    },
    {
        name: 'password',
        type: 'password',
        message: 'Enter your password:',
        validate: function (value) {
            if (value.length) {
                return true;
            } else {
                return 'Please enter your password';
            }
        }
    }
];

export const login = function (opts) {
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