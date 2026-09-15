(()=>{
const FOOD=window.FOOD_PRODUCTS_V73||[];
if(!FOOD.length)return;
window.DEFAULT_PRODUCTS=(window.DEFAULT_PRODUCTS||[]).filter(p=>p.kind!=='food').concat(JSON.parse(JSON.stringify(FOOD)));
const PRODUCTS_KEY='bm_products_v7',REV_KEY='bm_food_menu_revision';
const get=k=>{let v='';try{if(window.AndroidStore&&AndroidStore.get)v=AndroidStore.get(k)||''}catch(e){}if(!v)try{v=localStorage.getItem(k)||''}catch(e){}return v};
const set=(k,v)=>{try{if(window.AndroidStore&&AndroidStore.set)AndroidStore.set(k,v)}catch(e){}try{localStorage.setItem(k,v)}catch(e){}};
const rev=parseInt(get(REV_KEY)||'0',10)||0;if(rev>=74)return;
let old=null;try{old=JSON.parse(get(PRODUCTS_KEY)||'null')}catch(e){}
if(Array.isArray(old)&&old.length){
  const keep=old.filter(p=>p.kind!=='food'||String(p.id||'').startsWith('custom_'));
  set(PRODUCTS_KEY,JSON.stringify(keep.concat(JSON.parse(JSON.stringify(FOOD)))));
}
set(REV_KEY,'74');
})();
