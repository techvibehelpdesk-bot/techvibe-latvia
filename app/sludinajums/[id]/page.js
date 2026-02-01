export default function TestPage({ params }) {
  return (
    <div style={{backgroundColor: 'red', color: 'white', padding: '50px', textAlign: 'center'}}>
      <h1 style={{fontSize: '60px'}}>🆕 JAUNS DIZAINS STRĀDĀ!</h1>
      <p>ID: {params.id}</p>
      <p style={{fontSize: '24px'}}>Ja redzi sarkano - VISKĀ OK!</p>
    </div>
  );
}

