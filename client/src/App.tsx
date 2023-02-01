import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Clients } from "./components/Clients";
import Projects from "./components/Projects";
import AddClientModal from "./components/AddClientModal";
import AddProjectModal from "./components/AddProjectModal";
import { StoreProvider } from "./Store.context";
function App() {
  return (
    <>
      <Header />
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <StoreProvider>
        <Projects />
        <hr />
        <Clients />
      </StoreProvider>
    </>
  );
}

export default App;
