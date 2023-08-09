import { render } from '@testing-library/react';
import GitHubProfile from '../containers/GitHubProfile';

describe('GitHubProfile Component', () => {
    it('renders input and search button', () => {
        const { container } = render(<GitHubProfile />);
        const textFieldElement = container.querySelector('input');
        const fetchButton = container.querySelector('button');

        // Assertions
        if (fetchButton && textFieldElement) {
            console.assert(textFieldElement, 'Input element should exist');
            console.assert(fetchButton, 'Fetch button should exist');
        } else {
            throw new Error('Elements not found');
        }
    });
});
