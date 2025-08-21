import { useState, useEffect } from "react";

export function useQuery<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
): { data: T | null; error: Error | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchFunction()
      .then((result) => {
        setData(result);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, dependencies);

  return { data, error, loading };
}