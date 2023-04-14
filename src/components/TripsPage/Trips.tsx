import { useAppSelector } from "@src/store/hooks";
import { selectTrips } from "@src/store/trips/selectors";
import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import Loader from "../shared/Loader/Loader";
import AddTripModal from "./components/AddTripModal";

const Trips: React.FC = () => {
  const trips = useAppSelector(selectTrips);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  if (!trips) return <Loader />;

  return (
    <div className="d-flex flex-column w-100 py-3 pe-3">
      <p className="page-title">Trips Page</p>
      <Button
        variant="primary"
        className="mb-3 align-self-start"
        onClick={openModal}
      >
        Add Trip
      </Button>
      <Table striped="columns">
        <thead>
          <tr>
            <th>Trip ID</th>
            <th>Count of Passangers</th>
            <th>From</th>
            <th>To</th>
          </tr>
          {trips.map((el) => (
            <tr key={el.tripID}>
              <td>{el.tripID}</td>
              <td>{el.countOfPassengers}</td>
              <td>{el.from}</td>
              <td>{el.to}</td>
            </tr>
          ))}
        </thead>
        <tbody />
      </Table>
      {isOpenModal ? <AddTripModal closeHandler={closeModal} /> : null}
    </div>
  );
};

export default Trips;
