import MainLayout from "../components/MainLayout";
import { Link } from "react-router-dom";
import { BarChart3, CreditCard, Calculator, DollarSign, Settings, CheckCircle, ArrowRight, Moon, Sun } from "lucide-react";

const tools = [
  {
    id: 1,
    title: "Budget Planner",
    description: "Plan your monthly income & expenses with ease.",
    action: "Open Planner",
    path: "/tools/budget-planner",
    Icon: BarChart3,
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600"
  },
  {
    id: 3,
    title: "Financial Calculators",
    description: "From loans to savings goals — crunch the numbers fast.",
    action: "Calculate",
    path: "/tools/calculators",
    Icon: Calculator,
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600"
  },
  {
    id: 4,
    title: "Currency Converter",
    description: "Convert Rupiah to USD/EUR with live rates.",
    action: "Convert Now",
    path: "/tools/currency-converter",
    Icon: DollarSign,
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600"
  },
];

export default function Tools() {
  return (
      <MainLayout>
        <div className="min-h-screen transition-colors duration-200">
          <div className="p-4 lg:px-4 lg:py-8">
            {/* Enhanced & Responsive Header */}
            <div className="text-left mb-12 flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4">
                <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full">
                  <Settings className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-1 md:mb-2">
                    Financial Tools
                  </h1>
                  <p className="text-base sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                    Powerful tools to help you plan, track, and optimize your financial journey
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Tools Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Background gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${tool.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                  
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-14 h-14 ${tool.bgColor} dark:bg-opacity-20 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <tool.Icon className={`w-7 h-7 ${tool.textColor}`} />
                  </div>

                  {/* Content */}
                  <div className="relative">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-gray-800 dark:group-hover:text-gray-100">
                      {tool.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                      {tool.description}
                    </p>
                  </div>

                  {/* Enhanced Action Button */}
                  <div className="relative">
                    <Link
                      to={tool.path}
                      className={`inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r ${tool.color} text-white font-semibold rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 group-hover:shadow-xl`}
                    >
                      <span>{tool.action}</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Features Section */}
            <div className="mt-16 text-center">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Need Help Getting Started?
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                  Our financial tools are designed to be intuitive and user-friendly. 
                  Each tool comes with built-in guidance to help you make the most of your financial planning.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Free to use
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Easy to use
                  </div>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                    Instant results
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
  );
}