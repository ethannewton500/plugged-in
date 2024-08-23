const Device = require('../models/Device');

exports.addDevice = async (req, res) => {
	const { name, macAddress } = req.body;

	try {
		const newDevice = new Device({
			user: req.user.id,
			name,
			macAddress,
		});

		const device = await newDevice.save();
		res.json(device);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

exports.getDevices = async (req, res) => {
	try {
		const devices = await Device.find({ user: req.user.id });
		res.json(devices);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

exports.deleteDevice = async (req, res) => {
	try {
		await Device.findByIdAndRemove(req.params.id);
		res.json({ msg: 'Device removed' });
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};
