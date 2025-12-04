import { useRouter } from 'next/router';

    const useNavigate = () => {
       const router = useRouter();
  
      const navigate = (path) => {
      router.push(path);
    };
  
    return navigate;
  }

  export default useNavigate;
  