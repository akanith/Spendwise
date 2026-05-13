import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';
import Skeleton from './components/common/Skeleton';

// Lazy load pages
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Budgets = lazy(() => import('./pages/Budgets'));
const TeamSpend = lazy(() => import('./pages/TeamSpend'));
const Reports = lazy(() => import('./pages/Reports'));
const AddExpense = lazy(() => import('./pages/AddExpense'));
const Settings = lazy(() => import('./pages/Settings'));

const PageLoader = () => (
  <div className="section-spacing">
    <Skeleton className="h-12 w-1/4 mb-8" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
      <Skeleton className="h-32" />
    </div>
    <Skeleton className="h-96 w-full mt-8" />
  </div>
);

function App() {
  return (
    <AppLayout>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/team-spend" element={<TeamSpend />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/add-expense" element={<AddExpense />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </AppLayout>
  );
}

export default App;
