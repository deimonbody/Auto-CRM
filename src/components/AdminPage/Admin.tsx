import { useAppSelector } from "@src/store/hooks";
import { selectUsers, selectUsersLoading } from "@src/store/users/selectors";
import React from "react";
import Loader from "../shared/Loader/Loader";
import AdminTable from "./components/AdminTable";

const Admin: React.FC = () => {
  const usersLoading = useAppSelector(selectUsersLoading);
  const users = useAppSelector(selectUsers);

  if (usersLoading) return <Loader />;

  return (
    <div className="d-flex flex-column w-100 py-3 pe-3">
      <p className="page-title">Editing Users</p>
      <AdminTable users={users || []} />
    </div>
  );
};

export default Admin;
