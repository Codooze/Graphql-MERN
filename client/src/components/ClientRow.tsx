import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQ";
import { InMemoryCache, defaultDataIdFromObject } from "@apollo/client";

interface ClientRowProps {
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

export default function ClientRow({
  client: { id, name, email, phone },
}: ClientRowProps) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    variables: { id },
    update(cache) {
      const data: any = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: data.clients.filter((client: any) => client.id !== id),
        },
      });
    },
  });

  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteClient()}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
