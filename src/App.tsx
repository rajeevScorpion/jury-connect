import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import AuthWrapper from './components/AuthWrapper';
import AdminDashboard from './components/AdminDashboard';
import CoordinatorDashboard from './components/CoordinatorDashboard';
import JuryDashboard from './components/JuryDashboard';
import StudentDashboard from './components/StudentDashboard';

function App() {
  return (
    <AuthWrapper>
      <AppContent />
    </AuthWrapper>
  );
}

function AppContent() {
  const { profile, signOut } = useAuth();

  if (!profile) return null;

  const handleLogout = async () => {
    await signOut();
  };

  switch (profile.role) {
    case 'admin':
      return <AdminDashboard user={profile} onLogout={handleLogout} />;
    case 'coordinator':
      return <CoordinatorDashboard user={profile} onLogout={handleLogout} />;
    case 'jury':
      return <JuryDashboard user={profile} onLogout={handleLogout} />;
    case 'student':
      return <StudentDashboard user={profile} onLogout={handleLogout} />;
    default:
      return <div>Invalid user role</div>;
  }
}

export default App;