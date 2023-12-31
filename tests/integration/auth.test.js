const request = require('supertest')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const config = require('config');
const AuthUser = require('../../models/authentication/student_model');
const hash = require('../../routes/auth_routes/hash')
const createNewUser = require('../../data/auth_queries/auth_register');


describe('/api/auth/', () => {
    let server;
    beforeEach(async () => {
        server = await require('../../index')
    })
    afterAll(async () => {
        await mongoose.connection.close()
        server.close()
    })

    describe('/register', () => {
        beforeEach(async () => {
            await AuthUser.deleteMany({})
        })
        describe('POST /', () => {
            let email = 'example@example.com';
            let password = 'password12345';
            let result;
            const send_request = async () => {
                return await request(server).post('/api/auth/register/')
                    .send({
                        "email": email,
                        "password": password
                    })
            }
            it('should return 201 and create a new user successfully', async () => {
                result = await send_request();
                expect(result.status).toBe(201)
                expect(result.body).toHaveProperty('_id')
                expect(result.body).toHaveProperty('email', 'example@example.com')
            })
            it('should return 201 even if user do not send password (I HAVE TO FIX IT)', async () => {
                password = ''
                result = await send_request();
                expect(result.status).toBe(201)
                expect(result.body).toHaveProperty('_id')
                expect(result.body).toHaveProperty('email', 'example@example.com')
            })
            it('should return 201 even if user do not send email (I HAVE TO FIX IT)', async () => {
                email = ''
                result = await send_request();
                expect(result.status).toBe(201)
                expect(result.body).toHaveProperty('_id')
                expect(result.body).toHaveProperty('email', '')
            })
            it('should return 400 and do not register the user', async () => {
                await send_request();
                result = await send_request();
                expect(result.status).toBe(400)
                expect(result.text).toBe('user already registered')
            })
        })
        describe('GET /', () => {
            const send_request = async () => {
                return await request(server).get('/api/auth/register/')
            }
            it('should return 404 for GET requests in this endpoint (I HAVE TO FIX IT)', async () => {
                const result = await send_request()
                expect(result.status).toBe(404)
            })
        })
        describe('DELETE /', () => {
            const send_request = async () => {
                return await request(server).delete('/api/auth/register/')
            }
            it('should return 404 for DELETE requests in this endpoint (I HAVE TO FIX IT)', async () => {
                const result = await send_request()
                expect(result.status).toBe(404)
            })
        })
    })
    describe('login', () => {
        let email = 'alice@example.com';
        let password = 'alice_password';
        let result;
        describe('POST /', () => {
            beforeAll(async () => {
                const alice = { email: 'alice@example.com', password: await hash('alice_password') }
                await createNewUser(alice)
            });
            const send_request = async () => {
                return await request(server).post('/api/auth/login/')
                    .send({
                        "email": email,
                        "password": password
                    });
            };
            it("should return 200 and give a valid token with user's data", async () => {
                result = await send_request()
                const decoded = jwt.verify(result.text, config.get('JWT_SECRET_KEY'))
                expect(result.status).toBe(200)
                expect(decoded).toMatchObject({ email: 'alice@example.com' })
            })
            it("should return 400 when user sends wrong password", async () => {
                password = 'NOT_alice_password'
                result = await send_request()
                expect(result.status).toBe(400)
                expect(result.text).toMatch('Invalid username or password')
            });
            it("should return 400 when user sends wrong email", async () => {
                email = 'NOT_alice'
                result = await send_request()
                expect(result.status).toBe(400)
                expect(result.text).toMatch('Invalid username or password')
            });
        });
        describe('GET / || DELETE / || UPDATE / || PUT /', () => {
            let method;
            const send_request = async () => {
                return await request(server).get('/api/auth/login/')
                    .send({
                        "email": email,
                        "password": password
                    });
            };
            it("should return 404 for GET request in this endpoint (I HAVE TO FIX IT)", async () => {
                method = 'GET'
                result = await send_request()
                expect(result.status).toBe(404)
            })
            it("should return 404 for DELETE request in this endpoint (I HAVE TO FIX IT)", async() => {
                method = 'DELETE'
                result = await send_request()
                expect(result.status).toBe(404)
            })
            it("should return 404 for UPDATE request in this endpoint (I HAVE TO FIX IT)", async() => {
                method = 'UPDATE'
                result = await send_request()
                expect(result.status).toBe(404)
            })
            it("should return 404 for PUT request in this endpoint (I HAVE TO FIX IT)", async() => {
                method = 'PUT'
                result = await send_request()
                expect(result.status).toBe(404)
            })
        })
    });
});
