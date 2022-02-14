import { useState, useEffect } from "react";
// API
import API from "../API";

const initialState = { results: [] }

export const useTemplateParamsFetch = templateId => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchTemplatesParams = async () => {
    try {
      setError(false);
      setLoading(true);

      const templatesParams = await API.getTemplatesParams(templateId);

      if (templatesParams) {
        setState(prev => ({
          ...templatesParams,
          results:
            [...templatesParams]
        }))
      }
      
    } catch (error) {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    setState(initialState);
    fetchTemplatesParams();
  }, []);

  return { state, loading, error };
}
