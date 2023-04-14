import { ROLE } from "@src/common/enum";
import { getSelectUserRole } from "@src/helpers/getSelectUserRole";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectUser } from "@src/store/user/selector";
import { setUsers, updateUserRole } from "@src/store/users/actions";
import { selectUsers, selectUsersLoading } from "@src/store/users/selectors";
import React, { useEffect } from "react";
import { Table } from "react-bootstrap";
import Select from "react-select";
import Loader from "../shared/Loader/Loader";

const Admin: React.FC = () => {
  const usersLoading = useAppSelector(selectUsersLoading);
  const users = useAppSelector(selectUsers);
  const user = useAppSelector(selectUser);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!users) {
      dispatch(setUsers(user?.userID as string));
    }
  }, []);

  if (usersLoading) return <Loader />;

  const selectNewRole = async (
    userID: string,
    newRole: ROLE,
    previousRole: ROLE,
  ) => {
    if (newRole !== previousRole) {
      dispatch(
        updateUserRole({
          userID,
          newRole,
        }),
      );
    }
  };

  return (
    <div className="d-flex flex-column w-100 py-3 pe-3">
      <p className="page-title">Editing Users</p>
      <Table striped="columns">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User ID</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((el, index) => {
            const options = getSelectUserRole(el.role);

            return (
              <tr key={el.userID}>
                <td>{index}</td>
                <td>{el.firstName}</td>
                <td>{el.lastName}</td>
                <td>{el.userID}</td>
                <td>
                  <Select
                    options={options}
                    defaultValue={options[0]}
                    onChange={(item) => {
                      selectNewRole(el.userID, item?.value as ROLE, el.role);
                      return item;
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export default Admin;
