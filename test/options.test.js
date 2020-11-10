const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);
const db = require('../models');

describe('Option API',()=>{
    beforeAll(async ()=>{
        await db.sequelize.sync()
    })

    it('can get all data', async done=>{
        const res = await request.get('/options')
        expect(res.status).toBe(200)
        done()
    })
    
    it('can get specific option', async done=>{
        const res = await request.get('/options/1')
        expect(res.status).toBe(200)
        done()
    })
    
    it('can delete specific option', async done=>{
        const res = await request.delete('/options/81')
        expect(res.status).toBe(204)
        done()
    })

    afterAll(async ()=>{
        await db.sequelize.close()
    })
})
