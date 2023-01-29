import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";

interface ClientRowProps {
  client: {
    name: string;
    email: string;
    phone: string;
  };
}

export default function ClientRow({
  client: { name, email, phone },
}: ClientRowProps) {
  return (
    <tr>
      <td>{name}</td>
      <td>{email}</td>
      <td>{phone}</td>
      <td>
        <button className="btn btn-danger btn-sm">
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
