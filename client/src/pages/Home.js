import React, { Component } from "react";
// import Jumbotron from "../components/Jumbotron";
// import DeleteBtn from "../components/DeleteBtn";
import { Col, Row, Container } from "../components/Grid";
// import { List, ListItem } from "../components/List";
// import { Input, TextArea, FormBtn } from "../components/Form";
import Search from "../components/Search";
import API from "../utils/API";
import MapRender from "../components/Map";

class Home extends Component {
  state = {
    result: {},
    search: "10A",
    routeShape: [],
    buses: [],
    firstBus: {},
    check: false,
    zoom: 10
  };

  componentDidMount(query) {
    this.searchRoutes();
    // this.searchBuses();
    console.log("compWillMount")
  };

  searchRoutes = () => {
    API.routeSearch(this.state.search)
      .then(res => {
      let ShapeDefined = [];
      res.data.Direction0.Shape.forEach(item =>
        ShapeDefined.push({
          lat: parseFloat(item.Lat),
          lng: parseFloat(item.Lon)
        })
      ),
      this.setState({routeShape: ShapeDefined, zoom: 9}),
      this.searchBuses()
    })
      .catch(err => console.log(err));
  };

  searchBuses = () => {
    API.busPositions(this.state.search)
      .then(res => {

      let busesArray = [];
      let firstLuckyBus;
      let busLat = res.data.BusPositions[0].Lat;
      let busLng = res.data.BusPositions[0].Lon;

      res.data.BusPositions.forEach(item =>
        busesArray.push({
          lat: parseFloat(item.Lat),
          lng: parseFloat(item.Lon)
        })

      ),
      this.setState({ buses: busesArray}),
      console.log(res),
      //Grab First Bus in Array
      firstLuckyBus = {
          lat: parseFloat(busLat),
          lng: parseFloat(busLng)
        }
      this.setState({ firstBus: firstLuckyBus })
      console.log(this.state.firstBus)
    })
      .catch(err => console.log(err));
  };



  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, search the OMDB API for the value of `this.state.search`
  handleFormSubmit = event => {
    event.preventDefault();
    this.searchRoutes();
    console.log(this.state.routeShape)
  };

  render() {

    return (
      <Container>
        <Search
          value={this.state.search}
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit.bind(this)}
          defaultZoom={10}
        />
        <MapRender
          center={this.state.firstBus}
          defaultZoom={10}
          zoom={this.state.zoom}
          markers={this.state.buses}
          test={this.state.routeShape}
        />
      </Container>
    );
  }
}

export default Home;
