import { useAppSelector } from "@src/store/hooks";
import React from "react";
import "./style.scss";
import { selectUser, selectUserLoading } from "@src/store/user/selector";
import Loader from "../shared/Loader/Loader";

const UserProfile: React.FC = () => {
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectUserLoading);

  if (isLoading) return <Loader />;

  return (
    <div className="py-3 pe-3">
      <p className="page-title">Profile</p>
      <div className="container">
        <div className="row mb-4">
          <div className="col-12 col-sm-6">
            <div className="col-label">Your First Name</div>
            <div className="col-value">{user?.firstName}</div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="col-label">Your Last Name</div>
            <div className="col-value">{user?.lastName}</div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-sm-6">
            <div className="col-label">Your Age</div>
            <div className="col-value">{user?.age}</div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="col-label">Your Role</div>
            <div className="col-value">{user?.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
