import { render, screen } from '@testing-library/react';
import { DataGrid } from '../components/DataGrid/DataGrid';
import { DataItem } from '../types';

// Mock the virtualizer
jest.mock('@tanstack/react-virtual', () => ({
  useVirtualizer: () => ({
    getVirtualItems: () => [
      { index: 0, start: 0, size: 50 }
    ],
    getTotalSize: () => 50,
  }),
}));

const mockData: DataItem[] = [
  {
    id: '1',
    productName: 'Test Product',
    category: 'Electronics',
    price: 99.99,
    stock: 10,
    lastUpdate: '2024-01-01T00:00:00.000Z',
    description: 'Test description'
  }
];

describe('DataGrid', () => {
  it('should render grid headers', () => {
    render(<DataGrid data={mockData} />);
    
    expect(screen.getByText(/Product Name/)).toBeInTheDocument();
    expect(screen.getByText(/Category/)).toBeInTheDocument();
    expect(screen.getByText(/Price/)).toBeInTheDocument();
    expect(screen.getByText(/Stock/)).toBeInTheDocument();
    expect(screen.getByText(/Last Update/)).toBeInTheDocument();
    expect(screen.getByText(/Description/)).toBeInTheDocument();
  });

  it('should render data rows', () => {
    render(<DataGrid data={mockData} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('should have proper ARIA attributes', () => {
    render(<DataGrid data={mockData} />);
    
    const grid = screen.getByRole('grid');
    expect(grid).toHaveAttribute('aria-label', 'Product data grid');
  });
});
