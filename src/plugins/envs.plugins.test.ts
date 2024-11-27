import { envs } from "./envs.plugins";

describe('envs-plugins-ts', () => {

    test('should return env options', () => {

        expect(envs).toEqual({
            PORT: 3000,
            MAILER_EMAIL: 'serujiosaru7890@gmail.com',
            MAILER_SECRET_KEY: 'ivno unil nbxb fffc',
            MAILER_SERVICE: 'gmail',
            PROD: true,
            MONGO_URL: 'mongodb://sergio:123456@localhost:27017/',
            MONGO_DB_NAME: 'noctest',
            MONGO_USER: 'sergio',
            MONGO_PASS: '123456',
            POSTGRES_URL: 'postgresql://postgres:12345678@localhost:5437/noctest',
            POSTGRES_USER: 'postgres',
            POSTGRES_DB: 'noctest',
            POSTGRES_PASSWORD: '12345678'
        })

    })
    
});