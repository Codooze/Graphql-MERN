import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQ";
import { ADD_PROJECT } from "../mutations/projectMutations";

interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
}

enum ProjectStatus {
  TO_DO = "TO_DO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export default function AddProjectModal() {
  const [projectForm, setProjectForm] = useState({
    name: "",
    description: "",
    clientId: "",
    status: "TO_DO",
  });

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { ...projectForm },
    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery<{ projects: Project[] }>({
        query: GET_PROJECTS,
      }) || { projects: [] };
      cache.writeQuery({
        query: GET_PROJECTS,
        data: { projects: [...projects, addProject] },
      });
    },
  });

  // Get Clients for select
  const { loading, error, data } = useQuery(GET_CLIENTS);

  const onChange = (e: any) => {
    setProjectForm({ ...projectForm, [e.target.name]: e.target.value });
    if (e.target.name === "status") console.log(e.target.value);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();

    addProject({
      variables: {
        name: projectForm.name,
        description: projectForm.description,
        clientId: projectForm.clientId,
        status: projectForm.status,
      },
    });

    setProjectForm({
      name: "",
      description: "",
      clientId: "",
      status: "",
    });
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Something went wrong</h1>;

  return (
    <>
      {!loading && !error && (
        <>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addProjectModal"
          >
            <div className="d-flex align-items-center">
              <FaList className="icon" />
              <div>New Project</div>
            </div>
          </button>

          <div
            className="modal fade"
            id="addProjectModal"
            aria-labelledby="addProjectModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="addProjectModalLabel">
                    New Project
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={onSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={projectForm.name}
                        onChange={onChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-control"
                        name="description"
                        value={projectForm.description}
                        onChange={onChange}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Status</label>
                      <select
                        name="status"
                        className="form-select"
                        value={projectForm.status}
                        onChange={onChange}
                      >
                        <option value={ProjectStatus.TO_DO}>Not Started</option>
                        <option value={ProjectStatus.IN_PROGRESS}>
                          In Progress
                        </option>
                        <option value={ProjectStatus.DONE}>Completed</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Client</label>
                      <select
                        name="clientId"
                        className="form-select"
                        value={projectForm.clientId}
                        onChange={onChange}
                      >
                        <option value="">Select Client</option>
                        {data.clients.map((client: any) => (
                          <option key={client.id} value={client.id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="submit"
                      data-bs-dismiss="modal"
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
