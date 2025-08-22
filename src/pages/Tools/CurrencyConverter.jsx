import { useState, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import { Link } from "react-router-dom";
import { 
  DollarSign,
  Repeat2,
  Moon,
  Sun,
  ArrowLeft,
  CircleDashed,
  AlertCircle,
  CheckCircle2,
  Banknote,
  Minus,
  ArrowRight,
  TrendingUp,
  History,
  Info
} from "lucide-react";

// Extended list of popular currencies
const CURRENCIES = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷" },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪" },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰" },
  { code: "VND", name: "Vietnamese Dong", symbol: "₫", flag: "🇻🇳" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", flag: "🇵🇭" }
];

// More comprehensive exchange rates data
const DUMMY_RATES = {
  USD: { 
    EUR: 0.93, JPY: 156.9, GBP: 0.79, AUD: 1.5, CAD: 1.37, 
    CHF: 0.9, CNY: 7.25, SEK: 10.5, NZD: 1.63, IDR: 16000, 
    SGD: 1.35, INR: 83.5, KRW: 1380, BRL: 5.4, RUB: 92.5,
    MXN: 17.2, TRY: 32.5, ZAR: 18.8, SAR: 3.75, AED: 3.67,
    THB: 36.8, MYR: 4.75, HKD: 7.83, VND: 25450, PHP: 58.3
  },
  EUR: { 
    USD: 1.07, JPY: 168.9, GBP: 0.85, AUD: 1.6, CAD: 1.47, 
    CHF: 0.96, CNY: 7.79, SEK: 11.2, NZD: 1.75, IDR: 17200, 
    SGD: 1.45, INR: 89.5, KRW: 1480, BRL: 5.8, RUB: 99.3,
    MXN: 18.5, TRY: 34.9, ZAR: 20.2, SAR: 4.02, AED: 3.93,
    THB: 39.5, MYR: 5.1, HKD: 8.38, VND: 27200, PHP: 62.4
  },
  IDR: { 
    USD: 0.000063, EUR: 0.000058, JPY: 0.0098, GBP: 0.000049, 
    AUD: 0.000094, CAD: 0.000086, CHF: 0.000056, CNY: 0.00045, 
    SEK: 0.00066, NZD: 0.0001, SGD: 0.000084, INR: 0.0052, 
    KRW: 0.086, BRL: 0.00034, RUB: 0.0058, MXN: 0.0011, 
    TRY: 0.002, ZAR: 0.0012, SAR: 0.00023, AED: 0.00023,
    THB: 0.0023, MYR: 0.0003, HKD: 0.00049, VND: 1.58, PHP: 0.0036
  },
  JPY: { 
    USD: 0.0064, EUR: 0.0059, GBP: 0.005, AUD: 0.0096, CAD: 0.0087, 
    CHF: 0.0057, CNY: 0.046, SEK: 0.067, NZD: 0.01, IDR: 102.3, 
    SGD: 0.0086, INR: 0.53, KRW: 8.8, BRL: 0.034, RUB: 0.59,
    MXN: 0.11, TRY: 0.21, ZAR: 0.12, SAR: 0.024, AED: 0.023,
    THB: 0.23, MYR: 0.03, HKD: 0.05, VND: 162, PHP: 0.37
  },
  GBP: {
    USD: 1.27, EUR: 1.18, JPY: 200, AUD: 1.91, CAD: 1.74,
    CHF: 1.14, CNY: 9.2, SEK: 13.3, NZD: 2.07, IDR: 20400,
    SGD: 1.71, INR: 106, KRW: 1750, BRL: 6.85, RUB: 117,
    MXN: 21.8, TRY: 41.2, ZAR: 23.8, SAR: 4.76, AED: 4.66,
    THB: 46.7, MYR: 6.02, HKD: 9.91, VND: 32200, PHP: 73.8
  },
  // Add more base currencies as needed
};

// Historical data for chart (simplified)
const HISTORICAL_DATA = {
  "USD_TO_EUR": [0.91, 0.92, 0.93, 0.92, 0.94, 0.93],
  "USD_TO_GBP": [0.78, 0.79, 0.80, 0.79, 0.81, 0.79],
  "USD_TO_JPY": [154.5, 155.2, 156.1, 155.8, 156.9, 156.5],
  "USD_TO_IDR": [15800, 15900, 16050, 15950, 16100, 16000],
  // Add more pairs as needed
};

// Popular conversions for quick access
const POPULAR_CONVERSIONS = [
  { from: "USD", to: "EUR", label: "USD to EUR" },
  { from: "USD", to: "GBP", label: "USD to GBP" },
  { from: "EUR", to: "USD", label: "EUR to USD" },
  { from: "USD", to: "JPY", label: "USD to JPY" },
  { from: "USD", to: "CAD", label: "USD to CAD" },
  { from: "GBP", to: "EUR", label: "GBP to EUR" },
  { from: "USD", to: "AUD", label: "USD to AUD" },
  { from: "USD", to: "CHF", label: "USD to CHF" },
  { from: "USD", to: "IDR", label: "USD to IDR" },
  { from: "EUR", to: "GBP", label: "EUR to GBP" },
];

const getRate = (from, to) => {
  return new Promise((resolve, reject) => {
    // Simulate API call delay
    setTimeout(() => {
      const rate = DUMMY_RATES[from]?.[to];
      if (rate) {
        resolve(rate);
      } else {
        reject(new Error("Conversion rate not available."));
      }
    }, 800 + Math.random() * 700); // Random delay between 0.8-1.5 seconds
  });
};

const getHistoricalData = (from, to) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const key = `${from}_TO_${to}`;
      resolve(HISTORICAL_DATA[key] || [0.9, 0.91, 0.92, 0.91, 0.93, 0.92]);
    }, 500);
  });
};

