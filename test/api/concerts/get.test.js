const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concerts = require('../../../models/concerts.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testDepOne = new Concerts({ _id: '5d9f1140f10a81216cfd4210', performer: 'Kazik', genre: 'Rock', price: 25, day: 1, image: 'dsad/dsds.jpg' });
    await testDepOne.save();
  
    const testDepTwo = new Concerts({ _id: '5d9f1159f81ce8d1ef2bee87', performer: 'Lady Gaga', genre: 'Pop', price: 35, day: 2, image: 'dsad/dsds.jpg' });
    await testDepTwo.save();
  });

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);

  });

  it('/performer/:performer should return concerts by :performer ', async () => {
    const res = await request(server).get('/api/concerts/performer/LadyGaga');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].performer).to.be.equal('Lady Gaga');
  });

  it('/genre/:genre should return concerts by :genre', async () => {
    const res = await request(server).get('/api/concerts/genre/Pop');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].genre).to.be.equal('Pop');
  });

  it('/price/day/:day should return concerts by :day', async () => {
    const res = await request(server).get('/api/concerts/price/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].day).to.be.equal(1);
  });

  it('/price/:price_min/:price_max should return concerts by price range :price_min/:price_max ', async () => {
    const res = await request(server).get('/api/concerts/price/20/30');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body[0].price).to.be.at.least(20);
    expect(res.body[0].price).to.be.at.most(30);
  });

  after(async () => {
    await Concerts.deleteMany();
  });

});