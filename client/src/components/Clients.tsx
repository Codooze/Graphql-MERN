import React from "react";
import ClientRow from "./ClientRow";
import { useQuery, gql } from "@apollo/client";

const GET_CLIENTS = gql`
  query getClients {
    clients {
      id
      name
      email
      phone
    }
  }
`;

export const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  console.log(data);

  return (
    <>
      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.clients.map((client: any) => (
            <ClientRow key={client.id} client={client} />
          ))}
        </tbody>
      </table>
    </>
  );
};
