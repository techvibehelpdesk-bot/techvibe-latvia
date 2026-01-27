export default function SludinajumaDetalas({ params }) {
  return (
    <div>
      <h1>SLUDINĀJUMS #{params.id}</h1>
      <p>TechVibe sludinājumi sadaļa darbojas!</p>
      <a href="/sludinājumi">← Uz sludinājumiem</a>
    </div>
  );
}
