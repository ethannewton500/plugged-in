const express = require('express');
const router = express.Router();
const { addDevice, getDevices, deleteDevice } = require('../controllers/deviceController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/add', authMiddleware, addDevice);
router.get('/', authMiddleware, getDevices);
router.get('/delete', authMiddleware, deleteDevice);

module.exports = router;
