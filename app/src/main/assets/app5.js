const PR_APP_NAME='Pedido Rápido';
const PR_APP_SUB='Bar & Restaurante / 酒吧餐厅点单';
const PR_THEMES={
  day:{brand:'#7a4b24',brandDark:'#4b2d16',bg:'#f3f1ed',panel:'#ffffff',green:'#256b52',ink:'#17191c',sub:'#72767b',line:'#e4ded6',soft:'#f2ede6'},
  night:{brand:'#c69a63',brandDark:'#e2bd8a',bg:'#101215',panel:'#1b1e22',green:'#3f9b79',ink:'#f5f1ea',sub:'#a8adb3',line:'#343940',soft:'#272b30'}
};
let themeMode=(storeGet(THEME_KEY)==='night')?'night':'day';

function rebuildMaps(){
  byId=Object.fromEntries(products.map(p=>[p.id,p]));
  categories=[];
  const seen=new Set();
  products.forEach(p=>{const c=(p.cat||'').trim()||'Sin categoría / 未分类';if(!seen.has(c)){seen.add(c);categories.push(c)}});
  if(!categories.length)categories=['Sin categoría / 未分类'];
}
rebuildMaps();

function applyAppearance(){
  theme={...PR_THEMES[themeMode]};
  const r=document.documentElement;
  r.dataset.theme=themeMode;
  const map={brand:'--brand',brandDark:'--brandDark',bg:'--bg',panel:'--panel',green:'--green',ink:'--ink',sub:'--sub',line:'--line',soft:'--soft'};
  Object.entries(theme).forEach(([k,v])=>{if(map[k])r.style.setProperty(map[k],v)});
  document.title=PR_APP_NAME;
  const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content',themeMode==='night'?'#101215':'#f3f1ed');
  if($('headerBrand')){$('headerBrand').firstChild.textContent=PR_APP_NAME;if($('headerSub'))$('headerSub').textContent=PR_APP_SUB}
  if($('headerAvatar')){$('headerAvatar').innerHTML='<span>PR</span>'}
  document.querySelectorAll('[data-theme-mode]').forEach(b=>b.classList.toggle('selected',b.dataset.themeMode===themeMode));
}

function applyPreset(name){
  if(name!=='day'&&name!=='night')return;
  themeMode=name;storeSet(THEME_KEY,name);applyAppearance();toast(name==='day'?'Modo día / 白天模式':'Modo noche / 夜间模式');
}
function saveAppearance(){applyAppearance()}
function resetAppearance(){themeMode='day';storeSet(THEME_KEY,'day');applyAppearance()}

function renderCategoryManager(){
  const root=$('categoryManagerList');if(!root)return;
  root.innerHTML=categories.map((c,i)=>{const [es,zh]=splitCat(c);const count=products.filter(p=>p.cat===c).length;return `<div class="categoryEditRow" data-cat="${esc(c)}"><div class="categoryEditTop"><div><b>${esc(es)}</b><small>${esc(zh)} · ${count} productos / ${count}项</small></div><div class="catMove"><button data-cup="${i}">↑</button><button data-cdown="${i}">↓</button></div></div><div class="categoryInputs"><input data-cat-es value="${esc(es)}" placeholder="Nombre español"><input data-cat-zh value="${esc(zh)}" placeholder="中文分类名称"><button data-crename>Guardar / 保存</button></div></div>`}).join('');
  root.querySelectorAll('[data-crename]').forEach(b=>b.onclick=()=>renameCategoryRow(b.closest('.categoryEditRow')));
  root.querySelectorAll('[data-cup]').forEach(b=>b.onclick=()=>moveCategoryGroup(+b.dataset.cup,-1));
  root.querySelectorAll('[data-cdown]').forEach(b=>b.onclick=()=>moveCategoryGroup(+b.dataset.cdown,1));
}
function openCategoryManager(){renderCategoryManager();$('categoryModal').classList.add('open')}
function closeCategoryManager(){$('categoryModal').classList.remove('open')}
function renameCategoryRow(row){
  const old=row.dataset.cat;const es=row.querySelector('[data-cat-es]').value.trim();const zh=row.querySelector('[data-cat-zh]').value.trim();
  if(!es){toast('请填写西语分类名 / Escribe el nombre');return}
  const next=zh?`${es} / ${zh}`:es;if(next===old)return;
  if(categories.includes(next)&&next!==old&&!confirm('Esta categoría ya existe. ¿Fusionar? / 该分类已存在，是否合并？'))return;
  products.forEach(p=>{if(p.cat===old)p.cat=next});if(activeCat===old)activeCat=next;saveProducts();renderCategoryManager();toast('分类名称已修改 / Categoría actualizada');
}
function moveCategoryGroup(index,d){
  const j=index+d;if(index<0||j<0||j>=categories.length)return;
  const order=[...categories];[order[index],order[j]]=[order[j],order[index]];
  const rank=new Map(order.map((c,i)=>[c,i]));
  products=products.map((p,i)=>({p,i})).sort((a,b)=>(rank.get(a.p.cat)-rank.get(b.p.cat))||(a.i-b.i)).map(x=>x.p);
  saveProducts();renderCategoryManager();toast('分类顺序已调整 / Orden actualizado');
}
