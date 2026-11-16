import './build.mjs';
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {root} from './content.mjs';
const base=path.join(root,'dist');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.mjs':'text/javascript; charset=utf-8'};
http.createServer(async(req,res)=>{try{let pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);if(pathname.endsWith('/'))pathname+='index.html';const file=path.resolve(base,'.'+pathname);if(!file.startsWith(base+path.sep))throw Error('禁止路徑');const data=await fs.readFile(file);res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});res.end(data);}catch{res.writeHead(404);res.end('404 Not Found');}}).listen(4173,'127.0.0.1',()=>console.log('本機預覽：http://localhost:4173（修改後請重新啟動；不是公開網址）'));
