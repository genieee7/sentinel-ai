/**
 * Sentinel AI - 색상 가이드
 * 
 * 이 파일에서 전체 서비스의 색상을 제어합니다.
 * 색상을 변경하면 자동으로 전체 UI에 적용됩니다.
 */

export const colors = {
  // ============================================
  // PRIMARY 색상 (주요 브랜드 색상)
  // ============================================
  primary: {
    // 메인 브랜드 색상 - 버튼, 링크, 액센트 등에 사용
    main: {
      hue: 160,        // 색조 (0-360): 160 = 청록색
      saturation: 84,  // 채도 (0-100): 84 = 선명함
      lightness: 40,   // 명도 (0-100): 40 = 중간 어두움
    },
    // 다크 모드용
    mainDark: {
      hue: 160,
      saturation: 84,
      lightness: 45,
    },
  },

  // ============================================
  // SECONDARY 색상 (보조 색상)
  // ============================================
  secondary: {
    // 보조 버튼, 카드 배경 등에 사용
    main: {
      hue: 0,
      saturation: 0,
      lightness: 94,
    },
    mainDark: {
      hue: 0,
      saturation: 0,
      lightness: 12,
    },
  },

  // ============================================
  // ACCENT 색상 (강조 색상)
  // ============================================
  accent: {
    // 호버 효과, 포커스 등에 사용
    main: {
      hue: 160,
      saturation: 30,
      lightness: 94,
    },
    mainDark: {
      hue: 160,
      saturation: 30,
      lightness: 12,
    },
  },

  // ============================================
  // BACKGROUND 색상 (배경)
  // ============================================
  background: {
    // 페이지 배경색
    main: {
      hue: 0,
      saturation: 0,
      lightness: 98,
    },
    mainDark: {
      hue: 0,
      saturation: 0,
      lightness: 5,
    },
  },

  // ============================================
  // SURFACE 색상 (카드, 패널 등)
  // ============================================
  surface: {
    // 카드, 다이얼로그 배경
    card: {
      hue: 0,
      saturation: 0,
      lightness: 100,
    },
    cardDark: {
      hue: 0,
      saturation: 0,
      lightness: 7,
    },
    // 사이드바 배경
    sidebar: {
      hue: 0,
      saturation: 0,
      lightness: 100,
    },
    sidebarDark: {
      hue: 0,
      saturation: 0,
      lightness: 6,
    },
  },

  // ============================================
  // TEXT 색상 (텍스트)
  // ============================================
  text: {
    // 기본 텍스트
    primary: {
      hue: 0,
      saturation: 0,
      lightness: 7,
    },
    primaryDark: {
      hue: 0,
      saturation: 0,
      lightness: 93,
    },
    // 보조 텍스트 (덜 중요한 정보)
    secondary: {
      hue: 0,
      saturation: 0,
      lightness: 45,
    },
    secondaryDark: {
      hue: 0,
      saturation: 0,
      lightness: 55,
    },
  },

  // ============================================
  // BORDER 색상 (테두리)
  // ============================================
  border: {
    main: {
      hue: 0,
      saturation: 0,
      lightness: 90,
    },
    mainDark: {
      hue: 0,
      saturation: 0,
      lightness: 14,
    },
    // 사이드바 테두리
    sidebar: {
      hue: 0,
      saturation: 0,
      lightness: 92,
    },
    sidebarDark: {
      hue: 0,
      saturation: 0,
      lightness: 12,
    },
  },

  // ============================================
  // STATUS 색상 (상태 표시)
  // ============================================
  status: {
    // 에러, 삭제 등
    destructive: {
      hue: 0,
      saturation: 84,
      lightness: 60,
    },
    destructiveDark: {
      hue: 0,
      saturation: 62,
      lightness: 30,
    },
  },
} as const;

/**
 * HSL 값을 CSS 변수 형식으로 변환
 */
export function hslToString(color: { hue: number; saturation: number; lightness: number }): string {
  return `${color.hue} ${color.saturation}% ${color.lightness}%`;
}

/**
 * 모든 색상을 CSS 변수 형식으로 내보내기
 */
