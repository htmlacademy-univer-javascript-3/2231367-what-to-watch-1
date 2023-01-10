import {Fragment, SyntheticEvent} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationStatus, ReducerType} from '../../consts';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-actions';

function UserBlock(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state[ReducerType.User].authorizationStatus);
  const avatar = useAppSelector((state) => state[ReducerType.User].avatar);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSignOut = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(logoutAction());
    navigate(AppRoute.Main);
  };
  return (
    <ul className="user-block">
      {
        authorizationStatus !== AuthorizationStatus.Authorized
          ? <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
          : (
            <Fragment>
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src={avatar ?? ''} alt="User avatar" width="63" height="63" onClick={() => navigate(AppRoute.MyList)}/>
                </div>
              </li>
              <li className="user-block__item">
                <a href='/' className="user-block__link" onClick={handleSignOut}>Sign out</a>
              </li>
            </Fragment>
          )
      }
    </ul>
  );
}

export default UserBlock;
