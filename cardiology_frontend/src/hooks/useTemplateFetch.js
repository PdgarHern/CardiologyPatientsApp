import { useState, useEffect } from "react";
// API
import API from "../API";

export const useTemplateFetch = templateId => {
  const [state, setState] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        setError(false);
        setLoading(true);

        const template = await API.getTemplate(templateId);

        if (template) {
          setState(prev => ({
            ...template
          }))
        }

        setLoading(false);
        
      } catch (error) {
        setError(true);
      }
    }

    fetchTemplate();
  }, [templateId]);
  
  return { state, loading, error };
}
