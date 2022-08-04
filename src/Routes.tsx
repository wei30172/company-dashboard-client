import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home, About, Login, Signup } from "./pages";
import { Content } from "./components";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Content />}>
        <Route path="/" element={<Navigate replace to="home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
