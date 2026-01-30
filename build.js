#!/usr/bin/env node
var fs=require("fs"),path=require("path"),dir=path.join(__dirname,"content/posts"),out=path.join(__dirname,"blog/p"),CZ=8,idx=[];
fs.readdirSync(dir).filter(f=>f.endsWith(".mdx")).forEach(f=>{
var raw=fs.readFileSync(path.join(dir,f),"utf8"),m=raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
if(!m)return;var fm={},body=m[2];
m[1].split("\n").forEach(l=>{var k=l.match(/^(\w+):\s*(.+)$/);if(k){var v=k[2].replace(/^['"]|['"]$/g,"");if(v.startsWith("["))v=v.slice(1,-1).split(",").map(s=>s.trim().replace(/^['"]|['"]$/g,""));fm[k[1]]=v}});
var slug=f.replace(/\.mdx$/,""),html=md2html(body.trim());
fs.writeFileSync(path.join(out,slug+".html"),html,"utf8");
idx.push({s:slug,t:fm.title||slug,d:fm.date||"",g:(Array.isArray(fm.tags)?fm.tags:[]).join(",")})
});
idx.sort((a,b)=>b.d.localeCompare(a.d));
var tc=Math.ceil(idx.length/CZ);
for(var i=0;i<tc;i++)fs.writeFileSync(path.join(__dirname,"blog/c/i"+i+".json"),JSON.stringify(idx.slice(i*CZ,(i+1)*CZ)),"utf8");
fs.writeFileSync(path.join(__dirname,"blog/c/m.json"),JSON.stringify({t:idx.length,c:tc,z:CZ,g:[...new Set(idx.flatMap(p=>p.g?p.g.split(","):[]))].sort()}),"utf8");
// cleanup old single file
try{fs.unlinkSync(path.join(__dirname,"blog/c/i.json"))}catch(e){}
console.log("Built "+idx.length+" posts → "+tc+" chunks ("+CZ+"/chunk)");

function md2html(s){
var lines=s.split("\n"),out=[],inCode=0,codeBuf=[],codeLang="";
for(var i=0;i<lines.length;i++){
var l=lines[i];
if(l.startsWith("```")){
if(inCode){out.push('<pre><code class="language-'+codeLang+'">'+esc(codeBuf.join("\n"))+"</code></pre>");codeBuf=[];inCode=0}
else{codeLang=l.slice(3).trim();inCode=1}
continue}
if(inCode){codeBuf.push(l);continue}
if(!l.trim()){if(out.length&&!out[out.length-1].endsWith("</ul>")&&!out[out.length-1].endsWith("</ol>"))out.push("");continue}
if(l.match(/^#{1,6}\s/)){var lv=l.indexOf(" "),tg="h"+lv;out.push("<"+tg+">"+inline(l.slice(lv+1))+"</"+tg+">");continue}
if(l.match(/^[-*]\s/)){var ul=["<ul>"];while(i<lines.length&&lines[i].match(/^[-*]\s/)){ul.push("<li>"+inline(lines[i].replace(/^[-*]\s/,""))+"</li>");i++}i--;ul.push("</ul>");out.push(ul.join(""));continue}
if(l.match(/^\d+\.\s/)){var ol=["<ol>"];while(i<lines.length&&lines[i].match(/^\d+\.\s/)){ol.push("<li>"+inline(lines[i].replace(/^\d+\.\s/,""))+"</li>");i++}i--;ol.push("</ol>");out.push(ol.join(""));continue}
if(l.startsWith(">")){out.push("<blockquote>"+inline(l.replace(/^>\s?/,""))+"</blockquote>");continue}
if(l.startsWith("---")||l.startsWith("***")){out.push("<hr>");continue}
out.push("<p>"+inline(l)+"</p>")
}
if(inCode){out.push('<pre><code class="language-'+codeLang+'">'+esc(codeBuf.join("\n"))+"</code></pre>")}
return out.join("\n")}
function inline(s){
s=s.replace(/\*\*(.+?)\*\*/g,"<b>$1</b>");
s=s.replace(/\*(.+?)\*/g,"<em>$1</em>");
s=s.replace(/`([^`]+)`/g,"<code>$1</code>");
s=s.replace(/\[([^\]]+)\]\(([^)]+)\)/g,'<a href="$2" target=_blank>$1</a>');
return s}
function esc(s){return s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}
