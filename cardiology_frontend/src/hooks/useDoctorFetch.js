import { useState, useEffect } from "react";
// API
import API from "../API";

export const useDoctorFetch = doctorId => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        setError(false);

        const doctor = await API.getDoctor(doctorId);

        setState({
          ...state
        });

        setLoading(false);

      } catch (error) {
        setError(true);
      }
    }

    fetchDoctor()
  }, [doctorId]);

  return { state, loading, error };
}
