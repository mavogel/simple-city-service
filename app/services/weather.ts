import * as rq from 'request-promise';
import { logger } from './logger';
import { WeatherData } from '../models/weather';

/**
 * A geolocator service
 */
class Weather {

    private static BASE_URL: string = 'http://api.openweathermap.org/data/2.5/weather';
    private static API_KEY: string = '5ea56cfba9b6a6e5965d111fcd5b5416';

    /**
     * Retrieves the cities at a given lat and lng with a radius
     * of 10 km.
     * 
     * @param cityId the id of the city aka geonameId
     * @return Array<Geoname> which can be empty
     */
    public getWeather(cityId: string): Promise<WeatherData> {
        let qs: any = {
            id: 2873891,
            appId: Weather.API_KEY
        };
        return new Promise((res, rej) => {
            res(rq(Weather.BASE_URL, { qs: qs })
                .then((body) => {
                    logger.info(`response for cityId ${cityId}}`);
                    if (body.cod === '404') {
                        return { status: body.message };
                    } else {
                        return JSON.parse(body);
                    }
                })
                .catch(err => {
                    logger.error(`error ${err} retrieving geoname for cityId ${cityId}`);
                    return [];
                }));
        });
    }

}

export let weather = new Weather();