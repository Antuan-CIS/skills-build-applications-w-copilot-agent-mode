import React, { useEffect, useState } from 'react';
import { endpointFor } from '../apiConfig';

const resource = 'activities';
const endpoint = endpointFor(resource);
// Codespace API example: https://your-codespace-8000.app.github.dev/api/activities/

function Activities() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

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
          <h2 className="h4 mb-1">Activities</h2>
          <p className="text-muted-custom mb-0">REST API endpoint: <code>{endpoint}</code></p>
        </div>
        <button className="btn btn-custom" onClick={fetchData}>Refresh Activities</button>
      </div>

      {loading && <div className="alert alert-info">Loading activities...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}

      {!loading && !error && (
        <div className="table-responsive table-custom rounded">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>User</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="5">No activities found.</td>
                </tr>
              ) : (
                items.map((activity, index) => (
                  <tr key={activity.id || index}>
                    <td>{activity.type || 'Unknown'}</td>
                    <td>{activity.duration ?? 'N/A'}</td>
                    <td>{activity.distance ?? 'N/A'}</td>
                    <td>{activity.user?.username || activity.user || 'N/A'}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-light" onClick={() => setSelectedItem(activity)}>
                        View JSON
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {selectedItem && (
        <div className="modal show d-block" role="dialog" style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }} onClick={(event) => event.target === event.currentTarget && setSelectedItem(null)}>
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content bg-dark text-white">
              <div className="modal-header">
                <h5 className="modal-title">Activity Details</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setSelectedItem(null)} aria-label="Close" />
              </div>
              <div className="modal-body">
                <pre className="code-block">{JSON.stringify(selectedItem, null, 2)}</pre>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-custom" onClick={() => setSelectedItem(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Activities;
