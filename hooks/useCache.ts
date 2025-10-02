import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useApi } from "./useApi";

type CacheOptions = {
  ttl?: number; // tempo em ms
};

type CacheItem<T> = {
  data: T;
  timestamp: number;
  ttl: number;
};

async function setCache<T>(key: string, data: T, ttl: number) {
  const item: CacheItem<T> = {
    data,
    timestamp: Date.now(),
    ttl,
  };
  await AsyncStorage.setItem(key, JSON.stringify(item));
}

async function getCache<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (!raw) return null;

  try {
    const parsed: CacheItem<T> = JSON.parse(raw);
    if (Date.now() - parsed.timestamp > parsed.ttl) {
      await AsyncStorage.removeItem(key); // expirado
      return null;
    }
    return parsed.data;
  } catch {
    await AsyncStorage.removeItem(key);
    return null;
  }
}

async function removeCache(key: string) {
  await AsyncStorage.removeItem(key);
}

async function clearCache(prefix?: string) {
  const keys = await AsyncStorage.getAllKeys();
  if (prefix) {
    const filtered = keys.filter((k) => k.startsWith(prefix));
    await AsyncStorage.multiRemove(filtered);
  } else {
    await AsyncStorage.multiRemove(keys);
  }
}

export function useCacheQuery<T>(
  key: string[],
  fetcher: (() => Promise<T>) | string,
  options?: CacheOptions
) {
  const apiClient = useApi();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  // TTL padrão de 10 minutos
  const ttl = useMemo(() => options?.ttl ?? 1000 * 60, [options?.ttl]);

  // Memoiza a chave para evitar recriações desnecessárias
  const cacheKey = useMemo(() => key.join("_"), [key]);

  // 🔑 Garante que o fetchFn não seja recriado a cada render
  const fetchFn = useMemo(() => {
    if (typeof fetcher === "string") {
      return async () => apiClient<T, { error: string }>(fetcher);
    }
    return fetcher;
    // 👇 removido apiClient das dependências
  }, [fetcher]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const cached = await getCache<T>(cacheKey);
      if (cached) {
        setData(cached);
        setLoading(false);
        return;
      }

      const fresh = await fetchFn();
      setData(fresh);
      await setCache(cacheKey, fresh, ttl);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [cacheKey, fetchFn, ttl]);

  useEffect(() => {
    load();
  }, [load]);

  const refetch = useCallback(async () => {
    await removeCache(cacheKey);
    await load();
  }, [cacheKey, load]);

  return {
    data,
    loading,
    error,
    refetch,
    remove: () => removeCache(cacheKey),
    clearAll: clearCache,
  };
}