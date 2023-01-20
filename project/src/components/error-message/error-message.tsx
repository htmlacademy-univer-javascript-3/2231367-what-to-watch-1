import './error-message.css';
import {useAppSelector} from '../../hooks';
import {getError} from '../../store/main-reducer/selector';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector(getError);
  if (!error) {
    return null;
  }
  return <div className='error-message'>{error}</div>;
}

export default ErrorMessage;
