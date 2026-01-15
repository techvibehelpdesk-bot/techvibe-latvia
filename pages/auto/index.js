// Aizstāj fetch daļu:
const { data } = await supabase
  .from('sludinajumi')
  .select('*')
  .or(`
    category.eq.auto,
    category.eq.Auto,
    category.ilike.%auto%
  `)
  .order('created_at', { ascending: false });
