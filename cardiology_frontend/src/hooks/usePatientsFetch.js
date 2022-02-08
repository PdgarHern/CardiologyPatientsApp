import { useState, useEffect } from "react";
// API
import API from "../API";

const initialState = { results: [] }

export const usePatientsFetch = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchPatients = async () => {
    try {
      setError(false);
      setLoading(true);

      const patients = await API.getPatients();

      if (patients) {
        setState(prev => ({
          ...patients,
          results:
            [...patients]
        }))
      }

    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    setState(initialState);
    fetchPatients();
  }, []);

  return { state, loading, error };
}
