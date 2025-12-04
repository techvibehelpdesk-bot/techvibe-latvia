
import { useRouter } from "next/router";

const useCustomParams = () => {
  const router = useRouter();
  return router.query;
};

export default useCustomParams;
  