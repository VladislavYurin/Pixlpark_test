import React, { useState, useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.min.css';
import Story from "./components/story.jsx";
import StoryPage from "./pages/StoryPage/StoryPage.jsx";

import "./App.css";
import Api from "./Api.js"

const App = () => {
  const [storiesID, setStoriesID] = useState([]);
  const [stories, setStories] = useState([]);
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
    // Получение историй при загрузке страницы и каждую минуту
    fetchStories();
    const interval = setInterval(fetchStories, 60 * 1000);

    // Очистка интервала при размонтировании компонента
    return () => clearInterval(interval);
  }, []);

  const handleReloadClick = () => {
    fetchStories();
  };

  return (
    <Switch>
      <Route path="/" exact>
        <div className="mainContainer">
          <div className="container">
            <button className="button" onClick={handleReloadClick}>Reload</button>
            {stories.map(story => (
              <Story key={story.id} storyInfo={story} />
            ))}
          </div>
        </div>

      </Route>
      <Route path="/story/:id" component={StoryPage} />
    </Switch >
  );
};


export default App;