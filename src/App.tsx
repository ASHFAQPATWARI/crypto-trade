import { RequireAuth } from "components";
import React from "react";
import { Route, Routes } from "react-router-dom";
import useStore from "store/AppStore";
import { Home } from "views/home";
import { Layout } from "views/layout";
import { Trade } from "views/trade";
import "./App.css";
import logo from "./logo.svg";

function App() {
  const [username, signin] = useStore((state) => [
    state.username,
    state.signin,
  ]);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn ${username}
        </a>
        <button onClick={() => signin("zohrat")}>change name</button>
      </header>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route
            path="/trade"
            element={
              <RequireAuth>
                <Trade />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
