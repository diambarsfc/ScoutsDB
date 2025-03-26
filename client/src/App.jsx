import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import SignUp from './components/SignUp';

const App = () => {

  return (
    <Router>
      <Routes>

        {/* Route for login page */}
        <Route path="/" element={<LoginPage />} />

        {/* Route for dashboard or a protected page */}
        <Route path="/signUp" element={
            <ProtectedRoute>
              <SignUp />
            </ProtectedRoute>
          } />
          
          {/* <Route path="*" element={<Navigate to="/" />} /> */}

      </Routes>
    </Router>
  );
};

export default App;
