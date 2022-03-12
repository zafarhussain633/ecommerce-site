import { useEffect } from "react";
import "../styles/globals.css";
import { getUser } from "src/utils/storage";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const checkLogin = getUser();
    if (checkLogin === false) {
      router.push("/");
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
