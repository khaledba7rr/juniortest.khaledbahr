import { render, screen } from '@testing-library/react';
import AddProduct from './Pages/add-product';

test('renders learn react link', () => {
  render(<AddProduct />);
  const linkElement = screen.getByText(/add new product/i);
  expect(linkElement).toBeInTheDocument();
});
