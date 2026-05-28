import React, { useEffect, useState } from 'react';
import { endpointFor } from '../apiConfig';

const resource = 'leaderboard';
const endpoint = endpointFor(resource);
// Codespace API example: https://your-codespace-8000.app.github.dev/api/leaderboard/

function Leaderboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Fetching endpoint:', endpoint);
      const response = await fetch(endpoint);
      const json = await response.json();
      console.log('Fetched data:', json);
      const payload = Array.isArray(json) ? json : json?.results ?? (json ? [json] : []);
      setItems(payload);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card card-custom p-4 mb-4">
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-3 gap-3">
        <div>
          <h2 className="h4 mb-1">Leaderboard</h2>
          <p className="text-muted-custom mb-0">REST API endpoint: <code>{endpoint}</code></p>
        </div>
        <button className="btn btn-custom" onClick={fetchData}>Refresh Leaderboard</button>
      </div>

      {loading && <div className="alert alert-info">Loading leaderboard...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}

      {!loading && !error && (
        <div className="table-responsive table-custom rounded">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>User</th>
                <th>Points</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="3">No leaderboard entries found.</td>
                </tr>
              ) : (
                items.map((entry, index) => (
                  <tr key={entry.id || entry.user?.username || index}>
                    <td>{entry.user?.username || entry.user || `Entry ${index + 1}`}</td>
                    <td>{entry.points ?? 'N/A'}</td>
                    <td>
                      <a className="btn btn-sm btn-outline-light" href={endpoint} target="_blank" rel="noreferrer">Source</a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
