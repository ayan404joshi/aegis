"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/topbar";
import { Settings as SettingsIcon, Bell, Lock, User, Palette, Save, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type SettingSection = "profile" | "notifications" | "privacy" | "appearance" | null;

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingSection>(null);
  const [profileData, setProfileData] = useState({
    name: "Admin User",
    email: "admin@aegis.ai",
    role: "Administrator",
    company: "AEGIS Inc.",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    analysisComplete: true,
    weeklyReport: false,
    productUpdates: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    dataCollection: true,
    analytics: true,
    shareWithTeam: false,
    publicProfile: false,
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "dark",
    compactMode: false,
    animationsEnabled: true,
    sidebarCollapsed: false,
  });

  const handleSave = (section: SettingSection) => {
    // In production: Save to backend
    console.log(`Saving ${section} settings`);
    alert(`${section?.charAt(0).toUpperCase()}${section?.slice(1)} settings saved successfully!`);
    setActiveSection(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Settings</h1>
            <p className="text-lg text-muted-foreground">Manage your preferences</p>
          </div>

          <div className="grid gap-6">
            {[
              { 
                id: "profile" as const,
                icon: User, 
                title: "Profile", 
                description: "Manage your account details" 
              },
              { 
                id: "notifications" as const,
                icon: Bell, 
                title: "Notifications", 
                description: "Configure notification preferences" 
              },
              { 
                id: "privacy" as const,
                icon: Lock, 
                title: "Privacy", 
                description: "Control your data and privacy" 
              },
              { 
                id: "appearance" as const,
                icon: Palette, 
                title: "Appearance", 
                description: "Customize the interface" 
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className="card-gradient p-6 rounded-2xl flex items-center gap-4 cursor-pointer hover:border-primary/30 text-left transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Settings Modals */}
          <AnimatePresence>
            {activeSection && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
                onClick={() => setActiveSection(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-card border border-border rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
                >
                  {/* Profile Settings */}
                  {activeSection === "profile" && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <User className="w-6 h-6 text-primary" />
                          <h2 className="text-2xl font-bold">Profile Settings</h2>
                        </div>
                        <button
                          onClick={() => setActiveSection(null)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold mb-2">Full Name</label>
                          <input
                            type="text"
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Email Address</label>
                          <input
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Role</label>
                          <input
                            type="text"
                            value={profileData.role}
                            onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold mb-2">Company</label>
                          <input
                            type="text"
                            value={profileData.company}
                            onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                            className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50"
                          />
                        </div>

                        <button
                          onClick={() => handleSave("profile")}
                          className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                          <Save className="w-5 h-5" />
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Notification Settings */}
                  {activeSection === "notifications" && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <Bell className="w-6 h-6 text-primary" />
                          <h2 className="text-2xl font-bold">Notification Settings</h2>
                        </div>
                        <button
                          onClick={() => setActiveSection(null)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        {[
                          { key: "emailNotifications", label: "Email Notifications", description: "Receive notifications via email" },
                          { key: "pushNotifications", label: "Push Notifications", description: "Browser push notifications" },
                          { key: "analysisComplete", label: "Analysis Complete", description: "Notify when resume analysis is done" },
                          { key: "weeklyReport", label: "Weekly Reports", description: "Get weekly summary of your activity" },
                          { key: "productUpdates", label: "Product Updates", description: "Stay informed about new features" },
                        ].map((setting) => (
                          <div key={setting.key} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                            <div>
                              <p className="font-semibold">{setting.label}</p>
                              <p className="text-sm text-muted-foreground">{setting.description}</p>
                            </div>
                            <button
                              onClick={() => setNotificationSettings({
                                ...notificationSettings,
                                [setting.key]: !notificationSettings[setting.key as keyof typeof notificationSettings]
                              })}
                              className={`relative w-12 h-6 rounded-full transition-colors ${
                                notificationSettings[setting.key as keyof typeof notificationSettings]
                                  ? "bg-primary"
                                  : "bg-muted"
                              }`}
                            >
                              <div
                                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                                  notificationSettings[setting.key as keyof typeof notificationSettings]
                                    ? "translate-x-6"
                                    : "translate-x-0"
                                }`}
                              />
                            </button>
                          </div>
                        ))}

                        <button
                          onClick={() => handleSave("notifications")}
                          className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-6"
                        >
                          <Save className="w-5 h-5" />
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Privacy Settings */}
                  {activeSection === "privacy" && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <Lock className="w-6 h-6 text-primary" />
                          <h2 className="text-2xl font-bold">Privacy Settings</h2>
                        </div>
                        <button
                          onClick={() => setActiveSection(null)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-4">
                        {[
                          { key: "dataCollection", label: "Data Collection", description: "Allow us to collect usage data to improve the service" },
                          { key: "analytics", label: "Analytics", description: "Help us understand how you use AEGIS" },
                          { key: "shareWithTeam", label: "Share with Team", description: "Allow team members to view your analysis history" },
                          { key: "publicProfile", label: "Public Profile", description: "Make your profile visible to other users" },
                        ].map((setting) => (
                          <div key={setting.key} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                            <div>
                              <p className="font-semibold">{setting.label}</p>
                              <p className="text-sm text-muted-foreground">{setting.description}</p>
                            </div>
                            <button
                              onClick={() => setPrivacySettings({
                                ...privacySettings,
                                [setting.key]: !privacySettings[setting.key as keyof typeof privacySettings]
                              })}
                              className={`relative w-12 h-6 rounded-full transition-colors ${
                                privacySettings[setting.key as keyof typeof privacySettings]
                                  ? "bg-primary"
                                  : "bg-muted"
                              }`}
                            >
                              <div
                                className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                                  privacySettings[setting.key as keyof typeof privacySettings]
                                    ? "translate-x-6"
                                    : "translate-x-0"
                                }`}
                              />
                            </button>
                          </div>
                        ))}

                        <button
                          onClick={() => handleSave("privacy")}
                          className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2 mt-6"
                        >
                          <Save className="w-5 h-5" />
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Appearance Settings */}
                  {activeSection === "appearance" && (
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <Palette className="w-6 h-6 text-primary" />
                          <h2 className="text-2xl font-bold">Appearance Settings</h2>
                        </div>
                        <button
                          onClick={() => setActiveSection(null)}
                          className="p-2 hover:bg-muted rounded-lg transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-semibold mb-3">Theme</label>
                          <div className="grid grid-cols-3 gap-3">
                            {["light", "dark", "system"].map((theme) => (
                              <button
                                key={theme}
                                onClick={() => setAppearanceSettings({ ...appearanceSettings, theme })}
                                className={`p-4 rounded-xl border-2 transition-all ${
                                  appearanceSettings.theme === theme
                                    ? "border-primary bg-primary/10"
                                    : "border-border hover:border-primary/50"
                                }`}
                              >
                                <p className="font-semibold capitalize">{theme}</p>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          {[
                            { key: "compactMode", label: "Compact Mode", description: "Reduce spacing for more content" },
                            { key: "animationsEnabled", label: "Animations", description: "Enable smooth transitions and animations" },
                            { key: "sidebarCollapsed", label: "Collapsed Sidebar", description: "Start with sidebar minimized" },
                          ].map((setting) => (
                            <div key={setting.key} className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                              <div>
                                <p className="font-semibold">{setting.label}</p>
                                <p className="text-sm text-muted-foreground">{setting.description}</p>
                              </div>
                              <button
                                onClick={() => setAppearanceSettings({
                                  ...appearanceSettings,
                                  [setting.key]: !appearanceSettings[setting.key as keyof typeof appearanceSettings]
                                })}
                                className={`relative w-12 h-6 rounded-full transition-colors ${
                                  appearanceSettings[setting.key as keyof typeof appearanceSettings]
                                    ? "bg-primary"
                                    : "bg-muted"
                                }`}
                              >
                                <div
                                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${
                                    appearanceSettings[setting.key as keyof typeof appearanceSettings]
                                      ? "translate-x-6"
                                      : "translate-x-0"
                                  }`}
                                />
                              </button>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => handleSave("appearance")}
                          className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2"
                        >
                          <Save className="w-5 h-5" />
                          Save Changes
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
