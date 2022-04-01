import { useState, useEffect } from "react";
// API
import API from "../API";

const initialState = {
  page: 0,
  results: [],
  total_pages: 0
}

export const useChatFetch = (doctorId, patientId) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchChat = async (page, searchTerm = '') => {
    try {
      setLoading(true);
      setLoading(false);

      const chat = await API.getChats(doctorId, patientId, searchTerm, page);

      if (doctorId == null) {
        setState(prev => ({
          ...chat,
          results:
          page > 1 ? [...prev.results, ...chat.results] : [...chat.results]
        }))
      } else {
        setState({
          ...chat.results
        })
      }
      
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  }

  useEffect(() => {
    setState(initialState);
    fetchChat(1, searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    if (!isLoadingMore) return;

    fetchChat(state.page + 1, searchTerm);
    setIsLoadingMore(false);
  }, [isLoadingMore, searchTerm, state.page]);

  return { state, loading, error, searchTerm, setSearchTerm, setIsLoadingMore };
}
