import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://api.github.com";

const useUserEvents = (username: string) => {
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrendingRepositories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/users/${username}/events`
        );

        setUserEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user events :", error);
        setLoading(false);
      }
    };

    fetchTrendingRepositories();
  }, []);

  return { userEvents, loading };
};

export default useUserEvents;
