# ⚡ Quick Start - 색상 프리셋 변경하기

5분 안에 Sentinel AI의 색상을 원하는 대로 바꿔보세요!

## 🚀 빠른 시작

### 1단계: .env 파일 생성

```bash
# 프로젝트 루트에서 실행
cd /Users/genieee7/Desktop/project/genieee/sentinel-ai/frontend

# .env.example 복사
cp .env.example .env
```

### 2단계: 색상 프리셋 선택

`.env` 파일을 열고 원하는 색상으로 변경:

```env
# 예시: 블루 테마로 변경
NEXT_PUBLIC_COLOR_PRESET=blue
```

### 3단계: 개발 서버 재시작

```bash
npm run dev
```

### 4단계: 확인

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요!

## 🎨 사용 가능한 프리셋

| 프리셋 | 색상 | 사용 예시 |
|--------|------|----------|
| `default` | 🟦 청록색 | 기본 브랜드 색상 |
| `blue` | 🔵 블루 | 전문적이고 신뢰감 있는 느낌 |
| `purple` | 🟣 퍼플 | 창의적이고 혁신적인 느낌 |
| `pink` | 🩷 핑크 | 따뜻하고 친근한 느낌 |
| `orange` | 🟠 오렌지 | 활기차고 에너지 넘치는 느낌 |
| `green` | 🟢 그린 | 자연스럽고 안정적인 느낌 |
| `indigo` | 🟣 인디고 | 고급스럽고 세련된 느낌 |

## 💡 빠른 팁

### 실시간 프리뷰
색상을 확인하려면 `/colors` 페이지를 방문하세요:
```
http://localhost:3000/colors
```

### 다크모드 설정 변경
```env
# .env
NEXT_PUBLIC_DEFAULT_THEME=dark   # 다크모드
NEXT_PUBLIC_DEFAULT_THEME=light  # 라이트모드
NEXT_PUBLIC_DEFAULT_THEME=system # 시스템 설정 따르기 (기본)
```

### 커스텀 색상 만들기

1. `config/colors.ts` 파일 열기
2. `colorPresets` 객체에 새 프리셋 추가:

```typescript
export const colorPresets = {
  // ... 기존 프리셋들
  
  mycolor: {
    primary: { 
      hue: 280,        // 원하는 색조 (0-360)
      saturation: 80,  // 채도 (0-100)
      lightness: 55    // 명도 (0-100)
    },
    name: '나만의 색상',
  },
}
```

3. `.env` 파일에서 사용:
```env
NEXT_PUBLIC_COLOR_PRESET=mycolor
```

4. 개발 서버 재시작

## 🔍 HSL 색상 값 찾기

온라인 HSL 색상 피커를 사용하세요:
- [HSL Color Picker](https://hslpicker.com/)
- [Coolors](https://coolors.co/)
- Chrome DevTools 색상 피커

## ❓ 문제 해결

### Q: 색상이 변경되지 않아요
**A**: 개발 서버를 재시작했는지 확인하세요. `.env` 파일 변경은 서버 재시작이 필요합니다.

```bash
# Ctrl+C로 서버 종료 후
npm run dev
```

### Q: 어떤 색상이 어울릴까요?
**A**: `/colors` 페이지에서 모든 프리셋을 미리보기하고 선택하세요!

### Q: 프로덕션 환경에서는 어떻게 하나요?
**A**: Vercel이나 다른 호스팅 서비스의 환경 변수 설정에서 동일하게 설정하면 됩니다.

```bash
# Vercel CLI 예시
vercel env add NEXT_PUBLIC_COLOR_PRESET
# 값 입력: blue
```

## 📚 더 알아보기

- **상세 가이드**: [COLOR_GUIDE.md](./config/COLOR_GUIDE.md)
- **전체 문서**: [README.md](./README.md)
- **색상 파일**: [colors.ts](./config/colors.ts)

---

**즐거운 커스터마이징 되세요!** 🎨✨
