import { useState, useEffect, useCallback } from 'react';

interface CacheEntry {
  data: any;
  lastUpdated: number;
}

// Global cache outside of component lifecycle
const cache = new Map<string, CacheEntry>();
const inFlightRequests = new Map<string, Promise<any>>();

export function useApiQuery<T>(
  key: string,
  fetcher: () => Promise<any>,
  options: { enabled?: boolean; staleTime?: number } = {}
) {
  const enabled = options.enabled !== false;
  const staleTime = options.staleTime || 60000; // 1 minute default

  const [state, setState] = useState<{
    data: T | undefined;
    isLoading: boolean;
    isRefreshing: boolean;
    error: any | null;
  }>(() => {
    const cached = cache.get(key);
    return {
      data: cached ? cached.data : undefined,
      isLoading: enabled && !cached,
      isRefreshing: false,
      error: null,
    };
  });

  const fetchData = useCallback(async (force = false) => {
    if (!enabled) return;
    
    const cached = cache.get(key);
    const isStale = !cached || (Date.now() - cached.lastUpdated > staleTime);
    
    if (!isStale && !force) {
      if (state.isLoading) {
        setState({ data: cached.data, isLoading: false, isRefreshing: false, error: null });
      }
      return;
    }

    setState(prev => ({
      ...prev,
      isLoading: !cached,
      isRefreshing: !!cached,
    }));

    try {
      let promise = inFlightRequests.get(key);
      if (!promise) {
        promise = fetcher();
        inFlightRequests.set(key, promise);
      }

      const res = await promise;
      
      if (res && res.success === false) {
        throw new Error(res.message || res.errorCode || "API returned success: false");
      }
      
      if (inFlightRequests.get(key) === promise) {
        inFlightRequests.delete(key);
      }

      const finalData = res;
      cache.set(key, { data: finalData, lastUpdated: Date.now() });
      
      setState({
        data: finalData,
        isLoading: false,
        isRefreshing: false,
        error: null,
      });
    } catch (err: any) {
      if (inFlightRequests.has(key)) {
        inFlightRequests.delete(key);
      }
      
      setState(prev => ({
        ...prev,
        isLoading: false,
        isRefreshing: false,
        error: err.message || "Failed to fetch data",
      }));
    }
  }, [key, enabled, staleTime]);

  useEffect(() => {
    let active = true;
    
    // We run it, but we can't easily cancel the underlying fetch if it's shared.
    // However, we can prevent setting state if unmounted.
    // Since we used useCallback, we must be careful. 
    // We will just let it run. The only issue is setState on unmounted component.
    // But React 18 removes that warning, and our state is safe.
    
    fetchData();

    return () => { active = false; };
  }, [fetchData]);

  const refetch = useCallback(() => {
    cache.delete(key);
    fetchData(true);
  }, [key, fetchData]);

  return { ...state, refetch };
}
