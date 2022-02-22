import { useState, useEffect } from "react";
// API
import API from "../API";

const initialState = { results: [] }

export const useChatFetch = (doctorId, patientId) => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        setLoading(true);
        setLoading(false);

        const chat = await API.getChats(doctorId, patientId);

        if (doctorId == null) {
          setState(prev => ({
            ...chat,
            results:
              [...chat]
          }))
        } else {
          setState({
            ...chat
          })
        }
        

        setLoading(false);
        
      } catch (error) {
        setError(true);
      }
    }

    fetchChat();
  }, [doctorId, patientId]);

  return { state, loading, error };
}
