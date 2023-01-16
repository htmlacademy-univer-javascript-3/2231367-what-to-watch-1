import React from 'react';

type ShowMoreProps = {
  onClick: () => void,
};

function ShowMore(props: ShowMoreProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button"
        onClick={props.onClick}
      >Show more
      </button>
    </div>
  );
}

export default ShowMore;
