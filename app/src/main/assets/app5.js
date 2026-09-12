const PR_APP_NAME='Pedido Rápido';
const PR_APP_SUB='Bar & Restaurante / 酒吧餐厅点单';
const PR_THEME={brand:'#7a4b24',brandDark:'#4b2d16',bg:'#f3f1ed',panel:'#ffffff',green:'#256b52',ink:'#17191c',sub:'#72767b',line:'#e4ded6',soft:'#f2ede6'};

function rebuildMaps(){
  byId=Object.fromEntries(products.map(p=>[p.id,p]));
  categories=[];
  const seen=new Set();
  products.forEach(p=>{const c=(p.cat||'').trim()||'Sin categoría / 未分类';if(!seen.has(c)){seen.add(c);categories.push(c)}});
  if(!categories.length)categories=['Sin categoría / 未分类'];
}
rebuildMaps();

function applyAppearance(){
  theme={...PR_THEME};
  storeRemove(THEME_KEY);storeRemove(PROFILE_KEY);
  const r=document.documentElement;r.removeAttribute('data-theme');
  const map={brand:'--brand',brandDark:'--brandDark',bg:'--bg',panel:'--panel',green:'--green',ink:'--ink',sub:'--sub',line:'--line',soft:'--soft'};
  Object.entries(theme).forEach(([k,v])=>{if(map[k])r.style.setProperty(map[k],v)});
  document.title=PR_APP_NAME;
  const meta=document.querySelector('meta[name="theme-color"]');if(meta)meta.setAttribute('content','#f3f1ed');
  if($('headerBrand')){$('headerBrand').firstChild.textContent=PR_APP_NAME;if($('headerSub'))$('headerSub').textContent=PR_APP_SUB}
  if($('headerAvatar'))$('headerAvatar').innerHTML='<span>PR</span>';
}
function applyPreset(){applyAppearance()}
function saveAppearance(){applyAppearance()}
function resetAppearance(){applyAppearance()}

function fillCategorySelect(selected){
  const el=$('editCat');if(!el)return;
  let list=[...categories];
  if(selected&&!list.includes(selected))list.unshift(selected);
  el.innerHTML=list.map(c=>`<option value="${esc(c)}">${esc(c)}</option>`).join('');
  el.value=(selected&&list.includes(selected))?selected:(list[0]||'');
}

function openProductEditor(id){
  editingProductId=id||null;
  const p=id?byId[id]:{id:'custom_'+Date.now(),es:'',zh:'',cat:activeCat||categories[0],kind:'food',fit:'cover',img:''};
  $('editorTitle').textContent=id?'Editar producto / 编辑商品':'Nuevo producto / 新增商品';
  $('editEs').value=p.es||'';$('editZh').value=p.zh||'';fillCategorySelect(p.cat||categories[0]);
  $('editKind').value=p.kind||'food';$('editFit').value=p.fit||'cover';$('editPreview').src=p.img||'';
  $('editPreviewBox').classList.toggle('cover',(p.fit||'cover')==='cover');$('deleteProduct').style.visibility=id?'visible':'hidden';
  $('editorModal').classList.add('open');$('editImageFile').value='';$('editPreview').dataset.newimg='';
}

function saveProductFromEditor(){
  const es=$('editEs').value.trim(),zh=$('editZh').value.trim(),cat=$('editCat').value.trim();
  if(!es||!cat){toast('请填写名称并选择分类 / Completa nombre y categoría');return}
  if(editingProductId){
    const p=byId[editingProductId];if(!p)return;
    Object.assign(p,{es,zh,cat,kind:$('editKind').value,fit:$('editFit').value});
    if($('editPreview').dataset.newimg)p.img=$('editPreview').dataset.newimg;
  }else{
    const id='custom_'+Date.now();products.push({id,es,zh,cat,kind:$('editKind').value,fit:$('editFit').value,img:$('editPreview').dataset.newimg||''});
  }
  saveProducts();closeEditor();toast('菜单已保存 / Menú guardado');
}

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
  const old=row.dataset.cat,es=row.querySelector('[data-cat-es]').value.trim(),zh=row.querySelector('[data-cat-zh]').value.trim();
  if(!es){toast('请填写西语分类名 / Escribe el nombre');return}
  const next=zh?`${es} / ${zh}`:es;if(next===old)return;
  if(categories.includes(next)&&next!==old&&!confirm('Esta categoría ya existe. ¿Fusionar? / 该分类已存在，是否合并？'))return;
  products.forEach(p=>{if(p.cat===old)p.cat=next});if(activeCat===old)activeCat=next;
  saveProducts();renderCategoryManager();toast('分类名称已修改 / Categoría actualizada');
}
function moveCategoryGroup(index,d){
  const j=index+d;if(index<0||j<0||j>=categories.length)return;
  const order=[...categories];[order[index],order[j]]=[order[j],order[index]];
  const rank=new Map(order.map((c,i)=>[c,i]));
  products=products.map((p,i)=>({p,i})).sort((a,b)=>(rank.get(a.p.cat)-rank.get(b.p.cat))||(a.i-b.i)).map(x=>x.p);
  saveProducts();renderCategoryManager();toast('分类顺序已调整 / Orden actualizado');
}
