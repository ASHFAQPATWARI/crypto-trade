import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "views/home";
import { Layout } from "views/layout";
import { Trade } from "views/trade";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/trade" element={<Trade />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
