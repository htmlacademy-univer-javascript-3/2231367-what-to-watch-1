import {Navigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import {useAppSelector} from '../../hooks';
import {getAuthorizationStatus} from '../../store/user-reducer/selector';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return (
    authorizationStatus === AuthorizationStatus.Authorized
      ? props.children
      : <Navigate to={AppRoute.SignIn} />
  );
}
export default PrivateRoute;
