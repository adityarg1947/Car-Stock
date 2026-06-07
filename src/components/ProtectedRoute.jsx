import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

  const user = localStorage.getItem("user");

  // NOT LOGGED IN
  if (!user) {

    return <Navigate to="/login" />;

  }

  // LOGGED IN
  return children;

};

export default ProtectedRoute;