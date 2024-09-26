// import { useState, useEffect } from 'react';
// import AddExpensesForm from './components/AddExpensesForm';
// import ExpensesList from './components/ExpensesList';
// import { expenses } from './utils/data';
// import ExpensesSummary from './components/ExpensesSummary';

// function App() {
//   const [expensesList, setExpensesList] = useState([]);
//   useEffect(() => {
//     setExpensesList(expenses);
//   }, []);

//   function handleSubmit(data) {
//     const newExpense = { ...data, id: Date.now() };
//     const updatedExpenses = [...expensesList, newExpense];
//     setExpensesList(updatedExpenses);
//   }

//   return (
//     <div className="bg-indigo-900 text-white md:grid md:grid-cols-5 px-5 h-screen gap-6">
//       <AddExpensesForm className=" col-span-2" onSubmit={handleSubmit} />
//       <ExpensesList expenses={expensesList} />
//       <ExpensesSummary className="col-span-2 col-start-4"  expenses={expensesList}/>
//     </div>
//   );
// }

// export default App;

import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
};

export default App;