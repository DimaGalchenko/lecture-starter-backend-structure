const userModel = require('../models/user.model')
const eventModel = require('../models/event.model')
const oddsModel = require('../models/odds.model')
const betModel = require('../models/bet.model')

const createBet = async (db, betData, user) => {
    const userRecord = await userModel.getUserById(db, user.id);
    if (!userRecord) {
        const error = new Error('User does not exist');
        error.status = 400;
        throw error;
    }
    if (userRecord.balance < betData.betAmount) {
        const error = new Error('Not enough balance');
        error.status = 400;
        throw error;
    }
    const event = await eventModel.findEventById(db, betData.eventId);
    if (!event) {
        const error = new Error('Event not found');
        error.status = 404;
        throw error;
    }
    const odds = await oddsModel.findOddsById(db, event.odds_id);
    if (!odds) {
        const error = new Error('Odds not found');
        error.status = 404;
        throw error;
    }
    const multiplier = getMultiplier(betData.prediction, odds);
    const newBet = await betModel.createBet(db, betData, user.id, multiplier, event.id);
    await userModel.updateUserBalance(db, user.id, userRecord.balance - betData.betAmount);
    // statEmitter.emit('newBet');
    return { ...newBet, currentBalance: userRecord.balance - betData.betAmount };
}

function getMultiplier(prediction, odds) {
    switch (prediction) {
        case 'w1':
            return odds.home_win;
        case 'w2':
            return odds.away_win;
        case 'x':
            return odds.draw;
        default:
            throw new Error('Invalid prediction');
    }
}

module.exports = {createBet};