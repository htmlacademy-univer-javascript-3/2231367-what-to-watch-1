import {useNavigate, useParams} from 'react-router-dom';
import {ChangeEvent, FormEvent, useState} from 'react';
import {postFilmReview} from '../../store/api-actions';
import {useAppDispatch} from "../../hooks";

function AddReviewForm() {
  const id = Number(useParams().id).toString();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [starRating, setStarRating] = useState('-1');
  const [reviewContent, setReviewContent] = useState('');
  const reviewSubmitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postFilmReview({id: Number(id), comment: reviewContent, rating: Number(starRating)}));
    navigate(`/films/${id}`);
  };

  const [postDisabledByContent, setPostDisabledByContent] = useState(true);
  const [postDisabledByStar, setPostDisabledByStar] = useState(true);

  return (
    <form action="#" className="add-review__form" onSubmit={reviewSubmitHandler}>
      <div className="rating">
        <div className="rating__stars">
          <input className="rating__input" id="star-10" type="radio" name="rating" value="10"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setStarRating(evt.target.value);
              setPostDisabledByStar(! evt.target.value );
            }}
          />
          <label className="rating__label" htmlFor="star-10">Rating 10</label>
          <input className="rating__input" id="star-9" type="radio" name="rating" value="9"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setStarRating(evt.target.value);
              setPostDisabledByStar(! evt.target.value );
            }}
          />
          <label className="rating__label" htmlFor="star-9">Rating 9</label>
          <input className="rating__input" id="star-8" type="radio" name="rating" value="8"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setStarRating(evt.target.value);
              setPostDisabledByStar(! evt.target.value );
            }}
          />
          <label className="rating__label" htmlFor="star-8">Rating 8</label>
          <input className="rating__input" id="star-7" type="radio" name="rating" value="7"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setStarRating(evt.target.value);
              setPostDisabledByStar(! evt.target.value );
            }}
          />
          <label className="rating__label" htmlFor="star-7">Rating 7</label>
          <input className="rating__input" id="star-6" type="radio" name="rating" value="6"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setStarRating(evt.target.value);
              setPostDisabledByStar(! evt.target.value );
            }}
          />
          <label className="rating__label" htmlFor="star-6">Rating 6</label>
          <input className="rating__input" id="star-5" type="radio" name="rating" value="5"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setStarRating(evt.target.value);
              setPostDisabledByStar(! evt.target.value );
            }}
          />
          <label className="rating__label" htmlFor="star-5">Rating 5</label>
          <input className="rating__input" id="star-4" type="radio" name="rating" value="4"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setStarRating(evt.target.value);
              setPostDisabledByStar(! evt.target.value );
            }}
          />
          <label className="rating__label" htmlFor="star-4">Rating 4</label>
          <input className="rating__input" id="star-3" type="radio" name="rating" value="3"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setStarRating(evt.target.value);
              setPostDisabledByStar(! evt.target.value );
            }}
          />
          <label className="rating__label" htmlFor="star-3">Rating 3</label>
          <input className="rating__input" id="star-2" type="radio" name="rating" value="2"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setStarRating(evt.target.value);
              setPostDisabledByStar(! evt.target.value );
            }}
          />
          <label className="rating__label" htmlFor="star-2">Rating 2</label>
          <input className="rating__input" id="star-1" type="radio" name="rating" value="1"
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setStarRating(evt.target.value);
              setPostDisabledByStar(! evt.target.value );
            }}
          />
          <label className="rating__label" htmlFor="star-1">Rating 1</label>
        </div>
      </div>
      <div className="add-review__text">
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
          value={reviewContent} onChange={(evt: ChangeEvent<HTMLTextAreaElement>) => {
            setReviewContent(evt.target.value);
            if (evt.target.value.length >= 50 && evt.target.value.length <= 400) {
              setPostDisabledByContent(false);
            } else {
              setPostDisabledByContent(true);
            }
          }}
        />
        <div className="add-review__submit">
          <button className="add-review__btn" type="submit" disabled={postDisabledByContent || postDisabledByStar}>Post</button>
        </div>
      </div>
    </form>
  );
}

export default AddReviewForm;
