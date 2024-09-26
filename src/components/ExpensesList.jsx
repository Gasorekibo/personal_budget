/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

const ExpenseList = ({ expenses, budgetLimits, className }) => {
  const [search, setSearch] = useState('');
  const [filteredExpenses, setFilteredExpenses] = useState(expenses);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filtered = !search
      ? expenses
      : expenses.filter(
          (expense) =>
            expense.name.toLowerCase().includes(search.toLowerCase()) ||
            expense.category.toLowerCase().includes(search.toLowerCase()) ||
            expense.date.toLowerCase().includes(search.toLowerCase())
        );
    setFilteredExpenses(filtered);
  }, [expenses, search]);

  const calculateCategoryTotal = (category) => {
    return expenses
      .filter((expense) => expense.category === category)
      .reduce((total, expense) => total + parseFloat(expense.amount), 0);
  };

  const getBudgetAlertClass = (category) => {
    const total = calculateCategoryTotal(category);
    const limit = budgetLimits[category];
    if (!limit) return '';
    const percentage = (total / limit) * 100;
    if (percentage >= 100) return 'bg-red-200';
    if (percentage >= 80) return 'bg-yellow-200';
    return '';
  };

  return (
    <div
      className={`${className} max-w-lg min-w-full mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 
                 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl text-black 
                 max-h-[90vh] overflow-hidden relative`}
    >
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
        Expenses List
      </h2>

      <input
        type="text"
        name="name"
        value={search}
        onChange={handleChange}
        required
        placeholder="Filter ..."
        className="w-full px-4 py-2 my-4 border border-gray-300 rounded-lg focus:outline-none 
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />

      <ul className="space-y-4">
        {filteredExpenses?.map((expense) => (
          <li
            key={expense.id}
            className={`flex justify-between items-center p-4 hover:bg-gray-200 
                       shadow-md rounded-lg transition-all duration-300 ${getBudgetAlertClass(
                         expense.category
                       )}`}
          >
            <div>
              <h3 className="text-lg font-bold text-gray-700">
                {expense.name}
              </h3>
              <p className="text-sm text-gray-500">{expense.category}</p>
              <p className="text-xs text-gray-400">
                {new Date(expense.date).toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold text-indigo-600">
                ${expense.amount}
              </p>
              {budgetLimits[expense.category] && (
                <p className="text-xs text-gray-500">
                  Limit: ${budgetLimits[expense.category]}
                </p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
