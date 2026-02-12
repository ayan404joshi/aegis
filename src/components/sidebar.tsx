"use client";

import { LayoutDashboard, FileText, BarChart3, Settings, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { AegisLogo } from "./aegis-logo";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, badge: null },
  { name: "Mock Interviews", href: "/interviews", icon: User, badge: null },
  { name: "Analysis History", href: "/history", icon: FileText, badge: "12" },
  { name: "Reports", href: "/reports", icon: BarChart3, badge: null },
  { name: "Settings", href: "/settings", icon: Settings, badge: null },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-80 min-h-screen bg-background border-r border-border/50 flex flex-col">
      {/* Company Header */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-black flex items-center justify-center border border-border/30">
            <AegisLogo size={30} className="text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">AEGIS</h2>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">AI Platform</p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          ATS Resume Intelligence
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "sidebar-item",
                isActive && "active"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="flex-1 font-medium">{item.name}</span>
              {item.badge && (
                <span className="px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-border/50">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-card/50">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          </div>
          <div>
            <p className="text-sm font-medium text-green-500">System Ready</p>
            <p className="text-xs text-muted-foreground">All Systems Operational</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
