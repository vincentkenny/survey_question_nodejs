const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

it('can get all data', async done=>{
    const res = await request.get('/options')
    expect(res.status).toBe(200)
    done()
})

it('can get specific option', async done=>{
    const res = await request.get('/options/41')
    expect(res.status).toBe(200)
    done()
})

it('can delete specific option', async done=>{
    const res = await request.delete('/options/121')
    expect(res.status).toBe(204)
    done()
})