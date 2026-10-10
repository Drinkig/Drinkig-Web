import { Fragment } from "react";

// 카피 안의 강조 표기를 마크업으로 바꾼다.
//   **굵게 칠하기**  → <mark class="hl">   : 제목에서 형광펜처럼 칠한 강조
//   *색만 바꾸기*    → <strong class="hl-text"> : 본문에서 색과 굵기만 바꾼 강조
export function Em({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) return <mark key={i} className="hl">{part.slice(2, -2)}</mark>;
        if (part.startsWith("*") && part.endsWith("*")) return <strong key={i} className="hl-text">{part.slice(1, -1)}</strong>;
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}

