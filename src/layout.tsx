import { SidebarProvider } from "./components/ui/sidebar";
import FixedSidebarComponent from "./components/SideBar";
import Navbar from "./components/Navbar ";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      {/* Fullscreen layout */}
      <div className="h-screen w-screen flex flex-col">
        {/* Fixed Navbar */}
        <div className="fixed top-0 left-0 w-full z-10">
          <Navbar />
        </div>

        {/* Sidebar and Main Content */}
        <div className="flex flex-1 pt-16">
          {/* Fixed Sidebar */}
          <div className="fixed top-16 left-0 w-64 h-[calc(100%-4rem)] bg-gray-100 z-5">
            <FixedSidebarComponent />
          </div>

          {/* Main Content */}
          <main className="flex-1 ml-64 p-4 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
