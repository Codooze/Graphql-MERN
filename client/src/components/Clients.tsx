import ClientRow from "./ClientRow";
import { useQuery, gql } from "@apollo/client";
import { GET_CLIENTS } from "../queries/clientQ";

export const Clients = () => {
  const { loading, error, data } = useQuery(GET_CLIENTS);
  //console.log(data);
  //console.log(loading);

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
        {loading ? (
          <tbody>
            <tr>
              <td colSpan={4} className="text-center">
                <div className="spinner-border" role="status">
                  <span className="sr-only"></span>
                </div>
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data.clients.map((client: any) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        )}
      </table>
    </>
  );
};
