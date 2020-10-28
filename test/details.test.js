const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

it('connects to the app', async done=>{
    const res = await request.get('/')
    expect(res.status).toBe(404)
    done()
})

it('can get data details', async done=>{
    const res = await request.get('/details')
    expect(res.status).toBe(200)
    done()
})

it('can get specific data', async done=>{
    const res = await request.get('/details/21')
    expect(res.status).toBe(200)
    done()
})

it('can create new data', async done=>{
    const res = await request.post('/details')
    .send({
        question: 'this is a jest question',
        isAllowed: '1',
        isShuffled: '1',
        answerOption0: 'this is a jest option',
        selectOptionMode0: '1'
    })
    expect(res.status).toBe(201)
    done()
})

it('can update both question and option data', async done=>{
    const res = await request.patch('/details/51')
    .send({
        question: 'this is a jest question, but edited',
        isAllowed: '0',
        isShuffled: '0',
        answerOption0: 'this is a jest option, but also edited',
        selectOptionMode0: '1'
    })
    expect(res.status).toBe(204)
    done()
})

it('can delete an entry an its options', async done=>{
    const res = await request.delete('/details/81')
    expect(res.status).toBe(204)
    done()
})