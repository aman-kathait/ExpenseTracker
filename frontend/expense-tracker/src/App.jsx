import React, { useContext, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';
import Home from './pages/Dashboard/Home';
import UserProvider, { UserContext } from './context/UserContext';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <UserProvider>
    <div className=''>
      <Router>
        <AuthEventBridge />
        <Routes>
          <Route path='/' element={<Root/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/dashboard' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='/income' element={<ProtectedRoute><Income/></ProtectedRoute>}/>
          <Route path='/expense' element={<ProtectedRoute><Expense/></ProtectedRoute>}/>
        </Routes>
      </Router>
    </div>
    <Toaster 
    toastOptions={{
      className: '',
      style: {
        padding: '13px',
      },
    }}
    />
    </UserProvider>
  )
}

export default App

// Listen for global auth events and navigate without full reload
const AuthEventBridge = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handler = () => navigate('/login', { replace: true });
    window.addEventListener('auth:unauthorized', handler);
    return () => window.removeEventListener('auth:unauthorized', handler);
  }, [navigate]);
  return null;
}

// Protected Route wrapper component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

const Root = () => {
  const { user, loading } = useContext(UserContext);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }
  
  // Simple redirect to appropriate page
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};