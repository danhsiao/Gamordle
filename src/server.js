var express = require('express');
var axios = require('axios');
var gameCoverUtil = require('./gameCoverUtil'); // Import the custom module
var app = express();
var port = 3000;
var cors = require('cors');
app.use(cors());

app.get('/api/get-game-cover', async function(req, res) {
    try {
        var imageUrl = await gameCoverUtil.getGameCoverImage();
        res.json({ imageUrl: imageUrl });
        return imageUrl
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, function() {
    console.log(`Server running on http://localhost:${port}`);
});
