export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function inline(s: string): string {
  const codes: string[] = [];
  s = s.replace(/`([^`]+)`/g, (_, code) => {
    codes.push("<code>" + esc(code) + "</code>");
    return "\x00" + (codes.length - 1) + "\x00";
  });
  const links: string[] = [];
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
    links.push('<a href="' + url + '" target=_blank>' + esc(text) + '</a>');
    return "\x01" + (links.length - 1) + "\x01";
  });
  s = esc(s);
  s = s.replace(/\n/g, "<br>");
  s = s.replace(/\*\*([\s\S]+?)\*\*/g, "<b>$1</b>");
  s = s.replace(/\*(.+?)\*/g, "<em>$1</em>");
  s = s.replace(/\x00(\d+)\x00/g, (_, i) => codes[+i]);
  s = s.replace(/\x01(\d+)\x01/g, (_, i) => links[+i]);
  return s;
}

export function md2html(s: string): string {
  const lines = s.split("\n");
  const out: string[] = [];
  let inCode = false;
  const codeBuf: string[] = [];
  let codeLang = "";

  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];

    if (l.startsWith("```")) {
      if (inCode) {
        out.push(
          '<pre><code class="language-' +
            codeLang +
            '">' +
            esc(codeBuf.join("\n")) +
            "</code></pre>"
        );
        codeBuf.length = 0;
        inCode = false;
      } else {
        codeLang = l.slice(3).trim();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeBuf.push(l);
      continue;
    }

    if (!l.trim()) {
      if (
        out.length &&
        !out[out.length - 1].endsWith("</ul>") &&
        !out[out.length - 1].endsWith("</ol>")
      )
        out.push("");
      continue;
    }

    if (l.match(/^<(div|style|svg|section|figure|details|table|iframe|script)\b/i)) {
      const htmlBuf: string[] = [l];
      const tagMatch = l.match(/^<(\w+)/);
      if (tagMatch) {
        const tag = tagMatch[1].toLowerCase();
        let depth = 1;
        if (l.includes("</" + tag + ">")) {
          depth = 0;
        }
        while (depth > 0 && i + 1 < lines.length) {
          i++;
          htmlBuf.push(lines[i]);
          const opens = (lines[i].match(new RegExp("<" + tag + "[\\s>]", "gi")) || []).length;
          const closes = (lines[i].match(new RegExp("</" + tag + ">", "gi")) || []).length;
          depth += opens - closes;
        }
      }
      out.push(htmlBuf.join("\n"));
      continue;
    }

    if (l.match(/^#{1,6}\s/)) {
      const lv = l.indexOf(" ");
      const tg = "h" + lv;
      out.push("<" + tg + ">" + inline(l.slice(lv + 1)) + "</" + tg + ">");
      continue;
    }

    if (l.match(/^[-*]\s/)) {
      const ul = ["<ul>"];
      while (i < lines.length && lines[i].match(/^[-*]\s/)) {
        ul.push("<li>" + inline(lines[i].replace(/^[-*]\s/, "")) + "</li>");
        i++;
      }
      i--;
      ul.push("</ul>");
      out.push(ul.join(""));
      continue;
    }

    if (l.match(/^\d+\.\s/)) {
      const ol = ["<ol>"];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        ol.push("<li>" + inline(lines[i].replace(/^\d+\.\s/, "")) + "</li>");
        i++;
      }
      i--;
      ol.push("</ol>");
      out.push(ol.join(""));
      continue;
    }

    if (l.startsWith(">")) {
      out.push(
        "<blockquote>" + inline(l.replace(/^>\s?/, "")) + "</blockquote>"
      );
      continue;
    }

    if (l.startsWith("---") || l.startsWith("***")) {
      out.push("<hr>");
      continue;
    }

    if (
      l.match(/^\|(.+)\|$/) &&
      i + 1 < lines.length &&
      lines[i + 1].match(/^\|[\s:|-]+\|$/)
    ) {
      const hd = l.split("|").slice(1, -1);
      const al = lines[i + 1]
        .split("|")
        .slice(1, -1)
        .map((c) =>
          c.trim().startsWith(":") && c.trim().endsWith(":")
            ? "center"
            : c.trim().endsWith(":")
              ? "right"
              : "left"
        );
      const tb = ["<table><thead><tr>"];
      hd.forEach((c, j) =>
        tb.push(
          '<th style="text-align:' +
            al[j] +
            '">' +
            inline(c.trim()) +
            "</th>"
        )
      );
      tb.push("</tr></thead><tbody>");
      i += 2;
      while (i < lines.length && lines[i].match(/^\|(.+)\|$/)) {
        const cs = lines[i].split("|").slice(1, -1);
        tb.push("<tr>");
        cs.forEach((c, j) =>
          tb.push(
            '<td style="text-align:' +
              (al[j] || "left") +
              '">' +
              inline(c.trim()) +
              "</td>"
          )
        );
        tb.push("</tr>");
        i++;
      }
      i--;
      tb.push("</tbody></table>");
      out.push(tb.join(""));
      continue;
    }

    const pb = [l];
    while (
      i + 1 < lines.length &&
      lines[i + 1].trim() &&
      !lines[i + 1].match(
        /^(#{1,6}\s|[-*]\s|\d+\.\s|>|```|---|\*\*\*|\|)/
      ) &&
      !inCode
    ) {
      i++;
      pb.push(lines[i]);
    }
    out.push("<p>" + inline(pb.join("\n")) + "</p>");
  }

  if (inCode) {
    out.push(
      '<pre><code class="language-' +
        codeLang +
        '">' +
        esc(codeBuf.join("\n")) +
        "</code></pre>"
    );
  }

  return out.join("\n");
}
