export interface DataItem {
  id: string;
  productName: string;
  category: 'Electronics' | 'Apparel' | 'Home Goods' | 'Books' | 'Food';
  price: number;
  stock: number;
  lastUpdate: string;
  description: string;
}

export interface FilterCriteria {
  searchText: string;
  category: string;
  priceMin: number;
  priceMax: number;
  stockMin: number;
  stockMax: number;
  dateFrom: string;
  dateTo: string;
}

export type SortField = 'productName' | 'category' | 'price' | 'stock' | 'lastUpdate';
export type SortOrder = 'asc' | 'desc' | null;

export interface SortCriteria {
  field: SortField | null;
  order: SortOrder;
}
