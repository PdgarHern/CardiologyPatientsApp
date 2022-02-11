import { useState, useEffect } from "react";
// API
import API from "../API";

export const useHospitalFetch = hospitalId => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchHospital = async () => {
      try {
        setError(false);
        setLoading(true);
  
        const hospital = await API.getHospital(hospitalId);
  
        if (hospital) {
          setState(prev => ({
            ...hospital
          }))
        }

        setLoading(false);

      } catch (error) {
        setError(true);
      }
    }

    fetchHospital();
  }, [hospitalId]);

  return { state, loading, error };  
}
