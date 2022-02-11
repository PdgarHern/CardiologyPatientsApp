import { useState, useEffect } from "react";
// API
import API from "../API";

export const useParameterFetch = parameterId => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchParameter = async () => {
      try {
        setError(false);
        setLoading(true);

        const parameter = await API.getParameter(parameterId);

        if (parameter) {
          setState(prev => ({
            ...parameter
          }))
        }

        setLoading(false);

      } catch (error) {
        setError(true);
      }
    }

    fetchParameter();
  }, [parameterId]);

  return { state, loading, error };
}
