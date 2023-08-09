import axios from 'axios';
import { Request, Response } from 'express';
import { User } from '../models/User';

class ProfileController {
    async getUserData(req: Request, res: Response) {
        const baseUrl = 'https://api.github.com/users';
        try {
            const { username } = req.params;
            const userResponse = await axios.get(`${baseUrl}/${username}`);
            const gistResponse = await axios.get(`${baseUrl}/${username}/gists`);
            const orgsResponse = await axios.get(`${baseUrl}/${username}/orgs`);

            const user: User = userResponse.data;
            const gists = gistResponse.data;
            const orgs = orgsResponse.data;

            res.json({ user, gists, orgs });
        } catch (error) {
            res.status(500).json({ error: 'Unsucessful' });
        }
    }
}

export default new ProfileController();
