import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const useSignOut = () => {
  const [isSignedOut, setIsSignedOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isSignedOut) {
      router.push("/auth/login");
    }
  }, [isSignedOut, router]);

  const signOut = async () => {
    try {
      localStorage.removeItem("token");
      setIsSignedOut(true);
    } catch (error) {
      console.error(error);
    }
  };

  return { signOut, isSignedOut };
};

export default useSignOut;
