// components/ArtfutLoader.js
import { useEffect, useState } from "react";
import Script from "next/script";

export default function ArtfutLoader() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (window.location.hostname === "www.sedarglobal.com" && !window.location.pathname.includes("/payment")) {
      setLoad(true);
    }
  }, []);

  if (!load) return null;

  return (
    <Script
      src="https://www.artfut.com/static/tagtag.min.js?campaign_code=98c772a893"
      strategy="afterInteractive"
    />
  );
}
