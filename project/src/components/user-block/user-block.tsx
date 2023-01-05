import {Fragment, SyntheticEvent} from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../types/AppRoute';
import {AuthorizationStatus} from '../../types/AuthorizationStatus';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-actions';

function UserBlock(): JSX.Element {
  const { authorizationStatus, user } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const handleSignOut = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(logoutAction());
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
                  <img src={user?.avatarUrl} alt="User avatar" width="63" height="63"/>
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
