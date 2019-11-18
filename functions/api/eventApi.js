const rp = require('request-promise');

/**
 * Makes a request to the Event API and returns the response
 * @param {String} url          URL of the Event API 
 * @param {String} accessToken  Authorization token used to grant access to the API
 * @return {String}             JSON response of the API
 */
module.exports.getEvents = async (url, accessToken) => {

    var options = {
        uri: `${url}&access_token=${accessToken}`,
        json: true
    };


    try {

        var response = await rp(options);

    } catch (error) {

        console.log(error);
    }

    console.log('JSON returned')
    return response;

}



