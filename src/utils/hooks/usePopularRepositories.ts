import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://api.github.com/search/repositories";

const usePopularRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchTrendingRepositories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}?q=stars:>1&sort=star`
        );
        setRepositories(response.data.items);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending repositories:", error);
        setLoading(false);
        setError(error);
      }
    };

    fetchTrendingRepositories();
  }, []);

  return { repositories, loading, error };
};

export default usePopularRepositories;
