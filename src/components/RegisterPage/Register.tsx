import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerSchema } from "@src/common/schemas";
import { useAppDispatch } from "@src/store/hooks";
import { registerUser } from "@src/store/user/actions";
import { UserService } from "@src/services/user.service";
import { toast } from "react-toastify";
import { ReactComponent as GoogleSVG } from "@images/google.svg";
import { ReactComponent as FaceBookSVG } from "@images/facebook.svg";
import { Link } from "react-router-dom";
import { PATHES } from "@src/common/enum";
import Input from "../shared/Input/Input";

interface IFormProps {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const dispatch = useAppDispatch();
  const { control, reset, handleSubmit } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 0,
      email: "",
      password: "",
    },
    resolver: joiResolver(registerSchema),
  });

  const registerHandler = async (data: IFormProps) => {
    try {
      const user = await UserService.registerUserByEmail(data);
      dispatch(registerUser(user))
        .unwrap()
        .then(() => toast.success("Authorized"))
        .catch(() => toast.error("Something went wrong :("));
    } catch (e) {
      toast.error("Something went wrong with registration");
    }
    reset();
  };

  const signUpByGoogle = async () => {
    try {
      const user = await UserService.registerByGoogle();
      dispatch(registerUser(user))
        .unwrap()
        .then(() => toast.success("Authorized"))
        .catch(() => toast.error("Something went wrong :("));
    } catch (e) {
      toast.error("Something went wrong with registration");
    }
  };

  const signUpByFaceBook = async () => {
    try {
      const user = await UserService.registerByFaceBook();
      dispatch(registerUser(user))
        .unwrap()
        .then(() => toast.success("Authorized"))
        .catch(() => toast.error("Something went wrong :("));
    } catch (e) {
      toast.error("Something went wrong with registration");
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center form">
      <p className="fs-3 fw-bold text-primary mb-3 form__title">Register</p>
      <Form className="d-flex flex-column justify-content-center  align-self-stretch">
        <Input
          props={{ control, name: "firstName" }}
          placeHolder="Enter your first name..."
          labelText="First Name"
        />
        <Input
          props={{ control, name: "lastName" }}
          placeHolder="Enter your last name..."
          labelText="Last Name"
        />
        <Input
          props={{ control, name: "email" }}
          placeHolder="Enter your email..."
          labelText="Your Email"
        />
        <Input
          props={{ control, name: "password" }}
          placeHolder="Enter your password..."
          labelText="Your Password"
        />
        <Input
          props={{ control, name: "age" }}
          placeHolder="Enter your age..."
          labelText="Your age"
          type="number"
        />

        <Button
          variant="primary"
          onClick={handleSubmit(registerHandler)}
          className="align-self-center form__button"
        >
          Register
        </Button>
      </Form>
      <p className="mt-3 aling-items-center text-primary form__addition-text">
        Already have an account ?<Link to={PATHES.LOGIN_PAGE}> Login </Link>
      </p>
      <div className="mt-2 form__sign-in-by-medias-block d-flex aling-items-center text-danger">
        <GoogleSVG />
        <p onClick={signUpByGoogle}>Sign Up By Google</p>
      </div>
      <div className="mt-2 form__sign-in-by-medias-block d-flex aling-items-center text-danger">
        <FaceBookSVG />
        <p onClick={signUpByFaceBook}>Sign Up By Facebook</p>
      </div>
    </div>
  );
};

export default Register;
