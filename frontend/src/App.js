import React, { Component } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import "./App.css";

import AllSongsContainer from "./components/AllSongsContainer";
import Home from "./components/Home.js";
import SongsByPopContainer from "./components/SongsByPopContainer.js";
import SongsByGenre from "./components/SongsByGenre.js";
import UserProfile from "./components/UserProfile.js";

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
          <Route exact path={`/songs/byGenre`} component={SongsByGenre} />
          <Route exact path={`/users/:id`} component={UserProfile} />
        </Switch>
      </div>
    );
  }
}

export default App;
