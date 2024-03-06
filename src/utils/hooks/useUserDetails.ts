import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "https://api.github.com/users";

const useUserDetails = (username: string) => {
  const [user, setUser] = useState([]);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (username) {
        try {
          // Fetch user details
          const userDetailsResponse = await axios.get(
            `${API_BASE_URL}/${username}`
          );
          setUser(userDetailsResponse.data);

          // Fetch user repositories
          const reposResponse = await axios.get(
            `${API_BASE_URL}/${username}/repos`
          );
          setRepos(reposResponse.data);

          setLoading(false);
        } catch (error) {
          console.error("Error fetching user details:", error);
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [username]);

  return { user, repos, loading, error };
};

export default useUserDetails;
