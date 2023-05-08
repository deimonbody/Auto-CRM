import { loginSchema } from "@src/common/schemas";
import React from "react";
import { Form } from "react-bootstrap";
import { joiResolver } from "@hookform/resolvers/joi";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import "./style.scss";
import { useAppDispatch } from "@src/store/hooks";
import { setUser } from "@src/store/user/actions";
import { toast } from "react-toastify";
import { UserService } from "@src/services/user.service";
import { ReactComponent as GoogleSVG } from "@images/google.svg";
import { ReactComponent as FaceBookSVG } from "@images/facebook.svg";

import { Link } from "react-router-dom";
import { PATHES } from "@src/common/enum";
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
      email: "",
      password: "",
    },
    resolver: joiResolver(loginSchema),
  });

  const loginHandler = async (data: IFromProps) => {
    try {
      const user = await UserService.getUserAuthByEmail({
        email: data.email,
        password: data.password,
      });

      const userFromDB = await UserService.getUserDBByID(user.uid);
      if (userFromDB) {
        dispatch(setUser(userFromDB))
          .unwrap()
          .then(() => toast.success("Authorized"))
          .catch(() => toast.error("Something went wrong :("));
      }
    } catch (e) {
      toast.error("Something went wrong with authorization");
    }

    reset();
  };

  const signInByGoogle = async () => {
    try {
      const user = await UserService.getUserAuthByGoogle();
      const userFromDB = await UserService.getUserDBByID(user.uid);
      if (userFromDB) {
        dispatch(setUser(userFromDB))
          .unwrap()
          .then(() => toast.success("Authorized"))
          .catch(() => toast.error("Something went wrong :("));
      }
    } catch (e) {
      toast.error("Something went wrong with authorization");
    }
  };

  const sighInByFaceBook = async () => {
    try {
      const user = await UserService.getUserAuthByFaceBook();
      const userFromDB = await UserService.getUserDBByID(user.uid);
      if (userFromDB) {
        dispatch(setUser(userFromDB))
          .unwrap()
          .then(() => toast.success("Authorized"))
          .catch(() => toast.error("Something went wrong :("));
      }
    } catch (e) {
      toast.error("Something went wrong with authorization");
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
      <p className="mt-3 aling-items-center text-primary form__addition-text">
        Haven`t an account ? <Link to={PATHES.REGISTER_PAGE}>Register it</Link>
      </p>
      <div className="mt-2 form__sign-in-by-medias-block d-flex aling-items-center text-danger">
        <GoogleSVG />
        <p onClick={signInByGoogle}>Sign in by Google</p>
      </div>
      <div className="mt-2 d-flex aling-items-center text-danger form__sign-in-by-medias-block">
        <FaceBookSVG />
        <p onClick={sighInByFaceBook}>Sign in by Facebook</p>
      </div>
    </div>
  );
};

export default Login;
