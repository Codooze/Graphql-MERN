import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
  uri: "http://localhost:3000/graphql",
  cache,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
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
