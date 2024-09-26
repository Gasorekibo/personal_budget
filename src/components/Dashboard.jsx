import { useState, useEffect } from 'react';
import ExpenseForm from './AddExpensesForm';
import ExpenseList from './ExpensesList';
import ExpensesSummary from './ExpensesSummary';
import BudgetLimitForm from './BudgetLimitForm';
import { AlertCircle, DollarSign, TrendingUp, PieChart } from 'lucide-react';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [budgetLimits, setBudgetLimits] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const storedBudgetLimits =
      JSON.parse(localStorage.getItem('budgetLimits')) || {};
    setExpenses(storedExpenses);
    setBudgetLimits(storedBudgetLimits);
  }, []);

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses));
    updateAlerts();
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem('budgetLimits', JSON.stringify(budgetLimits));
    updateAlerts();
  }, [budgetLimits]);

  const handleAddExpense = (newExpense) => {
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      { ...newExpense, id: Date.now() },
    ]);
  };

  const handleSetBudgetLimit = (newLimit) => {
    setBudgetLimits((prevLimits) => ({
      ...prevLimits,
      [newLimit.category]: parseFloat(newLimit.limit),
    }));
  };

  const updateAlerts = () => {
    const newAlerts = [];
    Object.entries(budgetLimits).forEach(([category, limit]) => {
      const totalExpense = expenses
        .filter((expense) => expense.category === category)
        .reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

      const percentage = (totalExpense / limit) * 100;

      if (percentage >= 80) {
        newAlerts.push({
          category,
          message: `You've spent ${percentage.toFixed(
            2
          )}% of your ${category} budget.`,
          severity: percentage >= 100 ? 'high' : 'medium',
        });
      }
    });
    setAlerts(newAlerts);
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + parseFloat(expense.amount),
    0
  );
  const totalBudget = Object.values(budgetLimits).reduce(
    (sum, limit) => sum + limit,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8 bg-hero-pattern bg-cover bg-no-repeat bg-center">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        Personal Budget <span className='text-blue-500'>Dashboard</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Total Expenses</h3>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Total Budget</h3>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-2xl font-bold">${totalBudget.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Budget Utilization</h3>
            <PieChart className="h-4 w-4 text-gray-400" />
          </div>
          <p className="text-2xl font-bold">
            {totalBudget > 0
              ? ((totalExpenses / totalBudget) * 100).toFixed(2)
              : 0}
            %
          </p>
        </div>
      </div>

      {alerts.map((alert, index) => (
        <div
          key={index}
          className={`p-4 mb-4 rounded-lg ${
            alert.severity === 'high'
              ? 'bg-red-100 text-red-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}
        >
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <h3 className="font-semibold">Budget Alert for {alert.category}</h3>
          </div>
          <p>{alert.message}</p>
        </div>
      ))}

      <div className="flex mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === 'overview' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded ${
            activeTab === 'addExpense'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('addExpense')}
        >
          Add Expense
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 'setBudget' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setActiveTab('setBudget')}
        >
          Set Budget
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {activeTab === 'overview' && (
          <>
            <ExpenseList expenses={expenses} budgetLimits={budgetLimits} />
            <ExpensesSummary expenses={expenses} budgetLimits={budgetLimits} />
          </>
        )}
        {activeTab === 'addExpense' && (
          <ExpenseForm onSubmit={handleAddExpense} />
        )}
        {activeTab === 'setBudget' && (
          <BudgetLimitForm onSubmit={handleSetBudgetLimit} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
