"use client";

import { useState } from "react";
import { Bell, User, LogOut, X, CheckCircle2 } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export function TopBar() {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Resume analysis completed", read: false, time: "2 min ago" },
    { id: 2, text: "New interview feedback available", read: false, time: "1 hour ago" },
    { id: 3, text: "System update scheduled for tonight", read: true, time: "3 hours ago" },
  ]);

  const handleLogout = () => {
    // In production: Clear auth tokens, session, etc.
    console.log("Logging out...");
    // Simulate logout with alert
    if (confirm("Are you sure you want to logout?")) {
      // Redirect to landing page
      router.push("/");
    }
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const clearAll = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="h-16 border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-40">
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left side - can be empty or show page title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border/50">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-primary">Live</span>
          </div>
        </div>

        {/* Right side - actions */}
        <div className="flex items-center gap-4">
          <ThemeToggle />
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={handleNotificationClick}
              className="relative p-2 hover:bg-card rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </button>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
                >
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <h3 className="font-semibold">Notifications</h3>
                    <button
                      onClick={clearAll}
                      className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-muted-foreground">
                        <Bell className="w-12 h-12 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => markAsRead(notification.id)}
                          className={`p-4 border-b border-border/50 hover:bg-muted/30 cursor-pointer transition-colors ${
                            !notification.read ? "bg-primary/5" : ""
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <CheckCircle2 
                              className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                                notification.read ? "text-green-500" : "text-muted-foreground"
                              }`}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium">{notification.text}</p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.time}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Logout */}
          <button 
            onClick={handleLogout}
            className="p-2 hover:bg-card rounded-lg transition-colors group"
            title="Logout"
          >
            <LogOut className="w-5 h-5 group-hover:text-red-500 transition-colors" />
          </button>

          {/* User Profile */}
          <button 
            onClick={() => router.push("/settings")}
            className="flex items-center gap-3 pl-4 border-l border-border/50 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
