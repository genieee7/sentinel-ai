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
    content: "Python으로 간단한 웹 스크래퍼를 만들어줘",
    timestamp: "오후 2:15",
  },
  {
    id: "m2",
    role: "assistant",
    content: `requests와 BeautifulSoup을 사용한 간단한 웹 스크래퍼 예제입니다. 이 코드는 웹페이지의 제목과 링크를 추출합니다.

\`\`\`python
import requests
from bs4 import BeautifulSoup

def scrape_website(url):
    """웹사이트에서 데이터를 스크래핑하는 함수"""
    try:
        # 웹페이지 가져오기
        response = requests.get(url)
        response.raise_for_status()
        
        # HTML 파싱
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # 제목 추출
        title = soup.find('title')
        print(f"페이지 제목: {title.string if title else '없음'}")
        
        # 모든 링크 추출
        links = soup.find_all('a', href=True)
        print(f"\\n총 {len(links)}개의 링크 발견:\\n")
        
        for link in links[:10]:  # 처음 10개만 출력
            print(f"- {link.get('href')}")
            
    except Exception as e:
        print(f"에러 발생: {e}")

# 사용 예제
if __name__ == "__main__":
    scrape_website("https://example.com")
\`\`\``,
    timestamp: "오후 2:16",
  },
  {
    id: "m3",
    role: "user",
    content: "React Server Components와 Client Components의 차이점을 설명해주세요.",
    timestamp: "오후 2:30",
  },
  {
    id: "m4",
    role: "assistant",
    content: `React Server Components(RSC)와 Client Components는 렌더링 위치와 기능에서 핵심적인 차이가 있습니다.

**Server Components**는 서버에서만 실행되며, 번들 크기에 영향을 주지 않습니다. 데이터베이스나 파일 시스템에 직접 접근할 수 있고, \`async/await\`를 자연스럽게 사용할 수 있습니다.

**Client Components**는 브라우저에서 실행되며, \`useState\`, \`useEffect\` 같은 React 훅을 사용할 수 있습니다. 사용자 인터랙션을 처리하고, 브라우저 API에 접근할 수 있습니다.

\`\`\`tsx
// Server Component (기본값)
async function ServerComponent() {
  const data = await db.query('SELECT * FROM posts');
  
  return (
    <div className="space-y-4">
      {data.map(post => (
        <article key={post.id} className="p-4 border rounded">
          <h2 className="text-xl font-bold">{post.title}</h2>
          <p className="text-gray-600">{post.content}</p>
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
    <button 
      onClick={() => setCount(c => c + 1)}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Clicks: {count}
    </button>
  );
}
\`\`\``,
    timestamp: "오후 2:31",
  },
  {
    id: "m5",
    role: "user",
    content: "REST API를 만들 때 좋은 구조를 알려줘",
    timestamp: "오후 2:35",
  },
  {
    id: "m6",
    role: "assistant",
    content: `Express.js로 구조화된 REST API 예제입니다. 컨트롤러 패턴을 사용하여 깔끔한 코드 구조를 유지할 수 있습니다.

\`\`\`javascript
const express = require('express');
const router = express.Router();

// 데이터베이스 모델 (예시)
const User = require('../models/User');

// GET /api/users - 모든 사용자 조회
router.get('/', async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .limit(100);
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// GET /api/users/:id - 특정 사용자 조회
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// POST /api/users - 새 사용자 생성
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    
    res.status(201).json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
\`\`\``,
    timestamp: "오후 2:36",
  },
  {
    id: "m7",
    role: "user",
    content: "TypeScript의 타입 가드 예제를 보여줘",
    timestamp: "오후 2:40",
  },
  {
    id: "m8",
    role: "assistant",
    content: `TypeScript의 타입 가드는 런타임에 타입을 좁혀주는 강력한 기능입니다. 여러 가지 방법을 소개합니다.

\`\`\`typescript
// 1. typeof 타입 가드
function processValue(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase(); // string으로 좁혀짐
  }
  return value.toFixed(2); // number로 좁혀짐
}

// 2. instanceof 타입 가드
class Dog {
  bark() { console.log('Woof!'); }
}

class Cat {
  meow() { console.log('Meow!'); }
}

function makeSound(animal: Dog | Cat) {
  if (animal instanceof Dog) {
    animal.bark(); // Dog로 좁혀짐
  } else {
    animal.meow(); // Cat으로 좁혀짐
  }
}

// 3. 사용자 정의 타입 가드
interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

function move(pet: Fish | Bird) {
  if (isFish(pet)) {
    pet.swim(); // Fish로 좁혀짐
  } else {
    pet.fly(); // Bird로 좁혀짐
  }
}

// 4. in 연산자 타입 가드
type Admin = { name: string; privileges: string[] };
type User = { name: string; email: string };

function printInfo(person: Admin | User) {
  console.log(person.name);
  
  if ('privileges' in person) {
    console.log(person.privileges); // Admin으로 좁혀짐
  }
  
  if ('email' in person) {
    console.log(person.email); // User로 좁혀짐
  }
}
\`\`\``,
    timestamp: "오후 2:41",
  },
  {
    id: "m9",
    role: "user",
    content: "Docker Compose 설정 예제 좀 보여줄래?",
    timestamp: "오후 2:45",
  },
  {
    id: "m10",
    role: "assistant",
    content: `Node.js 앱과 PostgreSQL, Redis를 사용하는 Docker Compose 설정 예제입니다. 프로덕션 환경에서 바로 사용할 수 있는 구조입니다.

\`\`\`yaml
version: '3.8'

services:
  # Node.js 애플리케이션
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: node-app
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
      - REDIS_URL=redis://redis:6379
    depends_on:
      - db
      - redis
    networks:
      - app-network
    volumes:
      - ./logs:/app/logs

  # PostgreSQL 데이터베이스
  db:
    image: postgres:15-alpine
    container_name: postgres-db
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=myapp
    volumes:
      - postgres-data:/var/lib/postgresql/data
    networks:
      - app-network

  # Redis 캐시
  redis:
    image: redis:7-alpine
    container_name: redis-cache
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - app-network
    command: redis-server --appendonly yes

networks:
  app-network:
    driver: bridge

volumes:
  postgres-data:
  redis-data:
\`\`\``,
    timestamp: "오후 2:46",
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

  // 마크다운 코드 블록 파싱
  const parseCodeBlocks = (content: string) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts: Array<{ type: 'text' | 'code'; content: string; language?: string }> = [];
    let lastIndex = 0;
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      // 코드 블록 이전의 텍스트
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: content.slice(lastIndex, match.index),
        });
      }

      // 코드 블록
      parts.push({
        type: 'code',
        language: match[1] || 'text',
        content: match[2].trim(),
      });

      lastIndex = match.index + match[0].length;
    }

    // 남은 텍스트
    if (lastIndex < content.length) {
      parts.push({
        type: 'text',
        content: content.slice(lastIndex),
      });
    }

    return parts.length > 0 ? parts : [{ type: 'text' as const, content }];
  };

  const messageParts = parseCodeBlocks(message.content);

  return (
    <div
      className={cn(
        "flex w-full gap-1.5 sm:gap-2 min-w-0",
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
          "flex flex-col gap-1.5 min-w-0 overflow-hidden",
          isUser ? "items-end max-w-[85%] sm:max-w-[80%] md:max-w-[75%]" : "items-start flex-1"
        )}
      >
        {/* 메시지 컨테이너 */}
        <div
          className={cn(
            "overflow-hidden min-w-0",
            isUser ? "w-auto bg-primary text-primary-foreground rounded-lg sm:rounded-xl" : "w-full"
          )}
        >
          {messageParts.map((part, index) => (
            <div key={index} className="min-w-0 w-full overflow-hidden">
              {part.type === 'text' ? (
                // 텍스트 부분
                part.content.trim() && (
                  <div className={cn(
                    "text-xs sm:text-sm leading-relaxed break-words",
                    isUser ? "px-2.5 py-1.5 sm:px-3 sm:py-2" : "py-0.5"
                  )}>
                    <div className="whitespace-pre-wrap break-words overflow-wrap-anywhere">{part.content.trim()}</div>
                  </div>
                )
              ) : (
                // 코드 블록
                <CodeBlock
                  language={part.language || 'text'}
                  code={part.content}
                  isFirst={index === 0}
                />
              )}
            </div>
          ))}
        </div>

        {/* 액션 버튼 및 타임스탬프 */}
        <div className="flex items-center gap-2 px-1">
          {!isUser && (
            <div className="hidden sm:flex items-center gap-0.5">
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
          <span className="text-[9px] sm:text-[10px] text-muted-foreground">
            {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}

function CodeBlock({ language, code, isFirst }: { language: string; code: string; isFirst: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("w-full overflow-hidden rounded-lg sm:rounded-xl border border-border", !isFirst && "mt-2")}>
      {/* 코드 블록 헤더 */}
      <div className="flex items-center justify-between bg-muted/40 px-2 sm:px-3 py-1.5 shrink-0">
        <span className="rounded bg-muted px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-medium text-muted-foreground">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded text-muted-foreground transition-colors hover:bg-background hover:text-foreground shrink-0"
          title="코드 복사"
        >
          {copied ? (
            <svg
              className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <Copy className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          )}
        </button>
      </div>
      {/* 코드 내용 */}
      <ScrollArea className="max-h-[300px] sm:max-h-[400px] w-full">
        <pre className="px-2 sm:px-3 py-2 sm:py-2.5 text-[11px] sm:text-xs leading-relaxed overflow-x-auto bg-muted/10 w-full">
          <code className="text-foreground font-mono break-all">{code}</code>
        </pre>
      </ScrollArea>
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
          <div ref={scrollRef} className="px-2 py-3 sm:px-4 sm:py-4 md:px-6 lg:px-12">
            <div className="mx-auto flex w-full max-w-full flex-col gap-3 sm:max-w-xl sm:gap-4 md:max-w-2xl lg:max-w-3xl xl:max-w-4xl overflow-hidden">
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
          </div>
        </ScrollArea>
      )}

      {messages.length > 0 && (
        <div className="shrink-0 border-t border-border px-2 pb-2 pt-1.5 sm:px-4 sm:pb-3 sm:pt-2 md:px-6 lg:px-12">
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
