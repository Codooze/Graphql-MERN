import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Clients } from "./components/Clients";
import Projects from "./components/Projects";
import AddClientModal from "./components/AddClientModal";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <AddClientModal />
      <Projects />
      <Clients />
    </>
  );
}

export default App;
