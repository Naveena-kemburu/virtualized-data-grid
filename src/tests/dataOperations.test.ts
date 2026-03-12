import { filterData, sortData } from '../utils/dataOperations';
import { DataItem, FilterCriteria } from '../types';

const mockData: DataItem[] = [
  {
    id: '1',
    productName: 'Premium Laptop',
    category: 'Electronics',
    price: 999.99,
    stock: 50,
    lastUpdate: '2024-01-15T10:00:00.000Z',
    description: 'High-quality laptop'
  },
  {
    id: '2',
    productName: 'Budget Mouse',
    category: 'Electronics',
    price: 19.99,
    stock: 200,
    lastUpdate: '2024-02-20T10:00:00.000Z',
    description: 'Affordable mouse'
  },
  {
    id: '3',
    productName: 'Classic T-Shirt',
    category: 'Apparel',
    price: 29.99,
    stock: 100,
    lastUpdate: '2024-03-10T10:00:00.000Z',
    description: 'Comfortable t-shirt'
  }
];

describe('filterData', () => {
  const defaultFilters: FilterCriteria = {
    searchText: '',
    category: '',
    priceMin: 0,
    priceMax: 10000,
    stockMin: 0,
    stockMax: 1000,
    dateFrom: '',
    dateTo: ''
  };

  it('should return all data when no filters applied', () => {
    const result = filterData(mockData, defaultFilters);
    expect(result).toHaveLength(3);
  });

  it('should filter by search text', () => {
    const filters = { ...defaultFilters, searchText: 'laptop' };
    const result = filterData(mockData, filters);
    expect(result).toHaveLength(1);
    expect(result[0].productName).toBe('Premium Laptop');
  });

  it('should filter by category', () => {
    const filters = { ...defaultFilters, category: 'Apparel' };
    const result = filterData(mockData, filters);
    expect(result).toHaveLength(1);
    expect(result[0].category).toBe('Apparel');
  });

  it('should filter by price range', () => {
    const filters = { ...defaultFilters, priceMin: 20, priceMax: 100 };
    const result = filterData(mockData, filters);
    expect(result).toHaveLength(1);
    expect(result[0].productName).toBe('Classic T-Shirt');
  });

  it('should filter by stock range', () => {
    const filters = { ...defaultFilters, stockMin: 150, stockMax: 300 };
    const result = filterData(mockData, filters);
    expect(result).toHaveLength(1);
    expect(result[0].stock).toBe(200);
  });

  it('should filter by date range', () => {
    const filters = { ...defaultFilters, dateFrom: '2024-02-01', dateTo: '2024-12-31' };
    const result = filterData(mockData, filters);
    expect(result).toHaveLength(2);
  });
});

describe('sortData', () => {
  it('should sort by productName ascending', () => {
    const result = sortData(mockData, 'productName', 'asc');
    expect(result[0].productName).toBe('Budget Mouse');
    expect(result[2].productName).toBe('Premium Laptop');
  });

  it('should sort by productName descending', () => {
    const result = sortData(mockData, 'productName', 'desc');
    expect(result[0].productName).toBe('Premium Laptop');
    expect(result[2].productName).toBe('Budget Mouse');
  });

  it('should sort by price ascending', () => {
    const result = sortData(mockData, 'price', 'asc');
    expect(result[0].price).toBe(19.99);
    expect(result[2].price).toBe(999.99);
  });

  it('should sort by price descending', () => {
    const result = sortData(mockData, 'price', 'desc');
    expect(result[0].price).toBe(999.99);
    expect(result[2].price).toBe(19.99);
  });

  it('should sort by date ascending', () => {
    const result = sortData(mockData, 'lastUpdate', 'asc');
    expect(result[0].id).toBe('1');
    expect(result[2].id).toBe('3');
  });

  it('should not mutate original array', () => {
    const original = [...mockData];
    sortData(mockData, 'price', 'asc');
    expect(mockData).toEqual(original);
  });
});
