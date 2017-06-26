import chai = require('chai');
import { api as server } from '../../../app/app';
import * as supertest from 'supertest';
import { logger } from '../../../app/services/logger';
import { geoAndWeather } from '../../../app/services/geoAndWeather';
import { mockedWeatherData } from '../../mocks';
import { WeatherOutput } from '../../../app/models/weather';
import * as sinon from 'sinon';


describe('cities route weather controller', () => {

    let expect = chai.expect;
    let sandbox = sinon.sandbox.create();
    let logInfoStub: sinon.SinonStub;
    let weatherStub: sinon.SinonStub;

    beforeEach(() => {
        logInfoStub = sandbox.stub(logger, 'info');
        weatherStub = sandbox.stub(geoAndWeather, 'getWeather');
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('should return weather for Mannheim', (done) => {
        weatherStub.returns(new Promise((res, rej) => {
            res(mockedWeatherData);
        }));

        let expectedWeatherOutput: WeatherOutput = {
            type: 'Rain',
            type_description: 'light rain',
            sunrise: '2017-05-03T03:59:32.000Z',
            sunset: '2017-05-03T18:47:23.000Z',
            temp: 12.49,
            temp_min: 12.00,
            temp_max: 13.00,
            pressure: 1018,
            humidity: 71,
            clouds_percent: 75,
            wind_speed: 4.1
        };

        supertest(server)
            .get('/cities/1234/weather')
            .end((err: any, response: supertest.Response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.deep.equal(expectedWeatherOutput);
                    expect(logInfoStub.callCount).to.equal(1);
                    done();
                }
            });
    });

    it('should return weather for city not found for cityId', (done) => {
        weatherStub.returns(new Promise((res, rej) => {
            res({ status: 'city not found' });
        }));

        supertest(server)
            .get('/cities/9999/weather')
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
});