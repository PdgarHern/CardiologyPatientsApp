import { useState, useEffect } from "react";
// API
import API from "../API";

const initialState = { results: [] }

export const useTemplatesFetch = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchTemplates = async () => {
    try {
      setError(false);
      setLoading(true);

      const templates = await API.getTemplates();

      if (templates) {
        setState(prev => ({
          ...templates,
          results:
            [...templates]
        }))
      }

    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    setState(initialState);
    fetchTemplates();
  }, []);

  return { state, loading, error };
}
