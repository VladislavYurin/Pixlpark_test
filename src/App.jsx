import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom"
import Loader from "./components/Loader/index.jsx";
import Story from "./components/story.jsx";
import StoryPage from "./pages/StoryPage/StoryPage.jsx";
import "./App.css";
import Api from "./Api.js"

const App = () => {
  const [storiesID, setStoriesID] = useState([]);
  const [stories, setStories] = useState();
  const [api, setApi] = useState(new Api());

  const fetchStories = () => {
    api.getNewStoriesID()
      .then(res => res.json())
      .then(el => {
        const ids = el.slice(0, 100);
        setStoriesID(ids);
        return Promise.all(ids.map(id => api.getStoryByID(id)));
      })
      .then(responses => Promise.all(responses.map(res => res.json())))
      .then(stories => {
        setStories(stories);
      })
      .catch(error => {
        console.error('Error fetching stories:', error);
      });
  };

  useEffect(() => {
    fetchStories();
    const interval = setInterval(fetchStories, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleReloadClick = () => {
    fetchStories();
    setStories();
  };

  return (
    <Switch>
      <Route path="/" exact>
        <div className="mainContainer">
          <div className="container">
            <button className="button" onClick={handleReloadClick}>Reload</button>
            {stories && stories.map(story => (
              <Story key={story.id} storyInfo={story} />
            ))}
            {!stories && <Loader />}
          </div>
        </div>
      </Route>
      <Route path="/story/:id" component={StoryPage} />
    </Switch >
  );
};

export default App;