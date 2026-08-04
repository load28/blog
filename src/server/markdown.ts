import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import remarkCjkFriendly from "remark-cjk-friendly";
import remarkDirective from "remark-directive";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import { visit } from "unist-util-visit";
import { createHighlighter, type Highlighter, type ThemeRegistration } from "shiki";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";

/* Syntax palette drawn from the site's FT-based design system:
   ink #33302e · muted #9c948d · teal #0d7680 · claret #990f3d ·
   oxford #0f5499 · burnt mandarin #b35309 — code reads as part of the paper. */
const paperTheme: ThemeRegistration = {
  name: "paper",
  type: "light",
  colors: {
    "editor.background": "#fff8f1",
    "editor.foreground": "#33302e",
  },
  settings: [
    { settings: { foreground: "#33302e" } },
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "#9c948d", fontStyle: "italic" },
    },
    {
      scope: ["string", "punctuation.definition.string", "string.template"],
      settings: { foreground: "#0d7680" },
    },
    {
      scope: [
        "constant.numeric",
        "constant.language",
        "constant.character",
        "constant.other.placeholder",
      ],
      settings: { foreground: "#b35309" },
    },
    {
      scope: [
        "keyword",
        "storage.type",
        "storage.modifier",
        "keyword.control",
        "variable.language.this",
        "support.type.builtin",
      ],
      settings: { foreground: "#990f3d" },
    },
    {
      scope: ["keyword.operator"],
      settings: { foreground: "#66605c" },
    },
    {
      scope: [
        "entity.name.function",
        "support.function",
        "meta.function-call.generic",
      ],
      settings: { foreground: "#0f5499" },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "entity.name.namespace",
        "support.type",
        "support.class",
      ],
      settings: { foreground: "#0f5499" },
    },
    {
      scope: ["entity.name.tag"],
      settings: { foreground: "#990f3d" },
    },
    {
      scope: ["entity.other.attribute-name"],
      settings: { foreground: "#0f5499" },
    },
    {
      scope: ["variable", "variable.parameter", "variable.other"],
      settings: { foreground: "#33302e" },
    },
    {
      scope: ["punctuation", "meta.brace"],
      settings: { foreground: "#66605c" },
    },
    {
      scope: ["markup.bold"],
      settings: { fontStyle: "bold" },
    },
    {
      scope: ["markup.italic"],
      settings: { fontStyle: "italic" },
    },
  ],
};

const LANGS = [
  "typescript",
  "javascript",
  "tsx",
  "jsx",
  "rust",
  "bash",
  "css",
  "html",
  "json",
  "proto",
  "markdown",
  "yaml",
  "sql",
];

const LANG_ALIAS: Record<string, string> = {
  ts: "typescript",
  js: "javascript",
  protobuf: "proto",
  shell: "bash",
  sh: "bash",
};

let _hl: Promise<Highlighter> | null = null;
function getHighlighter(): Promise<Highlighter> {
  if (!_hl)
    _hl = createHighlighter({
      themes: [paperTheme],
      langs: LANGS,
      engine: createJavaScriptRegexEngine({ forgiving: true }),
    });
  return _hl;
}

export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

type HNode = Record<string, any>;

function h(tagName: string, properties: HNode = {}, children: HNode[] = []): HNode {
  return { type: "element", tagName, properties, children };
}

function text(value: string): HNode {
  return { type: "text", value };
}

/* :::note / :::tip / :::warning containers → editorial callout asides.
   Optional label — :::note[알아두기] — replaces the default kicker text. */
const CALLOUTS: Record<string, string> = {
  note: "Note",
  tip: "Tip",
  warning: "Warning",
  aside: "Aside",
};

function remarkCallouts() {
  return (tree: any) => {
    visit(tree, "containerDirective", (node: any) => {
      const kind = node.name?.toLowerCase();
      if (!(kind in CALLOUTS)) return;
      let label = CALLOUTS[kind];
      node.children = node.children.filter((c: any) => {
        if (c.data?.directiveLabel) {
          const t = c.children?.map((x: any) => x.value || "").join("");
          if (t) label = t;
          return false;
        }
        return true;
      });
      node.data = {
        ...node.data,
        hName: "aside",
        hProperties: { className: ["cl", `cl-${kind}`], "data-cl": label },
      };
    });
  };
}

/* Fence meta must ride through rehype-raw as a property, not node data. */
function remarkCodeMeta() {
  return (tree: any) => {
    visit(tree, "code", (node: any) => {
      if (!node.meta) return;
      node.data = {
        ...node.data,
        hProperties: { ...(node.data?.hProperties || {}), dataMeta: node.meta },
      };
    });
  };
}

/* Standalone images → figures; the title becomes an editorial caption. */
function rehypeFigures() {
  return (tree: any) => {
    visit(tree, "element", (node: any, index: number | undefined, parent: any) => {
      if (
        node.tagName !== "p" ||
        !parent ||
        index === undefined ||
        node.children.length !== 1 ||
        node.children[0].tagName !== "img"
      )
        return;
      const img = node.children[0];
      const caption = img.properties?.title || "";
      if (caption) delete img.properties.title;
      const kids = [img];
      if (caption) kids.push(h("figcaption", { className: ["fgc"] }, [text(caption)]));
      parent.children[index] = h("figure", { className: ["fg"] }, kids);
    });
  };
}

