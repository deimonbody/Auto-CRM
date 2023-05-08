import { TRIPSTATUS } from "@src/common/enum";
import { ITripResult } from "@src/common/interface";
import { getDriverTripName } from "@src/helpers/getDriverTripName";
import { getManagerTripName } from "@src/helpers/getManagerTripName";
import { getSelectTripStatus } from "@src/helpers/getSelectTripStatus";
import { getTripPersonalSelector } from "@src/helpers/getTripPersonalSelector";
import { useAdmin } from "@src/hooks/useAdmin";
import { useAppDispatch, useAppSelector } from "@src/store/hooks";
import {
  setTrips,
  updateTripDriver,
  updateTripManager,
  updateTripStatus,
} from "@src/store/trips/actions";
import { selectDrivers, selectManagers } from "@src/store/users/selectors";
import React from "react";
import { Table } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";

interface IProps {
  trips: ITripResult[];
}

const TripsTable: React.FC<IProps> = ({ trips }) => {
  const dispatch = useAppDispatch();
  const isAdmin = useAdmin();
  const allDrivers = useAppSelector(selectDrivers);
  const allManagers = useAppSelector(selectManagers);

  const selectNewTripStatus = (
    prevStatus: TRIPSTATUS,
    newTripStatus: TRIPSTATUS,
    tripID: string,
  ) => {
    if (newTripStatus !== prevStatus) {
      dispatch(updateTripStatus({ tripID, newTripStatus }))
        .unwrap()
        .then(() => {
          dispatch(setTrips());
          toast.success("Success,the status was changed");
        })
        .catch(() => toast.error("Something went wrong :("));
    }
  };

  const selectNewManager = (
    tripID: string,
    managerID: string,
    currentManagerID: string,
  ) => {
    if (currentManagerID !== managerID) {
      dispatch(updateTripManager({ tripID, managerID }))
        .unwrap()
        .then(() => toast.success("Success,the Manager was changed"))
        .catch(() => toast.error("Something went wrong :("));
    }
  };

  const selectNewDriver = (
    tripID: string,
    driverID: string,
    currentDriverID: string,
  ) => {
    if (currentDriverID !== driverID) {
      dispatch(updateTripDriver({ tripID, driverID }))
        .unwrap()
        .then(() => toast.success("Success,the Driver was changed"))
        .catch(() => toast.error("Something went wrong :("));
    }
  };

  return (
    <Table striped="columns" responsive="md" className="my_table">
      <thead>
        <tr>
          <th>Trip ID</th>
          <th>Count of Passangers</th>
          <th>From</th>
          <th>To</th>
          <th>Manager</th>
          <th>Status</th>
          <th>Driver</th>
        </tr>
        {trips.map((el) => {
          const options = getSelectTripStatus(el.status);
          return (
            <tr key={el.tripID}>
              <td>{el.tripID}</td>
              <td>{el.countOfPassengers}</td>
              <td>{el.from}</td>
              <td>{el.to}</td>
              <td>
                {isAdmin ? (
                  <Select
                    options={allManagers}
                    defaultValue={getTripPersonalSelector(el.manager)}
                    onChange={(item) => {
                      selectNewManager(
                        el.tripID,
                        item?.value as string,
                        el.manager?.userID as string,
                      );
                      return item;
                    }}
                  />
                ) : (
                  getManagerTripName(el.manager)
                )}
              </td>
              <td>
                {isAdmin ? (
                  <Select
                    options={options}
                    defaultValue={options[0]}
                    onChange={(item) => {
                      selectNewTripStatus(
                        el.status,
                        item?.value as TRIPSTATUS,
                        el.tripID,
                      );
                      return item;
                    }}
                  />
                ) : (
                  el.status
                )}
              </td>
              <td>
                {isAdmin ? (
                  <Select
                    options={allDrivers}
                    defaultValue={getTripPersonalSelector(el.driver)}
                    onChange={(item) => {
                      selectNewDriver(
                        el.tripID,
                        item?.value as string,
                        el.driver?.userID as string,
                      );
                      return item;
                    }}
                  />
                ) : (
                  getDriverTripName(el.manager)
                )}
              </td>
            </tr>
          );
        })}
      </thead>
      <tbody />
    </Table>
  );
};

export default TripsTable;
