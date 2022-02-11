import { useState, useEffect } from "react";
// API
import API from "../API";

const initialState = { results: [] }

export const useParametersFetch = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchParameters = async () => {
    try {
      setError(false);
      setLoading(true);

      const parameters = await API.getParameters();

      if (parameters) {
        setState(prev => ({
          ...parameters,
          results:
            [...parameters]
        }))
      }

    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    setState(initialState);
    fetchParameters()
  }, []);

  return { state, loading, error };
}
