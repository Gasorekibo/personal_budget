/* eslint-disable react/prop-types */
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensesSummary = ({ expenses, className }) => {
  const categoryTotals = expenses.reduce((totals, expense) => {
    const { category, amount } = expense;
    if (totals[category]) {
      totals[category] += parseFloat(amount);
    } else {
      totals[category] = parseFloat(amount);
    }
    return totals;
  }, {});

  const categories = Object.keys(categoryTotals);
  const amounts = Object.values(categoryTotals);

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Expenses by Category',
        data: amounts,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div
      className={`${className} max-w-lg min-w-full mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 
                 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl text-black 
                 max-h-[90vh] overflow-hidden relative`}
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
        Expense Summary
      </h2>
      <div className="w-2/5 h-1/2 mx-auto">
        <Pie data={data} />
      </div>
    </div>
  );
};

export default ExpensesSummary;
