import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";
import { createHighlighter, type Highlighter } from "shiki";

let highlighter: Highlighter | null = null;

async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-dark", "github-light"],
      langs: [
        "javascript",
        "typescript",
        "jsx",
        "tsx",
        "json",
        "html",
        "css",
        "markdown",
        "bash",
        "python",
        "rust",
        "go",
      ],
    });
  }
  return highlighter;
}

export async function markdownToHtml(markdown: string): Promise<string> {
  const hl = await getHighlighter();

  // 코드 블록을 찾아서 Shiki로 하이라이팅
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  let processedMarkdown = markdown;

  const matches = [...markdown.matchAll(codeBlockRegex)];

  for (const match of matches) {
    const lang = match[1] || "text";
    const code = match[2].trimEnd();

    try {
      const highlighted = hl.codeToHtml(code, {
        lang: lang,
        themes: {
          light: "github-light",
          dark: "github-dark",
        },
      });
      processedMarkdown = processedMarkdown.replace(match[0], highlighted);
    } catch {
      // 지원하지 않는 언어인 경우 기본 코드 블록 사용
      const escaped = code
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      processedMarkdown = processedMarkdown.replace(
        match[0],
        `<pre><code class="language-${lang}">${escaped}</code></pre>`
      );
    }
  }

  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSanitize, {
      tagNames: [
        "h1", "h2", "h3", "h4", "h5", "h6",
        "p", "a", "ul", "ol", "li",
        "blockquote", "code", "pre",
        "strong", "em", "del",
        "table", "thead", "tbody", "tr", "th", "td",
        "img", "br", "hr",
        "span", "div",
      ],
      attributes: {
        a: ["href", "title"],
        img: ["src", "alt", "title"],
        code: ["className"],
        pre: ["className", "style"],
        span: ["className", "style"],
        div: ["className", "style"],
        "*": ["className", "style"],
      },
    })
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(processedMarkdown);

  return result.toString();
}
