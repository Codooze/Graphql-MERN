import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {data.projects.length > 0 ? (
        <div className="row">
          {data.projects.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="row">
          <div className="col-12">
            <div className="alert alert-info" role="alert">
              No projects found.
            </div>
          </div>
        </div>
      )}
    </>
  );
}
