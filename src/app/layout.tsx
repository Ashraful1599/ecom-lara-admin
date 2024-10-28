import "jsvectormap/dist/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";

import React, { useEffect, useState } from "react";
import ReduxProvider from "@/components/ReduxProvider";
//import Loader from "@/components/common/Loader";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const pathname = usePathname();

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <ReduxProvider>{children}</ReduxProvider>
        </div>
      </body>
    </html>
  );
}
