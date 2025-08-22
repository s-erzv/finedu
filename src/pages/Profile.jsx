import { useState, useEffect } from "react";
import MainLayout from "../components/MainLayout";
import { Moon, Sun, CheckCircle, Target, Trophy, ChartBar, Clock, Wallet, Info } from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("overview");
  const [darkMode, setDarkMode] = useState(false);

  // Enhanced user data
  const user = {
    name: "Nupers",
    email: "nupers@student.uinjkt.ac.id",
    major: "Information Systems",
    university: "UIN Syarif Hidayatullah Jakarta",
    joinDate: "January 2024",
    avatar: "https://ui-avatars.com/api/?name=Nupers&background=6B46C1&color=fff",
    stats: {
      totalSaved: "Rp 1.500.000",
      monthlyBudget: "Rp 2.000.000",
      toolsUsed: 8,
      savingsGoal: "Rp 5.000.000",
      currentStreak: 15,
    },
    achievements: [
      { title: "First Save", desc: "Made your first savings entry", earned: true, icon: "🎯" },
      { title: "Budget Master", desc: "Stayed within budget for 3 months", earned: true, icon: "💪" },
      { title: "Tool Explorer", desc: "Used 5+ financial tools", earned: true, icon: "🔧" },
      { title: "Savings Hero", desc: "Saved over 1M rupiah", earned: false, icon: "🦸" },
    ],
    recentActivity: [
      { action: "Added expense", amount: "Rp 75.000", category: "Food", time: "2 hours ago" },
      { action: "Budget updated", amount: "Rp 2.000.000", category: "Monthly", time: "1 day ago" },
      { action: "Savings goal set", amount: "Rp 500.000", category: "Emergency", time: "3 days ago" },
    ]
  };

  const progressPercentage = (parseFloat(user.stats.totalSaved.replace(/[^\d]/g, '')) / parseFloat(user.stats.savingsGoal.replace(/[^\d]/g, ''))) * 100;


  return (
      <MainLayout>
        <div className="min-h-screen  text-gray-900 dark:text-gray-100 transition-colors duration-200">
          <div className="py-8 space-y-8">
            {/* Profile Header - Enhanced */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg relative">
              <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="w-24 h-24 sm:w-20 sm:h-20 rounded-full border-4 border-white shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1.5 border-2 border-white">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="text-center sm:text-left flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold">{user.name}</h1>
                  <p className="text-indigo-100 text-sm sm:text-base">{user.email}</p>
                  <p className="text-indigo-200 font-medium">{user.major}</p>
                  <p className="text-indigo-200 text-sm">{user.university}</p>
                  <p className="text-indigo-300 text-xs mt-1">Member since {user.joinDate}</p>
                </div>
                <div className="text-center">
                  <div className="bg-white/20 backdrop-blur rounded-lg p-3">
                    <div className="text-2xl font-bold">{user.stats.currentStreak}</div>
                    <div className="text-xs text-indigo-200">Day Streak</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-gray-200 dark:border-gray-700">
              {["overview", "achievements", "activity"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
                    activeTab === tab
                      ? "bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-600 dark:border-indigo-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{user.stats.totalSaved}</div>
                        <div className="text-gray-600 dark:text-gray-400 text-sm">Total Saved</div>
                      </div>
                      <div className="text-2xl text-green-500">
                        <Wallet size={28} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{user.stats.monthlyBudget}</div>
                        <div className="text-gray-600 dark:text-gray-400 text-sm">Monthly Budget</div>
                      </div>
                      <div className="text-2xl text-blue-500">
                        <ChartBar size={28} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{user.stats.toolsUsed}</div>
                        <div className="text-gray-600 dark:text-gray-400 text-sm">Tools Used</div>
                      </div>
                      <div className="text-2xl text-purple-500">
                        <Info size={28} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{user.stats.savingsGoal}</div>
                        <div className="text-gray-600 dark:text-gray-400 text-sm">Savings Goal</div>
                      </div>
                      <div className="text-2xl text-orange-500">
                        <Target size={28} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Savings Progress */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Savings Progress</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Progress to goal</span>
                      <span className="font-medium text-gray-900 dark:text-white">{progressPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{user.stats.totalSaved}</span>
                      <span>{user.stats.savingsGoal}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "achievements" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Achievements</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-xl border shadow-sm transition transform hover:scale-105 ${
                        achievement.earned
                          ? "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                          : "bg-gray-50 dark:bg-gray-800 dark:bg-opacity-50 border-gray-200 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`text-3xl ${achievement.earned ? "" : "grayscale opacity-50"}`}>
                          <Trophy className="w-10 h-10 text-yellow-500" />
                        </div>
                        <div>
                          <h4 className={`font-medium ${achievement.earned ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
                            {achievement.title}
                          </h4>
                          <p className={`text-sm ${achievement.earned ? "text-gray-600 dark:text-gray-400" : "text-gray-400 dark:text-gray-500"}`}>
                            {achievement.desc}
                          </p>
                          {achievement.earned && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                              Earned
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Activity</h3>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                  {user.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className={`p-4 ${index !== user.recentActivity.length - 1 ? "border-b border-gray-100 dark:border-gray-700" : ""}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-900 dark:text-white">{activity.action}</span>
                            <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                              {activity.category}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{activity.time}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-gray-900 dark:text-white">{activity.amount}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </MainLayout>
  );
}