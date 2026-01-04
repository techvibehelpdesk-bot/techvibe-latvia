import Link from 'next/link';

export default function Admin() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: 'system-ui'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)',
        padding: '4rem',
        borderRadius: '2rem',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
        maxWidth: '800px',
        width: '100%',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '900',
          color: '#1f2937',
          marginBottom: '3rem',
          textShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          🔐 Admin Panelis
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '3rem',
          marginBottom: '3rem'
        }}>
          
          {/* SUPABASE */}
          <div style={{
            background: '#eff6ff',
            border: '4px solid #bfdbfe',
            padding: '3rem',
            borderRadius: '2rem'
          }}>
            <h3 style={{ fontSize: '2rem
