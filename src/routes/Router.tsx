import { PATHES } from "@src/common/enum";
import { useAuthorization } from "@src/hooks/useAuthorization";
import LoginPage from "@src/pages/LoginPage";
import RegisterPage from "@src/pages/RegisterPage";
import React from "react";
import { Route, Routes } from "react-router-dom";
import UserProfilePage from "@src/pages/UserProfilePage";
import TripsPage from "@src/pages/TripsPage";
import AdminPage from "@src/pages/AdminPage";
import { useAdmin } from "@src/hooks/useAdmin";
import AuthorizationRouteHOC from "./AuthorizationRouteHOC";
import ProtectedRouteHOC from "./ProtectedRouteHOC";
import ProtectedAdminPageHOC from "./ProtectedAdminPageHOC";

const Router: React.FC = () => {
  const isAuth = useAuthorization();
  const isAdmin = useAdmin();

  return (
    <Routes>
      <Route element={<AuthorizationRouteHOC isAuth={isAuth} />}>
        <Route path={PATHES.LOGIN_PAGE} element={<LoginPage />} />
        <Route path={PATHES.REGISTER_PAGE} element={<RegisterPage />} />
      </Route>
      <Route element={<ProtectedRouteHOC isAuth={isAuth} />}>
        <Route path={PATHES.USER_PROFILE} element={<UserProfilePage />} />
        <Route path={PATHES.CREATE_TRIP_PAGE} element={<TripsPage />} />
      </Route>
      <Route element={<ProtectedAdminPageHOC isAdmin={isAdmin} />}>
        <Route path={PATHES.ADMIN_PAGE} element={<AdminPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
