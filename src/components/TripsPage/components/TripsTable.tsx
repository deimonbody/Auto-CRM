import { ITrip } from "@src/common/interface";
import React from "react";
import { Table } from "react-bootstrap";

interface IProps {
  trips: ITrip[];
}

const TripsTable: React.FC<IProps> = ({ trips }) => {
  return (
    <Table striped="columns" responsive="md" className="my_table">
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
  );
};

export default TripsTable;
