import chai = require('chai');
import { api as server } from '../../../app/app';
import * as supertest from 'supertest';

let expect = chai.expect;

describe('cities route controller', () => {

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
                    done();
                }
            });
    });

    it('should return 2 cities', (done) => {
        supertest(server)
            .get('/cities?lat=12.34&lng=56.78')
            .end((err: any, response: supertest.Response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.deep.equal([{ id: 23423, name: 'Mannheim' }, { id: 23231, name: 'Hamburg' }]);
                    done();
                }
            });
    });

    it('should return city not found', (done) => {
        supertest(server)
            .get('/cities?lat=99.99&lng=99.99')
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