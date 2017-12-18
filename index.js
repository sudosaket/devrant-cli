var program = require('commander');
var inquirer = require('inquirer');
const axios = require('axios');
var Preferences = require("preferences");

var prefs = new Preferences("devrant-cli");
const api = axios.create({
    baseURL: 'https://www.devrant.io/api'
});

program.version('0.0.1');

program
    .command('login')
    .description('authenticate yourself')
    .action(function (opts) {
        getDevRantCredentials(function () {
            var creds = arguments[0];
            getDevRantToken(creds.username, creds.password);
        });
    });

program
    .command('notifs')
    .description('your notifications')
    .action(function (opts) {
        console.log('will list your notifications...')
    });

program
    .command('post <text>')
    .description('post a rant')
    .action(function (text, opts) {
        console.log(`will post the following text: ${text}`);
    });

program.parse(process.argv);

function getDevRantCredentials(callback) {
    var questions = [
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

    inquirer.prompt(questions).then(callback);
}

function getDevRantToken(username, password) {
    api.post('users/auth-token', {
        'app': 3,
        'username': username,
        'password': password,
    }).then(response => {
        prefs.auth_token = response.data.auth_token;
    }).catch(error => {
        plog(error.response.data);
    });
}

function plog(object) {
    console.log(JSON.stringify(object, null, 2));
}

plog(prefs);