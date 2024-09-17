// DeviceControls.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.js';

function DeviceControls() {
  const [deviceName, setDeviceName] = useState('');
  const [macAddress, setMacAddress] = useState('');
  const { logout, token } = useAuth();
  const [devices, setDevices] = useState([]);

  const handleRegisterDevice = async (event) => {
    event.preventDefault();

    const formData = {
      name: deviceName,
      macAddress: macAddress,
    };

    try {
      const response = await fetch('http://localhost:5000/api/devices/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Device registration successful!');
      } else {
        alert('Device registration failed: ' + data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering the device.');
    }
  };

  const handleGetDevices = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/devices', {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token,
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setDevices(data);
        console.log(devices);
      } else {
        alert('Failed to get devices: ' + data.msg);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while getting devices.');
    }
  }

  return (
    <div>
      <h1>Device Controls</h1>
      <form onSubmit={handleRegisterDevice}>
        <input type="text" placeholder="Device Name" value={deviceName} onChange={(e) => setDeviceName(e.target.value)} required />
        <input type="text" placeholder="MAC Address" value={macAddress} onChange={(e) => setMacAddress(e.target.value)} required />
        <button type="submit">Register Device</button>
      </form>

      <button onClick={handleGetDevices}>Get Devices</button>

      <ul>
        {devices.map((device) => (
          <li key={device._id}>
            <strong>Name:</strong> {device.name} <br />
            <strong>MAC Address:</strong> {device.macAddress}
          </li>
        ))}
      </ul>

      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default DeviceControls;
