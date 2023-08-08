import React from "react";
import { Route, Routes } from "react-router-dom";
import Signin from "./Pages/Signin/Signin";
import Signup from "./Pages/Signup/Signup";

const App = () => {
  return (
    <>
      <Routes>
        <Route path={"/"} element={<Signin />} />
        <Route path={"/signup"} element={<Signup />} />
      </Routes>
    </>
  );
};

export default App;
