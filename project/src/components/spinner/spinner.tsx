import './spinner.css';

function Spinner(): JSX.Element
{
  return (
    <div className="lds-ring" data-testid={'spinner'}><div></div><div></div><div></div><div></div></div>
  );
}

export default Spinner;
