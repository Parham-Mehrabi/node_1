const request = require('supertest')
const AuthUser = require('../../models/authentication/student_model');

describe('/api/auth/', () => {
    let server;
    beforeEach(async () => {
        server = require('../../index')
        await AuthUser.deleteMany({})
    })
    afterEach(async () => {
        server.close()
    })

    describe('/register', () => {
        it('should create a new user successfully', async () => {
            const payload = {
                "email": 'example@example.com',
                "password": 'password12345'
            }
            const result = await request(server).post('/api/auth/register/').send(payload)
            expect(result.status).toBe(201)
            expect(result.body).toHaveProperty('_id')
            expect(result.body).toHaveProperty('email', 'example@example.com')
        })
    })
})
