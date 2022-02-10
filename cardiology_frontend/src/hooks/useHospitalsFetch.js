import { useState, useEffect } from "react";
// API
import API from "../API";

const initialState = { results: [] }

export const useHospitalsFetch = () => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchHospitals = async () => {
    try {
      setError(false);
      setLoading(true);

      const hospitals = await API.getHospitals();

      if (hospitals) {
        setState(prev => ({
          ...hospitals,
          results:
            [...hospitals]
        }))
      }

    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    setState(initialState);
    fetchHospitals();
  }, []);

  return { state, loading, error };
}
