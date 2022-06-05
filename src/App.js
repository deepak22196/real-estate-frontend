import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Basicinfo from "./forms/basicinfo";
import Propertyinfo from "./forms/property-info";
import GenaralInfo from "./forms/genaral-info";
import Locationinfo from "./forms/location-info";
import FormParent from "./forms/FormParent";
import Signin from "./components/SignIn";
import Signup from "./components/SignUp";
import Header from "./components/header";
import PropertyListing from "./components/PropertyListing";
import Search from "./components/search.js";
import NotFound from "./components/NotFound.js";
import React, { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin setToken={setToken} />}></Route>
          <Route path="/Signup" element={<Signup />}></Route>
          <Route
            path="/AllProperties/:userEmail/:userName"
            element={<PropertyListing token={token} setToken={setToken} />}
          ></Route>
          <Route
            path="/form/:userEmail/:userName"
            element={<FormParent token={token} setToken={setToken} />}
          ></Route>
          <Route
            path="/form/:editID/:userEmail/:userName"
            element={<FormParent token={token} setToken={setToken} />}
          ></Route>
          <Route
            path="/form/:editID/:userEmail/:userName"
            element={<FormParent token={token} setToken={setToken} />}
          ></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
