import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useBreweries } from '../context/BreweryContext';

function BreweryDetail() {
  const { id } = useParams();
  const { breweries } = useBreweries();
  const [brewery, setBrewery] = useState(null);
  const [loading, setLoading] = useState(true);

  // try to find in context first
  useEffect(() => {
    const existing = breweries.find((b) => b.id === id);
    if (existing) {
      setBrewery(existing);
      setLoading(false);
      return;
    }

    // fallback fetch single
    async function fetchSingle() {
      setLoading(true);
      try {
        const resp = await fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`);
        if (resp.ok) {
          const data = await resp.json();
          setBrewery(data);
        } else {
          setBrewery(null);
        }
      } catch (err) {
        console.error('Failed to fetch brewery detail:', err);
        setBrewery(null);
      } finally {
        setLoading(false);
      }
    }
    fetchSingle();
  }, [id, breweries]);

  if (loading) {
    return <p className="loading">Loading brewery...</p>;
  }

  if (!brewery) {
    return (
      <div>
        <p>Sorry, brewery not found.</p>
        <Link to="/">← Back to Dashboard</Link>
      </div>
    );
  }

  const {
    name,
    brewery_type,
    address_1, // basically the street
    address_2,
    address_3,
    city,
    state_province,
    state,
    street,
    postal_code,
    country,
    phone,
    website_url,
    latitude,
    longitude,
  } = brewery;

  const displayState = state || state_province || '';
  const fullAddress = [address_1, address_2, address_3, city, displayState, postal_code.split('-')[0], country]
    .filter(Boolean)
    .join(', ');

  let mapsHref = '';
  // if (latitude && longitude) {
  //   mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  //     `${latitude},${longitude}`,
  //   )}`;
  // } else {
    mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
  // }

  // alt.
  // const addr = `${street || address_1 || ''} ${city || ''} ${state || ''} ${postal_code || ''}`.trim();
  // const mapUrl = (latitude && longitude)
  //   ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
  //   : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addr)}`;


  return (
    <div className="brewery-detail">
      <h2>🍺 {name}</h2>
      <p>
        <strong>Type:</strong> {brewery_type.charAt(0).toUpperCase() + brewery_type.slice(1)}
      </p>
      <p>
        <strong>Address:</strong> {fullAddress}
      </p>
      {phone && (
        <p>
          <strong>Phone:</strong> <a href={`tel:${phone}`}>{phone}</a>
        </p>
      )}
      {website_url && (
        <p>
          <strong>Website:</strong>{' '}
          <a href={website_url} target="_blank" rel="noreferrer">
            {website_url}
          </a>
        </p>
      )}
      <p>
        <strong>Google Maps:</strong>{' '}
        <a href={mapsHref} target="_blank" rel="noreferrer">
          View Location 📍
        </a>
        {/* <a href={mapUrl} target="_blank" rel="noreferrer">
          View Location 📍
        </a> */}
      </p>

      <hr />

      <Link to=".." title="Back to Main Dashboard Page">← Back to Dashboard</Link>
    </div>
  );
}

export default BreweryDetail;
