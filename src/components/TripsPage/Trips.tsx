import { useAppSelector } from "@src/store/hooks";
import { selectTrips } from "@src/store/trips/selectors";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useAdmin } from "@src/hooks/useAdmin";
import Loader from "../shared/Loader/Loader";
import AddTripModal from "./components/AddTripModal";
import TripsTable from "./components/TripsTable";

const Trips: React.FC = () => {
  const trips = useAppSelector(selectTrips);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const isAdmin = useAdmin();
  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  if (!trips) return <Loader />;

  return (
    <div className="d-flex flex-column w-100 py-3 pe-3">
      <p className="page-title">Trips Page</p>
      {isAdmin ? (
        <Button
          variant="primary"
          className="mb-3 align-self-start"
          onClick={openModal}
        >
          Add Trip
        </Button>
      ) : null}

      <TripsTable trips={trips} />
      {isOpenModal ? <AddTripModal closeHandler={closeModal} /> : null}
    </div>
  );
};

export default Trips;
