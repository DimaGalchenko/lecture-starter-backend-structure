const express = require('express');
const {createUser, updateUser, getUserById} = require('../controllers/user.controller');
const {requireAuth} = require('../middlewares/auth.middleware');

const router = express.Router();

router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", requireAuth(), updateUser);

module.exports = router;