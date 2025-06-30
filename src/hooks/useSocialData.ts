import { useState, useEffect, useCallback } from 'react';
import { getSocialStats, getChartData, SocialStats, ChartData } from '../services/dataService';

export const useSocialData = () => {
  const [socialStats, setSocialStats] = useState<SocialStats | null>(null);
  const [followerChartData, setFollowerChartData] = useState<ChartData | null>(null);
  const [engagementChartData, setEngagementChartData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data concurrently for better performance
      const [stats, followerData, engagementData] = await Promise.all([
        getSocialStats(),
        getChartData('follower'),
        getChartData('engagement')
      ]);

      setSocialStats(stats);
      setFollowerChartData(followerData);
      setEngagementChartData(engagementData);
      setLastUpdated(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data from Firebase';
      setError(errorMessage);
      console.error('Error fetching social data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // Reset function to clear all data
  const reset = useCallback(() => {
    setSocialStats(null);
    setFollowerChartData(null);
    setEngagementChartData(null);
    setError(null);
    setLastUpdated(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh every 5 minutes (optional)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!loading) {
        fetchData();
      }
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [fetchData, loading]);

  return {
    // Data
    socialStats,
    followerChartData,
    engagementChartData,
    
    // State
    loading,
    error,
    lastUpdated,
    
    // Actions
    refetch,
    reset,
    
    // Computed values
    hasData: !!(socialStats && followerChartData && engagementChartData),
    isEmpty: !loading && !socialStats && !followerChartData && !engagementChartData
  };
};