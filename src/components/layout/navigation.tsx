import { Home, FileText, Receipt, CreditCard, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export function Navigation() {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { path: "/", label: "Главная", icon: Home },
    { path: "/documents", label: "Документы", icon: FileText },
    { path: "/invoices", label: "Счета", icon: Receipt },
    { path: "/payments", label: "Платежи", icon: CreditCard },
    { path: "/more", label: "Еще", icon: MoreHorizontal },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-100 bg-white/80 pb-safe backdrop-blur-xl md:hidden">
        <div className="flex h-16 items-center justify-around px-2">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (currentPath.startsWith(item.path) && item.path !== "/");
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center space-y-1 w-16 h-full transition-colors",
                  isActive ? "text-orange-500" : "text-gray-400 hover:text-gray-600"
                )}
              >
                <item.icon className={cn("h-6 w-6", isActive && "fill-orange-500/20")} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-col w-64 border-r border-gray-100 bg-white/50 backdrop-blur-xl h-screen sticky top-0 p-6">
        <div className="flex items-center space-x-3 mb-12">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-sm">A</span>
          </div>
          <span className="font-semibold text-gray-900 tracking-tight">AutoSub</span>
        </div>
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = currentPath === item.path || (currentPath.startsWith(item.path) && item.path !== "/");
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all",
                  isActive
                    ? "bg-orange-50 text-orange-600 font-medium"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive && "fill-orange-500/20")} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-6 border-t border-gray-100">
          <Link to="/profile" className="flex items-center space-x-3 px-4 py-2 hover:bg-gray-50 rounded-xl transition-colors">
            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              <img src="https://picsum.photos/seed/alexey/100/100" alt="Алексей" className="h-full w-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-gray-900">Алексей С.</span>
              <span className="text-xs text-gray-500">Комфорт</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
