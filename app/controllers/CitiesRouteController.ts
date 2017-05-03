import * as restify from 'restify';
import { logger } from '../services/logger';

export default class CitiesRouteController {
    public get(req: restify.Request, res: restify.Response, next: restify.Next) {
        let cityId: string = req.params.CITY_ID;
        if (cityId && cityId !== undefined) {
            logger.info(`accessing cities route for: ${cityId}`);
            if (cityId === '1234') {
                res.json(200, { id: 1234, name: 'Mannheim', lat: 49.488331, lng: 8.46472 });
            } else {
                res.json(404, { code: 'NotFoundError', message: 'not found' });
            }
        } else if (req.getQuery() && req.getQuery() !== '') {
            logger.info(`accessing cities route w query params: ${req.getQuery()}`);
            let queryParams: any = req.query;
            if (queryParams.lat === '12.34' && queryParams.lng === '56.78') {
                res.json(200, [{ id: 23423, name: 'Mannheim' }, { id: 23231, name: 'Hamburg' }]);
            } else {
                res.json(404, { code: 'NotFoundError', message: 'not found' });
            }
        } else {
            logger.info(`missing url or q param on cities route`);
            res.json(400, { code: 'BadRequestError', message: 'lat/lng required' });
        }
        return next();
    }
}