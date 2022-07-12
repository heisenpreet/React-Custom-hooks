import { useState, useCallback } from "react";

//requestConfig is an object

const useHttp = (applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          headers: requestConfig.headers ? requestConfig.headers : {},
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
        });

        if (!response.ok) {
          throw new Error("REQUEST FAILED");
        }
        const data = await response.json();
        applyData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    },
    [applyData]
  );

  return {
    isLoading,
    error,
    sendRequest,
  };
};
export default useHttp;
