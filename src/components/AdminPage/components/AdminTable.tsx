import { ROLE } from "@src/common/enum";
import { IUser } from "@src/common/interface";
import { getSelectUserRole } from "@src/helpers/getSelectUserRole";
import { useAppDispatch } from "@src/store/hooks";
import { updateUserRole } from "@src/store/users/actions";
import React from "react";
import { Table } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";

interface IProps {
  users: IUser[];
}

const AdminTable: React.FC<IProps> = ({ users }) => {
  const dispatch = useAppDispatch();

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
      )
        .unwrap()
        .then(() => toast.success("Success,the role was changed"))
        .catch(() => toast.error("Something went wrong :("));
    }
  };

  return (
    <Table
      striped="columns"
      className="my_table my_table--admin-table"
      responsive="md"
    >
      <thead>
        <tr>
          <th className="fw-bold">First Name</th>
          <th className="fw-bold">Last Name</th>
          <th className="fw-bold">User ID</th>
          <th className="fw-bold">Role</th>
        </tr>
      </thead>
      <tbody>
        {users.map((el, index) => {
          const options = getSelectUserRole(el.role);

          return (
            <tr key={el.userID}>
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
  );
};

export default AdminTable;
