import React, { useEffect, useState } from 'react';
import { endpointFor } from '../apiConfig';

const resource = 'users';
const endpoint = endpointFor(resource);

function DetailsModal({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(15, 23, 42, 0.8)' }} onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
        <div className="modal-content bg-dark text-white">
          <div className="modal-header">
            <h5 className="modal-title">User Details</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose} aria-label="Close" />
          </div>
          <div className="modal-body">
            <pre className="code-block">{JSON.stringify(item, null, 2)}</pre>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-custom" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Users() {
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
          <h2 className="h4 mb-1">Users</h2>
          <p className="text-muted-custom mb-0">REST API endpoint: <code>{endpoint}</code></p>
        </div>
        <div>
          <button className="btn btn-custom" onClick={fetchData}>Refresh Users</button>
        </div>
      </div>

      {loading && <div className="alert alert-info">Loading users...</div>}
      {error && <div className="alert alert-danger">Error: {error}</div>}

      {!loading && !error && (
        <div className="table-responsive table-custom rounded">
          <table className="table table-striped mb-0">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Team</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 ? (
                <tr>
                  <td colSpan="4">No users found.</td>
                </tr>
              ) : (
                items.map((user, index) => (
                  <tr key={user.id || user.username || index}>
                    <td>{user.username || 'N/A'}</td>
                    <td>{user.email || 'N/A'}</td>
                    <td>{user.team?.name || user.team || 'N/A'}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-light" onClick={() => setSelectedItem(user)}>
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

      <DetailsModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}

export default Users;
