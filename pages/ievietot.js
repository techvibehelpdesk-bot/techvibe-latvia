// ... esošais Header import ...
export default function Home() {
  const [sludinajumi, setSludinajumi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const { data } = await supabase
        .from('sludinajumi')
        .select('*')
        .eq('status', 'publicēts')
        .order('created_at', { ascending: false });
      setSludinajumi(data || []);
      setLoading(false);
    }
    fetchData();
  }, []);

  // ... resto kods ar īstajiem sludinajumiem ...
}
