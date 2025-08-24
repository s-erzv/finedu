import React from 'react';
import {
  BarChart3,
  Calculator,
  BookOpen,
  Target,
  TrendingUp,
  FileText,
  Sparkles,
} from 'lucide-react';
import Badge from '../Badge';

const FeatureCard = ({ icon: Icon, title, description }) => {
  return (
    <div id="features" className="group relative p-8 rounded-3xl transition-all duration-300 ease-in-out transform border border-gray-200 bg-white shadow-sm hover:shadow-xl hover:scale-[1.02] overflow-hidden
                dark:border-gray-700 dark:bg-gray-900 dark:shadow-xl dark:hover:shadow-2xl">
      <div className="absolute top-0 left-0 w-24 h-24 rounded-br-[4rem] opacity-30 blur-3xl bg-gradient-to-br from-indigo-200 to-purple-200
                dark:from-indigo-500 dark:to-purple-600"></div>

      <div className="relative z-10">
        <div className="mb-6 p-3 rounded-xl inline-flex bg-gray-100 transition-colors duration-300 dark:bg-gray-800">
          <Icon size={28} className="text-purple-600 dark:text-indigo-400" />
        </div>

        <h3 className="font-bold text-2xl text-gray-800 mb-3 transition-colors duration-300 dark:text-gray-200">
          {title}
        </h3>

        <p className="text-gray-500 leading-relaxed dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function Features() {
 const features = [
  {
    icon: BarChart3,
    title: "Smart Expense Tracker",
    description: "Automatically categorize your spending and get insights into where your money really goes.",
  },
  {
    icon: TrendingUp,
    title: "Portfolio Insights",
    description: "Track your investments and receive personalized tips to maximize your portfolio growth.",
  },
  {
    icon: BookOpen,
    title: "Interactive Learning Hub",
    description: "Level up your money skills with gamified lessons and real-world case studies.",
  },
  {
    icon: Calculator,
    title: "Financial Calculator Suite",
    description: "From loans to savings goals — crunch the numbers with powerful calculators.",
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set financial goals, track your progress, and celebrate milestones along the way.",
  },
  {
    icon: FileText,
    title: "Expert Content Library",
    description: "Access curated articles, market updates, and practical tips for smarter finance.",
  },
];

  return (
    <section id="features" className="py-24 mt-20 bg-gray-50 dark:bg-gray-950 dark:text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-5xl mx-auto">
          {/* Badge bisa disesuaikan jika perlu */}
          <Badge icon="✨" text="Here’s How We Help" />

          {/* Gradien teks utama berubah tergantung mode */}
          <h2 className="text-4xl lg:text-5xl font-bold leading-tight mt-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-indigo-900
                  dark:from-purple-300 dark:to-indigo-400 py-2">
            Everything You Need to Master Your Money
          </h2>

          <p className="mt-4 text-lg text-gray-500 leading-relaxed dark:text-gray-400">
            From planning your budget to tracking your progress, Finedu has the tools and content to help you take control of your finances — no boring lectures, we promise.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}