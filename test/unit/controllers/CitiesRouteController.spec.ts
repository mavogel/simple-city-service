import chai = require('chai');
import { api as server } from '../../../app/app';
import * as supertest from 'supertest';
import { logger } from '../../../app/services/logger';
import { geo, Geoname } from '../../../app/services/geo';
import * as sinon from 'sinon';


describe('cities route weather controller', () => {

    let expect = chai.expect;
    let sandbox = sinon.sandbox.create();
    let logInfoStub: sinon.SinonStub;
    let geoGetCitiesStub: sinon.SinonStub;

    beforeEach(() => {
        logInfoStub = sandbox.stub(logger, 'info');
        geoGetCitiesStub = sandbox.stub(geo, 'getCities');
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

    it('should return Mannheim', (done) => {
        supertest(server)
            .get('/cities/1234')
            .end((err: any, response: supertest.Response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.deep.equal({ id: 1234, name: 'Mannheim', lat: 49.488331, lng: 8.46472 });
                    expect(logInfoStub.callCount).to.equal(1);
                    done();
                }
            });
    });

    it('should return city not found for cityId', (done) => {
        supertest(server)
            .get('/cities/9999')
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