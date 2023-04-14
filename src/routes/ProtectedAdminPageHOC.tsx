import { PATHES } from "@src/common/enum";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

interface IProps {
  isAdmin: boolean;
}

const ProtectedAdminPageHOC: React.FC<IProps> = ({ isAdmin }) => {
  return isAdmin ? <Outlet /> : <Navigate to={PATHES.USER_PROFILE} />;
};

export default ProtectedAdminPageHOC;
