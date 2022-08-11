import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Unauthorized, Login, Signup, Editor, Admin, Users, Lounge, Missing } from "./pages";
import { Layout, RequireAuth } from "./components";

export enum ROLES {
  ADMIN = "ADMIN",
  EDITOR = "EDITOR",
  USER = "USER",
}

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/" element={<Navigate replace to="home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* protected routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.USER, ROLES.EDITOR, ROLES.ADMIN]} />}>
          <Route path="lounge" element={<Lounge />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.EDITOR, ROLES.ADMIN]} />}>
          <Route path="editor" element={<Editor />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="admin" element={<Admin />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
          <Route path="users" element={<Users />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
