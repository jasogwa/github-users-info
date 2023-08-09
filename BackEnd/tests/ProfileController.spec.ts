import supertest from 'supertest';
import { expect } from 'chai';
import { it } from 'mocha';

const request = supertest('http://localhost:3000');

describe('ProfileController', () => {
    it('should get user data', async () => {
        const validUsername = 'Amy';
        return request.get(`/${validUsername}`).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.have.property('user');
            expect(response.body).to.have.property('gists');
            expect(response.body).to.have.property('orgs');
        });
    });

    it('should handle errors', async () => {
        const inValidUsername = '';
        return request.get(`/${inValidUsername}`).then((response) => {
            expect(response.status).to.equal(404);
        });
    });
});
