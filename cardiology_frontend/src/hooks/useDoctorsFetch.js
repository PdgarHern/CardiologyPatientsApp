import { useState, useEffect } from "react";
// API
import API from "../API";

const initialState = { results: [] }

export const useDoctorsFetch = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchDoctors = async () => {
    try {
      setError(false);
      setLoading(true);

      const doctors = await API.getDoctors();

      if (doctors) {
        setState(prev => ({
          ...doctors,
          results:
            [...doctors]
        }))
      }

    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    setState(initialState);
    fetchDoctors();
  }, []);

  return { state, loading, error };
}
