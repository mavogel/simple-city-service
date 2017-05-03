import * as restify from 'restify';
import { logger } from '../services/logger';

export default class CitiesWeatherRouteController {
    public get(req: restify.Request, res: restify.Response, next: restify.Next) {
        let weatherData: any = {
            type: 'Clear',
            type_description: 'clear sky',
            sunrise: '2016-08-23T08:00:00.000Z',
            sunset: '2016-08-23T22:00:00.000Z',
            temp: 29.72,
            temp_min: 26.67,
            temp_max: 35,
            pressure: 1026,
            humidity: 36,
            clouds_percent: 0,
            wind_speed: 1.5
        };

        let cityId: string = req.params.CITY_ID;
        if (cityId && cityId !== undefined) {
            logger.info(`accessing cities weather route for: ${cityId}`);
            if (cityId === '1234') {
                res.json(200, weatherData);
            } else {
                res.json(404, { code: 'NotFoundError', message: 'not found' });
            }
        } else {
            logger.info(`not found`);
            res.json(404, { code: 'NotFoundError', message: 'not found' });
        }
        return next();
    }
}