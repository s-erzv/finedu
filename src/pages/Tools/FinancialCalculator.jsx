import { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  PiggyBank,
  CreditCard,
  Building2,
  Banknote,
  LineChart,
  Target,
  Percent,
  Calendar,
  Clock,
  Info,
  CheckCircle2,
  AlertCircle,
  BarChart3
} from "lucide-react";

const CALCULATOR_TYPES = [
  {
    id: 'loan',
    name: 'Loan Calculator',
    icon: CreditCard,
    description: 'Calculate monthly payments for loans',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 'savings',
    name: 'Savings Goal',
    icon: PiggyBank,
    description: 'Plan your savings target',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    gradient: 'from-green-500 to-green-600'
  },
  {
    id: 'investment',
    name: 'Investment Growth',
    icon: TrendingUp,
    description: 'Calculate compound interest',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    id: 'mortgage',
    name: 'Mortgage Calculator',
    icon: Building2,
    description: 'Home loan payments & amortization',
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    id: 'retirement',
    name: 'Retirement Planning',
    icon: Target,
    description: 'Plan for your golden years',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    gradient: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 'debt',
    name: 'Debt Payoff',
    icon: Banknote,
    description: 'Optimize debt repayment strategy',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    gradient: 'from-red-500 to-red-600'
  }
];

