import { useState, useEffect } from 'react';

export const useFetch = (url: string) => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchUrl = async () => {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  };

  useEffect(() => {
    fetchUrl();
  }, []);

  return [data, loading];
};
