import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <div className="App">
        <h1 className="">Hello world</h1>
      </div>
    </>
  );
}

export default App;
