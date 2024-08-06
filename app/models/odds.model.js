
const findOddsById = async (db, oddsId) => {
    return await db('odds').where('id', oddsId).then(([odds]) => odds)
}

module.exports = {findOddsById}