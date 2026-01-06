import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import Head from 'next/head';
import Link from 'next/link';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Telefoni() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSludinajumi();
  }, []);

  const fetchSludinajumi = async () => {
    try {
      const { data, error } = await supabase
        .from('sludinajumi')
        .select('*')
        .eq('category', 'telefoni')
        .eq('status', 'publicēts')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSludinajumi(data || []);
    } catch (error) {
      console.error('Kļūda ielādējot sludinājumus:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl">Ielādē telefoni sludinājumus...</div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Telefoni - TechVibe.lv</title>
        <meta name="description" content="Telefoni sludinājumi Rīgai un Latvijai" />
      </Head>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">📱 Telefoni</h1>
              <p className="mt-2 text-xl text-gray-600">
                {sludinajumi.length} sludinājumi | ss.com stils
              </p>
            </div>
            <Link 
              href="/ievietot" 
              className="mt-4 sm:mt-0 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              + Ievietot sludinājumu
            </Link>
          </div>

          {sludinajumi.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📱</div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Vēl nav telefonu sludinājumu</h2>
              <Link 
                href="/ievietot" 
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 inline-block"
              >
                Būt pirmais – ievieto sludinājumu!
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sludinajumi.map((sludinajums) => (
                <div key={sludinajums.id} className="bg-white rou
