import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {

componentDidMount () {
this.renderMap()
}

renderMap = () => {
  loadingScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyA4mmgp1LraZXbbC4QlHVAVxUzgptilqbw&callback=initMap")
  window.initMap = this.initMap
}


  initMap = () => {
  const map = new window.google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
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
