
const createBet = async (db, betData, userId, multiplier, eventId) => {
    const bet = {
        id: betData.id,
        event_id: eventId,
        bet_amount: betData.betAmount,
        prediction: betData.prediction,
        multiplier: multiplier,
        user_id: userId
    };
    const [newBet] = await db("bet").insert(bet).returning("*");
    newBet.betAmount = newBet.bet_amount;
    delete newBet.bet_amount;
    newBet.createdAt = newBet.created_at;
    delete newBet.created_at;
    newBet.eventId = newBet.event_id;
    delete newBet.event_id;
    newBet.updatedAt = newBet.updated_at;
    delete newBet.updated_at;
    newBet.userId = newBet.user_id;
    delete newBet.user_id;
    return newBet;
}

module.exports = {createBet}
