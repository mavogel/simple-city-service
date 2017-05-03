import * as rq from 'request-promise';
import { logger } from './logger';
import { Geoname, GeoNameFull } from '../models/geonames';

/**
 * A geolocator service
 */
class Geo {

    private static BASE_URL: string = 'http://api.geonames.org/';
    private static USERNAME: string = 'mavogel';
    private static RADIUS: string = '10';

    /**
     * Retrieves the cities at a given lat and lng with a radius
     * of 10 km.
     * 
     * @param lat the latitude 
     * @param lng the longitue
     * @return Array<Geoname> which can be empty
     */
    public getCities(lat: string, lng: number): Promise<Array<Geoname>> {
        let suffix: string = 'findNearbyPlaceNameJSON';
        let qs: any = {
            lat: lat,
            lng: lng,
            radius: Geo.RADIUS,
            username: Geo.USERNAME
        };
        return new Promise((res, rej) => {
            res(rq(Geo.BASE_URL + suffix, { qs: qs })
                .then((body) => {
                    logger.info(`response for lat ${lat} - lng: ${lng}`);
                    return JSON.parse(body).geonames;
                })
                .catch(err => {
                    logger.error(`error ${err} retrieving geoname for lat ${lat} - lng: ${lng}`);
                    return [];
                }));
        });
    }

    /**
     * Retrieves a city with the given cityId
     * 
     * @param cityId the id of the city aka geonameId
     */
    public getCity(cityId: string): Promise<GeoNameFull> {
        let suffix: string = 'getJSON';
        let qs: any = {
            geonameId: cityId,
            username: Geo.USERNAME
        };
        return new Promise((res, rej) => {
            res(rq(Geo.BASE_URL + suffix, { qs: qs })
                .then((body) => {
                    logger.info(`response for cityId ${cityId}`);
                    if (body.status) {
                        return { status: body.status };
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

export let geo = new Geo();