import { joiResolver } from "@hookform/resolvers/joi";
import { ITrip } from "@src/common/interface";
import { addTripSchema } from "@src/common/schemas";
import Input from "@src/components/shared/Input/Input";
import Modal from "@src/components/shared/Modal/Modal";
import { useAppDispatch } from "@src/store/hooks";
import { addNewTrip } from "@src/store/trips/actions";
import React from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

interface IProps {
  closeHandler: () => void;
}

const AddTripModal: React.FC<IProps> = ({ closeHandler }) => {
  const dispatch = useAppDispatch();

  const { control, reset, handleSubmit } = useForm<ITrip>({
    mode: "onChange",
    defaultValues: {
      to: "",
      tripID: "",
      from: "",
      countOfPassengers: 0,
    },
    resolver: joiResolver(addTripSchema),
  });

  const saveHandler = (data: ITrip) => {
    dispatch(addNewTrip(data));
    reset();
  };

  return (
    <Modal title="Add new trip" setClosed={closeHandler}>
      <Form className="d-flex flex-column justify-content-center">
        <Input
          props={{ control, name: "tripID" }}
          placeHolder="Enter trip ID..."
          labelText="Your trip ID"
        />
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
