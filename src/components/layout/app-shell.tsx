import { Navigation } from "./navigation";
import { Outlet } from "react-router-dom";

export function AppShell() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA] text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900 relative">
      {/* Subtle background gradients */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-100/30 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-amber-50/40 rounded-full blur-3xl translate-y-1/3" />
      </div>
      
      <Navigation />
      <main className="flex-1 pb-20 md:pb-0 relative z-10">
        <div className="mx-auto w-full max-w-3xl p-4 md:p-8 lg:p-12">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
