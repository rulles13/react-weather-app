import React, { useEffect, useRef, useState } from "react"
import axios from 'axios'
import './App.css'

function App() {
  const location = useRef()

  function getWeather () {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location.current.value}&APPID=${process.env.REACT_APP_API_KEY}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className="App">
      <input type="text" ref={location} required placeholder="Select a place"></input>
      <button onClick={getWeather}> Get weather </button>
    </div>
  );
}

export default App;
