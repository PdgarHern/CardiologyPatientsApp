import { useState, useEffect } from "react";
// API
import API from "../API";

const initialState = {
  page: 0,
  results: [],
  total_pages: 0
}

export const useParametersFetch = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoadingPrevious, setIsLoadingPrevious] = useState(false);

  const fetchParameters = async (page, searchTerm = '') => {
    try {
      setError(false);
      setLoading(true);

      const parameters = await API.getParameters(searchTerm, page);

      if (parameters) {
        setState(prev => ({
          ...parameters,
          results: [...parameters.results]
        }))
      }

    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    setState(initialState);
    fetchParameters(1, searchTerm)
  }, [searchTerm]);

  useEffect(() => {
    if (!isLoadingMore) return;

    fetchParameters(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  useEffect(() => {
    if (!isLoadingPrevious) return;

    fetchParameters(state.page - 1, searchTerm);
    setIsLoadingPrevious(false);
  }, [isLoadingPrevious, searchTerm, state.page]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore, setIsLoadingPrevious };
}
