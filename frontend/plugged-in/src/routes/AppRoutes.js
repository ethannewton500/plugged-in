import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import AddDevice from "../pages/AddDevice";
import Login from "../pages/Login";
import Register from "pages/Register";
import DeviceControls from "pages/DeviceControls";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
          } 
        />
      <Route
        path="/deviceControls"
        element={
          <ProtectedRoute>
            <DeviceControls />
          </ProtectedRoute>
        }
        />
      <Route path="/settings" element={<Settings />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/addDevice" element={<AddDevice />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
