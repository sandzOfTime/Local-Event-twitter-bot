require('dotenv').config({ path: 'variables.env' });
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Initialize firestore database
let db = admin.firestore();

// User defined modules
const eventApi = require('./api/eventApi');
const eventUtil = require('./util/eventUtil');
const twitter = require('./api/twitter');



/**
 * Stores JSON receieved from API into firestore database
 */
var storeContents = async () => {

    try {
        
        //When storing multiple records in firestore, a batch must be initialized
        var batch = db.batch();

        var response = await eventApi.getEvents(process.env.URL, process.env.API_ACCESS_TOKEN);



        // Loop through JSON array and store each object in database
        response.data.forEach((newElement) => {

            var element = eventUtil.getEventCategory(newElement);

            console.log(`Storing eventId: ${element.id}, eventName: ${element.name}`);

            var eventRef = db.collection('events').doc(element.id);

            batch.set(eventRef, element, { merge: true });

        });

        batch.commit()
            .then(() => {
                return console.log('Elements stored');
            })
            .catch(() => {
                console.log(error);
            })

    } catch (error) {

        console.log(error);

    }



}


/**
 * Firebase Cloud Function :: Cron job that runs 3 times a day. Calls StoreContents function
 */
exports.storeLocalEvents = functions.pubsub.schedule('30 10,16,21 * * *').timeZone('America/New_York').onRun(async (context) => {


    try {
        await storeContents();

    } catch (error) {

        console.log(error);

    }

    return null;

});


/**
 * Firebase Cloud Function :: Database trigger that tweets a new event everytime it is stored for the first time in Firestore
 */
exports.tweetNewEvent = functions.firestore.document('events/{eventId}').onCreate(async (snap, context) => {
    //retrieve event
    const event = snap.data();

    //upload the image to twitter and retrieve its imageId
    var imageIds = await twitter.uploadEventImage(event.cover.source, `${event.name}`);

    //Build the status
    var status = eventUtil.formStatus(event);

    //Post new event tweet
    await twitter.postEvents(status, imageIds);


})