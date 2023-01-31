import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { Clients } from "./components/Clients";
import Projects from "./components/Projects";
import AddClientModal from "./components/AddClientModal";
import AddProjectModal from "./components/AddProjectModal";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <div className="d-flex gap-3 mb-4">
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  );
}

export default App;
