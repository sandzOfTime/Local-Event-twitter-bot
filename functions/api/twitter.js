const Twit = require('twit');
const image2base64 = require('image-to-base64');

// Initialize twitter app
var T = new Twit({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL: true,     // optional - requires SSL certificates to be valid.
})


/**
 * Tweets events
 * @param {String} status      Contents to be tweeted
 * @param {Array} media_ids    Id(s) of media/images to be posted
 * @return {Promise}           Tweets status and image asynchonously
 */
module.exports.postEvents = (status, media_ids) => {
    return new Promise((resolve, reject) => {
        T.post('statuses/update', { status: status, media_ids: media_ids }, (err, data, response) => {
            if (err) {
                reject(err);
            }
            console.log(data)
            resolve();
        });
    });

}

/**
 * Uploads Image to Twitter. In order for an image to be posted to twitter, it must be uploaded first before the actual status, and then its Id passed as a parameter to the Post request that tweets the status - see postEvents()
 * @param {String} imagePath    Path where the image file is stored
 * @param {String} altText      Alternate text that will be displayed in the case that the image can't be displayed
 * @return {Promise}            Uploads media to Twitter asynchornously
 */
module.exports.uploadEventImage = (imagePath, altText) => {
    return new Promise(async (resolve, reject) => {
        try {
            var b64image = await image2base64(imagePath);
        } catch (error) {
            console.log(error);
        }


        T.post('media/upload', { media_data: b64image }, (err, data, response) => {
            if (err) {
                console.log(err);
            }

            var mediaIdStr = data.media_id_string
            var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

            T.post('media/metadata/create', meta_params, (err, data, response) => {
                if (err) {
                    reject(err);
                } else {
                    resolve([mediaIdStr]);
                }
            })
        })
    })
}


