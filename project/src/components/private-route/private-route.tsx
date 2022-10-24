import {Navigate} from 'react-router-dom';
import {AuthorizationStatus} from '../../types/AuthorizationStatus';
import {AppRoute} from "../../types/AppRoute";

type PrivateRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {authorizationStatus, children} = props;

  return (
    authorizationStatus === AuthorizationStatus.Authorized
      ? children
      : <Navigate to={AppRoute.SignIn} />
  );
}
export default PrivateRoute;
