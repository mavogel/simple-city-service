import chai = require('chai');
import { api as server } from '../../../app/app';
import * as supertest from 'supertest';

let expect = chai.expect;

describe('cities route controller', () => {

    let weatherData: any = {
        type: 'Clear',
        type_description: 'clear sky',
        sunrise: '2016-08-23T08:00:00.000Z',
        sunset: '2016-08-23T22:00:00.000Z',
        temp: 29.72,
        temp_min: 26.67,
        temp_max: 35,
        pressure: 1026,
        humidity: 36,
        clouds_percent: 0,
        wind_speed: 1.5
    };

    it('should return weather for Mannheim', (done) => {
        supertest(server)
            .get('/cities/1234/weather')
            .end((err: any, response: supertest.Response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.deep.equal(weatherData);
                    done();
                }
            });
    });

    it('should return weather for city not found for cityId', (done) => {
        supertest(server)
            .get('/cities/9999/weather')
            .end((err: any, response: supertest.Response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(404);
                    expect(response.body).to.deep.equal({ code: 'NotFoundError', message: 'not found' });
                    done();
                }
            });
    });
});