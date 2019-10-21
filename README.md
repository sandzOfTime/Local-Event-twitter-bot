# Local-Event-twitter-bot


A twitter bot that will tweet events that are happening locally (The Bahamas).
The bot uses Firebase cloud functions in order to run scheduled cron jobs to both fetch and tweet events. It fetches events from a remote API and stores them in a database. Each time a new event is stored in the database, it gets tweeted. It also tweets a reminder when a new event is coming up.

Follow the bot at https://twitter.com/eventbot242.
