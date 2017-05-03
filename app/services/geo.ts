import * as rq from 'request-promise';
import { logger } from './logger';

// GET CITIES
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

// GET CITY
export interface Timezone {
    gmtOffset: number;
    timeZoneId: string;
    dstOffset: number;
}

export interface Bbox {
    east: number;
    south: number;
    north: number;
    west: number;
    accuracyLevel: number;
}

export interface AlternateName {
    name: string;
    lang?: string;
}

export interface GeoNameFull {
    status?: string;
    timezone: Timezone;
    bbox: Bbox;
    asciiName: string;
    countryId: string;
    fcl: string;
    srtm3: number;
    adminId3: string;
    countryCode: string;
    adminId4: string;
    adminId1: string;
    lat: string;
    fcode: string;
    continentCode: string;
    adminCode2: string;
    adminCode3: string;
    adminCode1: string;
    lng: string;
    geonameId: number;
    toponymName: string;
    adminCode4: string;
    population: number;
    adminName5: string;
    adminName4: string;
    adminName3: string;
    alternateNames: AlternateName[];
    adminName2: string;
    name: string;
    fclName: string;
    countryName: string;
    fcodeName: string;
    adminName1: string;
}


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