import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://api.github.com/search/repositories";

const usePopularRepositories = () => {
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);

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
      }
    };

    fetchTrendingRepositories();

    // Cleanup function (optional)
    return () => {
      // You can perform cleanup actions here if needed
    };
  }, []);

  return { repositories, loading };
};

export default usePopularRepositories;
