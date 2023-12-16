import React, { useState, useEffect } from "react";
import "./App.css";
import Loader from "./Loader";
import { Icon } from "@iconify/react";
import * as dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

const API_BASE_URL = "https://api.github.com/users/";

dayjs.extend(relativeTime);

const getLocalItems = () => {
  const listOne = localStorage.getItem("detailCard");
  const listTwo = localStorage.getItem("detailCardTop");

  if (listOne && listTwo) {
    return JSON.parse(listOne || listTwo);
  } else {
    return [];
  }
};

const fetchUserDetails = (username) => {
  return fetch(`${API_BASE_URL}${username}`).then((res) =>
    res.json()
  );
};

const fetchUserRepos = (username) => {
  return fetch(`${API_BASE_URL}${username}/repos`).then((res) =>
    res.json()
  );
};

function App() {
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [followers, setFollowers] = useState("");
  const [following, setFollowing] = useState("");
  const [userInput, setUserInput] = useState("");
  const [avatar, setAvatar] = useState("");
  const [repoDetails, setReposDetails] = useState(getLocalItems());
  const [repos, setRepos] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("detailCardTop")) {
      setData(JSON.parse(localStorage.getItem("detailCardTop")));
      setReposDetails(JSON.parse(localStorage.getItem("detailCard")));
    } else {
      fetchUserDetails("example").then((data) => {
        setData(data);
      });
    }
  }, []);

  const setData = ({ name, login, followers, following, public_repos, avatar_url }) => {
    setName(name);
    setUserName(login);
    setFollowers(followers);
    setFollowing(following);
    setRepos(public_repos);
    setAvatar(avatar_url);
  };

  const handleSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    Promise.all([fetchUserDetails(userInput), fetchUserRepos(userInput)])
      .then(([dataFirst, dataSecond]) => {
        if (dataFirst.message) {
          setError(dataFirst.message);
          setReposDetails([]);
        } else {
          setData(dataFirst);
          localStorage.setItem("detailCardTop", JSON.stringify(dataFirst));
          setReposDetails(dataSecond);
          localStorage.setItem("detailCard", JSON.stringify(dataSecond));
          setError(null);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const renderRepo = (repo) => (
    <React.Fragment key={repo.id}>
      <div className="column">
        <div className="cardHeader" key={repo.id}>
          <h2 className="repo-name">{repo.name}</h2>
          <span>{dayjs(new Date(repo.created_at)).fromNow()}</span>
        </div>
        <div className="repoName">
          <p className="repDetails">Forks Count - {repo.forks} </p>
          <p className="repDetails">{repo.language ? repo.language : "N/A"}</p>
        </div>
      </div>
    </React.Fragment>
  );

  return (
    <div className="mainWrapper">
      <div>
        <div className="navbar">Get Github User's Timeline</div>
        <div className="search">
          <input
            className="search-bar"
            type="text"
            placeholder="Search User"
            name="Github User"
            onChange={handleSearch}
          />
          <button className="btn" onClick={handleSubmit}>
            Get Timeline
          </button>
        </div>
      </div>
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <>
          {error ? (
            <h1>Something Gone Wrong !!</h1>
          ) : (
            <div className="card">
              <div className="image">
                <img className="img" src={avatar} alt={name} />
              </div>
              <div className="details">
                <span>{name}</span>
                <span>{userName}</span>
                <span>{followers} Followers</span>
                <span>{repos} Repositories</span>
                <span>{following} Following</span>
              </div>
            </div>
          )}
          {error ? null : (
            <div className="repos">
              <div className="timelineHeading">
                <h1>@{userName}'s Timeline</h1>
                <Icon icon="fluent:caret-down-24-filled" className="i" />
              </div>
              <div className="repoWrapper">{repoDetails.map(renderRepo)}</div>
            </div>
          )}
        </>
      )}
      <footer className="footer">
        <h2 className="footers">Made By Muneer</h2>
        <a href="https://github.com/MdMuneer">
          <Icon icon="devicon:github" className="github" />
        </a>
      </footer>
    </div>
  );
}

export default App;
