import { useState } from "react";
import { useMutation } from "@apollo/client";
import { GET_PROJECT } from "../queries/projectQueries";
import { UPDATE_PROJECT } from "../mutations/projectMutations";

interface EditProjectFormProps {
  project: {
    id: string;
    name: string;
    description: string;
    status: string;
  };
}

export default function EditProjectForm({ project }: EditProjectFormProps) {
  const [projectForm, setProjectForm] = useState({
    name: project.name,
    description: project.description,
    status: project.status,
  });
  const [toggleEditProject, setToggleEditProject] = useState(false);
  const toggleEdit = () => {
    setToggleEditProject(!toggleEditProject);
  };

  const [updateProject] = useMutation(UPDATE_PROJECT, {
    variables: {
      id: project.id,
      name: projectForm.name,
      description: projectForm.description,
      status: projectForm.status,
    },
    update(cache, { data: { updateProject } }) {
      cache.writeQuery({
        query: GET_PROJECT,
        variables: { id: project.id },
        data: { project: updateProject },
      });
    },
  });

  const handleChange = (e: any) => {
    setProjectForm({
      ...projectForm,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      {!toggleEditProject ? (
        <div>
          <button
            onClick={toggleEdit}
            type="submit"
            className="btn btn-primary btn-sm"
          >
            Update Project
          </button>
        </div>
      ) : (
        <form
          className="mt-3"
          onSubmit={(e) => {
            e.preventDefault();
            updateProject();
            setToggleEditProject(false);
          }}
        >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={projectForm.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={projectForm.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={projectForm.status}
              onChange={handleChange}
            >
              <option value="TO_DO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DONE">Completed</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Send Changes
          </button>
        </form>
      )}
    </>
  );
}
