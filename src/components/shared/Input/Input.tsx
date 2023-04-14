import React from "react";
import { Form } from "react-bootstrap";
import { Controller, FieldValues, UseControllerProps } from "react-hook-form";

interface IProps<T extends FieldValues = FieldValues> {
  props: UseControllerProps<T>;
  labelText: string;
  placeHolder: string;
  type?: string;
}

const Input = <T extends FieldValues = FieldValues>({
  props,
  labelText,
  placeHolder,
  type = "text",
}: IProps<T>) => {
  return (
    <Controller
      control={props.control}
      name={props.name}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <Form.Group className="mb-3">
          <Form.Label className={`form__label ${error ? "text-danger" : ""}`}>
            {labelText}
          </Form.Label>
          <Form.Control
            className="form__input text-dark"
            placeholder={placeHolder}
            onChange={onChange}
            value={value}
            ref={ref}
            name={props.name}
            type={type}
          />
          {error ? (
            <p className="form__error text-danger my-2">{error.message}</p>
          ) : null}
        </Form.Group>
      )}
    />
  );
};

export default Input;
