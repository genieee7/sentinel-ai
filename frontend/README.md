# Sentinel AI - Frontend

Next.js 기반의 AI 코딩 어시스턴트 채팅 애플리케이션입니다.

## 🚀 시작하기

### 1. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 색상 프리셋을 설정하세요:

```bash
# .env.example 파일을 복사
cp .env.example .env

# 또는 직접 생성
cat > .env << EOF
NEXT_PUBLIC_COLOR_PRESET=default
NEXT_PUBLIC_DEFAULT_THEME=system
EOF
```

**사용 가능한 색상 프리셋:**
- `default` - 청록색 (기본값)
- `blue` - 블루
- `purple` - 퍼플
- `pink` - 핑크
- `orange` - 오렌지
- `green` - 그린
- `indigo` - 인디고

### 2. 개발 서버 실행

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

> 💡 **Tip**: 색상 프리셋을 변경한 후에는 개발 서버를 재시작해야 합니다!

## 🎨 색상 관리

Sentinel AI는 체계적인 색상 관리 시스템을 제공합니다.

### 색상 확인 및 변경

1. **색상 프리뷰 페이지**: [http://localhost:3000/colors](http://localhost:3000/colors)
   - 모든 색상을 한 눈에 확인
   - 프리셋 테마 미리보기
   - 실제 UI 예시

2. **색상 설정 파일**: `config/colors.ts`
   ```typescript
   primary: {
     main: {
       hue: 160,        // 색조 변경
       saturation: 84,  // 채도 변경
       lightness: 40,   // 명도 변경
     },
   }
   ```

3. **색상 가이드**: `config/COLOR_GUIDE.md`
   - 상세한 사용 방법
   - HSL 색상 이해하기
   - 프리셋 사용법

### 빠른 테마 변경

7가지 프리셋 테마 제공:
- 🟦 **Default** (청록색)
- 🔵 **Blue** (블루)
- 🟣 **Purple** (퍼플)
- 🩷 **Pink** (핑크)
- 🟠 **Orange** (오렌지)
- 🟢 **Green** (그린)
- 🟣 **Indigo** (인디고)

## 📱 반응형 디자인

12-Grid 시스템 기반으로 모든 화면 크기를 지원합니다.

### 지원 해상도
- **모바일**: 375~480px
- **태블릿**: 768~1024px
- **데스크톱**: 1024px+
- **대형 화면**: 1440px+

### 자동 UI 조정
- 1280px 이하: 사이드바 자동 축소
- 1440px 이상: 사이드바 자동 확장
- 모바일: 오버레이 방식 사이드바

## 🏗️ 프로젝트 구조

```
frontend/
├── app/              # Next.js App Router
│   ├── page.tsx      # 메인 페이지
│   ├── colors/       # 색상 프리뷰 페이지
│   └── globals.css   # 글로벌 스타일
├── components/       # React 컴포넌트
│   ├── chat-area.tsx
│   ├── chat-sidebar.tsx
│   └── ui/          # 공통 UI 컴포넌트
├── config/          # 설정 파일
│   ├── colors.ts    # 색상 정의 ⭐
│   └── COLOR_GUIDE.md
└── lib/            # 유틸리티 함수
```

## 🎯 주요 기능

### 채팅 인터페이스
- 실시간 메시지 표시
- 코드 블록 하이라이팅
- 메시지 액션 (복사, 좋아요/싫어요, 재생성)
- 파일 첨부 지원

### 모드 선택
- **일반 채팅**: 빠른 질문과 답변
- **Deep Agent**: 복잡한 작업 처리

### 사이드바
- 채팅 히스토리
- 카테고리별 정리 (오늘, 어제, 이번 주, 이번 달)
- 검색 기능
- 설정 메뉴

### 반응형 지원
- 모바일 최적화 UI
- 터치 친화적 인터페이스
- 자동 레이아웃 조정

## 🛠️ 기술 스택

- **Framework**: Next.js 16 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS 4
- **UI 컴포넌트**: Radix UI
- **아이콘**: Lucide React
- **테마**: next-themes

## 📦 주요 패키지

- `@radix-ui/*` - 접근성 좋은 UI 컴포넌트
- `lucide-react` - 아이콘
- `react-resizable-panels` - 분할 뷰
- `next-themes` - 다크모드 지원

## 🎨 커스터마이징

### 1. 색상 변경
```typescript
// config/colors.ts
primary: {
  main: {
    hue: 217,    // 블루로 변경
    saturation: 91,
    lightness: 60,
  },
}
```

### 2. 컴포넌트 수정
모든 컴포넌트는 `components/` 폴더에 있습니다.

### 3. 레이아웃 조정
Tailwind CSS 클래스를 사용하여 쉽게 수정할 수 있습니다.

## 🚧 개발 팁

### 색상 테스트
```bash
# 개발 서버 실행 후
# http://localhost:3000/colors 방문
```

### 반응형 테스트
```bash
# 브라우저 개발자 도구 (F12)
# 반응형 모드로 다양한 화면 크기 테스트
```

### 린트 및 타입 체크
```bash
npm run lint
npx tsc --noEmit
```

## 📝 코드 컨벤션

- **컴포넌트**: PascalCase (`ChatArea.tsx`)
- **함수**: camelCase (`handleSend()`)
- **CSS 클래스**: Tailwind utility classes
- **색상**: HSL 형식 사용

## 🔗 관련 링크

- [Next.js 문서](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [색상 가이드](./config/COLOR_GUIDE.md)

## 📄 라이선스

Private Project

---

**개발 중 문제가 발생하면 팀에 문의해주세요!** 🚀
