import { loginSchema } from "@src/common/schemas";
import React from "react";
import { Form } from "react-bootstrap";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import "./style.scss";
import { useAppDispatch } from "@src/store/hooks";
import { setUser } from "@src/store/user/actions";

import { UserService } from "@src/services/user.service";
import Input from "../shared/Input/Input";

interface IFromProps {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const { control, reset, handleSubmit } = useForm<IFromProps>({
    mode: "onChange",
    defaultValues: {
      email: "dima.pavlov0311@gmail.com",
      password: "goldvju81",
    },
    resolver: joiResolver(loginSchema),
  });

  const loginHandler = async (data: IFromProps) => {
    const user = await UserService.getUserAuthByEmail({
      email: data.email,
      password: data.password,
    });
    const userFromDB = await UserService.getUserDBByID(user.uid);
    if (userFromDB) {
      dispatch(setUser(userFromDB));
    }

    reset();
  };

  const signInByGoogle = async () => {
    const user = await UserService.getUserAuthByGoogle();
    const userFromDB = await UserService.getUserDBByID(user.uid);
    if (userFromDB) {
      dispatch(setUser(userFromDB));
    }
  };

  const sighInByFaceBook = async () => {
    const user = await UserService.getUserAuthByFaceBook();
    const userFromDB = await UserService.getUserDBByID(user.uid);
    if (userFromDB) {
      dispatch(setUser(userFromDB));
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center form">
      <p className="fs-3 fw-bold text-primary mb-3 form__title">Login</p>
      <Form className="d-flex flex-column justify-content-center  align-self-stretch">
        <Input
          props={{ control, name: "email" }}
          placeHolder="Enter your email..."
          labelText="Your Email"
        />

        <Input
          props={{ control, name: "password" }}
          placeHolder="Enter password..."
          labelText="Your Password"
        />

        <Button
          variant="primary"
          onClick={handleSubmit(loginHandler)}
          className="align-self-center form__button"
        >
          Enter
        </Button>
      </Form>
      <p
        onClick={signInByGoogle}
        className="mt-3 form__google-text text-primary"
      >
        Sign in by Google
      </p>
      <p
        onClick={sighInByFaceBook}
        className="mt-2 form__google-text text-primary"
      >
        Sign in by Facebook
      </p>
    </div>
  );
};

export default Login;
