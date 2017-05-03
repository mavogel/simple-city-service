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