import { useState, useEffect } from "react";
// API
import API from "../API";

const initialState = { results: [] }

export const useFollowUpsFetch = patientId => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchFollowUps = async () => {
    try {
      setError(false);
      setLoading(true);

      const followUps = await API.getFollowUps(patientId);

      if (followUps) {
        setState(prev => ({
          ...followUps,
          results:
            [...followUps]
        }))
      }

    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    setState(initialState);
    fetchFollowUps();
  }, []);

  return { state, loading, error };
}
