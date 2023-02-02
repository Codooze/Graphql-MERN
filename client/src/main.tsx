import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import {
  BrowserRouter,
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import Project from "./pages/Project";
import Index from "./Index";
import App2 from "./App2";

const environment = {
  production: "https://backendqweq.onrender.com/graphql/",
  development: "http://localhost:3000/graphql",
};

const cache = new InMemoryCache({
  //using the update funtion of the useMutation will make the cache update automatically, and dont make a full request to the server
  typePolicies: {
    Query: {
      fields: {
        clients: {
          // This is the name of the field in the query
          merge(existing = [], incoming: any) {
            return incoming;
          },
        },
        projects: {
          merge(existing = [], incoming: any) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: environment.production,
  cache,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/project/:id",
    element: <Project />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <Index />
      </BrowserRouter> */}
    </ApolloProvider>
  </React.StrictMode>
);

/*
query{
  clients{
    name
    email
    phone
  }
}

query{
  projects{
    id
    name
    description
    status
  }
}
*/

//TODO add an outtlet for the main path since it seems it needs it to render the childrens https://github.com/Mehr-o-maah/EcommerceSite/blob/master/src/main.jsx
