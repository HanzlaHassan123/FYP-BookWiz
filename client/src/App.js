import React, { lazy } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))
const Forms = lazy(() => import('./pages/Forms'))
const Cards = lazy(() => import('./pages/Cards'))


function App() {
  return (
    <Router>
      <AccessibleNavigationAnnouncer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
    
        <Route path="/app/*" element={<Layout />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;