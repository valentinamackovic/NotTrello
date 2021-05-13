import { Redirect, Route } from "react-router-dom";
import { isAuthenticated } from "../authentication/authService";

function ProtectedRoute({ component: Component, ...rest }: any) {
  if (isAuthenticated()) {
    return (
      <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
    );
  }

  return <Redirect to={{ pathname: "/login" }} />;
}

export default ProtectedRoute;
