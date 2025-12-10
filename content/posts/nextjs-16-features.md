---
title: "Next.js 16 새로운 기능"
date: "2025-01-10"
description: "Next.js 16에서 추가된 새로운 기능들과 변경사항을 알아봅니다."
tags: ["Next.js", "React", "Frontend"]
published: true
---

# Next.js 16 새로운 기능

Next.js 16이 출시되었습니다. 이번 버전에서는 여러 가지 흥미로운 기능들이 추가되었습니다.

## 주요 변경사항

### 1. params가 Promise로 변경

Next.js 15부터 동적 라우트의 `params`가 Promise로 변경되었습니다:

```typescript
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <div>Post: {slug}</div>;
}
```

### 2. React 19 지원

Next.js 16은 React 19를 완전히 지원합니다. Server Components와 Client Components의 조화로운 사용이 가능합니다.

### 3. Turbopack 안정화

개발 서버의 빌드 속도가 크게 향상되었습니다.

## 마이그레이션 팁

기존 프로젝트를 마이그레이션할 때는 다음 사항을 확인하세요:

- `params`와 `searchParams`의 await 처리
- React 19 호환성 확인
- 새로운 캐싱 전략 적용
