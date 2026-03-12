import React, { useCallback, useState, useEffect } from 'react';
import { useDataStore } from '../../store/dataStore';
import { debounce } from '../../utils/dataOperations';
import './FilterPanel.css';

export const FilterPanel: React.FC = React.memo(() => {
  const { filters, setFilters } = useDataStore();
  
  const [localSearchText, setLocalSearchText] = useState(filters.searchText);

  const debouncedSetSearch = useCallback(
    debounce((value: string) => {
      setFilters({ searchText: value });
    }, 300),
    [setFilters]
  );

  useEffect(() => {
    debouncedSetSearch(localSearchText);
  }, [localSearchText, debouncedSetSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchText(e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters({ category: e.target.value });
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ priceMin: parseFloat(e.target.value) || 0 });
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ priceMax: parseFloat(e.target.value) || 10000 });
  };

  const handleStockMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ stockMin: parseInt(e.target.value) || 0 });
  };

  const handleStockMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ stockMax: parseInt(e.target.value) || 1000 });
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ dateFrom: e.target.value });
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ dateTo: e.target.value });
  };

  const handleReset = () => {
    setLocalSearchText('');
    setFilters({
      searchText: '',
      category: '',
      priceMin: 0,
      priceMax: 10000,
      stockMin: 0,
      stockMax: 1000,
      dateFrom: '',
      dateTo: ''
    });
  };

  return (
    <div className="filter-panel" role="search" aria-label="Data filters">
      <h2 className="filter-title">Filters</h2>
      
      <div className="filter-group">
        <label htmlFor="search-input">Search</label>
        <input
          id="search-input"
          type="text"
          placeholder="Search products..."
          value={localSearchText}
          onChange={handleSearchChange}
          aria-label="Search products by name or description"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="category-select">Category</label>
        <select
          id="category-select"
          value={filters.category}
          onChange={handleCategoryChange}
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Apparel">Apparel</option>
          <option value="Home Goods">Home Goods</option>
          <option value="Books">Books</option>
          <option value="Food">Food</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Price Range</label>
        <div className="range-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.priceMin}
            onChange={handlePriceMinChange}
            min="0"
            aria-label="Minimum price"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.priceMax}
            onChange={handlePriceMaxChange}
            min="0"
            aria-label="Maximum price"
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Stock Range</label>
        <div className="range-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.stockMin}
            onChange={handleStockMinChange}
            min="0"
            aria-label="Minimum stock"
          />
          <span>to</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.stockMax}
            onChange={handleStockMaxChange}
            min="0"
            aria-label="Maximum stock"
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Date Range</label>
        <div className="date-inputs">
          <input
            type="date"
            value={filters.dateFrom}
            onChange={handleDateFromChange}
            aria-label="Start date"
          />
          <span>to</span>
          <input
            type="date"
            value={filters.dateTo}
            onChange={handleDateToChange}
            aria-label="End date"
          />
        </div>
      </div>

      <button 
        className="reset-button"
        onClick={handleReset}
        aria-label="Reset all filters"
      >
        Reset Filters
      </button>
    </div>
  );
});

FilterPanel.displayName = 'FilterPanel';
