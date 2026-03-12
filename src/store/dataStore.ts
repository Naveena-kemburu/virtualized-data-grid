import { create } from 'zustand';
import { DataItem, FilterCriteria, SortCriteria } from '../types';
import { filterData, sortData } from '../utils/dataOperations';

interface DataState {
  rawData: DataItem[];
  filteredData: DataItem[];
  displayData: DataItem[];
  filters: FilterCriteria;
  sort: SortCriteria;
  isLoading: boolean;
  error: string | null;
  
  setRawData: (data: DataItem[]) => void;
  setFilters: (filters: Partial<FilterCriteria>) => void;
  setSort: (sort: SortCriteria) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  applyFiltersAndSort: () => void;
}

const initialFilters: FilterCriteria = {
  searchText: '',
  category: '',
  priceMin: 0,
  priceMax: 10000,
  stockMin: 0,
  stockMax: 1000,
  dateFrom: '',
  dateTo: ''
};

export const useDataStore = create<DataState>((set, get) => ({
  rawData: [],
  filteredData: [],
  displayData: [],
  filters: initialFilters,
  sort: { field: null, order: null },
  isLoading: false,
  error: null,

  setRawData: (data) => {
    set({ rawData: data, displayData: data });
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters }
    }));
    get().applyFiltersAndSort();
  },

  setSort: (sort) => {
    set({ sort });
    get().applyFiltersAndSort();
  },

  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),

  applyFiltersAndSort: () => {
    const { rawData, filters, sort } = get();
    
    const startTime = performance.now();
    
    let result = filterData(rawData, filters);
    
    if (sort.field && sort.order) {
      result = sortData(result, sort.field, sort.order);
    }
    
    const endTime = performance.now();
    console.log(`Filter & Sort completed in ${(endTime - startTime).toFixed(2)}ms`);
    
    set({ filteredData: result, displayData: result });
  }
}));
