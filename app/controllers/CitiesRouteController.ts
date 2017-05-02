import * as restify from 'restify';
import { logger } from '../services/logger';

export default class CitiesRouteController {
    public get(req: restify.Request, res: restify.Response, next: restify.Next) {
        let mockCities: Array<{ id: number, name: string }> = [
            { id: 23423, name: 'Mannheim' },
            { id: 23231, name: 'Hamburg' },
        ];
        let cityId: string = req.params.CITY_ID;
        logger.info(`accessing cities route for: ${cityId}`);
        if (cityId === '1234') {
            res.json(200, JSON.stringify(mockCities));
        } else {
            res.json(404, JSON.stringify({ 'code': 'NotFoundError', 'message': 'not found' }));
        }
        return next();
    }
}