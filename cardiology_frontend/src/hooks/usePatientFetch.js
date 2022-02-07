import { useState, useEffect } from "react";
// API
import API from "../API";

export const usePatientFetch = patientId => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        setError(false);

        const patient = await API.getPatient(patientId);

        setState({
          ...state
        });

        setLoading(false);

      } catch (error) {
        setError(true);
      }
    }

    fetchPatient();
  }, [patientId]);

  return { state, loading, error };
}
