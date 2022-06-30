import { useCallback, useState } from 'react';

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCall = useCallback(async (url, applyData, text) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No data found!');
        }
        throw new Error('Something went wrong');
      }
      const responseData = text ? await response.text() : await response.json();

      applyData(responseData);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  return { isLoading, error, fetchCall };
};

export default useHttp;
