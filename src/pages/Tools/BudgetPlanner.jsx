import { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  DollarSign, 
  PlusCircle, 
  MinusCircle, 
  Calculator, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle,
  CheckCircle,
  Edit2,
  Trash2,
  PieChart,
  BarChart3,
  Target,
  Wallet,
  Home,
  Car,
  Utensils,
  ShoppingCart,
  Gamepad2,
  Heart,
  Book,
  Zap
} from "lucide-react";

// Dummy backend data
const EXPENSE_CATEGORIES = [
  { id: 1, name: "Housing", icon: Home, color: "text-blue-600", bgColor: "bg-blue-100" },
  { id: 2, name: "Transportation", icon: Car, color: "text-green-600", bgColor: "bg-green-100" },
  { id: 3, name: "Food", icon: Utensils, color: "text-orange-600", bgColor: "bg-orange-100" },
  { id: 4, name: "Shopping", icon: ShoppingCart, color: "text-purple-600", bgColor: "bg-purple-100" },
  { id: 5, name: "Entertainment", icon: Gamepad2, color: "text-pink-600", bgColor: "bg-pink-100" },
  { id: 6, name: "Healthcare", icon: Heart, color: "text-red-600", bgColor: "bg-red-100" },
  { id: 7, name: "Education", icon: Book, color: "text-indigo-600", bgColor: "bg-indigo-100" },
  { id: 8, name: "Utilities", icon: Zap, color: "text-yellow-600", bgColor: "bg-yellow-100" },
];

const INCOME_SOURCES = [
  { id: 1, name: "Salary", amount: 0 },
  { id: 2, name: "Freelance", amount: 0 },
  { id: 3, name: "Investments", amount: 0 },
  { id: 4, name: "Other", amount: 0 },
];

