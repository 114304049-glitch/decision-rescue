export function normalizeOptions(text){return [...new Set(text.split(/\r?\n/).map(x=>x.trim()).filter(Boolean))];}
export function choose(options,randomWord=()=>crypto.getRandomValues(new Uint32Array(1))[0]){
 if(options.length<2)throw Error('請至少輸入兩個不同的選項。');
 if(options.length>1000)throw Error('每次最多 1000 個選項。');
 const ceiling=Math.floor(2**32/options.length)*options.length;
 let value;do{value=randomWord();}while(value>=ceiling);
 return options[value%options.length];
}
