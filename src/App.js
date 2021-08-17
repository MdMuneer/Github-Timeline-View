import React, { useState, useEffect } from "react";
import "./App.css";
import Loading from "./Loading";
import { FaGithub, FaCaretDown } from "react-icons/fa";
import "dayjs/locale/es";
import * as dayjs from "dayjs";

const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

//local storage
const getLocalItems = () => {
  let listOne = localStorage.getItem("detailCard");
  let listTwo = localStorage.getItem("detailCardTop");

  if (listOne && listTwo) {
    return JSON.parse(
      localStorage.getItem("detailCard") ||
        localStorage.getItem("detailCardTop")
    );
  } else {
    return [];
  }
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

  //getting the example api for the first screen
  useEffect(() => {
    if (localStorage.getItem("detailCardTop")) {
      setData(JSON.parse(localStorage.getItem("detailCardTop")));
      setReposDetails(JSON.parse(localStorage.getItem("detailCard")));
    } else {
      fetch("https://api.github.com/users/example")
        .then((res) => res.json())
        .then((data) => {
          setData(data);
        });
    }
  }, []);

  const setData = ({
    name,
    login,
    followers,
    following,
    public_repos,
    avatar_url,
  }) => {
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

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    Promise.all([
      fetch(`https://api.github.com/users/${userInput}`),
      fetch(`https://api.github.com/users/${userInput}/repos`),
    ])
      .then(function (responses) {
        // Get a JSON object from each of the responses
        return Promise.all(
          responses.map(function (response) {
            return response.json();
          })
        );
      })
      .then(function (data) {
        {
          /* would do something with both sets of data here*/
        }
        const dataFirst = data[0];
        const dataSecond = data[1];

        if (dataFirst.message) {
          setError(dataFirst.message);
          setReposDetails([]);
          setLoading(false);
        } else {
          setData(dataFirst);
          localStorage.setItem("detailCardTop", JSON.stringify(dataFirst));
          setReposDetails(dataSecond);
          localStorage.setItem("detailCard", JSON.stringify(dataSecond));

          setError(null);
          setLoading(false);
        }
      });
  };

  function renderRepo(repo) {
    return (
      <React.Fragment key={repo.id}>
        <div className="wrapper">
          <div className="eachrepo" key={repo.id}>
            <h2 className="repo-name">{repo.name}</h2>
            {
              <p>
                <b>{dayjs(new Date(repo.created_at)).fromNow()}</b>
              </p>
            }
          </div>
          <div className="repo-other">
            <p className="repDetails">Forks Count - {repo.forks} </p>
            <p className="repDetails">
              {repo.language ? repo.language : "N/A"}
            </p>
          </div>
        </div>
      </React.Fragment>
    );
  }

  return (
    <div>
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
      {error ? (
        <h1>Ooops {error}...</h1>
      ) : (
        <div className="card">
          <div className="image">
            <img className="img" src={avatar} alt={name} />
          </div>
          <div className="details">
            <h3>{name}</h3>
            <h4>{userName}</h4>
            <h4>{followers} Followers</h4>
            <h4>{repos} Repositories</h4>
            <h4>{following} Following</h4>
          </div>
        </div>
      )}
      {error ? (
        ""
      ) : (
        <div className="repos">
          <div className="timline-heading">
            <h1>@{userName}'s Timeline</h1>
            <FaCaretDown className="i" />
          </div>
          {repoDetails.map(renderRepo)}
        </div>
      )}
      <footer className="footer">
        <h2 className="footers">Made By Muneer</h2>
        <a href="https://github.com/MdMuneer">
          <FaGithub className="github" />
        </a>
      </footer>
    </div>
  );
}

export default App;