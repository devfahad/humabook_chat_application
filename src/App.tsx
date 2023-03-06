import React, {useContext} from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import {AuthContext} from "./context/AuthContext";

const App = () => {
  const {currentUser}: any = useContext(AuthContext);

  const ProtectedRoute = ({children}: any) => {
    if (!currentUser) return (
      <Navigate to="/login" />
    )
    // show all pages if user is logged in
    return children
  };

  return (
    <div className="font-poppins">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
