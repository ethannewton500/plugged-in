const express = require('express');
const router = express.Router();
const { addDevice, getDevices } = require('../controllers/deviceController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addDevice);
router.get('/', authMiddleware, getDevices);

module.exports = router;