import CardSwap, { Card } from '../CardSwap/CardSwap';
import { FaMoneyBillWave, FaPiggyBank, FaChartLine } from 'react-icons/fa';
import Badge from '../Badge';

export default function About() {
  return (
    <section className="py-20 mt-16 bg-gradient-to-b from-white via-purple-50/30 to-white dark:from-gray-950 dark:via-gray-900/30 dark:to-gray-950">
      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-center px-6 max-w-7xl">

        <div className="text-left space-y-6">
          <Badge icon="💬" text="About Finedu" />

          <h2 className="text-4xl lg:text-5xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-purple-900 to-indigo-900
                  dark:from-white dark:via-purple-400 dark:to-indigo-400">
            Making Personal Finance
            <span className="block text-purple-600 dark:text-indigo-400">Simple & Fun</span>
          </h2>

          <div className="space-y-4">
            <p className="text-lg text-gray-600 leading-relaxed dark:text-gray-400">
              Money management doesn't have to be overwhelming. Finedu transforms complex financial concepts into digestible, interactive lessons designed specifically for students.
            </p>

            <p className="text-gray-600 leading-relaxed dark:text-gray-400">
              From budgeting for your coffee addiction to saving for that dream vacation, we make financial literacy accessible, engaging, and actually useful for your daily life.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium border border-green-200 dark:bg-green-700 dark:text-green-100 dark:border-green-600">
              ✓ Student-focused
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200 dark:bg-blue-700 dark:text-blue-100 dark:border-blue-600">
              ✓ Interactive learning
            </span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium border border-orange-200 dark:bg-orange-700 dark:text-orange-100 dark:border-orange-600">
              ✓ Real-world tools
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center relative min-h-[600px] lg:min-h-[500px]">
          <div className="relative w-full max-w-[370px] md:max-w-md mt-40">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl transform scale-150
                    dark:from-purple-500/20 dark:to-indigo-500/20"></div>

            <CardSwap
              cardDistance={15}
              verticalDistance={60}
              delay={4000}
            >
              {/* Card 1: Budgeting */}
              <Card className="bg-gradient-to-br from-purple-200 via-purple-300 to-indigo-300 text-gray-800 rounded-3xl p-8 shadow-xl w-[250px] h-[250px] sm:w-64 sm:h-64 flex flex-col justify-center text-left backdrop-blur-sm border border-white/20
                      dark:bg-gradient-to-br dark:from-blue-900/40 dark:via-blue-800/40 dark:to-indigo-800/40 dark:backdrop-blur-lg dark:text-gray-200 dark:border-white/20">
                <div className="bg-purple-500/20 backdrop-blur-sm p-3 rounded-full mb-4 shadow-lg w-fit dark:bg-blue-500/30">
                  <FaMoneyBillWave size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">Smart Budgeting</h3>
                <p className="text-gray-700 leading-relaxed text-sm dark:text-gray-300">
                  Track every rupiah with intuitive tools that make budgeting feel less like math homework and more like a game you can win.
                </p>
              </Card>

              {/* Card 2: Saving */}
              <Card className="bg-gradient-to-br from-pink-200 via-rose-200 to-pink-300 text-gray-800 rounded-3xl p-8 shadow-xl w-[250px] h-[250px] sm:w-64 sm:h-64 flex flex-col justify-center text-left backdrop-blur-sm border border-white/20
                      dark:bg-gradient-to-br dark:from-sky-900/40 dark:via-cyan-800/40 dark:to-blue-800/40 dark:backdrop-blur-lg dark:text-gray-200 dark:border-white/20">
                <div className="bg-pink-500/20 backdrop-blur-sm p-3 rounded-full mb-4 shadow-lg w-fit dark:bg-sky-500/30">
                  <FaPiggyBank size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">Goal-based Saving</h3>
                <p className="text-gray-700 leading-relaxed text-sm dark:text-gray-300">
                  Set realistic savings goals and watch your progress grow. From concert tickets to semester abroad dreams.
                </p>
              </Card>

              {/* Card 3: Investing */}
              <Card className="bg-gradient-to-br from-violet-200 via-purple-200 to-pink-200 text-gray-800 rounded-3xl p-8 shadow-xl w-[250px] h-[250px] sm:w-64 sm:h-64 flex flex-col justify-center text-left backdrop-blur-sm border border-white/20
                      dark:bg-gradient-to-br dark:from-indigo-900/40 dark:via-blue-800/40 dark:to-indigo-800/40 dark:backdrop-blur-lg dark:text-gray-200 dark:border-white/20">
                <div className="bg-violet-500/20 backdrop-blur-sm p-3 rounded-full mb-4 shadow-lg w-fit dark:bg-indigo-500/30">
                  <FaChartLine size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">Easy Investing</h3>
                <p className="text-gray-700 leading-relaxed text-sm dark:text-gray-300">
                  Demystify investing with simple explanations and practical examples that actually make sense.
                </p>
              </Card>
            </CardSwap>
          </div>
        </div>
      </div>
    </section>
  );
}