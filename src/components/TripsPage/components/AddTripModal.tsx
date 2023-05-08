import { joiResolver } from "@hookform/resolvers/joi";
import { ISelectValue } from "@src/common/interface";
import { addTripSchema } from "@src/common/schemas";
import Input from "@src/components/shared/Input/Input";
import Modal from "@src/components/shared/Modal/Modal";
import MySelector from "@src/components/shared/MySelector/MySelector";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import { addNewTrip } from "@src/store/trips/actions";
import { selectDrivers, selectManagers } from "@src/store/users/selectors";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ReactComponent as ErrorIconSvg } from "@images/error-icon.svg";
import { uuidv4 } from "@firebase/util";
import { TRIPSTATUS } from "@src/common/enum";

interface IProps {
  closeHandler: () => void;
}

interface IForm {
  to: string;
  from: string;
  countOfPassengers: number;
  driverSelector: ISelectValue<string> | null;
  managerSelector: ISelectValue<string> | null;
}
const AddTripModal: React.FC<IProps> = ({ closeHandler }) => {
  const dispatch = useAppDispatch();
  const allDrivers = useAppSelector(selectDrivers);
  const allManagers = useAppSelector(selectManagers);

  const { control, reset, handleSubmit } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      to: "",
      from: "",
      countOfPassengers: 0,
      driverSelector: null,
      managerSelector: null,
    },
    resolver: joiResolver(addTripSchema),
  });

  const saveHandler = (data: IForm) => {
    const { from, to, countOfPassengers, driverSelector, managerSelector } =
      data;
    const unicID = uuidv4();

    closeHandler();
    dispatch(
      addNewTrip({
        from,
        to,
        countOfPassengers,
        driverID: driverSelector?.value as string,
        managerID: managerSelector?.value as string,
        tripID: unicID,
        status: TRIPSTATUS.WAITING,
      }),
    )
      .unwrap()
      .then(() => toast.success("Success,the trip was added"))
      .catch(() => toast.error("Something went wrong :("));
    reset();
  };

  return (
    <Modal title="Add new trip" setClosed={closeHandler}>
      <Form className="d-flex flex-column justify-content-center">
        <Input
          props={{ control, name: "from" }}
          placeHolder="From..."
          labelText="Your begin point"
        />
        <Input
          props={{ control, name: "to" }}
          placeHolder="To..."
          labelText="Your end point"
        />
        <Input
          props={{ control, name: "countOfPassengers" }}
          placeHolder="Enter count of passengers..."
          labelText="Count of Passengers"
          type="number"
        />
        <Controller
          control={control}
          name="driverSelector"
          render={({
            field: { onChange, value, name, ref },
            fieldState: { error },
          }) => {
            return (
              <div
                className={`selector-wrapper mb-4 ${
                  error ? "selector-wrapper__error" : ""
                }`}
              >
                <p className="form__label mb-2">Select Driver</p>
                <MySelector
                  isClearable
                  isSearchable
                  name={name}
                  placeholder="Select Driver"
                  selectRef={ref}
                  options={allDrivers}
                  onChange={onChange}
                  value={value}
                />

                {error && (
                  <div className="error">
                    <ErrorIconSvg />
                    <p>{error?.message}</p>
                  </div>
                )}
              </div>
            );
          }}
        />
        <Controller
          control={control}
          name="managerSelector"
          render={({
            field: { onChange, value, name, ref },
            fieldState: { error },
          }) => {
            return (
              <div
                className={`selector-wrapper mb-5 ${
                  error ? "selector-wrapper__error" : ""
                }`}
              >
                <p className="form__label mb-2">Select Manager</p>
                <MySelector
                  isClearable
                  isSearchable
                  name={name}
                  placeholder="Select Manager"
                  selectRef={ref}
                  options={allManagers}
                  onChange={onChange}
                  value={value}
                />

                {error && (
                  <div className="error">
                    <ErrorIconSvg />
                    <p>{error?.message}</p>
                  </div>
                )}
              </div>
            );
          }}
        />
      </Form>
      <Button
        className=""
        variant="primary"
        onClick={handleSubmit(saveHandler)}
      >
        Save
      </Button>
    </Modal>
  );
};

export default AddTripModal;
