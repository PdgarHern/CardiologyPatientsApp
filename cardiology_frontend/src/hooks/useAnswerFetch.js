import { useState, useEffect } from "react";
// API
import API from "../API";

export const useAnswerFetch = answerId => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        setError(false);
        setLoading(true);

        const answer = await API.getAnswer(answerId);

        if (answer) {
          setState(prev => ({
            ...answer
          }))
        }

        setLoading(false);

      } catch (error) {
        setError(true);
      }
    }

    fetchAnswer();
  }, [answerId]);

  return { state, loading, error };
}
