import { useState, useEffect } from "react";
// API
import API from "../API";

const initialState = {
  page: 0,
  results: [],
  total_pages: 0
}

export const useTemplateParamsFetch = templateId => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isLoadingPrevious, setIsLoadingPrevious] = useState(false);

  const fetchTemplatesParams = async (page, searchTerm = '') => {
    try {
      setError(false);
      setLoading(true);

      const templatesParams = await API.getTemplatesParams(templateId, searchTerm, page);

      if (templatesParams) {
        setState(prev => ({
          ...templatesParams,
          results: [...templatesParams.results]
        }))
      }
      
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    setState(initialState);
    fetchTemplatesParams(1, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!isLoadingMore) return;

    fetchTemplatesParams(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  useEffect(() => {
    if (!isLoadingPrevious) return;

    fetchTemplatesParams(state.page - 1, searchTerm);
    setIsLoadingPrevious(false);
  }, [isLoadingPrevious, searchTerm, state.page]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore, setIsLoadingPrevious };
}
