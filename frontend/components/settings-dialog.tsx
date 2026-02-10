"use client";

import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const themeOptions = [
  { value: "light", label: "라이트", icon: Sun },
  { value: "dark", label: "다크", icon: Moon },
  { value: "system", label: "시스템", icon: Monitor },
] as const;

export function SettingsDialog({ open, onOpenChange }: SettingsDialogProps) {
  const { theme, setTheme } = useTheme();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>설정</DialogTitle>
          <DialogDescription>앱 환경설정을 관리합니다.</DialogDescription>
        </DialogHeader>

        <Separator />

        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-foreground">화면 모드</h3>
            <p className="text-xs text-muted-foreground">
              앱의 테마를 라이트, 다크, 또는 시스템 설정에 맞게 변경합니다.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {themeOptions.map((option) => {
              const Icon = option.icon;
              const isActive = theme === option.value;
              return (
                <button
                  key={option.value}
                  onClick={() => setTheme(option.value)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-4 text-sm transition-all",
                    isActive
                      ? "border-primary bg-accent text-accent-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-muted-foreground/30 hover:text-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{option.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1">
            <h3 className="text-sm font-medium text-foreground">일반</h3>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-foreground">언어</span>
                <span className="text-xs text-muted-foreground">
                  인터페이스 언어를 설정합니다
                </span>
              </div>
              <div className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground">
                한국어
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-foreground">모델</span>
                <span className="text-xs text-muted-foreground">
                  AI 모델을 선택합니다
                </span>
              </div>
              <div className="rounded-lg border border-border bg-card px-3 py-1.5 text-sm text-foreground">
                Sentinel Pro
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-foreground">버전</span>
                <span className="text-xs text-muted-foreground">
                  현재 앱 버전
                </span>
              </div>
              <span className="text-sm text-muted-foreground">v1.0.0</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
