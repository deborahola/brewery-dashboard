import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useBreweries } from '../context/BreweryContext';

import ChartsPanel from '../components/ChartsPanel';
import FilterTips from '../components/FilterTips';

import '../App.css';

function Dashboard() {
  // global fetched data
  const { breweries, loading, zipMax, availableTypes, availableStates } = useBreweries();

  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [stateFilter, setStateFilter] = useState([]);
  const [zipFilter, setZipFilter] = useState(zipMax);

  const hasActiveFilters =
    search.trim() !== '' ||
    typeFilter !== '' ||
    stateFilter.length > 0 ||
    zipFilter !== zipMax;
  
  function clearFilters() {
    setSearch('');
    setTypeFilter('');
    setStateFilter([]);
    setZipFilter(zipMax);
  }

  useEffect(() => {
    setZipFilter((z) => (z > zipMax ? zipMax : z));
  }, [zipMax]);

  function handleStateCheckbox(e) {
    const value = e.target.value;
    setStateFilter((prev) =>
      prev.includes(value) ? prev.filter((s) => s !== value) : [...prev, value]
    );
  }

  // filtered dataset
  const filteredBreweries = useMemo(() => {
    let results = breweries;

    if (search.trim()) {
      const q = search.toLowerCase();
      results = results.filter((b) => b.name.toLowerCase().includes(q));
    }

    if (typeFilter) {
      results = results.filter((b) => b.brewery_type === typeFilter);
    }

    if (stateFilter.length > 0) {
      results = results.filter((b) => stateFilter.includes(b.state));
    }

    results = results.filter((b) => {
      const zip = parseInt(b.postal_code?.split('-')[0]);
      return !isNaN(zip) && zip <= zipFilter;
    });

    return results;
  }, [breweries, search, typeFilter, stateFilter, zipFilter]);

  // summary stats
  const total = breweries.length;
  const withWebsite = breweries.filter((b) => b.website_url).length;
  const cities = new Set(breweries.map((b) => b.city)).size;
  const avgZip = total
    ? Math.floor(
        breweries.reduce(
          (acc, b) => acc + (parseInt(b.postal_code?.split('-')[0]) || 0),
          0,
        ) / total,
      )
    : 0;

  const modeType = breweries.reduce((acc, b) => {
    acc[b.brewery_type] = (acc[b.brewery_type] || 0) + 1;
    return acc;
  }, {});
  const mostCommonType = Object.entries(modeType).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  return (
    <div className="dashboard-grid">
      {/* Stats */}
      <div className="stats grid-area-stats">
        <div className="stat">Total: {total}</div>
        <div className="stat">With Websites: {(withWebsite / total * 100 || 0).toFixed(1)}%</div>
        <div className="stat">Unique Cities: {cities}</div>
        <div className="stat">Avg ZIP Code: {avgZip}</div>
        <div className="stat">Most Common Type: {mostCommonType.charAt(0).toUpperCase() + mostCommonType.slice(1)}</div>
      </div>

      {/* Charts */}
      {!loading && (
        <div className="grid-area-charts">
          <ChartsPanel data={filteredBreweries} />
        </div>
      )}

      {/* Refresh */}
      <div className="refresh-container grid-area-refresh">
        <button className="refresh-btn" title="Refresh (Get New Data)" onClick={() => window.location.reload()}>
          Refresh &nbsp;🔄
        </button>
      </div>

      {/* Filters */}
      <div className="filters grid-area-filters">
        <FilterTips />
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="">Filter by Type</option>
          {availableTypes.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
        <label className="slider-label">
          Max ZIP Code: {zipFilter}
          <input
            type="range"
            min="10000"
            max={zipMax}
            step="1000"
            value={zipFilter}
            onChange={(e) => setZipFilter(Number(e.target.value))}
          />
        </label>
        <div className="state-filter">
          <span className="state-filter-title">Filter by State:</span>
          {availableStates.map((state) => (
            <label key={state}>
              <input
                type="checkbox"
                value={state}
                checked={stateFilter.includes(state)}
                onChange={handleStateCheckbox}
              />
              {state}
            </label>
          ))}
        </div>
        <div className="filters-clear">
          <button
            type="button"
            title="Clear All Filters"
            className="clear-filters-btn"
            disabled={!hasActiveFilters}
            onClick={clearFilters}
          >
            Clear Filters &nbsp;✖
          </button>
        </div>
      </div>

      {/* Brewery List */}
      <div className="grid-area-list">
        {loading ? (
          <p className="loading">Loading breweries...</p>
        ) : (
          <div className="brewery-list-wrapper grid-area-list">
            {filteredBreweries.length === 0 ? (
              <p className="no-results">No breweries match your current filters.</p>
            ) : (
              <ul className="brewery-list">
                {filteredBreweries.map((b) => (
                  <li key={b.id} className="brewery-card">
                    <h2>
                      <Link to={`/brewery/${b.id}`} className="brewery-card-link">
                        {b.name} 🔗
                      </Link>
                    </h2>
                    <p>
                      <strong>Type:</strong> {b.brewery_type.charAt(0).toUpperCase() + b.brewery_type.slice(1)}
                    </p>
                    <p>
                      <strong>Location:</strong> {b.city}, {b.state} {b.postal_code.split('-')[0]}
                    </p>
                    {b.website_url && (
                      <a href={b.website_url} target="_blank" rel="noreferrer">
                        Visit Website
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
