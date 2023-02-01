interface Project {
  id: string;
  name: string;
  description: string;
  status: string;
  // client: { id: string; name: string; email: string; phone: string };
}

enum projectStatus {
  TO_DO = "To do",
  IN_PROGRESS = "In progress",
  DONE = "Done",
}

export default function ProjectCard({ project }: { project: Project }) {
  ////console.log(project);

  const statusValue =
    projectStatus[project.status as keyof typeof projectStatus];

  return (
    <div className="col-md-6">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="card-title">{project.name}</h5>

            <a className="btn btn-light" href={`/project/${project.id}`}>
              View
            </a>
          </div>
          <p className="small">
            Status: <strong>{statusValue}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
