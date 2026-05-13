import * as mockData from '../data/mockData';

// Simulated latency (ms)
const LATENCY = 900;

// FY 2024-25 monthly spend trend (already defined in mockData)
const monthlySpendTrend = mockData.monthlySpendTrend;

// Reusable mock fetch with simulated latency
const mockFetch = (data, shouldFail = false) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error('Network Error: Failed to fetch data from server.'));
      } else {
        resolve({ data });
      }
    }, LATENCY + Math.random() * 500);
  });
};

export const api = {
  // Dashboard
  getDashboardStats:     () => mockFetch(mockData.dashboardStats),
  getMonthlySpend:       () => mockFetch(monthlySpendTrend),
  getSpendingCategories: () => mockFetch(mockData.spendingCategories),

  // Transactions
  getRecentTransactions: () => mockFetch(mockData.recentTransactions),
  getTeamExpenses: (filters = {}) => {
    let data = [...mockData.recentTransactions];
    if (filters.dept && filters.dept !== 'All Departments') {
      data = data.filter((tx) => tx.employee.dept === filters.dept);
    }
    return mockFetch(data);
  },

  // Budgets
  getBudgetBreakdown: () => mockFetch(mockData.budgetBreakdown),

  // Profile — Indian context
  getUserProfile: () =>
    mockFetch({
      name:     'Rajesh Kumar',
      role:     'Finance Operations Manager',
      company:  'Infosys Ltd.',
      location: 'Bengaluru, KA',
      joined:   'Apr 2022',
      pan:      'ABCDE1234F',
      gstin:    '29ABCDE1234F1Z5',
      avatar:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    }),

  // Form Submission
  submitExpense: () =>
    mockFetch({ success: true, id: Math.random().toString(36).substr(2, 9) }),
};
