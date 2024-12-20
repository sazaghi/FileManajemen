const request = require('supertest');
const app = require('../app'); // Sesuaikan path jika berbeda

describe('API Routes', () => {
    describe('Auth API', () => {
        test('Should create a new user', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({ username: 'user', password: 'password' });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            expect(res.body.username).toBe('user');
        });

        test('Should not create a user with an existing username', async () => {
            // Menggunakan username yang sama untuk memastikan tidak bisa registrasi dua kali
            const res = await request(app)
                .post('/auth/register')
                .send({ username: 'user', password: 'password' });

            expect(res.statusCode).toEqual(400); // Atau status lain sesuai dengan implementasi Anda
            expect(res.body).toHaveProperty('error', 'Username already exists'); // Sesuaikan pesan error
        });

        test('Should fail with missing username or password', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({}); // Mengirimkan payload kosong

            expect(res.statusCode).toEqual(400); // Pastikan status 400 untuk input tidak valid
            expect(res.body).toHaveProperty('error', 'Username and password are required'); // Sesuaikan pesan error
        });
    });
});
