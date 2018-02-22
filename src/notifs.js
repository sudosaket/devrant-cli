import { plog } from "./common";

const Preferences = require("preferences");
const axios = require('axios');

const prefs = new Preferences("devrant-cli");
const api = axios.create({
    baseURL: 'https://devrant.com/api'
});

export const notifs = function (opts) {
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