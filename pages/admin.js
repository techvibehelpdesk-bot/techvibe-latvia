import Link from 'next/link';

export default function Admin() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-8">
      <div className="bg-white/95 backdrop-blur-xl p-16 rounded-3xl shadow-3xl max-w-4xl w-full">
        <h1 className="text-5xl font-black text-center text-gray-900 mb-12 drop-shadow-2xl">🔐 Admin Panelis</h1>
        
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          
          {/* SUPABASE SOLI */}
          <div className="bg-blue
