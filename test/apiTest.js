const request = require('supertest');
const app = require('../server');

const jwtTest = "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOTJhY2JkNi1mNmRkLTQ1NWQtYjJlOC0xNjE4YjI2NjIyM2IiLCJpYXQiOjE1NjM1NTA2NDAsImV4cCI6MTU2NDE1NTQ0MH0.BkyynpzzVNgcV4vlRUUTMpLSAvSTNkQrTlMJKGVgr_Y"

/**
 * Testing index route
 */
describe('GET /', function (){
  it('respond with nothing', function(done){
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200, done);
  })
})

/**
 * Testing post login endpoint
 */
describe('POST /v1/login', function (){
  let data = {
    "username": "admin",
    "password": "admin"
  }
  it('respond with json, admin logged', function(done){
    request(app)
      .post('/v1/login')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})

/**
 * Testing get players endpoint
 */
describe('GET /v1/players', function (){
  it('respond with json, players fetched', function(done){
    request(app)
      .get('/v1/players')
      .set('Accept', 'application/json')
      .set('Authorization', jwtTest)
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})