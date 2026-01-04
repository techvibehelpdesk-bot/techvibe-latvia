import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Telefoni() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('sludinajumi')
      .select('*')
      .eq('category', 'telefoni')
      .eq('status', 'publicēts')
      .order('created_at', { ascending: false })
      .then(({ data, error
