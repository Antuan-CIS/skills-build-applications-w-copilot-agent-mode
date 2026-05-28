import React, { useEffect, useState } from 'react';
import { endpointFor } from '../apiConfig';

const resource = 'workouts';
const endpoint = endpointFor(resource);

function Workouts() {
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
          <h2 className="h4 mb-1">Workouts</h2>
          <p className="text-muted-custom mb-0">REST API endpoint: <code>{endpoint}</code></p>
        </div>
        <button className="btn btn-custom" onClick={fetchData}>Refresh Workouts</button>
      </div>

      {loading && <div className="alert alert-info">Loading workouts...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}

      {!loading && !error && (
        <div className="table-responsive table-custom rounded">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="3">No workouts found.</td>
                </tr>
              ) : (
                items.map((workout, index) => (
                  <tr key={workout.id || workout.name || index}>
                    <td>{workout.name || `Workout ${index + 1}`}</td>
                    <td>{workout.description || 'No description available.'}</td>
                    <td>
                      <a className="btn btn-sm btn-outline-light" href={endpoint} target="_blank" rel="noreferrer">API source</a>
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

export default Workouts;
