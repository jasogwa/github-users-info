import { render, screen } from '@testing-library/react';
import App from './App';

it('should render main page', () => {
    render(<App />);
    const message = screen.queryByText(/GitHub Profile/i);
    const gist = screen.queryByText(/Gists/i);
    expect(message).toBeVisible();
    expect(gist).toBeVisible();
});
