const request = require('supertest'),
        Server = require('../server');

describe('loading express', function() {
    let server;
    // define what should happen before each test (it)
    beforeEach(function() {
        server = Server();
    });
    // define what should hapepnd after each test (it)
    afterEach(function(done) {
        server.close(done);
    });
    // get reqest to / should respond with ok
    it('[GET] /', function testIndexGet(done) {
        request(server)
        .get('/')
        .expect(200, done);
    });
    // post request to /data should respond with ok
    it('[POST] /data', function testData(done) {
        request(server)
        .post('/data')
        .send({ data: { a: 1 } })
        .expect(200, done);
    });
    // all other requests should 404
    it('404 everything else', function testPath(done) {
        request(server)
        .get('/foo/bar')
        .expect(404, done);
    });
});
