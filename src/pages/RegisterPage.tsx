import Register from "@src/components/RegisterPage/Register";
import { auth } from "@src/config/firebase.config";
import { UserService } from "@src/services/user.service";
import { useAppDispatch } from "@src/store/hooks";
import { setUser } from "@src/store/user/actions";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";

const RegisterPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userFromDB = await UserService.getUserDBByID(user.uid);
        if (userFromDB) {
          dispatch(setUser(userFromDB));
        }
      }
    });
  }, []);
  return (
    <div className="position-fixed position-absolute top-50 start-50 translate-middle">
      <Register />
    </div>
  );
};

export default RegisterPage;
