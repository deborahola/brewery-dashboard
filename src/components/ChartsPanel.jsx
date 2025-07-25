import { useState, useMemo } from "react";

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, 
  ScatterChart, Scatter, Cell, Treemap, Tooltip as TreemapTooltip
} from 'recharts';

import ChartCard from './ChartCard';

const COLORS = ['#1e90ff', '#ff7f50', '#2ecc71', '#9b59b6', '#f1c40f', '#e74c3c'];

function ChartsPanel({ data }) {
  // Chart A: count by type
  const [typeSortMode, setTypeSortMode] = useState("count");

  const typeData = useMemo(() => {
    const counts = data.reduce((acc, b) => {
      const t = b.brewery_type || "unknown";
      acc[t] = (acc[t] || 0) + 1;
      return acc;
    }, {});
    let arr = Object.entries(counts).map(([type, count]) => ({ type, count }));
    if (typeSortMode === "count") {
      arr.sort((a, b) => b.count - a.count);
    } else {
      arr.sort((a, b) => a.type.localeCompare(b.type));
    }
    return arr;
  }, [data, typeSortMode]);

  function toggleTypeSort() {
    setTypeSortMode((m) => (m === "count" ? "alpha" : "count"));
  }

  // Chart B: website vs none
  const withSite = data.filter((b) => b.website_url).length;
  const withoutSite = data.length - withSite;
  const websiteData = [
    { name: 'Has Website', value: withSite },
    { name: 'No Website', value: withoutSite },
  ];

  // Chart C: top N states
  const [topN, setTopN] = useState(5);

  const treemapData = useMemo(() => {
    const states = data.reduce((acc, b) => {
      const s = b.state || "Unknown";
      acc[s] = (acc[s] || 0) + 1;
      return acc;
    }, {});
    const sorted = Object.entries(states)
      .map(([name, size]) => ({ name, size }))
      .sort((a, b) => b.size - a.size);

    return sorted.slice(0, topN);
  }, [data, topN]);

  function handleTopNChange(e) {
    const v = Number(e.target.value);
    if (!Number.isNaN(v) && v > 0) setTopN(v);
  }

  // Chart D: scatter (lat/long)
  const geoData = data
  .filter(b => b.longitude != null && b.latitude != null)
  .map(b => ({
    x: Number(b.longitude),
    y: Number(b.latitude),
    name: b.name,
    type: b.brewery_type,
    city: b.city,
    state: b.state
  }));

  return (
    <div className="charts-panel">
      <ChartCard
        title="Breweries by Type"
        description="See the distribution of brewery types."
        actions={
          <button
            type="button"
            className="chart-toggle-btn"
            onClick={toggleTypeSort}
            title={typeSortMode === "count" ? "Sort A → Z" : "Sort by Count"}
          >
            {typeSortMode === "count" ? "Sort A  →  Z" : "Sort by Count"}
          </button>
        }
      >
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={typeData}>
            <XAxis dataKey="type" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill={COLORS[3]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Website Availability"
        description="How many breweries list a website? A quick data completeness check."
      >
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={websiteData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label
            >
              {websiteData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title={`Top N = ${topN} States`}
        description="Most represented states. Adjust N to show more."
        actions={
          <label
            style={{
              textAlign: "center",
              paddingRight: "4px",
              fontFamily: "'Outfit', sans-serif",
              fontSize: "0.85rem"
            }}
          >
            N: &nbsp;
            <input
              type="number"
              min={1}
              max={50}
              value={topN}
              onChange={handleTopNChange}
              style={{
                width: "6ch",
                paddingLeft: "3px",
                fontFamily: "'Outfit', sans-serif",
                textAlign: "center",
                fontSize: "0.85rem"
              }}
            />
          </label>
        }
      >
        <ResponsiveContainer width="100%" height={240}>
          <Treemap
            data={treemapData}
            dataKey="size"
            nameKey="name"
            stroke="#fff"
            fill={COLORS[2]}
            aspectRatio={4 / 3}
          >
            <TreemapTooltip />
          </Treemap>
        </ResponsiveContainer>
      </ChartCard>

      <ChartCard
        title="Geographic Spread"
        description="Scatter of brewery latitude/longitude (shows clustering)."
      >
        <ResponsiveContainer width="100%" height={240}>
          <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 0 }}>
            <XAxis type="number" dataKey="x" name="Longitude" domain={["auto", "auto"]} />
            <YAxis type="number" dataKey="y" name="Latitude" domain={["auto", "auto"]} />
            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload?.length) {
                  const d = payload[0].payload;
                  return (
                    <div style={{
                      background: '#fff',
                      border: '1px solid #ccc',
                      borderRadius: '8px',
                      padding: '0.75rem',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                      fontSize: '0.85rem',
                      lineHeight: '1.4',
                    }}>
                      <strong>{d.name}</strong>
                      <p>📍 {d.city}, {d.state}</p>
                      <ul>
                        <li>🌐 Longitude: {d.x.toFixed(2)}</li>
                        <li>🌐 Latitude: {d.y.toFixed(2)}</li>
                      </ul>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter data={geoData} fill={COLORS[4]} />
          </ScatterChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
}

export default ChartsPanel;
