import './error-message.css';
import {useAppSelector} from '../../hooks';
import {ReducerType} from '../../consts';

function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state[ReducerType.Main].error);
  if (!error) {
    return null;
  }
  return <div className='error-message'>{error}</div>;
}

export default ErrorMessage;
