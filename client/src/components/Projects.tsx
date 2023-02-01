import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import ProjectCard from "./ProjectCard";
import { useContext, useEffect } from "react";
import { Store } from "../Store.context";

export default function Projects() {
  const { loading, error, data, refetch } = useQuery(GET_PROJECTS);

  const reRun = useContext(Store);
  //console.log(reRun);

  useEffect(() => {
    if (reRun) {
      refetch();
    }
  }, [reRun, refetch]);

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
