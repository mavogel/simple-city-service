import * as restify from 'restify';
import { logger } from '../services/logger';
import { weather } from '../services/weather';
import { WeatherData } from '../models/weather';

export default class CitiesWeatherRouteController {
    public get(req: restify.Request, res: restify.Response, next: restify.Next) {
        let cityId: string = req.params.CITY_ID;
        if (cityId && cityId !== undefined) {
            logger.info(`accessing cities weather route for: ${cityId}`);
            weather.getWeather(cityId)
                .then((weatherData: WeatherData) => {
                    if (!weatherData.status) {
                        res.json(200, {
                            type: weatherData.weather[0].main,
                            type_description: weatherData.weather[0].description,
                            sunrise: '2016-08-23T08:00:00.000Z',
                            sunset: '2016-08-23T22:00:00.000Z',
                            temp: +((+weatherData.main.temp - 273.15).toFixed(2)),
                            temp_min: +((+weatherData.main.temp_min - 273.15).toFixed(2)),
                            temp_max: +((+weatherData.main.temp_max - 273.15).toFixed(2)),
                            pressure: weatherData.main.pressure,
                            humidity: weatherData.main.humidity,
                            clouds_percent: weatherData.clouds.all,
                            wind_speed: weatherData.wind.speed
                        });
                    } else {
                        res.json(404, { code: 'NotFoundError', message: 'not found' });
                    }
                });
        } else {
            logger.info(`not found`);
            res.json(404, { code: 'NotFoundError', message: 'not found' });
        }
        return next();
    }
}