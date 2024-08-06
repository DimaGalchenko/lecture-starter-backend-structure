
const createEvent = async (db, eventData) => {
    const [newEvent] = await db("event").insert(eventData).returning("*");
    newEvent.homeTeam = newEvent.home_team;
    newEvent.awayTeam = newEvent.away_team;
    newEvent.startAt = newEvent.start_at;
    delete newEvent.home_team;
    delete newEvent.away_team;
    delete newEvent.start_at;
    return newEvent;
}

const findEventById = async (db, eventId) => {
    return await db('event').where('id', eventId).then(([event]) => {
        return event;
    })
}

module.exports = {createEvent, findEventById}