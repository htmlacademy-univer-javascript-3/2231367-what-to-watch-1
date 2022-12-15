import {ChangeEvent, FormEvent, useState} from 'react';
import Logo from '../../components/logo/logo';
import Footer from '../../components/footer/footer';
import {useNavigate} from 'react-router-dom';
import {AppRoute} from '../../types/AppRoute';
import {AuthorizationData} from '../../types/AuthorizationData';
import {loginAction} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks';

function SignInPage(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onSubmit = (authData: AuthorizationData) => {
    dispatch(loginAction(authData));
    navigate(AppRoute.Main);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (email !== '' && password !== '') {
      onSubmit({ email, password });
    }
  };
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>
      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form" onSubmit={handleSubmit}>
          <div className="sign-in__fields">
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
