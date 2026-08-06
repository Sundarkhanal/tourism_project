import {
  FaTachometerAlt,
  FaNewspaper,
  FaMapMarkerAlt,
  FaBookOpen,
  FaUsers,
  FaChevronRight,
} from "react-icons/fa";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: FaTachometerAlt },
  { key: "destinations", label: "Destinations", icon: FaMapMarkerAlt },
  { key: "news", label: "News Articles", icon: FaNewspaper },
  { key: "blog", label: "Blog Posts", icon: FaBookOpen },
  { key: "reviews", label: "Reviews", icon: FaUsers },
];

function AdminSidebar({ active, onChange }) {
  return (
    <aside className="w-64 shrink-0 bg-white border-r border-gray-200 min-h-screen flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-600 rounded-xl flex items-center justify-center">
            <FaTachometerAlt className="text-white text-lg" />
          </div>

          <div>
            <h2 className="font-bold text-gray-900">Admin Panel</h2>
            <p className="text-sm text-gray-500">BatoSanjaal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-2">
        {navItems.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;

          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-teal-600 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon className="text-base" />

              <span className="flex-1 text-left">{label}</span>

              {isActive && (
                <FaChevronRight className="text-xs" />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default AdminSidebar;