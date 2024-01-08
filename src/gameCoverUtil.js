require('dotenv').config();
var express = require('express');
var axios = require('axios');
var app = express();
var port = 3000;

var accessToken = null;
var tokenExpiry = null;

var clientId = process.env.aa9deghftj8dve3udu5vzt1uqh553p;
var clientSecret = process.env.hj6r12fb6ijsh3gljdxvsirjj29ie1;

// Function to get access token
var getAccessToken = async function() {
    try {
        var response = await axios.get('https://id.twitch.tv/oauth2/token', null, {
            params: {
                client_id: clientId,
                client_secret: clientSecret,
                grant_type: 'client_credentials'
            }
        });

        accessToken = response.data.access_token;
        tokenExpiry = new Date().getTime() + response.data.expires_in * 1000;
        return accessToken;
    } catch (error) {
        console.error('Error fetching access token:', error);
        throw error;
    }
};

// Function to refresh token if needed
var refreshTokenIfNeeded = async function() {
    var currentTime = new Date().getTime();
    if (!accessToken || currentTime >= tokenExpiry) {
        return getAccessToken();
    }
    return accessToken;
};

// Function to get game cover
var getGameCover = async function() {
    try {
        var token = await refreshTokenIfNeeded();
        var response = await axios.get('https://api.igdb.com/v4/covers', {
            fields: 'game;',
            limit: 10,
            order: 'random'
        }, {
            headers: {
                'Client-ID': clientId,
                'Authorization': 'Bearer ' + oken,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        },{
            body:'image_id;'
})
        print(response.data)
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching game cover:', error);
        throw error;
    }
};


var getGameCoverImage = async function() {
    try {
        var covers = await getGameCover();
        if (covers.length > 0) {
            var randomIndex = Math.floor(Math.random() * covers.length);
            var selectedCover = covers[randomIndex];
            return selectedCover.url || `https://images.igdb.com/igdb/image/upload/t_cover_big/${selectedCover.image_id}.jpg`;
        } else {
            throw new Error('No covers found');
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getGameCoverImage: getGameCoverImage,
    // You can also export other utility functions if needed
};
