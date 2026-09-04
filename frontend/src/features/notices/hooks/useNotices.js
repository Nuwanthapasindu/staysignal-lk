import { useState, useEffect, useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchNotices, fetchTicker } from '../api/noticesApi';
import { fetchTowns } from '../../geography/api/geographyApi';

export const useNotices = (initialOverrides = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read initial values from URL query parameters with overrides fallback
  const urlTown = searchParams.get('town') || initialOverrides.town || 'all';
  const urlStatus = searchParams.get('status') || initialOverrides.status || 'all';
  const urlIssue = searchParams.get('issue') || initialOverrides.issue || 'all';
  const urlQ = searchParams.get('q') || initialOverrides.q || '';
  const urlFrom = searchParams.get('from') || initialOverrides.from || '';
  const urlTo = searchParams.get('to') || initialOverrides.to || '';
  const urlSort = searchParams.get('sort') || initialOverrides.sort || 'newest';

  const [town, setTown] = useState(urlTown);
  const [status, setStatus] = useState(urlStatus);
  const [issue, setIssue] = useState(urlIssue);
  const [searchQuery, setSearchQuery] = useState(urlQ);
  const [fromDate, setFromDate] = useState(urlFrom);
  const [toDate, setToDate] = useState(urlTo);
  const [sortBy, setSortBy] = useState(urlSort);

  const [notices, setNotices] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    open: 0,
    caution: 0,
    disrupted: 0,
    closed: 0,
    resolved: 0,
    townCounts: {},
  });
  const [towns, setTowns] = useState([]);
  const [ticker, setTicker] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync state from URL when URL params change externally (e.g. browser back/forward or navigation)
  useEffect(() => {
    const curTown = searchParams.get('town') || 'all';
    const curStatus = searchParams.get('status') || 'all';
    const curIssue = searchParams.get('issue') || 'all';
    const curQ = searchParams.get('q') || '';
    const curSort = searchParams.get('sort') || 'newest';
    const curFrom = searchParams.get('from') || '';
    const curTo = searchParams.get('to') || '';

    setTown(curTown);
    setStatus(curStatus);
    setIssue(curIssue);
    setSearchQuery(curQ);
    setSortBy(curSort);
    setFromDate(curFrom);
    setToDate(curTo);
  }, [searchParams]);

  // Synchronize filters back to URL search params
  const updateUrlParams = useCallback((newFilters) => {
    const params = new URLSearchParams();
    if (newFilters.town && newFilters.town !== 'all') params.set('town', newFilters.town);
    if (newFilters.status && newFilters.status !== 'all') params.set('status', newFilters.status);
    if (newFilters.issue && newFilters.issue !== 'all') params.set('issue', newFilters.issue);
    if (newFilters.q) params.set('q', newFilters.q);
    if (newFilters.from) params.set('from', newFilters.from);
    if (newFilters.to) params.set('to', newFilters.to);
    if (newFilters.sort && newFilters.sort !== 'newest') params.set('sort', newFilters.sort);

    setSearchParams(params, { replace: true });
  }, [setSearchParams]);

  // Fetch Towns list once
  useEffect(() => {
    let isMounted = true;
    fetchTowns()
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          setTowns(data);
        }
      })
      .catch((err) => {
        console.warn('Could not load towns via API', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch Ticker data
  const loadTicker = useCallback(async () => {
    try {
      const data = await fetchTicker();
      setTicker(data);
    } catch (err) {
      console.warn('Could not load live ticker', err);
    }
  }, []);

  useEffect(() => {
    loadTicker();
    const interval = setInterval(loadTicker, 30000); // 30s live poll
    return () => clearInterval(interval);
  }, [loadTicker]);

  // Main data fetcher
  const loadNotices = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        town,
        status,
        issue,
        q: searchQuery,
        from: fromDate,
        to: toDate,
        sort: sortBy,
      };
      const response = await fetchNotices(params);
      if (response && Array.isArray(response.notices)) {
        setNotices(response.notices);
        if (response.stats) {
          setStats(response.stats);
        }
      } else if (Array.isArray(response)) {
        setNotices(response);
      }
    } catch (err) {
      console.error('Error fetching notices:', err);
      setError(err.message || 'Failed to load live notices corridor feed');
    } finally {
      setLoading(false);
    }
  }, [town, status, issue, searchQuery, fromDate, toDate, sortBy]);

  useEffect(() => {
    loadNotices();
  }, [loadNotices]);

  // Filter setters that also update URL
  const handleSetTown = useCallback((t) => {
    setTown(t);
    updateUrlParams({ town: t, status, issue, q: searchQuery, from: fromDate, to: toDate, sort: sortBy });
  }, [status, issue, searchQuery, fromDate, toDate, sortBy, updateUrlParams]);

  const handleSetStatus = useCallback((s) => {
    setStatus(s);
    updateUrlParams({ town, status: s, issue, q: searchQuery, from: fromDate, to: toDate, sort: sortBy });
  }, [town, issue, searchQuery, fromDate, toDate, sortBy, updateUrlParams]);

  const handleSetIssue = useCallback((i) => {
    setIssue(i);
    updateUrlParams({ town, status, issue: i, q: searchQuery, from: fromDate, to: toDate, sort: sortBy });
  }, [town, status, searchQuery, fromDate, toDate, sortBy, updateUrlParams]);

  const handleSetSearchQuery = useCallback((q) => {
    setSearchQuery(q);
    updateUrlParams({ town, status, issue, q, from: fromDate, to: toDate, sort: sortBy });
  }, [town, status, issue, fromDate, toDate, sortBy, updateUrlParams]);

  const handleSetSortBy = useCallback((s) => {
    setSortBy(s);
    updateUrlParams({ town, status, issue, q: searchQuery, from: fromDate, to: toDate, sort: s });
  }, [town, status, issue, searchQuery, fromDate, toDate, updateUrlParams]);

  const handleSetDateRange = useCallback((from, to) => {
    setFromDate(from);
    setToDate(to);
    updateUrlParams({ town, status, issue, q: searchQuery, from, to, sort: sortBy });
  }, [town, status, issue, searchQuery, sortBy, updateUrlParams]);

  const resetFilters = useCallback(() => {
    setTown('all');
    setStatus('all');
    setIssue('all');
    setSearchQuery('');
    setFromDate('');
    setToDate('');
    setSortBy('newest');
    setSearchParams(new URLSearchParams(), { replace: true });
  }, [setSearchParams]);

  // Computed active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (town && town !== 'all') count += 1;
    if (status && status !== 'all') count += 1;
    if (issue && issue !== 'all') count += 1;
    if (searchQuery.trim()) count += 1;
    if (fromDate || toDate) count += 1;
    return count;
  }, [town, status, issue, searchQuery, fromDate, toDate]);

  return {
    notices,
    stats,
    towns,
    ticker,
    loading,
    error,
    filters: {
      town,
      status,
      issue,
      q: searchQuery,
      from: fromDate,
      to: toDate,
      sort: sortBy,
    },
    activeFiltersCount,
    setTown: handleSetTown,
    setStatus: handleSetStatus,
    setIssue: handleSetIssue,
    setSearchQuery: handleSetSearchQuery,
    setSortBy: handleSetSortBy,
    setDateRange: handleSetDateRange,
    resetFilters,
    refetch: loadNotices,
  };
};

export default useNotices;
