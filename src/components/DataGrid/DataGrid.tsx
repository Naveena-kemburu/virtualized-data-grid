import React, { useCallback } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { DataItem, SortField } from '../../types';
import { useDataStore } from '../../store/dataStore';
import './DataGrid.css';

interface DataGridProps {
  data: DataItem[];
}

const COLUMN_WIDTHS = {
  productName: 250,
  category: 150,
  price: 120,
  stock: 100,
  lastUpdate: 180,
  description: 300
};

export const DataGrid: React.FC<DataGridProps> = React.memo(({ data }) => {
  const { sort, setSort } = useDataStore();
  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: data.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 10
  });

  const handleSort = useCallback((field: SortField) => {
    let newOrder: 'asc' | 'desc' | null = 'asc';
    
    if (sort.field === field) {
      if (sort.order === 'asc') newOrder = 'desc';
      else if (sort.order === 'desc') newOrder = null;
    }
    
    setSort({ field: newOrder ? field : null, order: newOrder });
  }, [sort, setSort]);

  const getSortIcon = useCallback((field: SortField) => {
    if (sort.field !== field) return '⇅';
    if (sort.order === 'asc') return '↑';
    if (sort.order === 'desc') return '↓';
    return '⇅';
  }, [sort]);

  const formatDate = useCallback((dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }, []);

  const formatPrice = useCallback((price: number) => {
    return `$${price.toFixed(2)}`;
  }, []);

  const virtualItems = rowVirtualizer.getVirtualItems();
  const totalHeight = rowVirtualizer.getTotalSize();

  return (
    <div className="data-grid-container" ref={parentRef}>
      <div className="data-grid-wrapper" style={{ height: `${totalHeight}px` }}>
        <table className="data-grid" role="grid" aria-label="Product data grid">
          <thead className="data-grid-header">
            <tr role="row">
              <th 
                role="columnheader"
                style={{ width: COLUMN_WIDTHS.productName }}
                onClick={() => handleSort('productName')}
                className="sortable"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSort('productName')}
                aria-sort={sort.field === 'productName' ? (sort.order === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Product Name {getSortIcon('productName')}
              </th>
              <th 
                role="columnheader"
                style={{ width: COLUMN_WIDTHS.category }}
                onClick={() => handleSort('category')}
                className="sortable"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSort('category')}
                aria-sort={sort.field === 'category' ? (sort.order === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Category {getSortIcon('category')}
              </th>
              <th 
                role="columnheader"
                style={{ width: COLUMN_WIDTHS.price }}
                onClick={() => handleSort('price')}
                className="sortable"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSort('price')}
                aria-sort={sort.field === 'price' ? (sort.order === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Price {getSortIcon('price')}
              </th>
              <th 
                role="columnheader"
                style={{ width: COLUMN_WIDTHS.stock }}
                onClick={() => handleSort('stock')}
                className="sortable"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSort('stock')}
                aria-sort={sort.field === 'stock' ? (sort.order === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Stock {getSortIcon('stock')}
              </th>
              <th 
                role="columnheader"
                style={{ width: COLUMN_WIDTHS.lastUpdate }}
                onClick={() => handleSort('lastUpdate')}
                className="sortable"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleSort('lastUpdate')}
                aria-sort={sort.field === 'lastUpdate' ? (sort.order === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Last Update {getSortIcon('lastUpdate')}
              </th>
              <th 
                role="columnheader"
                style={{ width: COLUMN_WIDTHS.description }}
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody>
            {virtualItems.map((virtualRow) => {
              const item = data[virtualRow.index];
              return (
                <tr
                  key={item.id}
                  role="row"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`
                  }}
                >
                  <td role="gridcell" style={{ width: COLUMN_WIDTHS.productName }}>{item.productName}</td>
                  <td role="gridcell" style={{ width: COLUMN_WIDTHS.category }}>{item.category}</td>
                  <td role="gridcell" style={{ width: COLUMN_WIDTHS.price }}>{formatPrice(item.price)}</td>
                  <td role="gridcell" style={{ width: COLUMN_WIDTHS.stock }}>{item.stock}</td>
                  <td role="gridcell" style={{ width: COLUMN_WIDTHS.lastUpdate }}>{formatDate(item.lastUpdate)}</td>
                  <td role="gridcell" style={{ width: COLUMN_WIDTHS.description }} className="description-cell">{item.description}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
});

DataGrid.displayName = 'DataGrid';
