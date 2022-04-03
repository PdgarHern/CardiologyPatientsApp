import { useState, useEffect } from "react";
// API
import API from "../API";

const initialState = {
  page: 0,
  results: [],
  total_pages: 0
}

export const useFollowUpsFetch = patientId => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchFollowUps = async (page, searchTerm = '') => {
    try {
      setError(false);
      setLoading(true);

      const followUps = await API.getFollowUps(patientId, searchTerm, page);

      if (followUps) {
        setState(prev => ({
          ...followUps,
          results:
            page > 1 ? [...prev.results, ...followUps.results] : [...followUps.results]
        }))
      }

    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    setState(initialState);
    fetchFollowUps(1, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!isLoadingMore) return;

    fetchFollowUps(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page])

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
}
