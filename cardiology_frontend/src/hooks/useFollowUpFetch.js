import { useState, useEffect } from "react";
// API
import API from "../API";

export const useFollowUpFetch = followupId => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFollowUp = async () => {
      try {
        setLoading(true);
        setError(false);

        const followUp = await API.getFollowUp(followupId);

        setState({
          ...followUp
        });

        setLoading(false);
        
      } catch (error) {
        setError(true);
      }
    }

    fetchFollowUp()
  }, [followupId]);

  return { state, loading, setLoading, error, setError };
}
