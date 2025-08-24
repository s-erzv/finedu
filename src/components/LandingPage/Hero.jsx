import Squares from '../Squares/Squares';
import Navbar from './Navbar';
import Badge from '../Badge';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative m-4 flex flex-col items-center md:items-center justify-center rounded-3xl text-left md:text-center overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-50">
        <Navbar />
      </div>

      {/* Background container to hold both gradients */}
      <div className="absolute inset-0 z-0 w-full h-full">
        {/* Light Mode Gradient */}
        <div
          className="absolute inset-0 z-0 opacity-100 dark:opacity-0 transition-opacity duration-500"
          style={{
            background: `
              linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0.7)),
              linear-gradient(to right, #B6A2F7, #E89FBD)
            `,
          }}
        />

        {/* Dark Mode Gradient */}
        <div
          className="absolute inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity duration-500"
          style={{
            background: `
              linear-gradient(to bottom, rgba(3,7,18,1), rgba(3,7,18,0.7)),
              linear-gradient(to right, #8D39EB, #6860F0)
            `,
          }}
        />

        <Squares
          speed={0.5}
          squareSize={40}
          direction="diagonal"
          borderColor="#fff"
          hoverFillColor="#222"
        />
      </div>

      <div className="relative z-10 px-6 flex flex-col items-start md:items-center justify-center py-12 mt-14">
        <Badge icon="💡" text="Smart Finance, Made Simple" />
        <h1 className="text-4xl md:text-6xl font-bold mt-8 leading-tight dark:text-white">
          Take Control of Your Money, <br /> One Lesson at a Time
        </h1>
        <p className="max-w-2xl mx-auto mt-4 text-gray-700 text-lg dark:text-gray-300">
          Finedu makes personal finance easy for students — plan smarter, save faster,
          and grow your money with interactive tools and bite-sized lessons.
        </p>
        <div className="mt-6 flex justify-start md:justify-center w-full gap-4">
          <Link
            to="/tools"
            className="glass-button text-lg border border-white shadow-lg px-4 py-2 rounded-full transition-all duration-300 hover:scale-105 hover:bg-white/20 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800/20"
          >
            Explore Tools
          </Link>
          <Link
            to="/lessons"
            className="text-black bg-white px-6 py-3 rounded-full font-medium text-lg transition-all duration-300 hover:bg-gray-200 hover:scale-105 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-100 dark:hover:bg-gray-300"
          >
            Start Learning
          </Link>
        </div>
      </div>

      <div className="relative z-10 justify-center items-center">
        <img
          src="/hero.svg"
          alt="Finedu App Hero"
          className="block dark:hidden mx-auto transition-transform duration-500 hover:scale-105 max-w-xs sm:max-w-md md:max-w-3xl"
        />
        <img
          src="/hero-.svg"
          alt="Finedu App Hero"
          className="dark:block hidden mx-auto transition-transform duration-500 hover:scale-105 max-w-xs sm:max-w-md md:max-w-3xl"
        />
      </div>
    </section>
  );
}