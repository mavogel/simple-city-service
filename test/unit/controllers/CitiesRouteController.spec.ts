import chai = require('chai');
import { api as server } from '../../../app/app';
import * as supertest from 'supertest';
import { logger } from '../../../app/services/logger';
import { geo, Geoname, GeoNameFull } from '../../../app/services/geo';
import * as sinon from 'sinon';


describe('cities route weather controller', () => {

    let expect = chai.expect;
    let sandbox = sinon.sandbox.create();
    let logInfoStub: sinon.SinonStub;
    let geoGetCitiesStub: sinon.SinonStub;
    let geoGetCityStub: sinon.SinonStub;

    beforeEach(() => {
        logInfoStub = sandbox.stub(logger, 'info');
        geoGetCitiesStub = sandbox.stub(geo, 'getCities');
        geoGetCityStub = sandbox.stub(geo, 'getCity');
    });

    afterEach(() => {
        sandbox.restore();
    });

    let mockGeonames: Array<Geoname> =
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

    let mockedGeoname: GeoNameFull =
        {
            timezone: {
                gmtOffset: 1,
                timeZoneId: "Europe/Berlin",
                dstOffset: 2
            },
            bbox: {
                east: 8.459793419595389,
                south: 49.46449964574797,
                north: 49.542897845721434,
                west: 8.40087199129392,
                accuracyLevel: 0
            },
            asciiName: "Ludwigshafen am Rhein",
            countryId: "2921044",
            fcl: "P",
            srtm3: 97,
            adminId3: "3247910",
            countryCode: "DE",
            adminId4: "6554817",
            adminId1: "2847618",
            lat: "49.48121",
            fcode: "PPLA3",
            continentCode: "EU",
            adminCode2: "00",
            adminCode3: "07314",
            adminCode1: "08",
            lng: "8.44641",
            geonameId: 2875376,
            toponymName: "Ludwigshafen am Rhein",
            adminCode4: "07314000",
            population: 163196,
            adminName5: "",
            adminName4: "Ludwigshafen am Rhein",
            adminName3: "Kreisfreie Stadt Ludwigshafen am Rhein",
            alternateNames: [
                {
                    name: "루트비히스하펜",
                    lang: "ko"
                },
                {
                    name: "ルートヴィヒスハーフェン",
                    lang: "ja"
                },
                {
                    name: "ルートヴィッヒスハーフェン",
                    lang: "ja"
                },
                {
                    name: "Liudvigshafenas prie Reino",
                    lang: "lt"
                },
                {
                    name: "Ludovici Portus Rhenanus",
                    lang: "la"
                },
                {
                    name: "Lüdviqshafen",
                    lang: "az"
                },
                {
                    name: "Ludwichshafe",
                    lang: "pfl"
                },
                {
                    name: "Ludwigshafen",
                    lang: "eo"
                },
                {
                    name: "Ludwigshafen",
                    lang: "es"
                },
                {
                    name: "Ludwigshafen",
                    lang: "et"
                },
                {
                    name: "Ludwigshafen",
                    lang: "fi"
                },
                {
                    name: "Ludwigshafen",
                    lang: "fr"
                },
                {
                    name: "Ludwigshafen",
                    lang: "no"
                },
                {
                    name: "Ludwigshafen",
                    lang: "pl"
                },
                {
                    name: "Ludwigshafen",
                    lang: "sv"
                },
                {
                    name: "Ludwigshafen",
                    lang: "vo"
                },
                {
                    name: "Ludwigshafen"
                },
                {
                    name: "Ludwigshafen am Rhein",
                    lang: "de"
                },
                {
                    name: "Ludwigshafen am Rhein",
                    lang: "en"
                },
                {
                    name: "Ludwigshafen am Rhein",
                    lang: "id"
                },
                {
                    name: "Ludwigshafen am Rhein",
                    lang: "nl"
                },
                {
                    name: "Ludwigshafen am Rhein",
                    lang: "pt"
                },
                {
                    name: "Ludwigshafen am Rhein",
                    lang: "ro"
                },
                {
                    name: "Ludwigshafen am Rhein",
                    lang: "vi"
                },
                {
                    name: "Ludwigshafen am Rhein"
                },
                {
                    name: "Ludwigshafen sul Reno",
                    lang: "it"
                },
                {
                    name: "لڈوگشافن",
                    lang: "pnb"
                },
                {
                    name: "لودفيغسهافن",
                    lang: "ar"
                },
                {
                    name: "لودویگسهافن",
                    lang: "fa"
                },
                {
                    name: "לודוויגסהאפן",
                    lang: "he"
                },
                {
                    name: "Λουντβιχσχάφεν",
                    lang: "el"
                },
                {
                    name: "Лудвигсхафен",
                    lang: "bg"
                },
                {
                    name: "Лудвигсхафен на Рајни",
                    lang: "sr"
                },
                {
                    name: "Людвигсхафен-на-Рейне",
                    lang: "ru"
                },
                {
                    name: "Людвіґсгафен-на-Рейні",
                    lang: "uk"
                },
                {
                    name: "რაინის ლუდვიგსჰაფენი",
                    lang: "ka"
                },
                {
                    name: "लुडविक्सहाफेन",
                    lang: "mr"
                },
                {
                    name: "路德维希港",
                    lang: "zh"
                },
                {
                    name: "路德维希港",
                    lang: "zh-CN"
                }
            ],
            adminName2: "",
            name: "Ludwigshafen am Rhein",
            fclName: "city, village,...",
            countryName: "Germany",
            fcodeName: "seat of a third-order administrative division",
            adminName1: "Rheinland-Pfalz"
        }

    it('should return 400 due to resource is not defined', (done) => {
        supertest(server)
            .get('/cities')
            .end((err: any, response: supertest.Response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(400);
                    expect(response.body).to.deep.equal({ code: 'BadRequestError', message: 'lat/lng required' });
                    expect(logInfoStub.callCount).to.equal(1);
                    done();
                }
            });
    });

    it('should return Ludwigshafen am Rhein for cityId', (done) => {
        geoGetCityStub.returns(new Promise((res, rej) => {
            res(mockedGeoname);
        }));

        supertest(server)
            .get('/cities/2875376')
            .end((err: any, response: supertest.Response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.deep.equal({ id: 2875376, name: 'Ludwigshafen am Rhein', lat: 49.48121, lng: 8.44641 });
                    expect(logInfoStub.callCount).to.equal(1);
                    done();
                }
            });
    });

    it('should return city not found for cityId', (done) => {
        geoGetCityStub.returns(new Promise((res, rej) => {
            res({ status: 'this geonameid does not exist' });
        }));

        supertest(server)
            .get('/cities/1')
            .end((err: any, response: supertest.Response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(404);
                    expect(response.body).to.deep.equal({ code: 'NotFoundError', message: 'not found' });
                    expect(logInfoStub.callCount).to.equal(1);
                    done();
                }
            });
    });

    it('should return 2 cities', (done) => {
        geoGetCitiesStub.returns(new Promise((res, rej) => {
            res(mockGeonames);
        }));

        supertest(server)
            .get('/cities?lat=49.48121&lng=8.44641')
            .end((err: any, response: supertest.Response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.deep.equal([{ id: 2875376, name: 'Ludwigshafen am Rhein' }, { id: 8521412, name: 'Lindenhof' }]);
                    expect(logInfoStub.callCount).to.equal(1);
                    expect(geoGetCitiesStub.callCount).to.equal(1);
                    done();
                }
            });
    });

});