# BusTrackr

[BusTrackr](https://tranquil-fjord-74322.herokuapp.com) is a single-page application that informs users of the current status of a WMATA bus for every route. Users have the option of bookmarking routes and stops.

## Features

* Bus positions are updated every 15 seconds
* You can search for a route of your own in the search bar (Autocomplete-enabled)
* Create an account or log in to enable the bookmarking feature.
* See bookmarked lines by clicking <img src="https://user-images.githubusercontent.com/24596592/39953411-791f7c50-5579-11e8-8567-c04eb48b48ed.png" align="top">
* See which buses are on the road with<img src="https://user-images.githubusercontent.com/24596592/39953416-85f339a8-5579-11e8-971d-367c0a59893c.png" align="top">
* Use current location to center the map on where you are.
* Click on a bus marker to see destination, direction, and deviation from its schedule.
    - Negative Deviation indicates the bus is running ahead of schedule. *-1 means one minute early.*
    - Positive Deviation indicates the bus is running late. *+3 means three minutes late.*

* Click on a stop marker to see which buses will visit that stop.
    - Here you can also see a prediction of when the bus might arrive.

## Technologies & Frameworks

* [React.js](https://reactjs.org/) - User interface library
* [Google Maps API](https://developers.google.com/maps/documentation/) - Customized interactive map
* [Express.js](https://expressjs.com/) - Web application framework
* [MongoDB](https://www.mongodb.com/) - NoSQL database to save bookmarked routes
* [Mongoose](http://mongoosejs.com/) - MongoDB Object model creation
* [Firebase](https://firebase.google.com/) - User authentication
* [Material UI](http://www.material-ui.com/) - Styling components for bookmark
* [WMATA API](https://developer.wmata.com/) - Bus stop information, route and schedule data, and bus positions


## **Code Example**
```
import React, { Component } from "react";
import Home from "./pages/Home";
import Nav from "./components/Nav";
import Login from "./components/Login";
import FavNav from "./components/FavNav"
import { Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { BrowserRouter as Router, Route } from "react-router-dom";
import About from "./pages/About";
import "./App.css";

const options = {
  timeout: 5000,
  position: "bottom center"
};

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isSignedIn: false,
      uuid: null,
      open: false,
      routes: []
    };
  }
  
  onSignInSuccess = (currentUid, usersRoutes) => {
    this.setState({
      isSignedIn: true,
      uuid: currentUid,
      open: false,
      routes: usersRoutes
    });
  }
  
  onSignOutSuccess = () => {
    this.setState({
      isSignedIn: false,
      uuid: null
    });
  }

  openSignInModal = () => {
    this.setState({
      open: true
    });
  }

  closeSignInModal = () => {
    this.setState({
      open: false
    });
  }

  render() {
    return (
      <Router>
        <Provider template={AlertTemplate} {...options}>
            <Nav>
            <Login onSignInSuccess={this.onSignInSuccess.bind(this)} onSignOutSuccess={this.onSignOutSuccess.bind(this)} isOpenSignIn={this.state.open} isCloseSignIn={this.closeSignInModal.bind(this)}/>
            </Nav>
            <Route exact path="/" render={() => <Home isSignedIn={this.state.isSignedIn} userID={this.state.uuid} openSignIn={this.openSignInModal.bind(this)} userSavedRoutes={this.state.routes}/> }/>
            <Route exact path="/about" component={About} />
        </Provider>
      </Router>
    );
  }
}

export default App;
```


## Screenshots
<img src="https://user-images.githubusercontent.com/24596592/39953648-7eef6afa-557e-11e8-9089-463fa8813c1d.png">
<img src="https://user-images.githubusercontent.com/24596592/39953702-2afab34a-557f-11e8-8e9d-03ce8d1f6fa3.png">
<img src="https://user-images.githubusercontent.com/24596592/39953617-c49093dc-557d-11e8-8e9b-872f3e5dd3ec.png">
<img src="https://user-images.githubusercontent.com/24596592/39953637-2758842a-557e-11e8-958d-8b6aea728c5e.png">

## Installation
* Deployed to Heroku: https://tranquil-fjord-74322.herokuapp.com
* Installation on local machine is not required

## Authors

* [Angela Kressin](https://github.com/angkressin)
* [Sean Andersen](https://github.com/andersensm)
* [Nalut (Tak) Sangtakraw](https://github.com/tak009)
* [Wai Yan](https://github.com/Wai-Yan/)

## Acknowledgments

* George Washington University Instructor and TA's
