import { Geoname, GeoNameFull } from '../app/models/geonames';
import { WeatherData, GeonamesWithWeather } from '../app/models/weather';

export let mockGeonames: Array<Geoname> =
    [
        {
            adminCode1: '08',
            lng: '8.44641',
            distance: '0.99361',
            geonameId: 2875376,
            toponymName: 'Ludwigshafen am Rhein',
            countryId: '2921044',
            fcl: 'P',
            population: 163196,
            countryCode: 'DE',
            name: 'Ludwigshafen am Rhein',
            fclName: 'city, village,...',
            countryName: 'Germany',
            fcodeName: 'seat of a third-order administrative division',
            adminName1: 'Rheinland-Pfalz',
            lat: '49.48121',
            fcode: 'PPLA3'
        },
        {
            adminCode1: '01',
            lng: '8.46848',
            distance: '1.05362',
            geonameId: 8521412,
            toponymName: 'Lindenhof',
            countryId: '2921044',
            fcl: 'P',
            population: 0,
            countryCode: 'DE',
            name: 'Lindenhof',
            fclName: 'city, village,...',
            countryName: 'Germany',
            fcodeName: 'populated place',
            adminName1: 'Baden-Württemberg',
            lat: '49.47231',
            fcode: 'PPL'
        }];

export let mockedGeoname: GeoNameFull =
    {
        timezone: {
            gmtOffset: 1,
            timeZoneId: 'Europe/Berlin',
            dstOffset: 2
        },
        bbox: {
            east: 8.459793419595389,
            south: 49.46449964574797,
            north: 49.542897845721434,
            west: 8.40087199129392,
            accuracyLevel: 0
        },
        asciiName: 'Ludwigshafen am Rhein',
        countryId: '2921044',
        fcl: 'P',
        srtm3: 97,
        adminId3: '3247910',
        countryCode: 'DE',
        adminId4: '6554817',
        adminId1: '2847618',
        lat: '49.48121',
        fcode: 'PPLA3',
        continentCode: 'EU',
        adminCode2: '00',
        adminCode3: '07314',
        adminCode1: '08',
        lng: '8.44641',
        geonameId: 2875376,
        toponymName: 'Ludwigshafen am Rhein',
        adminCode4: '07314000',
        population: 163196,
        adminName5: '',
        adminName4: 'Ludwigshafen am Rhein',
        adminName3: 'Kreisfreie Stadt Ludwigshafen am Rhein',
        alternateNames: [
            {
                name: '루트비히스하펜',
                lang: 'ko'
            },
            {
                name: 'ルートヴィヒスハーフェン',
                lang: 'ja'
            },
            {
                name: 'ルートヴィッヒスハーフェン',
                lang: 'ja'
            },
            {
                name: 'Liudvigshafenas prie Reino',
                lang: 'lt'
            },
            {
                name: 'Ludovici Portus Rhenanus',
                lang: 'la'
            },
            {
                name: 'Lüdviqshafen',
                lang: 'az'
            },
            {
                name: 'Ludwichshafe',
                lang: 'pfl'
            },
            {
                name: 'Ludwigshafen',
                lang: 'eo'
            },
            {
                name: 'Ludwigshafen',
                lang: 'es'
            },
            {
                name: 'Ludwigshafen',
                lang: 'et'
            },
            {
                name: 'Ludwigshafen',
                lang: 'fi'
            },
            {
                name: 'Ludwigshafen',
                lang: 'fr'
            },
            {
                name: 'Ludwigshafen',
                lang: 'no'
            },
            {
                name: 'Ludwigshafen',
                lang: 'pl'
            },
            {
                name: 'Ludwigshafen',
                lang: 'sv'
            },
            {
                name: 'Ludwigshafen',
                lang: 'vo'
            },
            {
                name: 'Ludwigshafen'
            },
            {
                name: 'Ludwigshafen am Rhein',
                lang: 'de'
            },
            {
                name: 'Ludwigshafen am Rhein',
                lang: 'en'
            },
            {
                name: 'Ludwigshafen am Rhein',
                lang: 'id'
            },
            {
                name: 'Ludwigshafen am Rhein',
                lang: 'nl'
            },
            {
                name: 'Ludwigshafen am Rhein',
                lang: 'pt'
            },
            {
                name: 'Ludwigshafen am Rhein',
                lang: 'ro'
            },
            {
                name: 'Ludwigshafen am Rhein',
                lang: 'vi'
            },
            {
                name: 'Ludwigshafen am Rhein'
            },
            {
                name: 'Ludwigshafen sul Reno',
                lang: 'it'
            },
            {
                name: 'لڈوگشافن',
                lang: 'pnb'
            },
            {
                name: 'لودفيغسهافن',
                lang: 'ar'
            },
            {
                name: 'لودویگسهافن',
                lang: 'fa'
            },
            {
                name: 'לודוויגסהאפן',
                lang: 'he'
            },
            {
                name: 'Λουντβιχσχάφεν',
                lang: 'el'
            },
            {
                name: 'Лудвигсхафен',
                lang: 'bg'
            },
            {
                name: 'Лудвигсхафен на Рајни',
                lang: 'sr'
            },
            {
                name: 'Людвигсхафен-на-Рейне',
                lang: 'ru'
            },
            {
                name: 'Людвіґсгафен-на-Рейні',
                lang: 'uk'
            },
            {
                name: 'რაინის ლუდვიგსჰაფენი',
                lang: 'ka'
            },
            {
                name: 'लुडविक्सहाफेन',
                lang: 'mr'
            },
            {
                name: '路德维希港',
                lang: 'zh'
            },
            {
                name: '路德维希港',
                lang: 'zh-CN'
            }
        ],
        adminName2: '',
        name: 'Ludwigshafen am Rhein',
        fclName: 'city, village,...',
        countryName: 'Germany',
        fcodeName: 'seat of a third-order administrative division',
        adminName1: 'Rheinland-Pfalz'
    }

