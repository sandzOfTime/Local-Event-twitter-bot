
//Will return new object with Event Category
module.exports.getEventCategory = (eventObject) => {

    var object = eventObject;

    if (!object.description) {

        object.category = 'Other'

    } else {

        var description = object.description;

        if (description.includes('food') || description.includes('delicious') || description.includes('menu')) {

            object.category = 'Food';

        } else if (description.includes('party') || description.includes('DJ') || description.includes('each and every')) {

            object.category = 'Party';

        } else if (description.includes('worship') || description.includes('church') || description.includes('prayer') || description.includes('ministry')) {

            object.category = 'Religion'

        } else if (description.includes('band') || description.includes('jazz') || description.includes('concert')) {
            object.category = 'Music'
        } else if (description.includes('Dorian') || description.includes('hurricane') || description.includes('relief')) {

            object.category = 'Hurricane Relief'

        } else if (description.includes('cancer') && description.includes('breast')) {

            object.category = 'Breast Cancer'

        } else if (description.includes('dance') || description.includes('fitness') || description.includes('weight loss')) {

            object.category = 'Fitness'

        } else if (description.includes('cigars') || description.includes('wine')) {
            object.category = 'Drinks'

        } else {
            object.category = 'Other'
        }
    }



    return object;
}



module.exports.getCategoryEmoji = (category) => {
    var eventEmoji;

    switch (category) {
        case 'Food':
            eventEmoji = "🍲🎫";
            break;

        case 'Party':
            eventEmoji = "🎉🎫";
            break;

        case 'Music':
            eventEmoji = "🎵🎫";
            break;
        case 'Religion':
            eventEmoji = "⛪🎫";
            break;
        case "Hurricane Relief":
            eventEmoji = "☮️🎫";
            break;
        case "Breast Cancer":
            eventEmoji = "🎗️🎫";
            break;
        case "Fitness":
            eventEmoji = "🏋🏽‍🎫";
            break;
        case "Drinks":
            eventEmoji = "🍸🎫";
            break;
        default:
            eventEmoji = "🎫";
            break;
    }

    return eventEmoji;

}



module.exports.formStatus = (event) => {
    
    var emoji = this.getCategoryEmoji(event.category);

    var status = `${emoji}  NEW EVENT!

    ${event.name}

    Time:     ${new Date(event.start_time).toDateString() + ' ' + returnLocalTime(new Date(event.start_time))}
    Location: ${event.place.name}
    `;

    return status;
}




var returnLocalTime = (date) => {

    var timeString;

    var eventDate = new Date(date);

    //Takes away five hours for local time zone
    eventDate.setHours(eventDate.getHours() - 5);

    return `${eventDate.toLocaleTimeString('en-US', {timeStyle: 'short'})}`;
}