export default function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("IDR");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [historicalRates, setHistoricalRates] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());


  // Handle currency change
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
    setError(null);
    setShowHistory(false);
  };

  const handleQuickConversion = (from, to) => {
    setFromCurrency(from);
    setToCurrency(to);
    setResult(null);
    setError(null);
    setShowHistory(false);
  };

  const convert = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Please enter a valid amount.");
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setShowHistory(false);

    try {
      const [rate, history] = await Promise.all([
        getRate(fromCurrency, toCurrency),
        getHistoricalData(fromCurrency, toCurrency)
      ]);
      
      const converted = parseFloat(amount) * rate;
      setResult(converted.toFixed(2));
      setHistoricalRates(history);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Format currency with symbol
  const formatCurrency = (value, currencyCode) => {
    const currency = CURRENCIES.find(c => c.code === currencyCode);
    if (!currency) return value;
    return `${currency.symbol} ${new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)}`;
  };

  // Simple sparkline chart component
  const Sparkline = ({ data }) => {
    if (!data || data.length === 0) return null;
    
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const range = maxVal - minVal;
    
    return (
      <div className="w-full h-8 flex items-end">
        {data.map((value, index) => {
          const height = range > 0 ? ((value - minVal) / range) * 100 : 50;
          return (
            <div 
              key={index}
              className="flex-1 bg-indigo-400 dark:bg-indigo-500 mx-0.5 rounded-t"
              style={{ height: `${height}%` }}
            />
          );
        })}
      </div>
    );
  };

  return (
      <MainLayout>
        <div className="min-h-screen transition-colors duration-200 py-8">
          <div className="">
            {/* Header with Back and Dark Mode Toggle */}
            <div className="flex justify-between items-center mb-8">
              <Link
                to="/tools"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tools
              </Link>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 sm:p-8 space-y-6">
              {/* Main Title */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <Banknote className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Currency Converter</h1>
                    <p className="text-gray-600 dark:text-gray-400">Get up-to-date exchange rates easily.</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {lastUpdated.toLocaleTimeString()}
                </div>
              </div>
              
              {/* Popular Conversions */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Popular Conversions</h3>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_CONVERSIONS.map((conv, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickConversion(conv.from, conv.to)}
                      className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                      {conv.label}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Input & Select fields */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Amount
                  </label>
                  <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter amount"
                  />
                </div>
                
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex-1">
                    <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      From
                    </label>
                    <div className="relative">
                      <select
                        id="fromCurrency"
                        value={fromCurrency}
                        onChange={(e) => {
                          setFromCurrency(e.target.value);
                          setResult(null);
                          setError(null);
                        }}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
                      >
                        {CURRENCIES.map(c => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code} - {c.name}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="self-end pb-3">
                    <button
                      onClick={handleSwap}
                      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      title="Swap currencies"
                    >
                      <Repeat2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex-1">
                    <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      To
                    </label>
                    <select
                      id="toCurrency"
                      value={toCurrency}
                      onChange={(e) => {
                        setToCurrency(e.target.value);
                        setResult(null);
                        setError(null);
                      }}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      {CURRENCIES.map(c => (
                        <option key={c.code} value={c.code}>
                          {c.flag} {c.code} - {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Convert Button */}
              <button
                onClick={convert}
                className={`w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-200 flex items-center justify-center ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <CircleDashed className="w-5 h-5 mr-2 animate-spin" />
                    Converting...
                  </>
                ) : (
                  <>
                    <Repeat2 className="w-5 h-5 mr-2" />
                    Convert
                  </>
                )}
              </button>
              
              {/* Result & Status Display */}
              <div className="min-h-[8rem] flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                {loading && (
                  <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                    <CircleDashed className="w-10 h-10 mb-2 animate-spin" />
                    <p>Fetching the latest rates...</p>
                  </div>
                )}
                
                {error && !loading && (
                  <div className="flex flex-col items-center text-red-600 dark:text-red-400 text-center">
                    <AlertCircle className="w-10 h-10 mb-2" />
                    <p className="font-medium">{error}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Please try again or check your inputs.</p>
                  </div>
                )}
                
                {result && !loading && (
                  <div className="w-full">
                    <div className="flex flex-col items-center space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                        <CheckCircle2 className="w-8 h-8" />
                        <p className="text-xl font-semibold">Conversion Successful!</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(amount, fromCurrency)}
                          </span> is equal to:
                        </p>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white mt-2">
                          {formatCurrency(result, toCurrency)}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          1 {fromCurrency} = {(DUMMY_RATES[fromCurrency]?.[toCurrency] || 0).toFixed(4)} {toCurrency}
                        </p>
                      </div>
                    </div>
                    
                    {/* Historical data toggle */}
                    <div className="mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                      <button 
                        onClick={() => setShowHistory(!showHistory)}
                        className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                      >
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {showHistory ? 'Hide' : 'Show'} historical trends
                      </button>
                      
                      {showHistory && (
                        <div className="mt-3">
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                            <span>Past week</span>
                            <span>Today</span>
                          </div>
                          <Sparkline data={historicalRates} />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                            <span>Low: {Math.min(...historicalRates).toFixed(4)}</span>
                            <span>High: {Math.max(...historicalRates).toFixed(4)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {!loading && !result && !error && (
                  <div className="text-center text-gray-400 dark:text-gray-600">
                    <DollarSign className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Enter an amount and click 'Convert' to see the result.</p>
                  </div>
                )}
              </div>
              
              {/* Information Footer */}
              <div className="flex items-start text-sm text-gray-500 dark:text-gray-400">
                <Info className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <p>Rates are for informational purposes only and may not reflect real-time market rates. Always check with your financial institution before making transactions.</p>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
  );
}