export let mockedGeonamesWithWeather: GeonamesWithWeather =
    {
        message: 'accurate',
        cod: '200',
        count: 10,
        list: [
            {
                id: 2873891,
                name: 'Mannheim',
                coord: {
                    lat: 49.4883,
                    lon: 8.4647
                },
                main: {
                    temp: 285.08,
                    pressure: 1018,
                    humidity: 62,
                    temp_min: 284.15,
                    temp_max: 287.15
                },
                dt: 1493821200,
                wind: {
                    speed: 4.6,
                    deg: 40
                },
                sys: {
                    country: ''
                },
                rain: null,
                snow: null,
                clouds: {
                    all: 75
                },
                weather: [
                    {
                        id: 520,
                        main: 'Rain',
                        description: 'light intensity shower rain',
                        icon: '09d'
                    },
                    {
                        id: 701,
                        main: 'Mist',
                        description: 'mist',
                        icon: '50d'
                    }
                ]
            },
            {
                id: 2875376,
                name: 'Ludwigshafen am Rhein',
                coord: {
                    lat: 49.4811,
                    lon: 8.4353
                },
                main: {
                    temp: 285.08,
                    pressure: 1018,
                    humidity: 62,
                    temp_min: 284.15,
                    temp_max: 287.15
                },
                dt: 1493821200,
                wind: {
                    speed: 4.6,
                    deg: 40
                },
                sys: {
                    country: ''
                },
                rain: null,
                snow: null,
                clouds: {
                    all: 75
                },
                weather: [
                    {
                        id: 701,
                        main: 'Mist',
                        description: 'mist',
                        icon: '50d'
                    },
                    {
                        id: 520,
                        main: 'Rain',
                        description: 'light intensity shower rain',
                        icon: '09d'
                    }
                ]
            }
        ]
    };

export let mockedWeatherData: WeatherData =
    {
        coord: {
            lon: 8.46,
            lat: 49.49
        },
        weather: [
            {
                id: 500,
                main: 'Rain',
                description: 'light rain',
                icon: '10d'
            }
        ],
        base: 'stations',
        main: {
            temp: 285.64,
            pressure: 1018,
            humidity: 71,
            temp_min: 285.15,
            temp_max: 286.15
        },
        visibility: 10000,
        wind: {
            speed: 4.1,
            deg: 50
        },
        clouds: {
            all: 75
        },
        dt: 1493816280,
        sys: {
            type: 1,
            id: 4899,
            message: 0.0751,
            country: 'DE',
            sunrise: 1493783972,
            sunset: 1493837243
        },
        id: 2873891,
        name: 'Mannheim',
        cod: 200

    };