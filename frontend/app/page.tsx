"use client";

import { useState } from "react";
import { ChatSidebar } from "@/components/chat-sidebar";
import { ChatArea } from "@/components/chat-area";
import { SettingsDialog } from "@/components/settings-dialog";

export default function Home() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isSplitView, setIsSplitView] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const handleNewChat = () => {
    setSelectedChatId(null);
    setIsSplitView(false);
  };

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
  };

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      <ChatSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        selectedChatId={selectedChatId}
        onOpenSettings={() => setSettingsOpen(true)}
      />
      <main className="flex-1 overflow-hidden">
        <ChatArea
          selectedChatId={selectedChatId}
          isSplitView={isSplitView}
          onToggleSplit={() => setIsSplitView(!isSplitView)}
        />
      </main>
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
