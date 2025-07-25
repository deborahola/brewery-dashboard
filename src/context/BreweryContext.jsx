import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const BreweryContext = createContext();

export function useBreweries() {
  return useContext(BreweryContext);
}

function shuffle(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export function BreweryProvider({ children }) {
  const [breweries, setBreweries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [zipMax, setZipMax] = useState(100000);
  const [availableTypes, setAvailableTypes] = useState([]);
  const [availableStates, setAvailableStates] = useState([]);

  const fetchBreweries = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.openbrewerydb.org/v1/breweries?per_page=200');
      let data = await response.json();

      data = data.filter((b) => b.country === 'United States');

      let shuffled = shuffle(data);
      const min = 40;
      const max = shuffled.length;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      shuffled = shuffled.slice(0, randomNumber);

      setBreweries(shuffled);

      const types = [...new Set(shuffled.map((b) => b.brewery_type).filter(Boolean))].sort();
      const states = [...new Set(shuffled.map((b) => b.state).filter(Boolean))].sort();
      setAvailableTypes(types);
      setAvailableStates(states);

      const zipCodes = shuffled
        .map((b) => parseInt(b.postal_code?.split('-')[0]))
        .filter((zip) => !isNaN(zip));
      const maxZipRaw = zipCodes.length ? Math.max(...zipCodes) : 99999;
      const roundedMaxZip = Math.ceil(maxZipRaw / 1000) * 1000;
      setZipMax(roundedMaxZip);
    } catch (err) {
      console.error('Failed to fetch breweries:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBreweries();
  }, [fetchBreweries]);

  const value = {
    breweries,
    loading,
    zipMax,
    availableTypes,
    availableStates
  };

  return <BreweryContext.Provider value={value}>{children}</BreweryContext.Provider>;
}
