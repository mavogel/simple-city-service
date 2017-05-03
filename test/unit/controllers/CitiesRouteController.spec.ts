import chai = require('chai');
import { api as server } from '../../../app/app';
import * as supertest from 'supertest';
import { logger } from '../../../app/services/logger';
import { geoAndWeather } from '../../../app/services/geoAndWeather';
import { mockedWeatherData, mockedGeonamesWithWeather } from '../../mocks';
import * as sinon from 'sinon';


describe('cities route controller', () => {

    let expect = chai.expect;
    let sandbox = sinon.sandbox.create();
    let logInfoStub: sinon.SinonStub;
    let geoGetCitiesStub: sinon.SinonStub;
    let geoGetCityStub: sinon.SinonStub;

    beforeEach(() => {
        logInfoStub = sandbox.stub(logger, 'info');
        geoGetCitiesStub = sandbox.stub(geoAndWeather, 'getCities');
        geoGetCityStub = sandbox.stub(geoAndWeather, 'getCity');
    });

    afterEach(() => {
        sandbox.restore();
    });

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

    it('should return Mannheim for cityId', (done) => {
        geoGetCityStub.returns(new Promise((res, rej) => {
            res(mockedWeatherData);
        }));

        supertest(server)
            .get('/cities/2875376')
            .end((err: any, response: supertest.Response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.deep.equal({ id: 2873891, name: 'Mannheim', lat: 49.49, lng: 8.46 });
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
            res(mockedGeonamesWithWeather);
        }));

        supertest(server)
            .get('/cities?lat=49.48121&lng=8.44641')
            .end((err: any, response: supertest.Response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.deep.equal([{ id: 2873891, name: 'Mannheim' }, { id: 2875376, name: 'Ludwigshafen am Rhein' }]);
                    expect(logInfoStub.callCount).to.equal(1);
                    expect(geoGetCitiesStub.callCount).to.equal(1);
                    done();
                }
            });
    });

});