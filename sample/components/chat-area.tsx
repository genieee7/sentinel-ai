"use client";

import React from "react"

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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SentinelLogo } from "@/components/sentinel-logo";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

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
      "Server Components에서 Client Components로 데이터를 전달하는 패턴은 매우 직관적입니다. Server Component에서 데이터를 fetch한 후, Client Component의 props로 전달하면 됩니다. 이 패턴을 통해 서버의 성능 이점과 클라이언트의 인터랙티브한 기능을 동시에 활용할 수 있습니다.",
    timestamp: "오후 2:36",
    codeBlock: {
      language: "tsx",
      filename: "data-passing-pattern.tsx",
      code: `// app/posts/page.tsx (Server Component)
import { PostList } from './post-list';

export default async function PostsPage() {
  const posts = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 }
  }).then(res => res.json());
  
  return (
    <main>
      <h1>Posts</h1>
      <PostList initialPosts={posts} />
    </main>
  );
}

// app/posts/post-list.tsx (Client Component)
'use client'
import { useState } from 'react';

export function PostList({ initialPosts }) {
  const [posts, setPosts] = useState(initialPosts);
  const [filter, setFilter] = useState('');
  
  const filtered = posts.filter(p => 
    p.title.includes(filter)
  );
  
  return (
    <div>
      <input 
        value={filter}
        onChange={e => setFilter(e.target.value)}
        placeholder="Search posts..."
      />
      {filtered.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}`,
    },
  },
];

function EmptyState({ onExampleClick }: { onExampleClick: (text: string) => void }) {
  const examples = [
    "React 컴포넌트 최적화 방법을 알려주세요",
    "TypeScript의 고급 타입 패턴을 설명해주세요",
    "Next.js App Router의 데이터 페칭 전략",
    "REST API vs GraphQL 비교 분석",
  ];

  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card">
        <Sparkles className="h-7 w-7 text-primary" />
      </div>
      <h2 className="mb-2 text-xl font-semibold text-foreground">
        무엇을 도와드릴까요?
      </h2>
      <p className="mb-8 text-center text-sm text-muted-foreground">
        코드 작성, 디버깅, 아키텍처 설계 등 무엇이든 물어보세요.
      </p>
      <div className="grid w-full max-w-lg grid-cols-1 gap-2 sm:grid-cols-2">
        {examples.map((example) => (
          <button
            key={example}
            onClick={() => onExampleClick(example)}
            className="rounded-xl border border-border bg-card px-4 py-3 text-left text-sm text-foreground transition-colors hover:bg-accent"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex w-full gap-3",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border bg-card">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
        </div>
      )}
      <div
        className={cn(
          "flex max-w-[75%] flex-col gap-2",
          isUser ? "items-end" : "items-start"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-card text-card-foreground border border-border"
          )}
        >
          <div className="whitespace-pre-wrap">{message.content}</div>
        </div>
        {!isUser && (
          <div className="flex items-center gap-1 px-1">
            <button className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              <Copy className="h-3 w-3" />
            </button>
            <button className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              <ThumbsUp className="h-3 w-3" />
            </button>
            <button className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              <ThumbsDown className="h-3 w-3" />
            </button>
            <button className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              <RotateCcw className="h-3 w-3" />
            </button>
          </div>
        )}
        <span className="px-1 text-[11px] text-muted-foreground">
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
}: ChatAreaProps) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>(
    selectedChatId ? sampleMessages : []
  );
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      {/* Top Bar */}
      <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-2">
          {selectedChatId ? (
            <h1 className="text-sm font-medium text-foreground">
              {sampleMessages[0]?.content.slice(0, 40)}...
            </h1>
          ) : (
            <h1 className="text-sm font-medium text-foreground">새 대화</h1>
          )}
        </div>
        <button
          onClick={onToggleSplit}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          title={isSplitView ? "패널 닫기" : "패널 열기"}
        >
          {isSplitView ? (
            <PanelRightClose className="h-4 w-4" />
          ) : (
            <PanelRightOpen className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Messages */}
      {messages.length === 0 ? (
        <EmptyState
          onExampleClick={(text) => {
            setInput(text);
            textareaRef.current?.focus();
          }}
        />
      ) : (
        <ScrollArea className="flex-1">
          <div ref={scrollRef} className="flex flex-col gap-6 px-4 py-6 md:px-8 lg:px-16">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        </ScrollArea>
      )}

      {/* Input Area */}
      <div className="shrink-0 border-t border-border px-4 pb-4 pt-3 md:px-8 lg:px-16">
        <div className="mx-auto max-w-3xl">
          <div className="relative flex items-end rounded-2xl border border-border bg-card shadow-sm transition-shadow focus-within:shadow-md focus-within:ring-1 focus-within:ring-ring">
            <button className="flex h-10 w-10 shrink-0 items-center justify-center text-muted-foreground transition-colors hover:text-foreground">
              <Paperclip className="h-4 w-4" />
            </button>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              placeholder="메시지를 입력하세요..."
              rows={1}
              className="max-h-[200px] min-h-[40px] flex-1 resize-none bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={cn(
                "flex h-10 w-10 shrink-0 items-center justify-center transition-colors",
                input.trim()
                  ? "text-primary hover:text-primary/80"
                  : "text-muted-foreground/40"
              )}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">
            Sentinel은 실수할 수 있습니다. 중요한 정보는 직접 확인하세요.
          </p>
        </div>
      </div>
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
