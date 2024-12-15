import { Sidebar, SidebarContent } from "./ui/sidebar";
import { Link } from "react-router-dom";

export default function FixedSidebarComponent() {
  return (
    <Sidebar>
      <SidebarContent className="mt-40">
        {/* Add your sidebar items here */}
        <div className="space-y-4">
          <Link to="/" className="block pl-6 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
            Event Calendar
          </Link>
          <Link to="/List" className="block pl-6 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
            Event List
          </Link>
          <Link to="/download" className="block pl-6 py-2 text-lg font-semibold text-gray-700 hover:bg-gray-200 rounded-md transition-colors">
            Download Section
          </Link>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
