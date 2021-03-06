import React, { useRef, useState } from "react"
import axios from 'axios'
import Temperature from "./Temperature"

function App() {
  const location = useRef("liege")
  const [weather, setWeather] = useState([])
  const [photos, setPhotos] = useState(" ")

  function getWeather () {
    axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${location.current.value}&APPID=${process.env.REACT_APP_API_KEY}&units=metric`)
    
    .then((response) => {
      console.log("API weather : " + response.status);
      console.log(response);
      const refDate = JSON.stringify(response.data.list[0].dt_txt)
      console.log("refHour = " + refDate)
      const refHour = refDate.split(" ")
      setWeather(response.data.list.map(item => {
        let fullTime = item.dt_txt
        console.log(fullTime)
        
          return{
            temp : item.main.temp,
            type : item.weather[0].main,
            date : item.dt_txt
          }
      }))    
        
      
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
    <div className="app">
      <main>
        <div className="search">
          <input type="text" ref={location} required placeholder="Select a place"></input>
          <button onClick={getWeather}> Get weather </button>
        </div>
        <img className="img_location" src={photos} alt={location.current.value}/>
        <div className="containerCard">
          {weather.map((i)=> (
            <div key={i.date}>
              <Temperature temp={i.temp} type={i.type} date={i.date} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