export default function FinancialCalculators() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("loan");
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);
  const [detailedResults, setDetailedResults] = useState(null);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Handle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Handle input
  const handleChange = (field, value) => {
    setInputs({ ...inputs, [field]: value });
    // Clear results when inputs change
    setResult(null);
    setDetailedResults(null);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Format percentage
  const formatPercent = (value) => `${value.toFixed(2)}%`;

  // Calculate loan payments
  const calculateLoan = () => {
    const principal = parseFloat(inputs.principal || 0);
    const annualRate = parseFloat(inputs.rate || 0);
    const months = parseInt(inputs.months || 0);
    
    if (principal <= 0 || annualRate < 0 || months <= 0) return;
    
    const monthlyRate = annualRate / 100 / 12;
    const payment = monthlyRate > 0 
      ? (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months))
      : principal / months;
    
    const totalAmount = payment * months;
    const totalInterest = totalAmount - principal;

    setResult({
      monthlyPayment: payment,
      totalAmount: totalAmount,
      totalInterest: totalInterest,
      principal: principal
    });

    // Generate amortization schedule for first 12 months
    let balance = principal;
    const schedule = [];
    for (let i = 1; i <= Math.min(12, months); i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = payment - interestPayment;
      balance -= principalPayment;
      
      schedule.push({
        month: i,
        payment: payment,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }
    
    setDetailedResults({ schedule });
  };

  // Calculate savings goal
  const calculateSavings = () => {
    const monthly = parseFloat(inputs.monthly || 0);
    const months = parseInt(inputs.months || 0);
    const targetAmount = parseFloat(inputs.target || 0);
    const interestRate = parseFloat(inputs.interestRate || 0) / 100 / 12;
    
    if (monthly <= 0 && targetAmount <= 0) return;
    
    let futureValue, requiredMonthly, timeToGoal;
    
    if (monthly > 0 && months > 0) {
      // Calculate future value with compound interest
      if (interestRate > 0) {
        futureValue = monthly * (((1 + interestRate) ** months - 1) / interestRate);
      } else {
        futureValue = monthly * months;
      }
    }
    
    if (targetAmount > 0 && months > 0) {
      // Calculate required monthly savings
      if (interestRate > 0) {
        requiredMonthly = targetAmount / (((1 + interestRate) ** months - 1) / interestRate);
      } else {
        requiredMonthly = targetAmount / months;
      }
    }
    
    if (targetAmount > 0 && monthly > 0 && interestRate >= 0) {
      // Calculate time to reach goal
      if (interestRate > 0) {
        timeToGoal = Math.log(1 + (targetAmount * interestRate) / monthly) / Math.log(1 + interestRate);
      } else {
        timeToGoal = targetAmount / monthly;
      }
    }

    setResult({
      futureValue,
      requiredMonthly,
      timeToGoal,
      totalContributions: monthly * months,
      interestEarned: futureValue ? futureValue - (monthly * months) : 0
    });
  };

  // Calculate investment growth
  const calculateInvestment = () => {
    const principal = parseFloat(inputs.principal || 0);
    const monthlyContribution = parseFloat(inputs.monthlyContribution || 0);
    const annualRate = parseFloat(inputs.rate || 0) / 100;
    const years = parseInt(inputs.years || 0);
    
    if (principal <= 0 || annualRate < 0 || years <= 0) return;
    
    const monthlyRate = annualRate / 12;
    const months = years * 12;
    
    // Future value of initial investment
    const futureValuePrincipal = principal * Math.pow(1 + annualRate, years);
    
    // Future value of monthly contributions
    let futureValueContributions = 0;
    if (monthlyContribution > 0 && monthlyRate > 0) {
      futureValueContributions = monthlyContribution * (((1 + monthlyRate) ** months - 1) / monthlyRate);
    } else if (monthlyContribution > 0) {
      futureValueContributions = monthlyContribution * months;
    }
    
    const totalInvestment = principal + (monthlyContribution * months);
    const totalGrowth = futureValuePrincipal + futureValueContributions;
    const totalReturns = totalGrowth - totalInvestment;
    
    // Generate year-by-year breakdown
    const yearlyBreakdown = [];
    let currentValue = principal;
    for (let year = 1; year <= Math.min(10, years); year++) {
      currentValue = currentValue * (1 + annualRate) + (monthlyContribution * 12);
      yearlyBreakdown.push({
        year,
        value: currentValue,
        contributions: principal + (monthlyContribution * 12 * year),
        growth: currentValue - (principal + (monthlyContribution * 12 * year))
      });
    }

    setResult({
      futureValue: totalGrowth,
      totalInvestment,
      totalReturns,
      annualizedReturn: ((totalGrowth / totalInvestment) ** (1/years) - 1) * 100
    });
    
    setDetailedResults({ yearlyBreakdown });
  };

  // Main calculation handler
  const calculate = () => {
    switch (activeTab) {
      case 'loan':
      case 'mortgage':
      case 'debt':
        calculateLoan();
        break;
      case 'savings':
        calculateSavings();
        break;
      case 'investment':
      case 'retirement':
        calculateInvestment();
        break;
      default:
        break;
    }
  };

  const activeCalculator = CALCULATOR_TYPES.find(calc => calc.id === activeTab);

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
                  className="inline-flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                    <Calculator className="w-8 h-8 mr-3 text-purple-600" />
                    Financial Calculators
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">Powerful tools for financial planning and analysis</p>
                </div>
              </div>
              
              {/* Dark mode toggle removed as requested */}
            </div>

            {/* Calculator Type Selection */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {CALCULATOR_TYPES.map((calc) => (
                <button
                  key={calc.id}
                  onClick={() => {
                    setActiveTab(calc.id);
                    setInputs({});
                    setResult(null);
                    setDetailedResults(null);
                  }}
                  className={`p-4 rounded-2xl border transition-all duration-200 ${
                    activeTab === calc.id
                      ? `bg-gradient-to-r ${calc.gradient} text-white shadow-lg scale-105`
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-105'
                  }`}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className={`p-3 rounded-xl ${activeTab === calc.id ? 'bg-white bg-opacity-20' : calc.bgColor + ' dark:bg-opacity-20'}`}>
                      <calc.icon className={`w-6 h-6 ${activeTab === calc.id ? 'text-white' : calc.color}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-sm ${activeTab === calc.id ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                        {calc.name}
                      </h3>
                      <p className={`text-xs mt-1 ${activeTab === calc.id ? 'text-white text-opacity-80' : 'text-gray-500 dark:text-gray-400'}`}>
                        {calc.description}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Input Form */}
              <div className="lg:col-span-1">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center mb-6">
                    <activeCalculator.icon className={`w-6 h-6 mr-3 ${activeCalculator.color}`} />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">{activeCalculator.name}</h2>
                  </div>

                  <div className="space-y-4">
                    {/* Loan Calculator Inputs */}
                    {(activeTab === "loan" || activeTab === "mortgage" || activeTab === "debt") && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <DollarSign className="w-4 h-4 inline mr-1" />
                            {activeTab === "mortgage" ? "Home Price" : "Loan Amount"} (IDR)
                          </label>
                          <input
                            type="number"
                            value={inputs.principal || ""}
                            onChange={(e) => handleChange("principal", e.target.value)}
                            placeholder="e.g., 100000000"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <Percent className="w-4 h-4 inline mr-1" />
                            Annual Interest Rate (%)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={inputs.rate || ""}
                            onChange={(e) => handleChange("rate", e.target.value)}
                            placeholder="e.g., 12.5"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Loan Term (Months)
                          </label>
                          <input
                            type="number"
                            value={inputs.months || ""}
                            onChange={(e) => handleChange("months", e.target.value)}
                            placeholder="e.g., 240"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </>
                    )}

                    {/* Savings Calculator Inputs */}
                    {activeTab === "savings" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <DollarSign className="w-4 h-4 inline mr-1" />
                            Monthly Savings (IDR)
                          </label>
                          <input
                            type="number"
                            value={inputs.monthly || ""}
                            onChange={(e) => handleChange("monthly", e.target.value)}
                            placeholder="e.g., 1000000"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <Target className="w-4 h-4 inline mr-1" />
                            Target Amount (IDR) - Optional
                          </label>
                          <input
                            type="number"
                            value={inputs.target || ""}
                            onChange={(e) => handleChange("target", e.target.value)}
                            placeholder="e.g., 50000000"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <Calendar className="w-4 h-4 inline mr-1" />
                            Time Period (Months)
                          </label>
                          <input
                            type="number"
                            value={inputs.months || ""}
                            onChange={(e) => handleChange("months", e.target.value)}
                            placeholder="e.g., 36"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <Percent className="w-4 h-4 inline mr-1" />
                            Annual Interest Rate (%) - Optional
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={inputs.interestRate || ""}
                            onChange={(e) => handleChange("interestRate", e.target.value)}
                            placeholder="e.g., 6.0"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </>
                    )}

                    {/* Investment/Retirement Calculator Inputs */}
                    {(activeTab === "investment" || activeTab === "retirement") && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <DollarSign className="w-4 h-4 inline mr-1" />
                            Initial Investment (IDR)
                          </label>
                          <input
                            type="number"
                            value={inputs.principal || ""}
                            onChange={(e) => handleChange("principal", e.target.value)}
                            placeholder="e.g., 10000000"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <PiggyBank className="w-4 h-4 inline mr-1" />
                            Monthly Contribution (IDR) - Optional
                          </label>
                          <input
                            type="number"
                            value={inputs.monthlyContribution || ""}
                            onChange={(e) => handleChange("monthlyContribution", e.target.value)}
                            placeholder="e.g., 500000"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <Percent className="w-4 h-4 inline mr-1" />
                            Expected Annual Return (%)
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            value={inputs.rate || ""}
                            onChange={(e) => handleChange("rate", e.target.value)}
                            placeholder="e.g., 12.0"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            <Clock className="w-4 h-4 inline mr-1" />
                            Investment Period (Years)
                          </label>
                          <input
                            type="number"
                            value={inputs.years || ""}
                            onChange={(e) => handleChange("years", e.target.value)}
                            placeholder="e.g., 20"
                            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                          />
                        </div>
                      </>
                    )}

                    <button
                      onClick={calculate}
                      className={`w-full bg-gradient-to-r ${activeCalculator.gradient} text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center`}
                    >
                      <Calculator className="w-5 h-5 mr-2" />
                      Calculate
                    </button>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-2">
                {result ? (
                  <div className="space-y-6">
                    {/* Main Results */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                          <BarChart3 className="w-6 h-6 mr-2 text-green-600" />
                          Calculation Results
                        </h3>
                        {detailedResults && (
                          <button
                            onClick={() => setShowBreakdown(!showBreakdown)}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
                          >
                            <Info className="w-4 h-4 mr-1" />
                            {showBreakdown ? 'Hide' : 'Show'} Breakdown
                          </button>
                        )}
                      </div>

                      {/* Loan Results */}
                      {(activeTab === "loan" || activeTab === "mortgage" || activeTab === "debt") && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-xl p-4">
                            <div className="flex items-center">
                              <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg">
                                <CreditCard className="w-5 h-5 text-blue-600" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-blue-600">Monthly Payment</p>
                                <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                  {formatCurrency(result.monthlyPayment)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-red-50 dark:bg-red-900 dark:bg-opacity-20 rounded-xl p-4">
                            <div className="flex items-center">
                              <div className="bg-red-100 dark:bg-red-800 p-2 rounded-lg">
                                <Percent className="w-5 h-5 text-red-600" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-red-600">Total Interest</p>
                                <p className="text-2xl font-bold text-red-900 dark:text-red-100">
                                  {formatCurrency(result.totalInterest)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-xl p-4">
                            <div className="flex items-center">
                              <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-lg">
                                <Banknote className="w-5 h-5 text-purple-600" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-purple-600">Total Amount</p>
                                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                                  {formatCurrency(result.totalAmount)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-xl p-4">
                            <div className="flex items-center">
                              <div className="bg-green-100 dark:bg-green-800 p-2 rounded-lg">
                                <CheckCircle2 className="w-5 h-5 text-green-600" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-green-600">Principal Amount</p>
                                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                                  {formatCurrency(result.principal)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Savings Results */}
                      {activeTab === "savings" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {result.futureValue && (
                            <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-xl p-4">
                              <div className="flex items-center">
                                <div className="bg-green-100 dark:bg-green-800 p-2 rounded-lg">
                                  <PiggyBank className="w-5 h-5 text-green-600" />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-green-600">Future Value</p>
                                  <p className="text-2xl font-bold">
                                    {formatCurrency(result.futureValue)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          {result.requiredMonthly && (
                            <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-xl p-4">
                              <div className="flex items-center">
                                <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-lg">
                                  <PiggyBank className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-blue-600">Required Monthly Savings</p>
                                  <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                                    {formatCurrency(result.requiredMonthly)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                          {result.timeToGoal && (
                            <div className="bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-xl p-4">
                              <div className="flex items-center">
                                <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-lg">
                                  <Clock className="w-5 h-5 text-purple-600" />
                                </div>
                                <div className="ml-3">
                                  <p className="text-sm font-medium text-purple-600">Time to Goal</p>
                                  <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                                    {Math.ceil(result.timeToGoal)} Months
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Investment/Retirement Results */}
                      {(activeTab === "investment" || activeTab === "retirement") && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-purple-50 dark:bg-purple-900 dark:bg-opacity-20 rounded-xl p-4">
                            <div className="flex items-center">
                              <div className="bg-purple-100 dark:bg-purple-800 p-2 rounded-lg">
                                <LineChart className="w-5 h-5 text-purple-600" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-purple-600">Future Value</p>
                                <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                                  {formatCurrency(result.futureValue)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-xl p-4">
                            <div className="flex items-center">
                              <div className="bg-green-100 dark:bg-green-800 p-2 rounded-lg">
                                <DollarSign className="w-5 h-5 text-green-600" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-green-600">Total Investment</p>
                                <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                                  {formatCurrency(result.totalInvestment)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="bg-orange-50 dark:bg-orange-900 dark:bg-opacity-20 rounded-xl p-4">
                            <div className="flex items-center">
                              <div className="bg-orange-100 dark:bg-orange-800 p-2 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-orange-600" />
                              </div>
                              <div className="ml-3">
                                <p className="text-sm font-medium text-orange-600">Total Returns</p>
                                <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">
                                  {formatCurrency(result.totalReturns)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Detailed Breakdown (Amortization/Growth) */}
                    {showBreakdown && detailedResults && (
                      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Detailed Breakdown</h3>
                        {/* Loan Amortization Schedule */}
                        {detailedResults.schedule && (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left table-auto">
                              <thead>
                                <tr className="border-b dark:border-gray-700">
                                  <th className="py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Month</th>
                                  <th className="py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Payment</th>
                                  <th className="py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Principal</th>
                                  <th className="py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Interest</th>
                                  <th className="py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Remaining Balance</th>
                                </tr>
                              </thead>
                              <tbody>
                                {detailedResults.schedule.map((row) => (
                                  <tr key={row.month} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{row.month}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{formatCurrency(row.payment)}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{formatCurrency(row.principal)}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{formatCurrency(row.interest)}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{formatCurrency(row.balance)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                        {/* Investment Yearly Breakdown */}
                        {detailedResults.yearlyBreakdown && (
                          <div className="overflow-x-auto">
                            <table className="w-full text-left table-auto">
                              <thead>
                                <tr className="border-b dark:border-gray-700">
                                  <th className="py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Year</th>
                                  <th className="py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Contributions</th>
                                  <th className="py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Growth</th>
                                  <th className="py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Total Value</th>
                                </tr>
                              </thead>
                              <tbody>
                                {detailedResults.yearlyBreakdown.map((row) => (
                                  <tr key={row.year} className="border-b border-gray-100 dark:border-gray-700 last:border-0">
                                    <td className="py-3 px-4 text-sm text-gray-600 dark:text-gray-400">{row.year}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{formatCurrency(row.contributions)}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{formatCurrency(row.growth)}</td>
                                    <td className="py-3 px-4 text-sm text-gray-900 dark:text-white">{formatCurrency(row.value)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center text-center h-full">
                    <AlertCircle className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      Enter your details and click 'Calculate' to see the results.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    </div>
  );
}