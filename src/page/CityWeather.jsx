import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { weather } from "../slice/fetchSlice";
import Form from "react-bootstrap/Form";

const CityWeather = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState("");

  const weatherData = useSelector((state) => state.getData);
  console.log(weatherData);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      weather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=80b0755e9382a7af992eaa9289800f8b`)
    );
  };

  useEffect(() => {
  }, [weatherData]); 

  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3 d-flex align-items-center">
          <Form.Control
            type="text"
            placeholder="Enter a city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <button className="btn btn-primary" type="submit">Get Weather</button>
      </Form>

      {weatherData.loading && <p>Loading...</p>}
      {weatherData.error && <p>Error fetching data</p>}
      {weatherData.cityWeather.name && (
        <div>
          <h2>{weatherData.cityWeather.name}</h2>
          <p>Country: {weatherData.cityWeather.sys.country}</p>
          <p>Temperature: {weatherData.cityWeather.main.temp}°C</p>
          <p>Humidity: {weatherData.cityWeather.main.humidity}%</p>
        </div>
      )}
    </>
  );
};

export default CityWeather;
