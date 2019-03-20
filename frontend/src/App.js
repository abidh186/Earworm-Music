//make the navbar it's own component.
// overall you're doing an excellent job.
// You're right where I think you should be. 
// Over the next couple days I want you to style
// and to starting thinking about reusable code and
// how you could refactor things a touch.
// Great job and keep it up!

import React, { Component } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import "./App.css";

import AllSongsContainer from "./components/AllSongsContainer";
import Home from "./components/Home.js";
import SongsByPopContainer from "./components/SongsByPopContainer.js";
import SongsByGenreContainer from "./components/SongsByGenreContainer.js";
import UserProfileContainer from "./components/UserProfileContainer.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to="/">Home</NavLink>
          <br />
          <NavLink to="/songs">All Songs</NavLink>
          <br />
          <NavLink to="/songs/byGenre">By Genre</NavLink>
          <br />
          <NavLink to="/songs/byPop">By Popularity</NavLink>
          <br />
          <NavLink to={`/users/1`}>Profile</NavLink>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path={`/songs/byPop`} component={SongsByPopContainer} />
          <Route exact path={`/songs`} component={AllSongsContainer} />
          <Route
            exact
            path={`/songs/byGenre`}
            component={SongsByGenreContainer}
          />
          <Route exact path={`/users/:id`} component={UserProfileContainer} />
        </Switch>
      </div>
    );
  }
}

export default App;
