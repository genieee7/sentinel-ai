"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  FolderOpen,
  MessageSquare,
  ChevronLeft,
  Settings,
  MoreHorizontal,
  Trash2,
  Pencil,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SentinelLogo } from "@/components/sentinel-logo";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatHistory {
  id: string;
  title: string;
  date: string;
  category: "today" | "yesterday" | "week" | "month";
}

interface ChatSidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  selectedChatId: string | null;
  onOpenSettings: () => void;
}

const chatHistory: ChatHistory[] = [
  { id: "1", title: "React 서버 컴포넌트 분석", date: "10분 전", category: "today" },
  { id: "2", title: "TypeScript 제네릭 패턴", date: "1시간 전", category: "today" },
  { id: "3", title: "Next.js 미들웨어 구현", date: "3시간 전", category: "today" },
  { id: "4", title: "데이터베이스 스키마 설계", date: "어제", category: "yesterday" },
  { id: "5", title: "API 엔드포인트 최적화", date: "어제", category: "yesterday" },
  { id: "6", title: "Docker 컨테이너 설정", date: "어제", category: "yesterday" },
  { id: "7", title: "CI/CD 파이프라인 구축", date: "3일 전", category: "week" },
  { id: "8", title: "인증 시스템 아키텍처", date: "5일 전", category: "week" },
  { id: "9", title: "WebSocket 실시간 채팅", date: "1주 전", category: "week" },
  { id: "10", title: "Kubernetes 클러스터 관리", date: "2주 전", category: "month" },
  { id: "11", title: "GraphQL 스키마 디자인", date: "3주 전", category: "month" },
];

const categories = [
  { key: "today" as const, label: "오늘" },
  { key: "yesterday" as const, label: "어제" },
  { key: "week" as const, label: "이번 주" },
  { key: "month" as const, label: "이번 달" },
];

export function ChatSidebar({
  collapsed,
  onToggleCollapse,
  onNewChat,
  onSelectChat,
  selectedChatId,
  onOpenSettings,
}: ChatSidebarProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredHistory = searchQuery
    ? chatHistory.filter((chat) =>
        chat.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : chatHistory;

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "flex h-full flex-col border-r border-border bg-sidebar transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-72"
        )}
      >
        <div
          className={cn(
            "flex shrink-0 items-center border-b border-sidebar-border",
            collapsed ? "justify-center px-2 py-4" : "justify-between px-4 py-4"
          )}
        >
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={onToggleCollapse}
                  className="flex items-center justify-center rounded-lg p-1 transition-colors hover:bg-sidebar-accent"
                >
                  <SentinelLogo collapsed />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">사이드바 열기</TooltipContent>
            </Tooltip>
          ) : (
            <>
              <SentinelLogo />
              <button
                onClick={onToggleCollapse}
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </>
          )}
        </div>

        <div
          className={cn(
            "flex shrink-0 flex-col gap-1 border-b border-sidebar-border",
            collapsed ? "items-center px-2 py-3" : "px-3 py-3"
          )}
        >
          {collapsed ? (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onNewChat}
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">새 대화</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">검색</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="flex h-9 w-9 items-center justify-center rounded-lg text-sidebar-foreground transition-colors hover:bg-sidebar-accent">
                    <FolderOpen className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">프로젝트</TooltipContent>
              </Tooltip>
            </>
          ) : (
            <>
              <button
                onClick={onNewChat}
                className="flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Plus className="h-4 w-4" />
                <span>새 대화</span>
              </button>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
              >
                <Search className="h-4 w-4" />
                <span>검색</span>
              </button>
              <button className="flex h-9 items-center gap-2 rounded-lg px-3 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent">
                <FolderOpen className="h-4 w-4" />
                <span>프로젝트</span>
              </button>
            </>
          )}
        </div>

        {searchOpen && !collapsed && (
          <div className="shrink-0 px-3 py-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="대화 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-8 w-full rounded-md border border-input bg-background pl-8 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                autoFocus
              />
            </div>
          </div>
        )}

        <ScrollArea className="flex-1">
          <div className={cn("py-2", collapsed ? "px-2" : "px-2")}>
            {collapsed ? (
              <div className="flex flex-col items-center gap-1">
                {filteredHistory.slice(0, 8).map((chat) => (
                  <Tooltip key={chat.id}>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => onSelectChat(chat.id)}
                        className={cn(
                          "flex h-9 w-9 items-center justify-center rounded-lg transition-colors",
                          selectedChatId === chat.id
                            ? "bg-sidebar-accent text-sidebar-accent-foreground"
                            : "text-sidebar-foreground hover:bg-sidebar-accent"
                        )}
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="right">{chat.title}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {categories.map((category) => {
                  const chats = filteredHistory.filter(
                    (c) => c.category === category.key
                  );
                  if (chats.length === 0) return null;
                  return (
                    <div key={category.key}>
                      <div className="mb-1 px-2 text-xs font-medium text-muted-foreground">
                        {category.label}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        {chats.map((chat) => (
                          <div
                            key={chat.id}
                            className={cn(
                              "group flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors",
                              selectedChatId === chat.id
                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                : "text-sidebar-foreground hover:bg-sidebar-accent"
                            )}
                          >
                            <button
                              onClick={() => onSelectChat(chat.id)}
                              className="flex flex-1 items-center gap-2 truncate text-left"
                            >
                              <Hash className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                              <span className="truncate text-sm">
                                {chat.title}
                              </span>
                            </button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <button className="flex h-6 w-6 shrink-0 items-center justify-center rounded opacity-0 transition-opacity hover:bg-background group-hover:opacity-100">
                                  <MoreHorizontal className="h-3.5 w-3.5" />
                                </button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent
                                align="start"
                                side="right"
                                className="w-40"
                              >
                                <DropdownMenuItem>
                                  <Pencil className="mr-2 h-3.5 w-3.5" />
                                  이름 변경
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-destructive">
                                  <Trash2 className="mr-2 h-3.5 w-3.5" />
                                  삭제
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>

        <div
          className={cn(
            "shrink-0 border-t border-sidebar-border",
            collapsed ? "px-2 py-3" : "px-3 py-3"
          )}
        >
          {collapsed ? (
            <div className="flex flex-col items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={onOpenSettings}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">설정</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="flex h-9 w-9 items-center justify-center">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="bg-primary/10 text-xs text-primary">
                        U
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right">사용자 계정</TooltipContent>
              </Tooltip>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <button
                onClick={onOpenSettings}
                className="flex h-9 items-center gap-2 rounded-lg px-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent"
              >
                <Settings className="h-4 w-4" />
                <span>설정</span>
              </button>
              <div className="flex items-center gap-2.5 rounded-lg px-2 py-1.5">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className="bg-primary/10 text-xs text-primary">
                    U
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-sidebar-accent-foreground">
                    사용자
                  </span>
                  <span className="text-xs text-muted-foreground">
                    user@sentinel.ai
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </TooltipProvider>
  );
}
