import * as restify from 'restify';
import { logger } from '../services/logger';
import { geoAndWeather } from '../services/geoAndWeather';
import { WeatherData, GeonamesWithWeather } from '../models/weather';

/**
 * Controller for the '/cities/:CITY_ID' route
 */
export default class CitiesRouteController {

    /**
     * Handling all 'GET' requests
     * 
     * @param req the request
     * @param res the reponse
     * @param next 
     */
    public get(req: restify.Request, res: restify.Response, next: restify.Next) {
        let cityId: string = req.params.CITY_ID;
        // == path param
        if (cityId && cityId !== undefined) {
            logger.info(`accessing cities route for: ${cityId}`);
            geoAndWeather.getCity(cityId)
                .then((geoname: WeatherData) => {
                    if (!geoname.status) {
                        res.json(200, { id: geoname.id, name: geoname.name, lat: +geoname.coord.lat, lng: +geoname.coord.lon });
                    } else {
                        res.json(404, { code: 'NotFoundError', message: 'not found' });
                    }
                });

        }
        // == query params
        else if (req.getQuery() && req.getQuery() !== '') {
            logger.info(`accessing cities route w query params: ${req.getQuery()}`);
            let queryParams: any = req.query;
            if (!queryParams.lat || !queryParams.lng) {
                res.json(400, { code: 'BadRequestError', message: 'lat/lng required' });
            } else {
                geoAndWeather.getCities(queryParams.lat, queryParams.lng)
                    .then((geonames: GeonamesWithWeather) => {
                        if (geonames.list && geonames.list.length !== 0) {
                            let convertedGeonames: Array<{ id: number, name: string }> = [];
                            geonames.list.forEach(gn => convertedGeonames.push({ id: gn.id, name: gn.name }));
                            res.json(200, convertedGeonames);
                        } else {
                            res.json(404, { code: 'NotFoundError', message: 'not found' });
                        }
                    });
            }
        }
        // == fallback 
        else {
            logger.info(`missing url or q param on cities route`);
            res.json(400, { code: 'BadRequestError', message: 'lat/lng required' });
        }
        return next();
    }
}