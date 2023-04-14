import React from "react";
import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { registerSchema } from "@src/common/schemas";
import { useAppDispatch } from "@src/store/hooks";
import { registerUser } from "@src/store/user/actions";
import { UserService } from "@src/services/user.service";

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
    const user = await UserService.registerUserByEmail(data);
    dispatch(registerUser(user));
    reset();
  };

  const signUpByGoogle = async () => {
    const user = await UserService.registerByGoogle();
    dispatch(registerUser(user));
  };

  const signUpByFaceBook = async () => {
    const user = await UserService.registerByFaceBook();
    dispatch(registerUser(user));
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center form">
      <p className="fs-3 fw-bold text-primary mb-3 form__title">Register</p>
      <Form className="d-flex flex-column justify-content-center  align-self-stretch">
        <Controller
          control={control}
          name="firstName"
          render={({
            field: { onChange, value, name, ref },
            fieldState: { error },
          }) => (
            <Form.Group className="mb-3">
              <Form.Label
                className={`form__label ${error ? "text-danger" : ""}`}
              >
                First Name
              </Form.Label>
              <Form.Control
                className="form__input text-dark"
                placeholder="Enter your first name..."
                onChange={onChange}
                value={value}
                ref={ref}
                name={name}
              />
              {error ? (
                <p className="form__error text-danger my-2">{error.message}</p>
              ) : null}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="lastName"
          render={({
            field: { onChange, value, name, ref },
            fieldState: { error },
          }) => (
            <Form.Group className="mb-3">
              <Form.Label
                className={`form__label ${error ? "text-danger" : ""}`}
              >
                Last Name
              </Form.Label>
              <Form.Control
                className="form__input text-dark"
                placeholder="Enter your last name..."
                onChange={onChange}
                value={value}
                ref={ref}
                name={name}
              />
              {error ? (
                <p className="form__error text-danger my-2">{error.message}</p>
              ) : null}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({
            field: { onChange, value, name, ref },
            fieldState: { error },
          }) => (
            <Form.Group className="mb-3">
              <Form.Label
                className={`form__label ${error ? "text-danger" : ""}`}
              >
                Your Email
              </Form.Label>
              <Form.Control
                className="form__input text-dark"
                placeholder="Enter your email..."
                onChange={onChange}
                value={value}
                ref={ref}
                name={name}
              />
              {error ? (
                <p className="form__error text-danger my-2">{error.message}</p>
              ) : null}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({
            field: { onChange, value, name, ref },
            fieldState: { error },
          }) => (
            <Form.Group className="mb-3">
              <Form.Label
                className={`form__label ${error ? "text-danger" : ""}`}
              >
                Your Password
              </Form.Label>
              <Form.Control
                className="form__input text-dark"
                placeholder="Enter your password..."
                onChange={onChange}
                value={value}
                ref={ref}
                name={name}
              />
              {error ? (
                <p className="form__error text-danger my-2">{error.message}</p>
              ) : null}
            </Form.Group>
          )}
        />
        <Controller
          control={control}
          name="age"
          render={({
            field: { onChange, value, name, ref },
            fieldState: { error },
          }) => (
            <Form.Group className="mb-3">
              <Form.Label
                className={`form__label ${error ? "text-danger" : ""}`}
              >
                Your Age
              </Form.Label>
              <Form.Control
                className="form__input text-dark"
                placeholder="Enter your password..."
                onChange={onChange}
                value={value}
                ref={ref}
                name={name}
                type="number"
              />
              {error ? (
                <p className="form__error text-danger my-2">{error.message}</p>
              ) : null}
            </Form.Group>
          )}
        />

        <Button
          variant="primary"
          onClick={handleSubmit(registerHandler)}
          className="align-self-center form__button"
        >
          Register
        </Button>
      </Form>
      <p
        className="mt-3 form__google-text text-primary"
        onClick={signUpByGoogle}
      >
        Sign Up By Google
      </p>
      <p
        className="mt-2 form__google-text text-primary"
        onClick={signUpByFaceBook}
      >
        Sign Up By Facebook
      </p>
    </div>
  );
};

export default Register;
