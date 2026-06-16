// Звёзды с точной частичной заливкой (например, 4.9 из 5).
export default function Stars({ value }) {
  const pct = `${(Math.max(0, Math.min(5, value)) / 5) * 100}%`;
  return (
    <span className="stars" aria-hidden="true">
      <span className="stars__bg">★★★★★</span>
      <span className="stars__fill" style={{ width: pct }}>★★★★★</span>
    </span>
  );
}
