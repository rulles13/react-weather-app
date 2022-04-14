import React, { useEffect, useRef, useState } from "react"
import axios from 'axios'
import './App.css'
import Temperature from "./Temperature"

function App() {
  const location = useRef()
  const [weather, setWeather] = useState([])
  const [photos, setPhotos] = useState()

  function getWeather () {
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${location.current.value}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`)
    
    .then((response) => {
      console.log("API weather : " + response.status);
      //console.log(response);
      setWeather(response.data)
      console.log(weather)
    })
    .catch((error) => {
      console.log(error)
    })

    axios.get(`https://api.unsplash.com/search/photos?query=${location.current.value}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
    .then((response) => {
      console.log("API Unsplash : " + response.status);
      //console.log(response);
      setPhotos(response.data.results[0].urls.regular);
      //console.log(photos);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="App">
      <input type="text" ref={location} required placeholder="Select a place"></input>
      <button onClick={getWeather}> Get weather </button>
      <img src={photos}/>
      <Temperature weather={weather}/>
    </div>
  );
}

export default App;
