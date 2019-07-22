const request = require('supertest');
const app = require('../server');

const jwtTest = 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwOTJhY2JkNi1mNmRkLTQ1NWQtYjJlOC0xNjE4YjI2NjIyM2IiLCJpYXQiOjE1NjM1NTA2NDAsImV4cCI6MTU2NDE1NTQ0MH0.BkyynpzzVNgcV4vlRUUTMpLSAvSTNkQrTlMJKGVgr_Y';
const ronaldoUuid = '8acbdab6-2ea9-405e-9395-bf7e99d99b28';

/**
 * Testing index route
 */
describe('GET /', () => {
  it('respond with nothing', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
});

/**
 * Testing post login endpoint
 */
describe('POST /v1/login', () => {
  const data = {
    username: 'admin',
    password: 'admin'
  };
  it('respond with json, admin logged', (done) => {
    request(app)
      .post('/v1/login')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.success = true;
      })
      .expect(200, done);
  });
});

/**
 * Testing post login endpoint
 */
describe('POST /v1/login', () => {
  const data = {
    username: 'wrongadmin',
    password: 'admin'
  };
  it("respond with message 'User not found'", (done) => {
    request(app)
      .post('/v1/login')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.success = false,
        res.body.msg = 'User not found';
      })
      .expect(400, done);
  });
});

/**
 * Testing post login endpoint
 */
describe('POST /v1/login', () => {
  const data = {
    username: 'admin',
    password: 'wrongpassword'
  };
  it("respond with message 'Wrong password !'", (done) => {
    request(app)
      .post('/v1/login')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.success = false,
        res.body.msg = 'Wrong password !';
      })
      .expect(401, done);
  });
});

/**
 * Testing post register endpoint
 */
describe('POST /v1/register', () => {
  const data = {
    username: 'test',
    password: 'test',
    mail: 'test@test.com'
  };
  it('respond with json, user registered', (done) => {
    request(app)
      .post('/v1/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.success = true;
      })
      .expect(200, done);
  });
});

/**
 * Testing post register endpoint
 */
describe('POST /v1/register', () => {
  const data = {
    username: 'test',
    password: 'test',
    mail: 'test@test.com'
  };
  it("respond with message 'User already exist'", (done) => {
    request(app)
      .post('/v1/register')
      .send(data)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.success = false;
      })
      .expect(400, done);
  });
});

/**
 * Testing get all players endpoint
 */
describe('GET /v1/players', () => {
  it('respond with json containing a list of all users', (done) => {
    request(app)
      .get('/v1/players')
      .set('Accept', 'application/json')
      .set('Authorization', jwtTest)
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.success = true;
      })
      .expect(200, done);
  });
});

/**
 * Testing get one player endpoint
 */
describe('GET /v1/players/:uuid', () => {
  it('respond with json containing ronaldo player info', (done) => {
    request(app)
      .get(`/v1/players/${ronaldoUuid}`)
      .set('Accept', 'application/json')
      .set('Authorization', jwtTest)
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.success = true;
      })
      .expect(200, done);
  });
});

/**
 * Testing get one player endpoint by giving a non-existing player
 */
describe('GET /v1/players/:uuid', () => {
  it("respond with message: Player doesn't exist !'", (done) => {
    request(app)
      .get('/v1/players/mbappe')
      .set('Accept', 'application/json')
      .set('Authorization', jwtTest)
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.success = false;
      })
      .expect(400, done);
  });
});

/**
 * Testing post players endpoint
 */
describe('POST /v1/players', () => {
  it('respond with json, player created', (done) => {
    const data = {
      name: 'Mbappe',
      position: 'Forward',
      number: '10'
    };
    request(app)
      .post('/v1/players')
      .send(data)
      .set('Accept', 'application/json')
      .set('Authorization', jwtTest)
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.success = true;
      })
      .expect(200, done);
  });
});

/**
 * Testing put players endpoint
 */
describe('PUT /v1/players/:uuid', () => {
  it('respond with json, ronaldo replaced by Courtois', (done) => {
    const data = {
      name: 'Courtois',
      position: 'Goal',
      number: '13'
    };
    request(app)
      .put(`/v1/players/${ronaldoUuid}`)
      .send(data)
      .set('Accept', 'application/json')
      .set('Authorization', jwtTest)
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.success = true;
      })
      .expect(200, done);
  });
});

/**
 * Testing put players endpoint by giving a non-existing player
 */
describe('PUT /v1/players/:uuid', () => {
  it("respond with message: Player doesn't exist !'", (done) => {
    const data = {
      name: 'Jean',
      position: 'Libero',
      number: '77'
    };
    request(app)
      .put('/v1/players/randomplayer')
      .send(data)
      .set('Accept', 'application/json')
      .set('Authorization', jwtTest)
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.success = false;
      })
      .expect(400, done);
  });
});

/**
 * Testing delete players endpoint
 */
describe('DELETE /v1/players/:uuid', () => {
  it('respond with json, Courtois deleted', (done) => {
    request(app)
      .delete(`/v1/players/${ronaldoUuid}`)
      .set('Accept', 'application/json')
      .set('Authorization', jwtTest)
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.success = true;
      })
      .expect(200, done);
  });
});

/**
 * Testing delete players endpoint by giving a non-existing player
 */
describe('DELETE /v1/players/:uuid', () => {
  it("respond with message: Player doesn't exist !'", (done) => {
    request(app)
      .delete('/v1/players/randomplayer')
      .set('Accept', 'application/json')
      .set('Authorization', jwtTest)
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body.success = false;
      })
      .expect(400, done);
  });
});
