import { useParams } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import lessonsData from "../data/content-lesson.json";
import { ChevronLeft } from "lucide-react";

export default function LessonDetail() {
  const { id } = useParams();
  // Find the lesson using the imported data array
  const lesson = lessonsData.lessons.find((l) => l.id === parseInt(id));

  if (!lesson) {
    return (
      <MainLayout>
        <div className="p-8 text-center text-gray-500 dark:text-gray-400">
          <h2 className="text-2xl font-bold">Lesson not found</h2>
          <p className="mt-2">The requested lesson does not exist.</p>
        </div>
      </MainLayout>
    );
  }

  // A more robust function to render text with markdown-like formatting
  const renderContent = (text) => {
    return text.split('\n').map((line, index) => {
      // Handle list items with bold parts
      if (line.startsWith('- **')) {
        const parts = line.substring(2).split(':');
        return (
          <li key={index} className="mt-2 ml-4 list-disc text-gray-600 dark:text-gray-400">
            <strong>{parts[0].replace('**', '')}</strong>: {parts.slice(1).join(':')}
          </li>
        );
      }
      // Handle bold words within a paragraph
      const formattedText = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <p key={index} className="text-gray-600 dark:text-gray-400 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedText }} />
      );
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6 p-4">
        {/* Header */}
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-xl">
          <a href="/lessons" className="flex items-center text-indigo-600 dark:text-indigo-400 hover:underline mb-4">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Lessons
          </a>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
            {lesson.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            A comprehensive guide to {lesson.title.toLowerCase()}.
          </p>
        </div>

        {/* Content Sections */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-gray-700/20 shadow-lg space-y-8">
          {lesson.sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{section.heading}</h2>
              {renderContent(section.content)}
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}