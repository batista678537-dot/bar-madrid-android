(()=>{
const FOOD=window.FOOD_PRODUCTS_V73||[];
if(!FOOD.length)return;
const STEAM='https://images.food52.com/bq-2LKPj6w5qyn8z3iFF3vCb8T0%3D/5167ce82-64ab-4fae-ac64-f9fd287a593b--food52_04-24-12-2277.jpg?q=75&w=3840';
const PAN='https://www.gyoza-maruken.jp/upload/menu/yakigyouza.jpg';
FOOD.forEach(p=>{
  const es=String(p.es||'').toLowerCase();
  if(!es.includes('gyoza'))return;
  if(es.includes('al vapor')){p.img=STEAM;p.fit='cover'}
  else if(es.includes('a la plancha')){p.img=PAN;p.fit='cover'}
});
})();