/* Tables keep their full-bleed top rule; a wrapper owns horizontal overflow. */
function rehypeTableWrap() {
  return (tree: any) => {
    visit(tree, "element", (node: any, index: number | undefined, parent: any) => {
      if (node.tagName !== "table" || !parent || index === undefined) return;
      if (parent.tagName === "div" && parent.properties?.className?.includes("tw"))
        return;
      parent.children[index] = h("div", { className: ["tw"] }, [node]);
    });
  };
}

function rehypeExternalLinks() {
  return (tree: any) => {
    visit(tree, "element", (node: any) => {
      if (node.tagName !== "a") return;
      const href = String(node.properties?.href || "");
      if (/^https?:\/\//.test(href)) {
        node.properties.target = "_blank";
        node.properties.rel = ["noopener"];
      }
    });
  };
}

/* pre>code → printed code plate: hairline figure with a kicker row
   (language · optional title · copy button) and paper-palette highlighting. */
function rehypeCodePlates(hl: Highlighter) {
  return (tree: any) => {
    visit(tree, "element", (node: any, index: number | undefined, parent: any) => {
      if (node.tagName !== "pre" || !parent || index === undefined) return;
      const code = node.children?.find((c: any) => c.tagName === "code");
      if (!code) return;

      const cls: string[] = code.properties?.className || [];
      let lang =
        (cls.find((c) => c.startsWith("language-")) || "").slice(9).toLowerCase();
      lang = LANG_ALIAS[lang] || lang;
      const meta: string = code.properties?.dataMeta || "";
      const title = (meta.match(/title="([^"]*)"/) || [])[1] || "";
      const src = (code.children || [])
        .map((c: any) => c.value || "")
        .join("")
        .replace(/\n$/, "");

      let pre: HNode;
      if (LANGS.includes(lang)) {
        const hast = hl.codeToHast(src, { lang, theme: "paper" }) as any;
        pre = hast.children.find((c: any) => c.tagName === "pre");
        delete pre.properties.style;
      } else {
        pre = h("pre", { className: ["shiki"] }, [h("code", {}, [text(src)])]);
      }

      const head = [h("span", { className: ["cdl"] }, [text(lang || "text")])];
      if (title) head.push(h("span", { className: ["cdt"] }, [text(title)]));
      head.push(
        h("button", { className: ["cp"], type: "button", "aria-label": "코드 복사" }, [
          text("Copy"),
        ])
      );

      parent.children[index] = h("figure", { className: ["cd"] }, [
        h("figcaption", { className: ["cdh"] }, head),
        pre,
      ]);
    });
  };
}

/* Split the article into h2-bounded magazine sections — an optional lead
   (.sec-lead) before the first h2, then spreads with a left rail
   (.sr > .sri, sticky h2 + counter) beside the body (.sb). Body blocks
   keep their .bk stagger shells; the delay resets per section. */
function rehypeSections() {
  return (tree: any) => {
    const sections: HNode[] = [];
    let rail: HNode | null = null;
    let body: HNode[] = [];

    const wrapBlocks = (nodes: HNode[]) => {
      let j = 0;
      return nodes.map((n) =>
        n.type === "element"
          ? h(
              "div",
              { className: ["bk"], style: `animation-delay:${Math.min(j++ * 50, 200)}ms` },
              [n]
            )
          : n
      );
    };

    const push = () => {
      if (rail) {
        sections.push(
          h("section", { className: ["sec"] }, [
            h("div", { className: ["sr"] }, [h("div", { className: ["sri"] }, [rail])]),
            h("div", { className: ["sb"] }, wrapBlocks(body)),
          ])
        );
      } else if (body.some((n) => n.type === "element")) {
        sections.push(
          h("section", { className: ["sec", "sec-lead"] }, [
            h("div", { className: ["sb"] }, wrapBlocks(body)),
          ])
        );
      }
      rail = null;
      body = [];
    };

    for (const node of tree.children) {
      if (node.type === "element" && node.tagName === "h2") {
        push();
        rail = node;
      } else {
        body.push(node);
      }
    }
    push();
    tree.children = sections;
  };
}

export async function md2html(s: string): Promise<string> {
  const hl = await getHighlighter();
  const file = await unified()
    .use(remarkParse)
    /* CommonMark 플랭킹 규칙은 `**컬럼(열)**이`처럼 닫는 `**` 앞이 문장부호이고
       뒤에 한글이 붙으면 강조를 닫지 못한다 — CJK 친화 규칙으로 보정한다. */
    .use(remarkCjkFriendly)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkDirective)
    .use(remarkCallouts)
    .use(remarkCodeMeta)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeCodePlates, hl)
    .use(rehypeFigures)
    .use(rehypeTableWrap)
    .use(rehypeExternalLinks)
    .use(rehypeSections)
    .use(rehypeStringify)
    .process(s);
  return String(file);
}
