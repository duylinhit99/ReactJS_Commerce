import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders header with cart link', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const cartLinks = screen.getAllByRole('link', { name: /cart/i });
  expect(cartLinks.length).toBeGreaterThan(0);
});
