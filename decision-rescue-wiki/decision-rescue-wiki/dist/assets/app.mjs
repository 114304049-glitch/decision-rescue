import {normalizeOptions,choose} from './picker.mjs';
const input=document.querySelector('#options');
if(input){
 const count=document.querySelector('#count'),button=document.querySelector('#pick'),result=document.querySelector('#result');
 const update=()=>{const n=normalizeOptions(input.value).length;count.textContent=`${n} 個有效選項（空白與重複項目已排除）`;button.disabled=n<2||n>1000;result.textContent='準備好就按下按鈕。';};
 input.addEventListener('input',update);update();
 document.querySelector('#picker').addEventListener('submit',event=>{event.preventDefault();try{result.textContent=`這次選：${choose(normalizeOptions(input.value))}`;}catch(e){result.textContent=e.message;}});
}
const search=document.querySelector('#search'),category=document.querySelector('#category');
if(search){const filter=()=>{let n=0;document.querySelectorAll('.article-card').forEach(card=>{const show=card.dataset.search.includes(search.value.trim().toLocaleLowerCase())&&(!category.value||card.dataset.type===category.value);card.hidden=!show;if(show)n++;});document.querySelector('#matches').textContent=`顯示 ${n} 篇內容`;};search.addEventListener('input',filter);category.addEventListener('change',filter);filter();}
