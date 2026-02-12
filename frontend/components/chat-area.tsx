"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  PanelRightOpen,
  PanelRightClose,
  Copy,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Sparkles,
  ChevronDown,
  MessageSquare,
  Zap,
  Link,
  Settings2,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  codeBlock?: {
    language: string;
    code: string;
    filename?: string;
  };
}

interface ChatAreaProps {
  selectedChatId: string | null;
  isSplitView: boolean;
  onToggleSplit: () => void;
  onOpenSidebar?: () => void;
  isMobile?: boolean;
}

const sampleMessages: Message[] = [
  {
    id: "m1",
    role: "user",
    content: "React Server Components와 Client Components의 차이점을 설명해주세요.",
    timestamp: "오후 2:30",
  },
  {
    id: "m2",
    role: "assistant",
    content:
      "React Server Components(RSC)와 Client Components는 렌더링 위치와 기능에서 핵심적인 차이가 있습니다.\n\n**Server Components**는 서버에서만 실행되며, 번들 크기에 영향을 주지 않습니다. 데이터베이스나 파일 시스템에 직접 접근할 수 있고, `async/await`를 자연스럽게 사용할 수 있습니다.\n\n**Client Components**는 브라우저에서 실행되며, `useState`, `useEffect` 같은 React 훅을 사용할 수 있습니다. 사용자 인터랙션을 처리하고, 브라우저 API에 접근할 수 있습니다.",
    timestamp: "오후 2:31",
    codeBlock: {
      language: "tsx",
      filename: "server-component.tsx",
      code: `// Server Component (기본값)
async function ServerComponent() {
  const data = await db.query('SELECT * FROM posts');
  return (
    <div>
      {data.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </article>
      ))}
    </div>
  );
}

// Client Component
'use client'
import { useState } from 'react';

function ClientComponent() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicks: {count}
    </button>
  );
}`,
    },
  },
  {
    id: "m3",
    role: "user",
    content:
      "Server Components에서 데이터를 가져와서 Client Components에 전달하는 패턴을 보여주세요.",
    timestamp: "오후 2:35",
  },
  {
    id: "m4",
    role: "assistant",
    content:
      "Server Components에서 Client Components로 데이터를 전달하는 패턴은 매우 직관적입니다. Server Component에서 데이터를 fetch한 후, Client Component의 props로 전달하면 됩니다.",
    timestamp: "오후 2:36",
    codeBlock: {
      language: "tsx",
      filename: "data-passing-pattern.tsx",
      code: `// app/posts/page.tsx (Server Component)
export default async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts').then(res => res.json());
  return <PostList initialPosts={posts} />;
}

// app/posts/post-list.tsx (Client Component)
'use client'
export function PostList({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}`,
    },
  },
];

