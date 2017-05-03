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

    it('should return Ludwigshafen am Rhein for cityId', (done) => {
        supertest(server)
            .get('/cities/2875376')
            .end((err: any, response: supertest.Response) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(response.status).to.equal(200);
                    expect(response.body).to.deep.equal({ id: 2875376, name: 'Ludwigshafen am Rhein', lat: 49.48121, lng: 8.44641 });
                    done();
                }
            });
    });

    it('should return city not found for cityId', (done) => {
        supertest(server)
            .get('/cities/1')
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

    // TODO mavogel: service return differnt order sometimes
    // it('should return 10 cities', (done) => {
    //     supertest(server)
    //         .get('/cities?lat=49.48121&lng=8.44641')
    //         .end((err: any, response: supertest.Response) => {
    //             if (err) {
    //                 done(err);
    //             }
    //             else {
    //                 expect(response.status).to.equal(200);
    //                 expect(response.body).to.deep.equals([{ id: 2875376, name: "Ludwigshafen am Rhein" }, { id: 8521412, name: "Lindenhof" }, { id: 2866760, name: "Neckarstadt" }, { id: 2924380, name: "Friesenheim" }, { id: 2867610, name: "Mundenheim" }, { id: 2873891, name: "Mannheim" }, { id: 2816857, name: "Vogelstang" }, { id: 2866781, name: "Neckarau" }, { id: 8642860, name: "Gartenstadt" }, { id: 2847634, name: "Rheingönheim" }]);
    //                 done();
    //             }
    //         });
    // });

    it('should return city not found', (done) => {
        supertest(server)
            .get('/cities?lat=0.42328&lng=8.46')
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