"use client";

import Link from "next/link";
import { Sparkles, Zap, Shield, Code2, ArrowRight, Github } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* 헤더 */}
      <header className="border-b border-border/40 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-bold text-foreground">Sentinel AI</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link
              href="/chat"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              시작하기
            </Link>
          </nav>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI 기반 코딩 어시스턴트
            </span>
          </div>
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            더 빠르고 스마트한
            <br />
            <span className="text-primary">코딩 경험</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Sentinel AI와 함께 코드를 작성하고, 디버깅하고, 최적화하세요.
            <br />
            실시간 코드 제안부터 복잡한 아키텍처 설계까지, 모든 개발 과정을 지원합니다.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/chat"
              className="group flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
            >
              지금 시작하기
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-base font-semibold text-foreground transition-colors hover:bg-accent"
            >
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </div>
        </div>

        {/* 스크린샷 또는 데모 이미지 영역 */}
        <div className="mt-16">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10">
            <div className="aspect-video bg-gradient-to-br from-primary/5 via-transparent to-accent/5 flex items-center justify-center">
              <div className="flex flex-col items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                  <Code2 className="h-8 w-8 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  채팅 인터페이스 프리뷰
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="border-t border-border/40 bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              강력한 기능들
            </h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground">
              개발 생산성을 극대화하는 다양한 기능을 제공합니다
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* 일반 채팅 모드 */}
            <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                일반 채팅
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                빠른 질문과 답변에 최적화되어 있습니다. 코드 설명, 간단한 디버깅, 개념 설명 등에 사용하세요.
              </p>
            </div>

            {/* Deep Agent 모드 */}
            <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Zap className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                Deep Agent
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                복잡한 작업에 특화되어 있습니다. 리팩토링, 아키텍처 설계, 대규모 코드 변경 등에 최적화되어 있습니다.
              </p>
            </div>

            {/* 보안 */}
            <div className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                안전한 코딩
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                코드 보안 검사, 베스트 프랙티스 제안, 버그 탐지 등으로 더 안전한 코드를 작성하세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/5 via-card to-accent/5 p-12">
            <h2 className="mb-4 text-3xl font-bold text-foreground sm:text-4xl">
              지금 바로 시작하세요
            </h2>
            <p className="mb-8 text-base text-muted-foreground">
              몇 초 만에 설치하고 바로 사용할 수 있습니다
            </p>
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
            >
              무료로 시작하기
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="border-t border-border/40 bg-muted/20 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-semibold text-foreground">
                Sentinel AI
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              © 2026 Sentinel AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
