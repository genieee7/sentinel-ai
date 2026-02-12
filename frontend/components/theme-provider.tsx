"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import { getCssVariablesWithPreset, getActivePreset } from "@/config/colors";

/**
 * 색상 프리셋을 적용하는 컴포넌트
 */
function ColorPresetApplier() {
  React.useEffect(() => {
    const cssVars = getCssVariablesWithPreset();
    const activePreset = getActivePreset();
    
    console.log(`🎨 Active Color Preset: ${activePreset}`);
    
    // CSS 변수 적용 함수
    const applyTheme = () => {
      const root = document.documentElement;
      const isDark = root.classList.contains('dark');
      const vars = isDark ? cssVars.dark : cssVars.light;
      
      Object.entries(vars).forEach(([key, value]) => {
        root.style.setProperty(key, value);
      });
    };
    
    // 초기 적용
    applyTheme();
    
    // 다크모드 변경 감지
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          applyTheme();
        }
      });
    });
    
    const root = document.documentElement;
    observer.observe(root, {
      attributes: true,
      attributeFilter: ['class'],
    });
    
    return () => observer.disconnect();
  }, []);
  
  return null;
}

/**
 * 통합 테마 프로바이더
 * - next-themes로 다크모드 관리
 * - 환경변수 기반 색상 프리셋 적용
 */
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <ColorPresetApplier />
      {children}
    </NextThemesProvider>
  );
}
