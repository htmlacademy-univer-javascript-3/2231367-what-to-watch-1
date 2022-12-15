import {Review} from '../../types/ReviewType';

type ReviewsTabProps = {
  reviews: Review[];
}

function ReviewsTab(props: ReviewsTabProps): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {props.reviews.map((review) => (
          <div className="review" key={`review-${review.id}`}>
            <blockquote className="review__quote">
              <p className="review__text">
                {review.comment}
              </p>
              <footer className="review__details">
                <cite className="review__author">
                  {review.author.name}
                </cite>
                <time className="review__date" dateTime={review.date}>
                  {review.date}
                </time>
              </footer>
            </blockquote>
            <div className="review__rating">{review.rating}</div>
          </div>))}
      </div>
    </div>
  );
}

export default ReviewsTab;
