import {Navigate} from 'react-router-dom';
import {AuthorizationStatus} from '../../types/AuthorizationStatus';
import {AppRoute} from '../../types/AppRoute';
import {useAppSelector} from '../../hooks';

type PrivateRouteProps = {
  children: JSX.Element;
}
function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authorizationStatus } = useAppSelector((state) => state);
  return (
    authorizationStatus === AuthorizationStatus.Authorized
      ? props.children
      : <Navigate to={AppRoute.SignIn} />
  );
}
export default PrivateRoute;
