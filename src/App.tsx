import { useEffect } from 'react';
import { DataGrid } from './components/DataGrid/DataGrid';
import { FilterPanel } from './components/Filters/FilterPanel';
import { LoadingSpinner } from './components/LoadingSpinner/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage/ErrorMessage';
import { StatsBar } from './components/Stats/StatsBar';
import { useDataStore } from './store/dataStore';
import './App.css';

function App() {
  const { displayData, isLoading, error, setRawData, setLoading, setError } = useDataStore();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/data/mock_data.json');
      if (!response.ok) {
        throw new Error('Failed to load data');
      }
      const data = await response.json();
      setRawData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>High-Performance Data Grid</h1>
        <p>Virtualized rendering of 25,000+ items with reactive state management</p>
      </header>

      <main className="app-main">
        {isLoading && <LoadingSpinner />}
        
        {error && <ErrorMessage message={error} onRetry={loadData} />}
        
        {!isLoading && !error && (
          <>
            <FilterPanel />
            <StatsBar />
            <DataGrid data={displayData} />
          </>
        )}
      </main>
    </div>
  );
}

export default App;
