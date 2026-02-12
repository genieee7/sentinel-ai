# 🎨 Sentinel AI - 색상 가이드

이 문서는 Sentinel AI의 색상 시스템을 설명합니다.

## 📁 파일 위치

- **색상 정의**: `config/colors.ts`
- **환경 변수**: `.env`
- **CSS 적용**: `app/globals.css`
- **테마 프로바이더**: `components/theme-provider.tsx`

## 🎯 색상 변경 방법

### 방법 1: 환경 변수 사용 (권장) ⭐

가장 쉽고 빠른 방법입니다. 프로젝트 루트의 `.env` 파일을 수정하세요:

```env
# .env
NEXT_PUBLIC_COLOR_PRESET=blue
```

**사용 가능한 값:**
- `default` - 청록색 (기본)
- `blue` - 블루
- `purple` - 퍼플
- `pink` - 핑크
- `orange` - 오렌지
- `green` - 그린
- `indigo` - 인디고

**변경 후 적용:**
```bash
# 개발 서버 재시작
npm run dev
```

### 방법 2: 직접 색상 커스터마이징

더 세밀한 제어가 필요한 경우 `config/colors.ts` 파일을 직접 수정하세요:

#### 2-1. Primary 색상 변경

`config/colors.ts` 파일에서 다음 값을 수정하세요:

```typescript
primary: {
  main: {
    hue: 160,        // 0-360 (색조)
    saturation: 84,  // 0-100 (채도)
    lightness: 40,   // 0-100 (명도)
  },
}
```

#### 2-2. 새로운 프리셋 추가

`config/colors.ts` 파일에 새로운 프리셋을 추가할 수 있습니다:

```typescript
export const colorPresets = {
  // ... 기존 프리셋들
  
  // 새로운 커스텀 프리셋
  custom: {
    primary: { hue: 45, saturation: 100, lightness: 50 },
    name: '커스텀 컬러',
  },
}
```

그 다음 `.env` 파일에서 사용:

```env
NEXT_PUBLIC_COLOR_PRESET=custom
```

## 🎨 색상 카테고리

### Primary (주요 브랜드 색상)
- 버튼, 링크, 아이콘
- 중요한 액션 요소
- 브랜드 식별

### Secondary (보조 색상)
- 보조 버튼
- 카드 배경
- 덜 중요한 요소

### Accent (강조 색상)
- 호버 효과
- 포커스 상태
- 인터랙션 피드백

### Background (배경)
- 페이지 배경
- 컨테이너 배경

### Surface (표면)
- 카드, 다이얼로그
- 사이드바
- 패널

### Text (텍스트)
- Primary: 기본 텍스트
- Secondary: 보조 텍스트 (덜 중요한 정보)

### Border (테두리)
- 카드 테두리
- 구분선
- 아웃라인

### Status (상태)
- Destructive: 에러, 삭제 등

## 💡 HSL 색상 값 이해하기

HSL = Hue (색조), Saturation (채도), Lightness (명도)

### Hue (색조) - 0~360
- 0/360 = 빨강
- 60 = 노랑
- 120 = 초록
- 180 = 청록
- 240 = 파랑
- 300 = 자주

### Saturation (채도) - 0~100
- 0 = 회색 (무채색)
- 100 = 순색 (가장 선명)

### Lightness (명도) - 0~100
- 0 = 검정
- 50 = 순색
- 100 = 하양

## 🌓 다크모드

각 색상은 라이트/다크 모드용으로 분리되어 있습니다:

```typescript
// 라이트 모드
primary: {
  main: { hue: 160, saturation: 84, lightness: 40 }
}

// 다크 모드
primary: {
  mainDark: { hue: 160, saturation: 84, lightness: 45 }
}
```

## 🔧 실제 적용 예시

### 예시 1: 브랜드 색상을 블루로 변경

```typescript
// config/colors.ts
primary: {
  main: {
    hue: 217,    // 블루
    saturation: 91,
    lightness: 60,
  },
}
```

### 예시 2: 전체 테마를 어둡게

```typescript
// config/colors.ts
background: {
  main: {
    hue: 0,
    saturation: 0,
    lightness: 95,  // 98 → 95로 변경
  },
}
```

### 예시 3: 커스텀 색상 추가

```typescript
// config/colors.ts
export const colors = {
  // ... 기존 색상들
  
  // 새로운 커스텀 색상
  custom: {
    warning: {
      hue: 45,
      saturation: 100,
      lightness: 50,
    },
  },
}
```

## 📊 색상 테스트

변경한 색상을 바로 확인하려면:

1. `npm run dev` 실행
2. 브라우저에서 앱 열기
3. 개발자 도구로 CSS 변수 확인:
   ```css
   :root {
     --primary: 160 84% 40%;
   }
   ```

## 🎯 권장 사항

1. **일관성 유지**: Primary 색상의 Hue만 변경하고 Saturation/Lightness는 유지
2. **대비 확인**: 텍스트와 배경의 대비가 충분한지 확인 (WCAG 기준)
3. **다크모드 테스트**: 양쪽 모드에서 모두 테스트
4. **점진적 변경**: 한 번에 하나씩 변경하고 테스트

## 📱 반응형 고려사항

모든 색상은 모든 화면 크기에서 동일하게 적용됩니다.
반응형은 레이아웃과 크기로 제어하며, 색상은 일관되게 유지합니다.

## 🔗 관련 파일

- `app/globals.css` - CSS 변수 정의
- `lib/utils.ts` - 유틸리티 함수
- `components/**/*.tsx` - 컴포넌트에서 색상 사용

---

**문의사항이나 제안사항이 있으시면 팀에 문의해주세요!** 🚀
