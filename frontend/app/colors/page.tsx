"use client";

import { colors, colorPresets, ColorPreset, getActivePreset } from "@/config/colors";
import { useState, useEffect } from "react";

export default function ColorsPage() {
  const [activePreset, setActivePreset] = useState<ColorPreset>("default");
  const [selectedPreset, setSelectedPreset] = useState<ColorPreset>("default");

  useEffect(() => {
    const preset = getActivePreset();
    setActivePreset(preset);
    setSelectedPreset(preset);
  }, []);

  return (
    <div className="min-h-screen bg-background p-4 sm:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-foreground">
            🎨 Sentinel AI - 색상 가이드
          </h1>
          <p className="text-sm text-muted-foreground">
            전체 서비스의 색상을 한 눈에 확인하고 변경할 수 있습니다.
          </p>
          {activePreset && (
            <div className="mt-4 rounded-lg border border-primary/30 bg-primary/5 p-3">
              <p className="text-sm">
                <span className="font-semibold text-primary">
                  현재 활성화된 프리셋:
                </span>{" "}
                <span className="font-medium text-foreground">
                  {colorPresets[activePreset].name}
                </span>
                <span className="ml-2 text-xs text-muted-foreground">
                  (환경변수: NEXT_PUBLIC_COLOR_PRESET={activePreset})
                </span>
              </p>
            </div>
          )}
        </div>

        {/* 색상 프리셋 선택 */}
        <div className="mb-8 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            색상 프리셋
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            미리 정의된 색상 테마를 선택하여 미리보기 할 수 있습니다.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-7">
            {Object.entries(colorPresets).map(([key, preset]) => (
              <button
                key={key}
                onClick={() => setSelectedPreset(key as ColorPreset)}
                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-3 transition-all hover:shadow-md ${
                  selectedPreset === key
                    ? "border-primary bg-primary/5"
                    : "border-border bg-background"
                }`}
              >
                <div
                  className="h-12 w-12 rounded-full border-2 border-white shadow-md"
                  style={{
                    backgroundColor: `hsl(${preset.primary.hue} ${preset.primary.saturation}% ${preset.primary.lightness}%)`,
                  }}
                />
                <span className="text-xs font-medium text-foreground">
                  {preset.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Primary 색상 */}
        <div className="mb-6 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Primary (주요 브랜드 색상)
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ColorCard
              title="Light Mode"
              color={colors.primary.main}
              usage="버튼, 링크, 아이콘"
            />
            <ColorCard
              title="Dark Mode"
              color={colors.primary.mainDark}
              usage="버튼, 링크, 아이콘"
            />
          </div>
          <div className="mt-4 rounded-lg bg-muted p-4">
            <p className="text-xs text-muted-foreground">
              <strong>사용 예시:</strong> 주요 액션 버튼, 링크, 중요한 아이콘, 포커스 링
            </p>
          </div>
        </div>

        {/* Secondary 색상 */}
        <div className="mb-6 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Secondary (보조 색상)
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ColorCard
              title="Light Mode"
              color={colors.secondary.main}
              usage="보조 버튼, 카드 배경"
            />
            <ColorCard
              title="Dark Mode"
              color={colors.secondary.mainDark}
              usage="보조 버튼, 카드 배경"
            />
          </div>
        </div>

        {/* Accent 색상 */}
        <div className="mb-6 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Accent (강조 색상)
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <ColorCard
              title="Light Mode"
              color={colors.accent.main}
              usage="호버 효과, 선택 상태"
            />
            <ColorCard
              title="Dark Mode"
              color={colors.accent.mainDark}
              usage="호버 효과, 선택 상태"
            />
          </div>
        </div>

        {/* Background & Surface 색상 */}
        <div className="mb-6 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            Background & Surface
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-medium text-foreground">
                Background (Light)
              </h3>
              <ColorCard
                title="페이지 배경"
                color={colors.background.main}
                usage="전체 페이지 배경"
              />
            </div>
            <div>
              <h3 className="mb-3 text-sm font-medium text-foreground">
                Background (Dark)
              </h3>
              <ColorCard
                title="페이지 배경"
                color={colors.background.mainDark}
                usage="전체 페이지 배경"
              />
            </div>
          </div>
        </div>

        {/* 실제 UI 예시 */}
        <div className="mb-6 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            실제 UI 예시
          </h2>
          <div className="space-y-4">
            {/* 버튼 예시 */}
            <div className="flex flex-wrap gap-3">
              <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                Primary Button
              </button>
              <button className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent">
                Secondary Button
              </button>
              <button className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent">
                Outline Button
              </button>
            </div>

            {/* 카드 예시 */}
            <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                예시 카드
              </h3>
              <p className="text-xs text-muted-foreground">
                이것은 카드 컴포넌트의 예시입니다. 배경, 테두리, 텍스트 색상이 적용되어 있습니다.
              </p>
            </div>

            {/* 입력 필드 예시 */}
            <div>
              <input
                type="text"
                placeholder="입력 필드 예시"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        {/* 사용 방법 */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-foreground">
            💡 색상 변경 방법
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">1. 파일 열기:</strong>{" "}
              <code className="rounded bg-muted px-2 py-1 text-xs">
                config/colors.ts
              </code>
            </p>
            <p>
              <strong className="text-foreground">2. 값 변경:</strong> Primary 색상의 HSL 값을 수정하세요.
            </p>
            <div className="rounded-lg bg-muted p-4">
              <pre className="overflow-x-auto text-xs">
{`primary: {
  main: {
    hue: 160,        // 0-360 (색조)
    saturation: 84,  // 0-100 (채도)
    lightness: 40,   // 0-100 (명도)
  },
}`}
              </pre>
            </div>
            <p>
              <strong className="text-foreground">3. 저장 후 확인:</strong> 파일을 저장하면 자동으로 전체 UI에 적용됩니다.
            </p>
            <p className="text-xs">
              📖 자세한 내용은{" "}
              <code className="rounded bg-muted px-2 py-1">
                config/COLOR_GUIDE.md
              </code>{" "}
              파일을 참고하세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function ColorCard({
  title,
  color,
  usage,
}: {
  title: string;
  color: { hue: number; saturation: number; lightness: number };
  usage: string;
}) {
  const hslValue = `${color.hue} ${color.saturation}% ${color.lightness}%`;
  const hslColor = `hsl(${hslValue})`;

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-background">
      <div className="h-24" style={{ backgroundColor: hslColor }} />
      <div className="p-4">
        <h3 className="mb-1 text-sm font-semibold text-foreground">{title}</h3>
        <p className="mb-2 text-xs text-muted-foreground">{usage}</p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">HSL:</span>
            <code className="rounded bg-muted px-2 py-0.5 text-foreground">
              {hslValue}
            </code>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-2">
            <div>
              <div className="text-[10px] text-muted-foreground">Hue</div>
              <div className="font-mono text-xs font-semibold text-foreground">
                {color.hue}°
              </div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground">Sat</div>
              <div className="font-mono text-xs font-semibold text-foreground">
                {color.saturation}%
              </div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground">Light</div>
              <div className="font-mono text-xs font-semibold text-foreground">
                {color.lightness}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
