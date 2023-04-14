import { useAppSelector } from "@src/store/hooks";
import React from "react";
import "./style.scss";

const UserProfile: React.FC = () => {
  const { user } = useAppSelector((state) => state.userReducer);

  return (
    <div className="mainContent-layout">
      <div className="container">
        <div className="row mb-4">
          <div className="col-6">
            <div className="col-label">Your First Name</div>
            <div className="col-value">{user?.firstName}</div>
          </div>
          <div className="col-6">
            <div className="col-label">Your Last Name</div>
            <div className="col-value">{user?.lastName}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <div className="col-label">Your Age</div>
            <div className="col-value">{user?.age}</div>
          </div>
          <div className="col-6">
            <div className="col-label">Your Role</div>
            <div className="col-value">{user?.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
