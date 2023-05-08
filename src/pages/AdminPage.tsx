import Admin from "@src/components/AdminPage/Admin";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectUser } from "@src/store/user/selector";
import { setUsers } from "@src/store/users/actions";
import { selectUsers } from "@src/store/users/selectors";
import React, { useEffect } from "react";

const AdminPage: React.FC = () => {
  const users = useAppSelector(selectUsers);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!users) {
      dispatch(setUsers(user?.userID as string));
    }
  }, []);
  return <Admin />;
};

export default AdminPage;
