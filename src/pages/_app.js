import NotificationContainer from "@/components/organism/Notification";
import Layout from "@/components/templates/Layout";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if (token) {
  //     try {
  //       const decoded = jwtDecode(token);
  //       const roles = decoded.role || [];
  //       console.log("roles", roles);

  //       if (router.pathname.startsWith("/admin") && !roles.includes("ADMIN")) {
  //         router.replace("/");
  //       } else {
  //         setIsAuthorized(true);
  //       }
  //     } catch (error) {
  //       console.error("Invalid token:", error);
  //       router.replace("/");
  //     }
  //   } else {
  //     if (router.pathname.startsWith("/admin")) {
  //       router.replace("/");
  //     } else {
  //       setIsAuthorized(true);
  //     }
  //   }

  //   setTimeout(() => setLoading(false), 500);
  // }, [router.pathname]);

  // if (loading)
  //   return (
  //     <div className="h-screen flex justify-center items-center">
  //       Loading...
  //     </div>
  //   );
  return (
    <Provider store={store}>
      <Layout>
        <NotificationContainer />
        {/* {isAuthorized && <Component {...pageProps} />} */}
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
