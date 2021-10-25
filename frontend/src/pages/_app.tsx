import { AppProps } from "next/app";
import React, { useEffect } from "react";

import { AuthProvider } from "../components/auth/AuthProvider";
import "../../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default MyApp;
