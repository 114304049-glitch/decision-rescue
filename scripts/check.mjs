import fs from 'node:fs/promises';
import path from 'node:path';
import {root,pages,isPublic,links,internalTarget,sections} from './content.mjs';
const all=await pages(),map=new Map(all.map(p=>[p.file,p])),errors=[],warnings=[];
const index=await fs.readFile(path.join(root,'wiki/index.md'),'utf8');
const listed=new Set(links(index).map(h=>internalTarget('wiki/index.md',h)));
const inbound=new Set();
const system=await fs.readFile(path.join(root,'wiki/overview.md'),'utf8');
for(const p of [...all,{file:'wiki/overview.md',body:system,meta:{sources:[],status:'published'}}]){
 if(p.file!=='wiki/overview.md'){
  for(const key of ['title','type','summary','tags','created','updated','status','sources'])if(p.meta[key]===undefined)errors.push(`${p.file} 缺 ${key}`);
  if(!sections[p.meta.type])errors.push(`${p.file} 類型無效`);
  const dirs={concept:'concepts',scenario:'scenarios',tool:'tools',source:'sources'};
  if(p.file.split('/')[1]!==dirs[p.meta.type])errors.push(`${p.file} 類型與目錄不一致`);
  if(!['draft','published','needs-review'].includes(p.meta.status))errors.push(`${p.file} 狀態無效`);
  if(!Array.isArray(p.meta.tags)||!Array.isArray(p.meta.sources))errors.push(`${p.file} tags/sources 應為陣列`);
  for(const k of ['created','updated']){const d=p.meta[k];if(typeof d!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(d)||Number.isNaN(Date.parse(d))||new Date(d).toISOString().slice(0,10)!==d)errors.push(`${p.file} ${k} 日期無效`);}
  if(!listed.has(p.file))errors.push(`${p.file} 未列入索引`);
  const heads=p.body.split('\n').filter(l=>l.startsWith('## ')).map(l=>l.slice(3).trim());
  for(const h of sections[p.meta.type]||[])if(!heads.includes(h))errors.push(`${p.file} 缺章節：${h}`);
 }
 const hrefs=[...links(p.body),...(Array.isArray(p.meta.sources)?p.meta.sources:[])];
 for(const href of hrefs){try{
  const target=internalTarget(p.file,href);if(target===null)continue;
  if(target==='index.html')continue;
  if(!map.has(target))throw Error(`目標不存在或不允許公開：${target}`);
  if(isPublic(p)&&!isPublic(map.get(target)))throw Error(`公開頁面連至草稿：${target}`);
  if(p.file!==target&&isPublic(p))inbound.add(target);
 }catch(e){errors.push(`${p.file}：${e.message}`);}}
 for(const source of p.meta.sources||[]){const target=internalTarget(p.file,source);if(!target||map.get(target)?.meta.type!=='source')errors.push(`${p.file} sources 必須指向來源摘要`);}
}
for(const target of listed)if(!map.has(target))errors.push(`索引連結不存在：${target}`);
for(const p of all)if(isPublic(p)&&!inbound.has(p.file))warnings.push(`孤立文章（索引之外無連入）：${p.file}`);
for(const w of warnings)console.warn(`提醒：${w}`);
if(errors.length){console.error(errors.join('\n'));process.exitCode=1;}else console.log(`內容檢查通過：${all.length} 篇；此結果不代表已驗證事實、矛盾、時效或無個資。`);
