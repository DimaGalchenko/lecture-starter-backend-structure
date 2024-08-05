const knex = require('knex');
const dbConfig = require('../../knexfile');

function attachDB(req, res, next) {
    req.db = knex(dbConfig.development);
    req.db.raw('select 1+1 as result').then(function () {
        next();
    }).catch(() => {
        throw new Error('No db connection');
    });
}

module.exports = attachDB;