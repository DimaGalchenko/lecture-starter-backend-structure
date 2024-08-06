const {validateSchema, schemas} = require("../utils/validator");
const betService = require("../services/bet.service")

const createBet = async (req, res) => {
    try {
        validateSchema(schemas.betSchema, req.body)
    } catch (e) {
        res.status(400).send({error: e.message});
        return;
    }
    try {
        const bet = await betService.createBet(req.db, req.body, req.user);
        res.send(bet);
    } catch (err) {
        return res.status(err.status ? err.status : 500).send({error: err.message ? err.message : "Internal Server Error"})
    }
}

module.exports = {createBet}