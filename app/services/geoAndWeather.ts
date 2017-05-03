import * as rq from 'request-promise';
import { logger } from './logger';
import { WeatherData, GeonamesWithWeather } from '../models/weather';

/**
 * A weather service
 */
class GeoAndWeather {

    private static BASE_URL: string = 'http://api.openweathermap.org/data/2.5';
    private static API_KEY: string = '5ea56cfba9b6a6e5965d111fcd5b5416';
    private static RADIUS: string = '10';

    /**
     * Retrieves the cities at a given lat and lng with a radius
     * of 10 km.
     * 
     * @param cityId the id of the city aka geonameId
     * @return Array<WeatherData> which can be empty
     */
    public getWeather(cityId: string): Promise<WeatherData> {
        let qs: any = {
            id: cityId,
            appId: GeoAndWeather.API_KEY
        };
        return new Promise((res, rej) => {
            res(rq(GeoAndWeather.BASE_URL + '/weather', { qs: qs })
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
                    return { status: 'error' };
                }));
        });
    }

    /**
     * Retrieves the 10 nearest cities at a given lat and lng.
     * 
     * @param lat the latitude 
     * @param lng the longitue
     * @return Promise<GeonamesWithWeather> 
     */
    public getCities(lat: string, lng: number): Promise<GeonamesWithWeather> {
        let qs: any = {
            lat: lat,
            lon: lng,
            cnt: GeoAndWeather.RADIUS,
            appId: GeoAndWeather.API_KEY
        };
        return new Promise((res, rej) => {
            res(rq(GeoAndWeather.BASE_URL + '/find', { qs: qs })
                .then((body) => {
                    logger.info(`response for lat ${lat} - lng: ${lng}: ${body.cod}`);
                    if (body.cod && body.cod === '404') {
                        return [];
                    } else {
                        return JSON.parse(body);
                    }
                })
                .catch(err => {
                    logger.error(`error ${err} retrieving geoname for lat ${lat} - lng: ${lng}`);
                    return [];
                }));
        });
    }

    /**
     * Retrieves the city with the given id.
     * 
     * @param cityId the cityId
     */
    public getCity(cityId: string): Promise<WeatherData> {
        return this.getWeather(cityId);
    }

}

export let geoAndWeather = new GeoAndWeather();