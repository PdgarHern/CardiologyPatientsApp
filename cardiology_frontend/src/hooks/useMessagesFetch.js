import React, { useState, useEffect } from "react";
// API
import API from "../API";

const initialState = { results: [] }

export const useMessagesFetch = chatId => {
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

	const fetchMessages = async () => {
		try {
			setError(false);
			setLoading(true);

			const messages = await API.getMessages(chatId);

			if (messages) {
				setState(prev => ({
					...messages,
					results:
						[...messages]
				}))
			}

		} catch (error) {
			setError(true);
		}

		

		setLoading(false);
	};

	useEffect(() => {
		setState(initialState);
		fetchMessages();
		document.addEventListener('newMessage', (e) => {
      setState(prev => ({
				results:
					[...prev.results, e.detail]
			}))
    })
	}, []);

	return { state, loading, error };
}
