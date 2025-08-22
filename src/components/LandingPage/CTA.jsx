import { Link } from 'react-router-dom';
import Badge from '../Badge';
import { Button } from '../ui/moving-border';

const CTASection = ({ setPage }) => {
  return (
    <section className="flex justify-center items-center px-4">
      <Button borderRadius="1.75rem" className="w-[85vw] text-left px-6 py-12 transition-all duration-300
        bg-gray-100/50 text-gray-800 border border-gray-200
        hover:bg-gray-200/50
        dark:bg-white/5 dark:text-white dark:border-white/10 dark:hover:bg-white/10"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-8 md:space-y-0 md:space-x-8">

          <div className="flex-1 flex flex-col items-start text-left">
            <div className="flex items-center space-x-2">
              <Badge icon="🚀" text="Ready to Start?" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-800 to-indigo-900 dark:from-purple-300 dark:to-indigo-400 py-2">
              Your Future Self Will Thank You
            </h2>

            <p className="mt-2 text-md sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
              Start learning and planning your money today — it's free, fast,
              and built for students.
            </p>
          </div>

          <div className="flex-shrink-0 flex items-center justify-start md:justify-end">
            <Link
              to="/home"
              className="w-full md:w-auto bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900
                         font-medium py-3 px-8 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
            >
              Get started
            </Link>
          </div>
        </div>
      </Button>
    </section>
  );
};

export default CTASection;