import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Providers and Components
import { AuthProvider } from './context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import './index.css';

// Lazy load Pages
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const Habits = React.lazy(() => import('./pages/Habits'));
const Tasks = React.lazy(() => import('./pages/Tasks'));
const CalendarPage = React.lazy(() => import('./pages/Calendar')); // Fix 1.2: Rename to CalendarPage
const AICoach = React.lazy(() => import('./pages/AICoach'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const Login = React.lazy(() => import('./pages/Login'));

// Loading Fallback
const PageLoader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--text-secondary)' }}>
    Loading...
  </div>
);

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="app-container">
            <Sidebar />
            <main className="main-content">
              <Topbar />
              <div className="content-area">
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/login" element={<Login />} />
                    
                    {/* Protected Routes */}
                    <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                    <Route path="/habits" element={<PrivateRoute><Habits /></PrivateRoute>} />
                    <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
                    <Route path="/calendar" element={<PrivateRoute><CalendarPage /></PrivateRoute>} />
                    <Route path="/ai-coach" element={<PrivateRoute><AICoach /></PrivateRoute>} />
                    <Route path="/analytics" element={<PrivateRoute><Analytics /></PrivateRoute>} />
                    
                    {/* Fallback Route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Suspense>
              </div>
            </main>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
