"use client";

import { useState, useEffect } from "react";
import { ChatSidebar } from "@/components/chat-sidebar";
import { ChatArea } from "@/components/chat-area";
import { SettingsDialog } from "@/components/settings-dialog";

export default function ChatPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isSplitView, setIsSplitView] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 반응형: 화면 크기 감지
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      
      // 1280px 이하에서 사이드바 자동 축소
      if (width <= 1280) {
        setSidebarCollapsed(true);
      }
      // 1440px 이상에서 사이드바 자동 확장
      else if (width >= 1440) {
        setSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleNewChat = () => {
    setSelectedChatId(null);
    setIsSplitView(false);
  };

  const handleSelectChat = (id: string) => {
    setSelectedChatId(id);
    // 모바일에서는 채팅 선택 시 사이드바 닫기
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  };

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background relative">
      {/* 모바일 오버레이 */}
      {isMobile && !sidebarCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
      
      {/* 사이드바 - 12-Grid 기반, 반응형 */}
      <ChatSidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        selectedChatId={selectedChatId}
        onOpenSettings={() => setSettingsOpen(true)}
        isMobile={isMobile}
      />
      
      {/* 메인 채팅 영역 - 12-Grid 기반, 반응형 */}
      <main className="flex-1 overflow-hidden">
        <ChatArea
          selectedChatId={selectedChatId}
          isSplitView={isSplitView}
          onToggleSplit={() => setIsSplitView(!isSplitView)}
          onOpenSidebar={() => setSidebarCollapsed(false)}
          isMobile={isMobile}
        />
      </main>
      
      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  );
}
