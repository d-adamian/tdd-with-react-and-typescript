import { type Review } from "../types";

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList = ({ reviews }: ReviewListProps) => {
  return (
    <div data-testid="reviews-container">
      {reviews.map((review) => (
        <div key={review.id} data-testid="review">
          {review.content}
        </div>
      ))}
    </div>
  );
};
