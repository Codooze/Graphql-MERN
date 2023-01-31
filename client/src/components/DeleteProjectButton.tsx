import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useMutation } from "@apollo/client";

interface projectId {
  projectId: string;
}

export default function DeleteProjectButton({ projectId }: projectId) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    refetchQueries: [{ query: GET_PROJECTS }],
    onCompleted: () => {
      navigate("/");
    },
  });

  return (
    <div className="d-flex ms-auto">
      <button className="btn btn-danger btn-sm" onClick={() => deleteProject()}>
        <FaTrash />
      </button>
    </div>
  );
}