export default function BudgetPlanner() {
  const [darkMode, setDarkMode] = useState(false);
  const [incomes, setIncomes] = useState(INCOME_SOURCES);
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ name: "", amount: "", categoryId: 1 });
  const [editingIncome, setEditingIncome] = useState(null);
  const [editingExpense, setEditingExpense] = useState(null);
  const [budgetGoal, setBudgetGoal] = useState(5000000);
  const [view, setView] = useState('overview');

  const totalIncome = incomes.reduce((sum, income) => sum + Number(income.amount || 0), 0);
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);
  const balance = totalIncome - totalExpenses;
  const budgetUtilization = totalExpenses / budgetGoal * 100;

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const addExpense = () => {
    if (newExpense.name && newExpense.amount) {
      const category = EXPENSE_CATEGORIES.find(cat => cat.id === Number(newExpense.categoryId));
      setExpenses([...expenses, {
        id: Date.now(),
        ...newExpense,
        amount: Number(newExpense.amount),
        category: category,
        date: new Date().toISOString().split('T')[0]
      }]);
      setNewExpense({ name: "", amount: "", categoryId: 1 });
    }
  };

  const updateIncome = (id, amount) => {
    setIncomes(incomes.map(income => 
      income.id === id ? { ...income, amount: Number(amount) } : income
    ));
    setEditingIncome(null);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const getStatusInfo = () => {
    if (balance > 0) {
      return {
        icon: CheckCircle,
        text: "On Track",
        color: "text-green-600",
        bgColor: "bg-green-100",
        description: "You're saving money this month!"
      };
    } else if (balance < 0) {
      return {
        icon: AlertTriangle,
        text: "Over Budget",
        color: "text-red-600",
        bgColor: "bg-red-100",
        description: "You're spending more than you earn"
      };
    } else {
      return {
        icon: Target,
        text: "Break Even",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        description: "Income equals expenses"
      };
    }
  };

  const statusInfo = getStatusInfo();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const expensesByCategory = EXPENSE_CATEGORIES.map(category => {
    const categoryExpenses = expenses.filter(exp => exp.category.id === category.id);
    const total = categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    return { ...category, total, expenses: categoryExpenses };
  }).filter(cat => cat.total > 0);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <MainLayout>
        <div className="min-h-screen transition-colors duration-200">
          <div className="py-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <Link
                  to="/tools"
                  className="inline-flex items-center p-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                    <Wallet className="w-8 h-8 mr-3 text-blue-600" />
                    Budget Planner
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">Take control of your finances</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                {/* Dark mode toggle removed as requested */}
                
                <div className="flex bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 p-1">
                  {['overview', 'detailed', 'analytics'].map((viewType) => (
                    <button
                      key={viewType}
                      onClick={() => setView(viewType)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        view === viewType 
                          ? 'bg-blue-600 text-white' 
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Total Income */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Income</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
                  </div>
                  <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>

              {/* Total Expenses */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Expenses</p>
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
                  </div>
                  <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </div>

              {/* Balance */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Balance</p>
                    <p className={`text-2xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(balance)}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${balance >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                    <Calculator className={`w-6 h-6 ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</p>
                    <p className={`text-lg font-bold ${statusInfo.color}`}>{statusInfo.text}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{statusInfo.description}</p>
                  </div>
                  <div className={`p-3 rounded-full ${statusInfo.bgColor} dark:bg-opacity-20`}>
                    <statusInfo.icon className={`w-6 h-6 ${statusInfo.color}`} />
                  </div>
                </div>
              </div>
            </div>

            {view === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Income Sources */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <DollarSign className="w-6 h-6 mr-2 text-green-600" />
                    Income Sources
                  </h2>
                  <div className="space-y-4">
                    {incomes.map((income) => (
                      <div key={income.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                        <span className="font-medium text-gray-900 dark:text-white">{income.name}</span>
                        <div className="flex items-center space-x-2">
                          {editingIncome === income.id ? (
                            <input
                              type="number"
                              defaultValue={income.amount}
                              onBlur={(e) => updateIncome(income.id, e.target.value)}
                              onKeyPress={(e) => e.key === 'Enter' && updateIncome(income.id, e.target.value)}
                              className="w-32 px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm"
                              autoFocus
                            />
                          ) : (
                            <>
                              <span className="font-bold text-green-600">{formatCurrency(income.amount)}</span>
                              <button
                                onClick={() => setEditingIncome(income.id)}
                                className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                              >
                                <Edit2 className="w-4 h-4 text-gray-500" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Expense */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <PlusCircle className="w-6 h-6 mr-2 text-blue-600" />
                    Add Expense
                  </h2>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Expense name"
                      value={newExpense.name}
                      onChange={(e) => setNewExpense({...newExpense, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    
                    <input
                      type="number"
                      placeholder="Amount"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    
                    <select
                      value={newExpense.categoryId}
                      onChange={(e) => setNewExpense({...newExpense, categoryId: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {EXPENSE_CATEGORIES.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                    
                    <button
                      onClick={addExpense}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center"
                    >
                      <PlusCircle className="w-5 h-5 mr-2" />
                      Add Expense
                    </button>
                  </div>
                </div>
              </div>
            )}

            {view === 'detailed' && (
              <div className="space-y-8">
                {/* Recent Expenses */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <MinusCircle className="w-6 h-6 mr-2 text-red-600" />
                    Recent Expenses
                  </h2>
                  {expenses.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">No expenses added yet. Start by adding your first expense above!</p>
                  ) : (
                    <div className="space-y-3">
                      {expenses.slice(-10).reverse().map((expense) => (
                        <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${expense.category.bgColor} dark:bg-opacity-20`}>
                              <expense.category.icon className={`w-5 h-5 ${expense.category.color}`} />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{expense.name}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{expense.category.name} • {expense.date}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-red-600">{formatCurrency(expense.amount)}</span>
                            <button
                              onClick={() => deleteExpense(expense.id)}
                              className="p-1 rounded hover:bg-red-100 dark:hover:bg-red-900 text-red-500"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {view === 'analytics' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Expense Breakdown */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <PieChart className="w-6 h-6 mr-2 text-purple-600" />
                    Expense Breakdown
                  </h2>
                  {expensesByCategory.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">No expenses to analyze yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {expensesByCategory.map((category) => (
                        <div key={category.id} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <category.icon className={`w-5 h-5 ${category.color}`} />
                              <span className="font-medium text-gray-900 dark:text-white">{category.name}</span>
                            </div>
                            <span className="font-bold text-gray-900 dark:text-white">{formatCurrency(category.total)}</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${category.color.replace('text-', 'from-').replace('-600', '-400')} ${category.color.replace('text-', 'to-').replace('-600', '-600')}`}
                              style={{ width: `${(category.total / totalExpenses) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Budget Goal */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Target className="w-6 h-6 mr-2 text-orange-600" />
                    Budget Goal
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Monthly Budget Goal
                      </label>
                      <input
                        type="number"
                        value={budgetGoal}
                        onChange={(e) => setBudgetGoal(Number(e.target.value))}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Budget Utilization</span>
                        <span className="text-sm font-bold text-gray-900 dark:text-white">{budgetUtilization.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            budgetUtilization <= 70 ? 'bg-green-500' :
                            budgetUtilization <= 90 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(budgetUtilization, 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        {budgetUtilization <= 70 ? 'Great job staying within budget!' :
                         budgetUtilization <= 90 ? 'Getting close to your budget limit' :
                         'You\'ve exceeded your budget goal'}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Spent</p>
                        <p className="text-lg font-bold text-red-600">{formatCurrency(totalExpenses)}</p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
                        <p className={`text-lg font-bold ${budgetGoal - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {formatCurrency(budgetGoal - totalExpenses)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
    </div>
  );
}