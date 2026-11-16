import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import {root,render,internalTarget} from '../scripts/content.mjs';
test('Markdown 不執行原始 HTML，內部連結轉成 HTML',()=>{const html=render('<script>alert(1)</script>\n\n[連結](../concepts/a.md#x)');assert.ok(!html.includes('<script>'));assert.ok(html.includes('../concepts/a.html#x'));});
test('建立時不發布草稿或原始檔案',async()=>{
 const file=path.join(root,'wiki/concepts/test-private-draft.md');
 try{await fs.writeFile(file,'---\ntitle: 私人草稿\ntype: concept\nsummary: 不應公開\ntags: []\ncreated: 2026-11-15\nupdated: 2026-11-15\nstatus: draft\nsources: []\n---\n私人草稿內容');await import('../scripts/build.mjs');const home=await fs.readFile(path.join(root,'dist/index.html'),'utf8');assert.ok(!home.includes('私人草稿'));await assert.rejects(fs.access(path.join(root,'dist/wiki/concepts/test-private-draft.html')));await assert.rejects(fs.access(path.join(root,'dist/raw')));
 // Inspect every generated HTML local link and asset target, including direct article routes.
 async function walk(dir){for(const ent of await fs.readdir(dir,{withFileTypes:true})){const target=path.join(dir,ent.name);if(ent.isDirectory())await walk(target);else if(ent.name.endsWith('.html')){const html=await fs.readFile(target,'utf8');for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){const href=m[1];if(/^[a-z]+:/i.test(href)||href.startsWith('#'))continue;assert.ok(!href.startsWith('/'),'資源必須支援 Pages 子路徑');await fs.access(path.resolve(path.dirname(target),href.split('#')[0]));}}}}
 await walk(path.join(root,'dist'));
 }finally{await fs.rm(file,{force:true});}
});
