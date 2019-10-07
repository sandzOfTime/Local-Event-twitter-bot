const rp = require('request-promise');


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



