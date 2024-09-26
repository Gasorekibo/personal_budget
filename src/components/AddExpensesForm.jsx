/* eslint-disable react/prop-types */
import { useState } from 'react';

const ExpenseForm = ({ onSubmit, className }) => {
  const [expense, setExpense] = useState({
    name: '',
    amount: '',
    category: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(expense);
    setExpense({ name: '', amount: '', category: '', date: '' });
  };

  return (
    <form
      className={`${className} max-w-lg min-w-full mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 
                 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl text-black 
                 max-h-[90vh] overflow-hidden relative`}
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Add New Expense
      </h2>

      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Expense Name
        </label>
        <input
          type="text"
          name="name"
          value={expense.name}
          onChange={handleChange}
          required
          placeholder="Enter expense name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none 
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block text-gray-700 font-bold mb-2">
          Amount
        </label>
        <input
          type="number"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
          required
          placeholder="Enter amount"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none 
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="category"
          className="block text-gray-700 font-bold mb-2"
        >
          Category
        </label>
        <select
          name="category"
          value={expense.category}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none 
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="" className='hidden'>Select Category</option>
          <option value="food">Food</option>
          <option value="transportation">Transportation</option>
          <option value="utilities">Utilities</option>
          <option value="entertainment">Entertainment</option>
          <option value="others">Others</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="date" className="block text-gray-700 font-bold mb-2">
          Date
        </label>
        <input
          type="date"
          name="date"
          value={expense.date}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none 
                     focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white font-bold py-2 rounded-lg 
                   shadow-lg hover:bg-indigo-700 transition-all duration-300 absolute bottom-0 left-0"
      >
        Add Expense
      </button>
    </form>
  );
};

export default ExpenseForm;
