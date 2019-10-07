require('dotenv').config({ path: 'variables.env' });
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

let db = admin.firestore();

const eventApi = require('./api/eventApi');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((req, res) => {
//     res.send("Hello from Firebase!");
// });


var storeContents = async () => {

    try {

        var batch = db.batch();

        var response = await eventApi.getEvents(process.env.URL, process.env.API_ACCESS_TOKEN);



        // Loop through JSON array and store each in database
        response.data.forEach((element) => {

            var eventRef = db.collection('events').doc(element.id);

            batch.set(eventRef, element, {merge: true});

            console.log(`Storing eventId: ${element.id}, eventName: ${element.name}`);

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


exports.getLocalEvents = functions.https.onRequest(async (req, res) => {

    try {
        await storeContents();

        var eventData = [];

        var allEvents = await db.collection('events').get();

        allEvents.forEach((doc) => {
            eventData.push(doc.data());
        });

        res.send(JSON.stringify(eventData));


    } catch (error) {

        console.log(error);

        res.send(error);

    }




})