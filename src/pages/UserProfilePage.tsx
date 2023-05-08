import UserProfile from "@src/components/UserProfilePage/UserProfile";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { selectUser } from "@src/store/user/selector";
import { setUsers } from "@src/store/users/actions";
import React, { useEffect } from "react";

const UserProfilePage: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUsers(user?.userID as string));
  }, []);

  return <UserProfile />;
};

export default UserProfilePage;
