import {ChangeEvent, FormEvent, useState} from 'react';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import {Navigate, useNavigate} from 'react-router-dom';
import {AppRoute, AuthorizationError, AuthorizationStatus, ReducerType} from '../../consts';
import {AuthorizationData} from '../../types/authorization-data';
import {login} from '../../store/api-actions';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setAuthorizationError} from '../../store/user-reducer/user-reducer';
import {errorMessageHandle} from '../../services/error-message-handle';

function SignInPage(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state[ReducerType.User].authorizationStatus);
  const authorizationError = useAppSelector((state) => state[ReducerType.User].authorizationError);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = (authData: AuthorizationData) => {
    dispatch(login(authData))
      .then(() => navigate(AppRoute.Main))
      .catch((err) => errorMessageHandle(`Something went wrong. ${err.message}`));
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if ((email === '' || !(/\S+@\S+\.\S+/.test(email))) && (password === '' || !(/(?=.*[a-zA-Z])(?=.*[0-9])[0-9a-zA-Z]{2,}/.test(password)))) {
      dispatch(setAuthorizationError(AuthorizationError.InvalidEmailAndPassword));
    } else if (email === '' || !(/\S+@\S+\.\S+/.test(email))) {
      dispatch(setAuthorizationError(AuthorizationError.InvalidEmail));
    } else if (password === '' || !(/(?=.*[a-zA-Z])(?=.*[0-9])[0-9a-zA-Z]{2,}/.test(password))) {
      dispatch(setAuthorizationError(AuthorizationError.InvalidPassword));
    } else {
      onSubmit({ email, password });
    }
  };
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  if (authorizationStatus === AuthorizationStatus.Authorized) {
    return <Navigate to={AppRoute.Main} />;
  }
  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
            <div className="sign-in__message">
              {authorizationError}
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" value={email} onChange={handleEmailChange}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                className="sign-in__input" type="password" placeholder="Password" name="user-password"
                id="user-password" value={password} onChange={handlePasswordChange}
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default SignInPage;
