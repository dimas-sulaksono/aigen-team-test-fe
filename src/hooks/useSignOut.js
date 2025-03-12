import { useRouter } from "next/compat/router";
import { useState } from "react";

const useSignOut = () => {
  const [isSignedOut, setIsSignedOut] = useState(false);

  const router = useRouter();
  const signOut = async () => {
    try {
      localStorage.removeItem("token");
      router.push("/auth/login");
      setIsSignedOut(true);
    } catch (error) {
      console.error(error);
    }
  };

  return { signOut, isSignedOut };
};

export default useSignOut;
