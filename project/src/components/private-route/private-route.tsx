import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, ReducerType} from '../../consts';
import {useAppSelector} from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state[ReducerType.User].authorizationStatus);
  return (
    authorizationStatus === AuthorizationStatus.Authorized
      ? props.children
      : <Navigate to={AppRoute.SignIn} />
  );
}
export default PrivateRoute;
