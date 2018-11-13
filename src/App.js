import React, { Component } from 'react';
//import logo from './logo.svg'; disabling this line for the logo as not being used
import './App.css';

import axios from 'axios'


class App extends Component {

  state = {
    venues:[]
  }

  componentDidMount () {
  this.getVenues()
  }

  loadingMap = () => {
  loadingScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyA4mmgp1LraZXbbC4QlHVAVxUzgptilqbw&callback=initMap")
  window.initMap = this.initMap
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "HVG1OO2G4ACXIALSKRKNFT1PU2WAXEC3ROY5DCOZUG1OUHQN",
      client_secret: "UFWFEKPRATXLGDUDPH32B2O4AON4PTIDNQCQETCBTU2MISAQ",
      query: "food",
      near: "Chicago,IL",
      v: "20182507"
    }

    axios.get(endPoint + new URLSearchParams(parameters))
    .then(response => {
      this.setState({
        venues: response.data.response.groups[0].items //hare is the specific data parameter location or object
      }, this.loadingMap())
    })
    .catch (error => {
      console.log("THIS HAS ERROR!!! " + error)
    })

  }


  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.881832, lng:  -87.623177},
    zoom: 12,
    })

    this.state.venues.map(recommPlace => {

      var contentString = `${recommPlace.venue.name}`

//below this is the code for info window
      var infowindow = new window.google.maps.InfoWindow({
        content: contentString
      })


//below this is the code for marker
      var marker = new window.google.maps.Marker({
        position: {lat: recommPlace.venue.location.lat, lng: recommPlace.venue.location.lng},
        map: map,
        title: recommPlace.venue.name
      })

      marker.addListener('click', function() {
      infowindow.open(map, marker)
    })

      
    })

}

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    )
  }
}


function loadingScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script= window.document.createElement("script")
  script.src=url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)

}
export default App;

