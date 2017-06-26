import * as restify from 'restify';
import * as moment from 'moment-timezone';
import { logger } from '../services/logger';
import { geoAndWeather } from '../services/geoAndWeather';
import { WeatherData } from '../models/weather';

/**
 * Controller for the '/cities/:CITY_ID/weather' route
 */
export default class CitiesWeatherRouteController {

    /**
     * Handling all 'GET' requests
     * 
     * @param req the request
     * @param res the reponse
     * @param next 
     */
    public get(req: restify.Request, res: restify.Response, next: restify.Next) {
        let cityId: string = req.params.CITY_ID;

        if (cityId && cityId !== undefined) {
            logger.info(`accessing cities weather route for: ${cityId}`);
            geoAndWeather.getWeather(cityId)
                .then((weatherData: WeatherData) => {
                    if (!weatherData.status) {
                        res.json(200, {
                            type: weatherData.weather[0].main,
                            type_description: weatherData.weather[0].description,
                            sunrise: moment.unix(weatherData.sys.sunrise).tz('Europe/Berlin').toISOString(),
                            sunset: moment.unix(weatherData.sys.sunset).tz('Europe/Berlin').toISOString(),
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