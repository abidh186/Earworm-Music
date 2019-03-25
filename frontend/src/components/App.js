// I still want that NAVBAR IN IT'S OWN COMPONENT!
// You're also still duplicating a LOT of calls. This is hurting
// the performance of your app.
//Overall this test looks great. Really fantastic job.
// A super pleasent user expereience. No bugs that
// I"m finding.
// Styling looks great. Nice favicon touch.
// Side note, with projects remove your logger from
// redux at end so that it's doesn't show in the console
// during production.

// Okay, good job!

import React, { Component } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import "../styles/App.css";

import AllSongsContainer from "./AllSongsContainer";
import Home from "./Home.js";
import SongsByPopContainer from "./SongsByPopContainer.js";
import SongsByGenreContainer from "./SongsByGenreContainer.js";
import UserProfileContainer from "./UserProfileContainer.js";

class App extends Component {
  render() {
    return (
      <div className="entire-app">
        <div className="navbar-container">
          <NavLink className="nav-header" to="/">
            <h1 className="logo">Earworm Music</h1>
          </NavLink>
          <nav className="navbar">
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink exact to="/songs">
              All Songs
            </NavLink>
            <NavLink exact to="/songs/byGenre">
              By Genre
            </NavLink>
            <NavLink exact to="/songs/byPop">
              By Popularity
            </NavLink>
            <NavLink exact to={`/users/1`}>
              My Profile
            </NavLink>
          </nav>
        </div>
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
