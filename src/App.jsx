import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Budgets from './pages/Budgets';
import TeamSpend from './pages/TeamSpend';
import Reports from './pages/Reports';
import AddExpense from './pages/AddExpense';
import Settings from './pages/Settings';

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/budgets" element={<Budgets />} />
        <Route path="/team-spend" element={<TeamSpend />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/add-expense" element={<AddExpense />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
