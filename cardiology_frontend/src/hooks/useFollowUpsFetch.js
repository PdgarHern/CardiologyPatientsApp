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
  const [isLoadingPrevious, setIsLoadingPrevious] = useState(false);

  const fetchFollowUps = async (page, searchTerm = '') => {
    try {
      setError(false);
      setLoading(true);

      const followUps = await API.getFollowUps(patientId, searchTerm, page);

      if (followUps) {
        setState(prev => ({
          ...followUps,
          results: [...followUps.results]
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
  }, [isLoadingMore, searchTerm, state.page]);

  useEffect(() => {
    if (!isLoadingPrevious) return;

    fetchFollowUps(state.page - 1, searchTerm);
    setIsLoadingPrevious(false);
  }, [isLoadingPrevious, searchTerm, state.page]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore, setIsLoadingPrevious };
}
