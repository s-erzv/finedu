import { 
  BookOpen, 
  CheckCircle, 
  Play, 
  Clock, 
  Star,
  TrendingUp,
  DollarSign,
  PiggyBank,
  Target,
  Users,
  Trophy,
  ArrowRight,
  Zap,
  Award,
  Brain,
  Calculator,
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  Shield,
  CreditCard,
  Smartphone,
  AlertTriangle
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import lessonsData from "../data/content-lesson.json";

// Icon mapping for dynamic icon loading
const iconMap = {
  Calculator,
  PiggyBank,
  TrendingUp,
  Target,
  Trophy,
  Brain,
  DollarSign,
  Award,
  Shield,
  CreditCard,
  Smartphone,
  AlertTriangle,
  BookOpen,
  CheckCircle,
  Play,
  Clock,
  Users
};

function LessonCard({ lesson, isSmall = false }) {
  const Icon = iconMap[lesson.icon] || BookOpen;
  const isLocked = lesson.progress === "Locked";
  
  const getProgressStyles = () => {
    switch (lesson.progress) {
      case "Completed":
        return {
          badge: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
          button: "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        };
      case "In Progress":
        return {
          badge: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
          button: "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
        };
      case "Locked":
        return {
          badge: "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700",
          button: "bg-gray-400 dark:bg-gray-600 cursor-not-allowed"
        };
      default:
        return {
          badge: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
          button: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        };
    }
  };

  const styles = getProgressStyles();

  return (
    <div className={`group relative ${isLocked ? 'opacity-75' : ''} ${isSmall ? 'min-w-[280px]' : ''}`}>
      <div className={`absolute inset-0 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300`}></div>
      <div className={`relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl ${isSmall ? 'p-5' : 'p-6'} border border-white/20 dark:border-gray-700/20 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]`}>
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`${isSmall ? 'w-10 h-10' : 'w-12 h-12'} bg-gradient-to-br ${lesson.color} rounded-xl flex items-center justify-center shadow-md`}>
            <Icon className={`${isSmall ? 'w-5 h-5' : 'w-6 h-6'} text-white`} />
          </div>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles.badge}`}>
            {lesson.progress}
          </span>
        </div>

        {/* Content */}
        <div className={`space-y-3 ${isSmall ? 'mb-4' : 'mb-5'}`}>
          <div>
            <h3 className={`${isSmall ? 'text-lg' : 'text-xl'} font-bold text-gray-900 dark:text-white mb-2 line-clamp-1`}>{lesson.title}</h3>
            <p className={`text-gray-600 dark:text-gray-400 text-sm leading-relaxed ${isSmall ? 'line-clamp-2' : 'line-clamp-3'}`}>{lesson.description}</p>
          </div>

          {/* Metadata */}
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{lesson.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
              <span>{lesson.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              <span>{lesson.students}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar for In Progress */}
        {lesson.progress === "In Progress" && (
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
              <span>Progress</span>
              <span>65%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
              <div className={`bg-gradient-to-r ${lesson.color} h-1.5 rounded-full transition-all duration-500`} style={{ width: "65%" }}></div>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link 
          to={`/lessons/${lesson.id}`}
          className={`w-full ${styles.button} text-white font-medium ${isSmall ? 'py-2.5 px-4 text-sm' : 'py-3 px-5'} rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md ${isLocked ? 'opacity-50 pointer-events-none' : ''}`}
        >
          {lesson.progress === "Completed" && <CheckCircle className="w-4 h-4" />}
          {lesson.progress === "In Progress" && <Play className="w-4 h-4" />}
          {lesson.progress === "Not Started" && <BookOpen className="w-4 h-4" />}
          {isLocked && <Award className="w-4 h-4" />}
          
          <span className="text-sm">
            {lesson.progress === "Completed" && "Review"}
            {lesson.progress === "In Progress" && "Continue"}
            {lesson.progress === "Not Started" && "Start"}
            {isLocked && "Locked"}
          </span>
        </Link>
      </div>
    </div>
  );
}

function LessonCarousel({ lessons, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCards = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + visibleCards >= lessons.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, lessons.length - visibleCards) : prev - 1
    );
  };

  if (lessons.length === 0) return null;
  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="w-8 h-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg border border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300"
            disabled={currentIndex + visibleCards >= lessons.length}
          >
            <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
      
      <div className="overflow-hidden">
        <div 
          className="flex gap-6 transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (280 + 24)}px)` }}
        >
          {lessons.map((lesson) => (
            <LessonCard key={lesson.id} lesson={lesson} isSmall={true} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Lessons() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const lessons = lessonsData.lessons; // Access the lessons array from the imported JSON

  const stats = [
    { label: "Total Lessons", value: lessons.length, icon: BookOpen, color: "text-blue-600 dark:text-blue-400" },
    { label: "Completed", value: lessons.filter(l => l.progress === "Completed").length, icon: CheckCircle, color: "text-green-600 dark:text-green-400" },
    { label: "In Progress", value: lessons.filter(l => l.progress === "In Progress").length, icon: Play, color: "text-yellow-600 dark:text-yellow-400" },
    { label: "Study Time", value: "3.2h", icon: Clock, color: "text-purple-600 dark:text-purple-400" },
  ];

  const filteredLessons = lessons.filter(lesson => {
    const matchesSearch = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === "all" || lesson.category === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const beginnerLessons = filteredLessons.filter(lesson => lesson.difficulty === "Beginner");
  const intermediateLessons = filteredLessons.filter(lesson => lesson.difficulty === "Intermediate");
  const advancedLessons = filteredLessons.filter(lesson => lesson.difficulty === "Advanced");

  return (
    <MainLayout>
      <div className="space-y-6 p-0 lg:p-4">
        {/* Header */}
        <div className="relative">
          <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Financial Learning Hub
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Master personal finance with expert guidance
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lessons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl rounded-xl border border-white/20 dark:border-gray-600/20 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2.5 bg-white/80 dark:bg-gray-700/80 backdrop-blur-xl rounded-xl border border-white/20 dark:border-gray-600/20 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="all">All Topics</option>
                <option value="budgeting">Budgeting</option>
                <option value="saving">Saving</option>
                <option value="investing">Investing</option>
                <option value="debt">Debt</option>
                <option value="planning">Planning</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-500/10 to-gray-600/10 rounded-xl blur-lg"></div>
                <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-xl p-4 border border-white/20 dark:border-gray-700/20 shadow-lg text-center">
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Lesson Carousels */}
        <div className="space-y-8">
          {beginnerLessons.length > 0 && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-2xl"></div>
              <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                <LessonCarousel lessons={beginnerLessons} title="Beginner Level" />
              </div>
            </div>
          )}

          {intermediateLessons.length > 0 && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl"></div>
              <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                <LessonCarousel lessons={intermediateLessons} title="Intermediate Level" />
              </div>
            </div>
          )}

          {advancedLessons.length > 0 && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-2xl"></div>
              <div className="relative bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20">
                <LessonCarousel lessons={advancedLessons} title="Advanced Level" />
              </div>
            </div>
          )}
        </div>

        {/* Achievement */}
        <div className="relative">
          <div className="absolute inset-0 rounded-2xl blur-lg"></div>
          <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">Next Achievement</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">Complete 3 lessons to unlock "Financial Foundations" badge</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-yellow-600 dark:text-yellow-400">1/3</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Lessons</p>
              </div>
            </div>
            <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-500" style={{ width: "33%" }}></div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}