export const cssVariables = {
  light: {
    '--background': hslToString(colors.background.main),
    '--foreground': hslToString(colors.text.primary),
    '--card': hslToString(colors.surface.card),
    '--card-foreground': hslToString(colors.text.primary),
    '--popover': hslToString(colors.surface.card),
    '--popover-foreground': hslToString(colors.text.primary),
    '--primary': hslToString(colors.primary.main),
    '--primary-foreground': '0 0% 100%',
    '--secondary': hslToString(colors.secondary.main),
    '--secondary-foreground': '0 0% 15%',
    '--muted': hslToString(colors.secondary.main),
    '--muted-foreground': hslToString(colors.text.secondary),
    '--accent': hslToString(colors.accent.main),
    '--accent-foreground': `${colors.primary.main.hue} ${colors.primary.main.saturation}% 25%`,
    '--destructive': hslToString(colors.status.destructive),
    '--destructive-foreground': '0 0% 98%',
    '--border': hslToString(colors.border.main),
    '--input': hslToString(colors.border.main),
    '--ring': hslToString(colors.primary.main),
    '--sidebar-background': hslToString(colors.surface.sidebar),
    '--sidebar-foreground': '0 0% 25%',
    '--sidebar-primary': hslToString(colors.primary.main),
    '--sidebar-primary-foreground': '0 0% 100%',
    '--sidebar-accent': '0 0% 96%',
    '--sidebar-accent-foreground': '0 0% 15%',
    '--sidebar-border': hslToString(colors.border.sidebar),
    '--sidebar-ring': hslToString(colors.primary.main),
  },
  dark: {
    '--background': hslToString(colors.background.mainDark),
    '--foreground': hslToString(colors.text.primaryDark),
    '--card': hslToString(colors.surface.cardDark),
    '--card-foreground': hslToString(colors.text.primaryDark),
    '--popover': hslToString(colors.surface.cardDark),
    '--popover-foreground': hslToString(colors.text.primaryDark),
    '--primary': hslToString(colors.primary.mainDark),
    '--primary-foreground': '0 0% 5%',
    '--secondary': hslToString(colors.secondary.mainDark),
    '--secondary-foreground': '0 0% 93%',
    '--muted': hslToString(colors.secondary.mainDark),
    '--muted-foreground': hslToString(colors.text.secondaryDark),
    '--accent': hslToString(colors.accent.mainDark),
    '--accent-foreground': `${colors.primary.mainDark.hue} ${colors.primary.mainDark.saturation}% 55%`,
    '--destructive': hslToString(colors.status.destructiveDark),
    '--destructive-foreground': '0 0% 98%',
    '--border': hslToString(colors.border.mainDark),
    '--input': hslToString(colors.border.mainDark),
    '--ring': hslToString(colors.primary.mainDark),
    '--sidebar-background': hslToString(colors.surface.sidebarDark),
    '--sidebar-foreground': '0 0% 75%',
    '--sidebar-primary': hslToString(colors.primary.mainDark),
    '--sidebar-primary-foreground': '0 0% 5%',
    '--sidebar-accent': '0 0% 10%',
    '--sidebar-accent-foreground': '0 0% 85%',
    '--sidebar-border': hslToString(colors.border.sidebarDark),
    '--sidebar-ring': hslToString(colors.primary.mainDark),
  },
};

/**
 * 프리셋 색상 테마
 * 
 * 다양한 브랜드 색상을 빠르게 적용할 수 있습니다.
 */
export const colorPresets = {
  // 기본 (청록색)
  default: {
    primary: { hue: 160, saturation: 84, lightness: 40 },
    name: '청록색 (기본)',
  },
  // 블루
  blue: {
    primary: { hue: 217, saturation: 91, lightness: 60 },
    name: '블루',
  },
  // 퍼플
  purple: {
    primary: { hue: 262, saturation: 83, lightness: 58 },
    name: '퍼플',
  },
  // 핑크
  pink: {
    primary: { hue: 330, saturation: 81, lightness: 60 },
    name: '핑크',
  },
  // 오렌지
  orange: {
    primary: { hue: 25, saturation: 95, lightness: 53 },
    name: '오렌지',
  },
  // 그린
  green: {
    primary: { hue: 142, saturation: 71, lightness: 45 },
    name: '그린',
  },
  // 인디고
  indigo: {
    primary: { hue: 239, saturation: 84, lightness: 67 },
    name: '인디고',
  },
} as const;

export type ColorPreset = keyof typeof colorPresets;

/**
 * 환경변수에서 색상 프리셋 가져오기
 */
export function getActivePreset(): ColorPreset {
  const envPreset = process.env.NEXT_PUBLIC_COLOR_PRESET as ColorPreset;
  
  // 유효한 프리셋인지 확인
  if (envPreset && envPreset in colorPresets) {
    return envPreset;
  }
  
  // 기본값 반환
  return 'default';
}

/**
 * 활성화된 프리셋에 따라 Primary 색상 가져오기
 */
export function getActivePrimaryColor() {
  const preset = getActivePreset();
  return colorPresets[preset].primary;
}

/**
 * 환경변수 기반으로 색상 시스템 생성
 */
export function getColorsWithPreset() {
  const primaryColor = getActivePrimaryColor();
  
  return {
    ...colors,
    primary: {
      main: primaryColor,
      mainDark: {
        ...primaryColor,
        lightness: Math.min(primaryColor.lightness + 5, 100),
      },
    },
  };
}

/**
 * 활성화된 프리셋의 CSS 변수 생성
 */
export function getCssVariablesWithPreset() {
  const primaryColor = getActivePrimaryColor();
  const primaryHsl = hslToString(primaryColor);
  const primaryDarkHsl = hslToString({
    ...primaryColor,
    lightness: Math.min(primaryColor.lightness + 5, 100),
  });
  
  return {
    light: {
      ...cssVariables.light,
      '--primary': primaryHsl,
      '--ring': primaryHsl,
      '--sidebar-primary': primaryHsl,
      '--sidebar-ring': primaryHsl,
      '--accent-foreground': `${primaryColor.hue} ${primaryColor.saturation}% 25%`,
    },
    dark: {
      ...cssVariables.dark,
      '--primary': primaryDarkHsl,
      '--ring': primaryDarkHsl,
      '--sidebar-primary': primaryDarkHsl,
      '--sidebar-ring': primaryDarkHsl,
      '--accent-foreground': `${primaryColor.hue} ${primaryColor.saturation}% 55%`,
    },
  };
}
