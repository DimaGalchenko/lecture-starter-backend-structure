const jwt = require('jsonwebtoken');

const requireAuth = (role) => {
    return (req, res, next) => {
        const bearerToken = req.headers[`authorization`];
        if (!bearerToken) {
            return res.status(401).send({error: 'Not Authorized'});
        }
        const token = bearerToken.replace('Bearer ', '');
        try {
            const tokenPayload = jwt.verify(token, process.env.JWT_SECRET);
            if (role && tokenPayload.type !== role) {
                return res.status(403).send({error: 'Access forbidden'});
            }
            req.user = tokenPayload;
            next();
        } catch (err) {
            return res.status(401).send({error: 'Not Authorized'});
        }
    }
}

module.exports = { requireAuth };