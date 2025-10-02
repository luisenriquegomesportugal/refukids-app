import { useCallback, useEffect, useMemo, useState } from "react";
import { useApi } from "./useApi";

export function useQuery<T>(fetcher: (() => Promise<T>) | string) {
  const apiClient = useApi();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  // Memoiza a função de fetch
  const fetchFn = useMemo(() => {
    if (typeof fetcher === "string") {
      return async () => apiClient<T, { error: string }>(fetcher);
    }
    return fetcher;
  }, [fetcher]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    load();
  }, [load]);

  const refetch = useCallback(() => {
    load();
  }, [load]);

  return {
    data,
    loading,
    error,
    refetch,
  };
}
