import { DataItem, FilterCriteria, SortField, SortOrder } from '../types';

export function filterData(data: DataItem[], filters: FilterCriteria): DataItem[] {
  return data.filter(item => {
    // Text search
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      const matchesSearch = 
        item.productName.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }

    // Category filter
    if (filters.category && filters.category !== 'All') {
      if (item.category !== filters.category) return false;
    }

    // Price range
    if (item.price < filters.priceMin || item.price > filters.priceMax) {
      return false;
    }

    // Stock range
    if (item.stock < filters.stockMin || item.stock > filters.stockMax) {
      return false;
    }

    // Date range
    if (filters.dateFrom) {
      const itemDate = new Date(item.lastUpdate);
      const fromDate = new Date(filters.dateFrom);
      if (itemDate < fromDate) return false;
    }

    if (filters.dateTo) {
      const itemDate = new Date(item.lastUpdate);
      const toDate = new Date(filters.dateTo);
      if (itemDate > toDate) return false;
    }

    return true;
  });
}

export function sortData(
  data: DataItem[],
  field: SortField,
  order: SortOrder
): DataItem[] {
  if (!order) return data;

  const sorted = [...data].sort((a, b) => {
    let aVal: any = a[field];
    let bVal: any = b[field];

    // Handle date strings
    if (field === 'lastUpdate') {
      aVal = new Date(aVal).getTime();
      bVal = new Date(bVal).getTime();
    }

    // Handle strings
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return order === 'asc' 
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    // Handle numbers
    return order === 'asc' ? aVal - bVal : bVal - aVal;
  });

  return sorted;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
