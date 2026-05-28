import logo from './octofitapp-small.svg';
import './App.css';
import { NavLink, Routes, Route } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App app-shell container-fluid">
      <div className="app-header mb-4">
        <div className="row align-items-center gy-3">
          <div className="col-md-4 d-flex align-items-center gap-3">
            <img src={logo} className="app-logo" alt="OctoFit Tracker" />
            <div>
              <h1 className="app-title mb-1">OctoFit Tracker</h1>
              <p className="text-muted-custom mb-0">Stylish React dashboard for the Django REST backend.</p>
            </div>
          </div>
          <div className="col-md-8">
            <nav className="navbar navbar-expand-md navbar-custom rounded px-3 py-2">
              <div className="container-fluid p-0">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#appNavbar" aria-controls="appNavbar" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="appNavbar">
                  <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                    {['/', '/users', '/teams', '/activities', '/workouts', '/leaderboard'].map((path, idx) => {
                      const label = path === '/' ? 'Home' : path.replace('/', '').replace(/\b\w/g, c => c.toUpperCase());
                      return (
                        <li className="nav-item" key={idx}>
                          <NavLink className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'} to={path}>
                            {label}
                          </NavLink>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>

      <main>
        <Routes>
          <Route path="/" element={
            <div className="card card-custom p-4 mb-4">
              <h2 className="h4 text-white">Welcome to OctoFit Tracker</h2>
              <p className="text-muted-custom mb-3">Use the navigation menu to inspect the backend REST API data for users, teams, activities, workouts, and leaderboard entries.</p>
              <p className="mb-0">Each page loads and renders data from the Django backend in a styled Bootstrap table.</p>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
