import { 
  Wallet, 
  Calculator, 
  PieChart, 
  BookOpen, 
  TrendingUp, 
  TrendingDown,
  Award,
  Coffee,
  GraduationCap,
  ArrowUpRight,
  ArrowDownLeft,
  Target,
  BarChart3
} from "lucide-react";
import MainLayout from "../components/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      <div className="space-y-10 scrollbar-hide px-0 lg:px-10">
        {/* Welcome Section */}
        <div className="relative">
          <div className="relative pt-10 px-2">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 items-center justify-center">
                <img src="/finedu-logo-black.svg" alt="" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold">
                  Welcome back, nupers 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-md">
                  Here's your quick finance & learning overview.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Balance Card */}
        <div className="relative group">
          <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white rounded-3xl p-8 border border-indigo-500/20">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-xl font-semibold">Current Balance</h2>
              </div>
              <TrendingUp className="w-8 h-8 text-green-300" />
            </div>
            
            <div className="space-y-4">
              <p className="text-4xl font-bold">Rp 2.500.000</p>
              <div className="flex items-center gap-2 text-indigo-100">
                <Target className="w-4 h-4" />
                <p className="text-base">Budget Left This Month: <span className="font-semibold text-white">Rp 750.000</span></p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-indigo-100 mb-2">
                <span>Monthly Budget Usage</span>
                <span>70%</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full shadow-lg" style={{ width: "70%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* New Two-Column Section for Recent Activity and Learning Progress */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-600 rounded-xl flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activity</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800/30">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-green-800 dark:text-green-300">Income from Scholarship</p>
                    <p className="text-sm text-green-600 dark:text-green-400">Today, 2:30 PM</p>
                  </div>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">+ Rp 500.000</p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800/30">
                  <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                    <ArrowDownLeft className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-red-600 dark:text-red-400" />
                      <p className="font-medium text-red-800 dark:text-red-300">Books Purchase</p>
                    </div>
                    <p className="text-sm text-red-600 dark:text-red-400">Yesterday, 10:15 AM</p>
                  </div>
                  <p className="text-lg font-bold text-red-600 dark:text-red-400">- Rp 120.000</p>
                </div>

                <div className="flex items-center gap-4 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-200 dark:border-orange-800/30">
                  <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                    <ArrowDownLeft className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Coffee className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <p className="font-medium text-orange-800 dark:text-orange-300">Coffee & Snacks</p>
                    </div>
                    <p className="text-sm text-orange-600 dark:text-orange-400">Yesterday, 4:45 PM</p>
                  </div>
                  <p className="text-lg font-bold text-orange-600 dark:text-orange-400">- Rp 30.000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Learning Progress */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl blur-xl"></div>
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-8 border border-white/20 dark:border-gray-700/20 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Learning Progress</h2>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">30%</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Completed</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Financial Literacy Course</span>
                  <span>3 / 10 Lessons</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 shadow-inner">
                  <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-4 rounded-full shadow-lg transition-all duration-1000 ease-out" 
                       style={{ width: "30%" }}>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                  <BookOpen className="w-4 h-4" />
                  <span>Next: Investment Basics</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}