"use client";

import type React from "react";

declare global {
  interface Window {
    dataLayer: any[];
  }
}

import { useEffect } from "react";
import Script from "next/script";

interface GTMProviderProps {
  gtmId: string;
  children: React.ReactNode;
}

export function GTMProvider({ gtmId, children }: GTMProviderProps) {
  useEffect(() => {
    if (gtmId) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "gtm.start": new Date().getTime(),
        event: "gtm.js",
      });
    }
  }, [gtmId]);

  if (!gtmId) return <>{children}</>;

  return (
    <>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
      {children}
    </>
  );
}
