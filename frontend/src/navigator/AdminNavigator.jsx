import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/admin/Dashboard";
import Movies from "../components/admin/Movies";
import Actors from "../components/admin/Actors";
import NotFound from "../components/NotFound";

const AdminNavigator = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/actors" element={<Actors />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AdminNavigator;
