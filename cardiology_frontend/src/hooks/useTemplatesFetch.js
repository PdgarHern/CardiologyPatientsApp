import { useState, useEffect } from "react";
// API
import API from "../API";

const initialState = { results: [] }

export const useTemplatesFetch = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchTemplates = async (page, searchTerm = '') => {
    try {
      setError(false);
      setLoading(true);

      const templates = await API.getTemplates(searchTerm, page);

      if (templates) {
        setState(prev => ({
          ...templates,
          results:
          page > 1 ? [...prev.results, ...templates.results] : [...templates.results]
        }))
      }

    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    setState(initialState);
    fetchTemplates(1, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!isLoadingMore) return;

    fetchTemplates(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
}
