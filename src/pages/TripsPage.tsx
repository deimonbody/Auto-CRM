import Trips from "@src/components/TripsPage/Trips";
import { useAppDispatch } from "@src/store/hooks";
import { setTrips } from "@src/store/trips/actions";
import React, { useEffect } from "react";

const TripsPage: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTrips());
  }, []);

  return <Trips />;
};

export default TripsPage;
