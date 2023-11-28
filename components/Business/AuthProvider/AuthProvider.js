"use client";

import React, { useEffect, useState } from "react";
import { getProviders, signIn } from "next-auth/react";

const useAuthProviersHook = () => {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    const fetchProviders = async () => {
      const result = await getProviders();
      const resArr = Object.entries(result);
      setProviders(resArr);
    };

    fetchProviders();
  }, []);

  return {
    providers,
    signIn
  };
};

export default useAuthProviersHook;
