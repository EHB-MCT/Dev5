const request = require('supertest');
const {app} = require('../index.js');
const baseURL = "http://localhost:1000"



describe("GET /", () => {
    beforeAll(async () => {
        await request(baseURL).get("/");
    })
    it('returns 200', async () => {
        const response = await request(baseURL).get("/");
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    })
});

describe("GET /users", () => {
    beforeAll(async () => {
        await request(baseURL).get("/users");
    })
    it('returns 200', async () => {
        const response = await request(baseURL).get("/users");
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    })
});

describe("GET /users/:id", () => {
    beforeAll(async () => {
        await request(baseURL).get("/users/1");
    })
    it('returns 200', async () => {
        const response = await request(baseURL).get("/users/1");
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe(undefined);
    })
});