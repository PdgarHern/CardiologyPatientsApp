import { useState, useEffect } from "react";
// API
import API from "../API";

export const usePatientFetch = (patientId, option) => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        setError(false);

        var patient = null;

        if (option == 'profile') {
          patient = await API.getPatients(patientId);

        } else {
          patient = await API.getPatient(patientId);
        }

        

        setState({
          ...patient
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
