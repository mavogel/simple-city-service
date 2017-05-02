import chai = require('chai');
import { api as server } from '../../../app/app';
import * as supertest from 'supertest';
import { logger } from '../../../app/services/logger';
import * as sinon from 'sinon';


describe('cities route controller', () => {

    let expect = chai.expect;
    let sandbox = sinon.sandbox.create();
    let logInfoStub: sinon.SinonStub;

    let mockCities: Array<{ id: number, name: string }> = [
        { id: 23423, name: 'Mannheim' },
        { id: 23231, name: 'Hamburg' },
    ];

    beforeEach(() => {
        logInfoStub = sandbox.stub(logger, 'info');
    });

    afterEach(() => {
        sandbox.restore();
    });

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
                    expect(logInfoStub.callCount).to.equal(1);
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
                    expect(logInfoStub.callCount).to.equal(1);
                    done();
                }
            });
    });
});