function EmptyState({
  input,
  textareaRef,
  onInputChange,
  onInputKeyDown,
  onSend,
  selectedMode,
  setSelectedMode,
  dropdownOpen,
  setDropdownOpen,
  modes,
  currentMode,
}: {
  input: string;
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onInputKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
  selectedMode: "chat" | "agent";
  setSelectedMode: (mode: "chat" | "agent") => void;
  dropdownOpen: boolean;
  setDropdownOpen: (open: boolean) => void;
  modes: Array<{
    id: "chat" | "agent";
    name: string;
    description: string;
    icon: typeof MessageSquare | typeof Zap;
  }>;
  currentMode: {
    id: "chat" | "agent";
    name: string;
    description: string;
    icon: typeof MessageSquare | typeof Zap;
  };
}) {

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-3 sm:px-4 md:px-6">
      <div className="mb-3 sm:mb-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl border border-border/70 bg-card shadow-sm">
        <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
      </div>
      <h2 className="mb-1 text-center text-lg sm:text-xl font-semibold tracking-tight text-foreground">
        무엇을 시작해볼까요?
      </h2>
      <p className="mb-4 sm:mb-6 text-center text-xs text-muted-foreground px-4">
        질문, 코드 생성, 리팩토링 요청까지 한 번에 입력해보세요.
      </p>
      {/* 반응형 입력창 컨테이너 - 12-Grid 기반 */}
      <div className="mb-4 w-full max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl rounded-2xl border border-border/70 bg-card/90 p-1.5 sm:p-2 shadow-lg shadow-primary/5 backdrop-blur">
        <div className="rounded-xl border border-border/60 bg-background/80 px-2 py-1.5">
          {/* 텍스트 입력 영역 - 반응형 */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={onInputChange}
            onKeyDown={onInputKeyDown}
            placeholder="오늘 해결하고 싶은 작업을 입력하세요"
            rows={2}
            className="max-h-[180px] min-h-[50px] sm:min-h-[60px] w-full resize-none bg-transparent text-xs sm:text-sm leading-relaxed text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <div className="mt-1 sm:mt-1.5 flex items-center justify-between border-t border-border/60 pt-1 sm:pt-1.5">
            <div className="flex items-center gap-0.5 sm:gap-1">
              {/* 파일 첨부 */}
              <button className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                <Paperclip className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </button>
              {/* 커넥터 */}
              <button className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                <Link className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
              </button>
              {/* 모드 선택 */}
              <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenu.Trigger asChild>
                  <button className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:outline-none">
                    <Settings2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="z-50 min-w-[220px] rounded-xl border border-border bg-card p-1.5 shadow-xl"
                    sideOffset={8}
                    align="start"
                  >
                    {modes.map((mode) => (
                      <DropdownMenu.Item
                        key={mode.id}
                        className="group flex cursor-pointer items-start gap-2.5 rounded-lg px-2.5 py-2 outline-none transition-colors hover:bg-accent focus:bg-accent"
                        onSelect={() => setSelectedMode(mode.id)}
                      >
                        <div
                          className={cn(
                            "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                            selectedMode === mode.id
                              ? "bg-primary/10 text-primary"
                              : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                          )}
                        >
                          <mode.icon className="h-3.5 w-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-foreground">
                              {mode.name}
                            </span>
                            {selectedMode === mode.id && (
                              <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary">
                                <svg
                                  className="h-2 w-2 text-primary-foreground"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                          <p className="mt-0.5 text-[10px] text-muted-foreground">
                            {mode.description}
                          </p>
                        </div>
                      </DropdownMenu.Item>
                    ))}
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
            <button
              onClick={onSend}
              disabled={!input.trim()}
              className={cn(
                "flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                input.trim()
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <Send className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full gap-1.5 sm:gap-2",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
          <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-primary" />
        </div>
      )}
      <div
        className={cn(
          "flex max-w-[85%] sm:max-w-[80%] md:max-w-[75%] flex-col gap-1 sm:gap-1.5",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-lg sm:rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm leading-relaxed",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-card text-card-foreground border border-border"
          )}
        >
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
        </div>
        {!isUser && (
          <div className="hidden sm:flex items-center gap-0.5 px-1">
            <button className="flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              <Copy className="h-2.5 w-2.5" />
            </button>
            <button className="flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              <ThumbsUp className="h-2.5 w-2.5" />
            </button>
            <button className="flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              <ThumbsDown className="h-2.5 w-2.5" />
            </button>
            <button className="flex h-5 w-5 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              <RotateCcw className="h-2.5 w-2.5" />
            </button>
          </div>
        )}
        <span className="px-1 text-[9px] sm:text-[10px] text-muted-foreground">
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}

function SplitPanelContent({ messages }: { messages: Message[] }) {
  const codeMessage = [...messages].reverse().find((m) => m.codeBlock);

  if (!codeMessage?.codeBlock) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card">
          <PanelRightOpen className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="mb-1 text-sm font-medium text-foreground">
          미리보기 패널
        </h3>
        <p className="text-xs text-muted-foreground">
          코드 블록이나 콘텐츠가 여기에 표시됩니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-primary/20" />
          <span className="text-sm font-medium text-foreground">
            {codeMessage.codeBlock.filename || "코드 미리보기"}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
            {codeMessage.codeBlock.language}
          </span>
          <button className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <ScrollArea className="flex-1">
        <pre className="p-4 text-sm leading-relaxed">
          <code className="text-foreground">{codeMessage.codeBlock.code}</code>
        </pre>
      </ScrollArea>
    </div>
  );
}

export function ChatArea({
  selectedChatId,
  isSplitView,
  onToggleSplit,
  onOpenSidebar,
  isMobile = false,
}: ChatAreaProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(
    selectedChatId ? sampleMessages : []
  );
  const [selectedMode, setSelectedMode] = useState<"chat" | "agent">("chat");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const modes = [
    {
      id: "chat" as const,
      name: "일반 채팅",
      description: "빠른 질문과 답변",
      icon: MessageSquare,
    },
    {
      id: "agent" as const,
      name: "Deep Agent",
      description: "복잡한 작업 처리",
      icon: Zap,
    },
  ];

  const currentMode = modes.find((m) => m.id === selectedMode)!;

  useEffect(() => {
    if (selectedChatId) {
      setMessages(sampleMessages);
    } else {
      setMessages([]);
    }
  }, [selectedChatId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: Message = {
      id: `m${Date.now()}`,
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString("ko-KR", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const chatContent = (
    <div className="flex h-full flex-col">
      <div className="flex shrink-0 items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-2">
          {/* 모바일 메뉴 버튼 */}
          {isMobile && onOpenSidebar && (
            <button
              onClick={onOpenSidebar}
              className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
              title="메뉴 열기"
            >
              <Menu className="h-4 w-4" />
            </button>
          )}
          {selectedChatId && (
            <h1 className="text-xs sm:text-sm font-medium text-foreground truncate">
              {sampleMessages[0]?.content.slice(0, 40)}...
            </h1>
          )}
        </div>
        <button
          onClick={onToggleSplit}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          title={isSplitView ? "패널 닫기" : "패널 열기"}
        >
          {isSplitView ? (
            <PanelRightClose className="h-3.5 w-3.5" />
          ) : (
            <PanelRightOpen className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {messages.length === 0 ? (
        <EmptyState
          input={input}
          textareaRef={textareaRef}
          onInputChange={handleTextareaChange}
          onInputKeyDown={handleKeyDown}
          onSend={handleSend}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          modes={modes}
          currentMode={currentMode}
        />
      ) : (
        <ScrollArea className="flex-1">
          <div ref={scrollRef} className="flex flex-col gap-3 sm:gap-4 px-3 py-3 sm:px-4 sm:py-4 md:px-6 lg:px-12">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        </ScrollArea>
      )}

      {messages.length > 0 && (
        <div className="shrink-0 border-t border-border px-3 pb-2 pt-1.5 sm:px-4 sm:pb-3 sm:pt-2 md:px-6 lg:px-12">
          <div className="mx-auto max-w-full sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
            <div className="relative rounded-lg sm:rounded-xl border border-border bg-card p-1 sm:p-1.5 shadow-sm transition-shadow focus-within:shadow-md focus-within:ring-1 focus-within:ring-ring">
              {/* 텍스트 입력 - 반응형 */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="메시지를 입력하세요..."
                rows={1}
                className="max-h-[120px] sm:max-h-[160px] min-h-[28px] sm:min-h-[32px] w-full resize-none bg-transparent px-1 py-1 sm:py-1.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              />
              
              {/* 하단 버튼 영역 - 반응형 */}
              <div className="flex items-center justify-between border-t border-border/60 pt-1 sm:pt-1.5 mt-0.5 sm:mt-1">
                <div className="flex items-center gap-0.5 sm:gap-1">
                  {/* 파일 첨부 */}
                  <button className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                    <Paperclip className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </button>
                  {/* 커넥터 */}
                  <button className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                    <Link className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                  </button>
                  {/* 모드 선택 */}
                  <DropdownMenu.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
                    <DropdownMenu.Trigger asChild>
                      <button className="flex h-6 w-6 sm:h-7 sm:w-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus:outline-none">
                        <Settings2 className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                      <DropdownMenu.Content
                        className="z-50 min-w-[220px] rounded-xl border border-border bg-card p-1.5 shadow-xl"
                        sideOffset={8}
                        align="start"
                      >
                        {modes.map((mode) => (
                          <DropdownMenu.Item
                            key={mode.id}
                            className="group flex cursor-pointer items-start gap-2.5 rounded-lg px-2.5 py-2 outline-none transition-colors hover:bg-accent focus:bg-accent"
                            onSelect={() => setSelectedMode(mode.id)}
                          >
                            <div
                              className={cn(
                                "flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                                selectedMode === mode.id
                                  ? "bg-primary/10 text-primary"
                                  : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                              )}
                            >
                              <mode.icon className="h-3.5 w-3.5" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-foreground">
                                  {mode.name}
                                </span>
                                {selectedMode === mode.id && (
                                  <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary">
                                    <svg
                                      className="h-2 w-2 text-primary-foreground"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={3}
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <p className="mt-0.5 text-[10px] text-muted-foreground">
                                {mode.description}
                              </p>
                            </div>
                          </DropdownMenu.Item>
                        ))}
                      </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                  </DropdownMenu.Root>
                </div>
                
                {/* 전송 버튼 - 반응형 */}
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={cn(
                    "flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg transition-colors",
                    input.trim()
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <Send className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </button>
              </div>
            </div>
            <p className="mt-1 sm:mt-1.5 text-center text-[9px] sm:text-[10px] text-muted-foreground hidden sm:block">
              Sentinel은 실수할 수 있습니다. 중요한 정보는 직접 확인하세요.
            </p>
          </div>
        </div>
      )}
    </div>
  );

  if (isSplitView) {
    return (
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={55} minSize={35}>
          {chatContent}
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={45} minSize={25}>
          <div className="h-full bg-background">
            <SplitPanelContent messages={messages} />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  }

  return chatContent;
}
