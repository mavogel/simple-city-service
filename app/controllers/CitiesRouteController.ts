import * as restify from 'restify';
import { logger } from '../services/logger';
import { geo } from '../services/geo';

export default class CitiesRouteController {
    public get(req: restify.Request, res: restify.Response, next: restify.Next) {
        let cityId: string = req.params.CITY_ID;
        // == path param
        if (cityId && cityId !== undefined) {
            logger.info(`accessing cities route for: ${cityId}`);
            if (cityId === '1234') {
                res.json(200, { id: 1234, name: 'Mannheim', lat: 49.488331, lng: 8.46472 });
            } else {
                res.json(404, { code: 'NotFoundError', message: 'not found' });
            }
        }
        // == query params
        else if (req.getQuery() && req.getQuery() !== '') {
            logger.info(`accessing cities route w query params: ${req.getQuery()}`);
            let queryParams: any = req.query;
            geo.getCities(queryParams.lat, queryParams.lng)
                .then(geonames => {
                    if (geonames.length !== 0) {
                        let convertedGeonames: Array<{ id: number, name: string }> = [];
                        geonames.forEach(gn => convertedGeonames.push({ id: gn.geonameId, name: gn.toponymName }));
                        res.json(200, convertedGeonames);
                    } else {
                        res.json(404, { code: 'NotFoundError', message: 'not found' });
                    }
                });
        }
        // == fallback 
        else {
            logger.info(`missing url or q param on cities route`);
            res.json(400, { code: 'BadRequestError', message: 'lat/lng required' });
        }
        return next();
    }
}