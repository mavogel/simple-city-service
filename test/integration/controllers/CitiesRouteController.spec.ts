import chai = require('chai');
import { api as server } from '../../../app/app';
import * as supertest from 'supertest';

let expect = chai.expect;

describe('cities route controller', () => {
    let mockCities: Array<{ id: number, name: string }> = [
        { id: 23423, name: 'Mannheim' },
        { id: 23231, name: 'Hamburg' },
    ];

    it('should return 2 cities', (done) => {
        supertest(server)
            .get('/cities/1234')
            .end((err: any, response: supertest.Response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.equal(JSON.stringify(mockCities));
                    done();
                }
            });
    });

    it('should return city not found', (done) => {
        supertest(server)
            .get('/cities/9999')
            .end((err: any, response: supertest.Response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(404);
                    expect(response.body).to.equal(JSON.stringify({ 'code':'NotFoundError', 'message':'not found' }));
                    done();
                }
            });
    });
});