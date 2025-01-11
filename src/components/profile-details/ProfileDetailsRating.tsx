interface ProfileDetailsRatingProps {
  rating: number | undefined;
}

export default function ProfileDetailsRating({ rating }: ProfileDetailsRatingProps) {
  // Handle the case where rating is undefined
  rating = rating ?? 0;

  // Generate the stars dynamically
  const stars = Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={`rating ${rating > i ? 'rating-active' : ''}`}>★</span>
  ));

  return <div className="rating-container">{stars}</div>;
}
