import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/Home";
import LessonsPage from "./pages/Lessons";
import ToolsPage from "./pages/Tools";
import ArticlesPage from "./pages/Articles";
import LessonDetail from "./pages/LessonDetail";
import ProfilePage from "./pages/Profile";

import BudgetPlanner from "./pages/Tools/BudgetPlanner";
import FinancialCalculators from "./pages/Tools/FinancialCalculator";
import CurrencyConverter from "./pages/Tools/CurrencyConverter";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/lessons" element={<LessonsPage />} />
        <Route path="/lessons/:id" element={<LessonDetail />} />
        <Route path="/tools" element={<ToolsPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route path="/tools/budget-planner" element={<BudgetPlanner />} />
        <Route path="/tools/calculators" element={<FinancialCalculators />} />
        <Route path="/tools/currency-converter" element={<CurrencyConverter />} />
      </Routes>
    </Router>
  );
}

export default App;
