---
title: "Hello World"
date: "2025-01-15"
description: "블로그의 첫 번째 포스트입니다. Next.js와 shadcn/ui로 만든 마크다운 블로그를 소개합니다."
tags: ["Next.js", "Blog", "Introduction"]
published: true
---

# Hello World!

블로그에 오신 것을 환영합니다. 이 블로그는 **Next.js 16**과 **shadcn/ui**를 사용하여 만들어졌습니다.

## 기술 스택

이 블로그는 다음 기술들로 구성되어 있습니다:

- **Next.js 16** - App Router 기반
- **React 19** - 최신 React
- **TypeScript** - 타입 안전성
- **Tailwind CSS v4** - 스타일링
- **shadcn/ui** - UI 컴포넌트
- **Shiki** - 코드 구문 강조

## 코드 예시

다음은 TypeScript 코드 예시입니다:

```typescript
interface Post {
  title: string;
  date: string;
  tags: string[];
}

function getPost(slug: string): Post {
  return {
    title: "Hello World",
    date: "2025-01-15",
    tags: ["Next.js", "Blog"],
  };
}
```

## 마치며

앞으로 다양한 개발 관련 글을 작성할 예정입니다. 감사합니다!
