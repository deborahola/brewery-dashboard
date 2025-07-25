import { useBreweries } from '../context/BreweryContext';

function About() {
  const { breweries } = useBreweries();

  // quick stats for narrative
  const total = breweries.length;
  const withWebsite = breweries.filter((b) => b.website_url).length;
  const websitePct = total ? ((withWebsite / total) * 100).toFixed(1) : '0.0';

  return (
    <div className="about-page">
      <h2>About This Project</h2>
      <p>
        <strong>Brewery Dashboard</strong> pulls live data and gives you interactive 
        tools to explore the craft brewing landscape across the United States.
      </p>

      <h3>Notes</h3>
      <ul>
        <li>Not every brewery lists a website... in this current sample, about {websitePct}% do.</li>
        <li>ZIP slider lets you roughly "bucket" by region. Slide lower to focus on East Coast early ZIP ranges.</li>
      </ul>

      <h3>Filter Tips</h3>
      <ul>
        <li>Try combining different filters such as <strong>Type</strong> + <strong>State</strong> (e.g., find 'brewpubs' in 'Kentucky' and 'New York')!</li>
        <li>Use the <strong>Search</strong> box to quickly jump to a brewery by name.</li>
        <li>Drag the <strong>ZIP</strong> slider all the way to the right if you don't want to hide high-ZIP states like California or Washington.</li>
      </ul>

      <h3>Data Source</h3>
      <p>
        Data comes from: <a href="https://www.openbrewerydb.org" target="_blank" rel="noreferrer">Open Brewery DB</a>
      </p>
    </div>
  );
}

export default About;
