import { render, screen } from '@testing-library/react';
import App from './App';

test('renders add book link', () => {
  render(<App />);
  const linkElement = screen.getByText(/add book/i);
  expect(linkElement).toBeInTheDocument();
});
