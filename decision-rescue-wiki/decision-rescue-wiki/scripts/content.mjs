import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import YAML from 'yaml';
import MarkdownIt from 'markdown-it';
export const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
export const groups={concept:'選餐方法',scenario:'用餐情境',tool:'互動工具',source:'來源摘要'};
export const sections=JSON.parse(await fs.readFile(path.join(root,'scripts/sections.json'),'utf8'));
export const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function parse(text){
 const m=text.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
 if(!m)throw Error('缺少 YAML metadata');
 return {meta:YAML.parse(m[1]),body:text.slice(m[0].length)};
}
export async function pages(){
 const out=[];
 for(const dir of ['concepts','scenarios','tools','sources']){
  for(const name of (await fs.readdir(path.join(root,'wiki',dir))).sort()){
   if(!name.endsWith('.md'))continue;
   const file=`wiki/${dir}/${name}`;
   out.push({file,...parse(await fs.readFile(path.join(root,file),'utf8'))});
  }
 }
 return out;
}
export const isPublic=p=>['published','needs-review'].includes(p.meta.status);
export function links(text){return [...text.matchAll(/!?\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)].map(m=>m[1]);}
export function internalTarget(file,href){
 if(/^[a-z][a-z0-9+.-]*:/i.test(href)||href.startsWith('#'))return null;
 if(href.startsWith('/'))throw Error('內部連結請用相對路徑');
 return path.posix.normalize(path.posix.join(path.posix.dirname(file),decodeURIComponent(href.split(/[?#]/)[0])));
}
export function render(body){
 const md=new MarkdownIt({html:false,linkify:false});
 const original=md.renderer.rules.link_open||((t,i,o,e,s)=>s.renderToken(t,i,o));
 md.renderer.rules.link_open=(tokens,i,options,env,self)=>{
  const href=tokens[i].attrGet('href');
  if(href&&!/^[a-z][a-z0-9+.-]*:/i.test(href))tokens[i].attrSet('href',href.replace(/\.md(?=[#?]|$)/,'.html'));
  return original(tokens,i,options,env,self);
 };
 return md.render(body);
}
