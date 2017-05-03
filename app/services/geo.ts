import * as rq from 'request-promise';
import { logger } from './logger';

export interface Geoname {
    adminCode1: string;
    lng: string;
    distance: string;
    geonameId: number;
    toponymName: string;
    countryId: string;
    fcl: string;
    population: number;
    countryCode: string;
    name: string;
    fclName: string;
    countryName: string;
    fcodeName: string;
    adminName1: string;
    lat: string;
    fcode: string;
}

/**
 * A geolocator service
 */
class Geo {

    private static BASE_URL: string = 'http://api.geonames.org/findNearbyPlaceNameJSON';
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
        let qs: any = {
            lat: lat,
            lng: lng,
            radius: Geo.RADIUS,
            username: Geo.USERNAME
        };
        return new Promise((res, rej) => {
            res(rq(Geo.BASE_URL, { qs: qs })
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
}

export let geo = new Geo();