import type { RouteObject } from "react-router-dom";
import { Outlet, Link, useRoutes, useParams } from "react-router-dom";
import App from "./App";
import Project from "./pages/Project";

export default function App2() {
  let routes: RouteObject[] = [
    { path: "/", element: <App /> },
    { path: "/project", element: <Project /> },
  ];

  // The useRoutes() hook allows you to define your routes as JavaScript objects
  // instead of <Routes> and <Route> elements. This is really just a style
  // preference for those who prefer to not use JSX for their routes config.
  let element = useRoutes(routes);

  return <>{element}</>;
}
