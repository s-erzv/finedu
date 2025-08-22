const Badge = ({ icon, text }) => (
  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold border border-purple-200/50 shadow-sm">
    <span className="text-lg">{icon}</span>
    <span>{text}</span>
  </div>
);

export default Badge;