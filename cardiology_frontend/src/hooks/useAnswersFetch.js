import { useState, useEffect } from "react";
// API
import API from "../API";

const initialState = { results: [] }

export const useAnswersFetch = followupId => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchAnswers = async () => {
    try {
      setError(false);
      setLoading(true);

      const answers = await API.getAnswers(followupId);

      if (answers) {
        setState(prev => ({
          ...answers,
          results:
            [...answers]
        }))
      }

    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    setState(initialState);
    fetchAnswers();
  }, []);

  return { state, loading, error };
}
