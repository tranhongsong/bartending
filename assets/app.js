"use strict";
/* ============ TIỆN ÍCH ============ */
const $=(s,r=document)=>r.querySelector(s);
const el=(t,a={},h="")=>{const e=document.createElement(t);Object.entries(a).forEach(([k,v])=>e.setAttribute(k,v));e.innerHTML=h;return e;};
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(e){return d;}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(e){}}};

const BASE_LABEL={rum:"Rum",gin:"Gin",vodka:"Vodka",tequila:"Tequila",whisky:"Whiskey",other:"Rượu khác",none:"Không cồn"};
const STRENGTH=["Không cồn","Nhẹ","Vừa","Mạnh","Rất mạnh"];
const DIFF=["","Dễ","Trung bình","Khó"];
const OZ=29.5735;

function frac(x){
  if(x<=0)return "0";
  const q=Math.round(x*4)/4;
  const w=Math.floor(q), r=q-w;
  const f={0:"",0.25:"¼",0.5:"½",0.75:"¾"}[r];
  if(q===0)return "⅛";
  return (w?w+(f?" ":""):"")+f;
}
function fmtQty(q,u,unit){
  const total=q;
  if(u==="ml"){
    if(unit==="oz")return frac(total/OZ)+" oz";
    return (Math.round(total*10)/10)+" ml";
  }
  return frac(total)+" "+u;
}

/* ============ RENDER KIẾN THỨC ============ */
function fill(sel,items,make){const box=$(sel);if(box)box.append(...items.map(make));}
function renderKnowledge(){
  fill("#tools",TOOLS,t=>el("div",{class:"box"},`<span class="ico">${t[0]}</span><h3>${t[1]}</h3><p style="color:var(--muted);margin:0">${t[2]}</p>`));
  fill("#ingredients",INGREDIENTS,([title,items],i)=>{
    const d=el("details",{},`<summary>${title}</summary><div class="in">${items.map(([n,t])=>`<p><b style="color:var(--ink)">${n}</b> — ${t}</p>`).join("")}</div>`);
    if(i===0)d.open=true;return d;});
  fill("#techniques",TECH,t=>el("div",{class:"box"},`<h3>${t[0]}</h3><p style="color:var(--muted)">${t[1]}</p><span class="tag">${t[2]}</span>`));
  fill("#glasses",GLASSES,g=>el("div",{class:"box"},`<span class="ico">${g[0]}</span><h3>${g[1]}</h3><span class="tag">${g[2]}</span><p style="color:var(--muted);margin:8px 0 0">${g[3]}</p>`));
  fill("#ice",ICE,g=>el("div",{class:"box"},`<span class="ico">${g[0]}</span><h3>${g[1]}</h3><p style="color:var(--muted);margin:0">${g[2]}</p>`));
  fill("#basics",BASICS,b=>el("details",{},`<summary>${b[0]}</summary><div class="in">${b[1]}</div>`));
  fill("#tips",TIPS,t=>el("div",{class:"box"},`<span class="ico">${t[0]}</span><h3>${t[1]}</h3><p style="color:var(--muted);margin:0">${t[2]}</p>`));
  fill("#gloss",GLOSS,g=>el("tr",{},`<td><b>${g[0]}</b></td><td>${g[1]}</td>`));
  const stats=$("#stats");
  if(stats){
    const nc=R.filter(r=>r.type==="cocktail").length, nm=R.filter(r=>r.type==="mocktail").length;
    stats.innerHTML=`<div class="stat"><b>${R.length}</b><span>công thức</span></div><div class="stat"><b>${nc}</b><span>cocktail</span></div><div class="stat"><b>${nm}</b><span>mocktail</span></div><div class="stat"><b>${R.filter(r=>r.iba).length}</b><span>trong danh sách IBA</span></div><div class="stat"><b>${TECH.length}</b><span>kỹ thuật</span></div><div class="stat"><b>${GLOSS.length}</b><span>thuật ngữ</span></div>`;
  }
}

/* ============ BỘ LỌC &amp; THẺ CÔNG THỨC ============ */
const PAGE=36;
const st={type:"all",base:"all",flavor:"all",diff:"all",iba:"all",fam:"all",occ:"all",sort:"az",q:"",fav:false,unit:"ml",limit:PAGE};
let favs=new Set(store.get("cm-fav",[]));
const norm=s=>s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d");

function makeChips(id,key,opts){
  const g=$(id);
  opts.forEach(([val,label])=>{
    const b=el("button",{class:"chip",type:"button","aria-pressed":String(st[key]===val),"data-v":val},label);
    b.addEventListener("click",()=>{st[key]=val;g.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",String(c.dataset.v===String(st[key]))));st.limit=PAGE;renderCards();});
    g.append(b);
  });
}
function initFilters(){
  makeChips("#fType","type",[["all","Tất cả"],["cocktail","🍸 Cocktail"],["mocktail","🍹 Mocktail"]]);
  makeChips("#fBase","base",[["all","Tất cả"],["rum","Rum"],["gin","Gin"],["vodka","Vodka"],["tequila","Tequila"],["whisky","Whiskey"],["other","Khác"],["none","Không cồn"]]);
  const flavors=[...new Set(R.flatMap(r=>r.flavors))].sort((a,b)=>a.localeCompare(b,"vi"));
  makeChips("#fFlavor","flavor",[["all","Tất cả"],...flavors.map(f=>[f,f])]);
  makeChips("#fDiff","diff",[["all","Tất cả"],["1","Dễ"],["2","Trung bình"],["3","Khó"]]);
  makeChips("#fIba","iba",[["all","Tất cả"],["any","Có trong IBA (102)"],...Object.entries(IBA_LABEL)]);
  makeChips("#fFam","fam",[["all","Tất cả"],...Object.entries(FAM_LABEL).filter(([k])=>R.some(r=>r.fam===k))]);
  makeChips("#fOcc","occ",[["all","Tất cả"],...Object.entries(OCC_LABEL)]);
  makeChips("#fSort","sort",[["az","A → Z"],["mild","Nhẹ → mạnh"],["strong","Mạnh → nhẹ"],["easy","Dễ → khó"]]);
  const misc=$("#fMisc");
  const favBtn=el("button",{class:"chip",type:"button","aria-pressed":"false"},"❤ Yêu thích");
  favBtn.addEventListener("click",()=>{st.fav=!st.fav;favBtn.setAttribute("aria-pressed",String(st.fav));st.limit=PAGE;renderCards();});
  const unitBtn=el("button",{class:"chip",type:"button","aria-pressed":"false",title:"Hiển thị lượng bằng ounce (oz) thay cho ml"},"Đơn vị: ml");
  unitBtn.addEventListener("click",()=>{st.unit=st.unit==="ml"?"oz":"ml";syncUnitBtn();if(dlg&&dlg.open&&cur)renderModal();});
  const rnd=el("button",{class:"chip",type:"button"},"🎲 Ngẫu nhiên");
  rnd.addEventListener("click",()=>{const pool=filtered();const pick=(pool.length?pool:R)[Math.floor(Math.random()*(pool.length?pool.length:R.length))];openRecipe(pick.id);});
  misc.append(favBtn,unitBtn,rnd);
  $("#q").addEventListener("input",e=>{st.q=norm(e.target.value.trim());st.limit=PAGE;renderCards();});
}
function matches(r){
  if(st.type!=="all"&&r.type!==st.type)return false;
  if(st.base!=="all"&&r.base!==st.base)return false;
  if(st.flavor!=="all"&&!r.flavors.includes(st.flavor))return false;
  if(st.diff!=="all"&&String(r.diff)!==st.diff)return false;
  if(st.iba==="any"&&!r.iba)return false;
  if(st.iba!=="all"&&st.iba!=="any"&&r.iba!==st.iba)return false;
  if(st.fam!=="all"&&r.fam!==st.fam)return false;
  if(st.occ!=="all"&&!r.occ.includes(st.occ))return false;
  if(st.fav&&!favs.has(r.id))return false;
  if(st.q){
    const hay=norm([r.name,r.iba?"iba "+IBA_LABEL[r.iba]:"",FAM_LABEL[r.fam],r.occ.map(o=>OCC_LABEL[o]).join(" "),r.desc,r.glass,r.method,r.origin,BASE_LABEL[r.base],r.flavors.join(" "),r.ing.map(i=>i[0]).join(" ")].join(" "));
    if(!st.q.split(/\s+/).every(w=>hay.includes(w)))return false;
  }
  return true;
}
const SORTS={
  az:(a,b)=>a.name.localeCompare(b.name,"vi"),
  mild:(a,b)=>a.strength-b.strength||a.name.localeCompare(b.name,"vi"),
  strong:(a,b)=>b.strength-a.strength||a.name.localeCompare(b.name,"vi"),
  easy:(a,b)=>a.diff-b.diff||a.name.localeCompare(b.name,"vi")
};
const filtered=()=>R.filter(matches).sort(SORTS[st.sort]||SORTS.az);
const dots=n=>`<span class="dots" title="${STRENGTH[n]}">${"●".repeat(n)}<i>${"●".repeat(4-n)}</i></span>`;

function renderCards(){
  const all=filtered(), list=all.slice(0,st.limit), box=$("#rgrid");
  box.innerHTML="";
  if(!all.length){box.append(el("div",{class:"empty"},"Không tìm thấy công thức phù hợp. Hãy thử bỏ bớt bộ lọc. 🍹"));}
  list.forEach(r=>{
    const c=el("div",{class:"rcwrap",style:"position:relative"});
    const b=el("button",{class:"rc",type:"button","aria-label":"Xem công thức "+r.name,style:`--h:${r.hue}`},
      `<span class="badge ${r.type}">${r.type==="cocktail"?"COCKTAIL":"MOCKTAIL"}</span>${r.iba?`<span class="badge iba" title="${IBA_LABEL[r.iba]}">IBA</span>`:""}
       <div class="top">${r.emoji}</div>
       <div class="body"><h3>${r.name}</h3>
       <div>${r.flavors.map(f=>`<span class="tag ${r.type==="cocktail"?"c":"m"}">${f}</span>`).join("")}</div>
       <p>${r.desc}</p>
       <div style="display:flex;justify-content:space-between;font-size:.82rem;color:var(--muted)"><span>${STRENGTH[r.strength]} ${dots(r.strength)}</span><span>${DIFF[r.diff]}</span></div></div>`);
    b.style.width="100%";b.style.height="100%";
    b.addEventListener("click",()=>openRecipe(r.id));
    const f=el("button",{class:"fav"+(favs.has(r.id)?" on":""),type:"button","aria-label":"Yêu thích "+r.name,"aria-pressed":String(favs.has(r.id))},favs.has(r.id)?"♥":"♡");
    f.addEventListener("click",e=>{e.stopPropagation();toggleFav(r.id);});
    c.append(b,f);box.append(c);
  });
  $("#count").textContent=`Hiển thị ${list.length}/${all.length} công thức (tổng ${R.length})`;
  let more=$("#rmore");
  if(!more){more=el("div",{id:"rmore",class:"more"});box.after(more);}
  more.innerHTML="";
  if(all.length>list.length){
    const b=el("button",{class:"btn",type:"button"},`Hiển thị thêm (${all.length-list.length} món)`);
    b.addEventListener("click",()=>{st.limit+=PAGE;renderCards();});
    more.append(b);
  }
}
function toggleFav(id){
  favs.has(id)?favs.delete(id):favs.add(id);
  store.set("cm-fav",[...favs]);
  renderCards();
  if(dlg&&dlg.open&&cur)renderModal();
}

/* ============ MODAL CÔNG THỨC ============ */
const dlg=$("#dlg");let cur=null,serv=1;
function openRecipe(id){cur=R.find(r=>r.id===id);if(!cur)return;serv=1;renderModal();if(!dlg.open)dlg.showModal();}
function renderModal(){
  const r=cur;
  $("#dHead").style.setProperty("--h",r.hue);
  $("#dEmoji").textContent=r.emoji;
  $("#dTitle").textContent=r.name;
  $("#dTags").innerHTML=`<span class="tag ${r.type==="cocktail"?"c":"m"}">${r.type==="cocktail"?"Cocktail":"Mocktail"}</span>`+r.flavors.map(f=>`<span class="tag">${f}</span>`).join("")+`<span class="tag">${BASE_LABEL[r.base]}</span>`+(r.iba?`<span class="tag iba">IBA · ${IBA_LABEL[r.iba]}</span>`:"")+`<span class="tag">${FAM_LABEL[r.fam]}</span>`;
  const pair=r.pair?R.find(x=>x.id===r.pair):null;
  const ings=r.ing.map(([n,q,u,note])=>{
    const qty=q==null?"":`<b>${fmtQty(q*serv,u,st.unit)}</b>`;
    return `<li><span>${n}${note?` <span class="note">(${note})</span>`:""}</span>${qty}</li>`;
  }).join("");
  const isFav=favs.has(r.id);
  $("#dBody").innerHTML=`
    <p>${r.desc}</p>
    <div class="meta">
      <div><small>Ly</small>${r.glass}</div>
      <div><small>Kỹ thuật</small>${r.method}</div>
      <div><small>Đá</small>${r.ice}</div>
      <div><small>Trang trí</small>${r.garnish}</div>
      <div><small>Độ mạnh</small>${STRENGTH[r.strength]} ${dots(r.strength)}</div>
      <div><small>Độ khó</small>${DIFF[r.diff]}</div>
      <div><small>Xuất xứ</small>${r.origin}</div>
      <div><small>Hợp với dịp</small>${r.occ.length?r.occ.map(o=>OCC_LABEL[o]).join(", "):"—"}</div>
    </div>
    <div class="ctrl">
      <h3 style="margin:0">Nguyên liệu</h3>
      <span class="stepper"><button type="button" id="sm" aria-label="Giảm số ly">−</button><b id="sv">${serv} ly</b><button type="button" id="sp" aria-label="Tăng số ly">+</button></span>
      <button class="chip" type="button" id="uBtn">Đơn vị: ${st.unit==="ml"?"ml → oz":"oz → ml"}</button>
      <button class="chip" type="button" id="fBtn" aria-pressed="${isFav}">${isFav?"♥ Đã lưu":"♡ Lưu"}</button>
    </div>
    <ul class="ing">${ings}</ul>
    ${serv>1?`<p class="note" style="color:var(--muted);font-size:.85rem;margin-top:8px">Mẹo: khi làm nhiều ly, hãy lắc/khuấy từng mẻ tối đa 2 ly để đảm bảo độ lạnh và pha loãng đúng.</p>`:""}
    <h3 style="margin-top:22px">Cách làm</h3>
    <ol class="steps">${r.steps.map(s=>`<li>${s}</li>`).join("")}</ol>
    <div class="tip"><b>💡 Mẹo:</b> ${r.tip}</div>
    ${r.chk?`<p class="chkwarn">⚠️ Định lượng món này do mình soạn lại và/hoặc có nhiều biến thể — hãy đối chiếu với công thức gốc (ví dụ trên iba-world.com) nếu cần độ chính xác tuyệt đối.</p>`:""}
    ${pair?`<div class="pair"><button class="chip" type="button" id="pBtn">${pair.emoji} Xem phiên bản ${pair.type==="mocktail"?"không cồn":"có cồn"}: ${pair.name} →</button></div>`:""}
    ${r.type==="cocktail"?`<p style="color:var(--muted);font-size:.8rem;margin-top:16px">⚠️ Chỉ dành cho người đủ tuổi uống rượu. Không lái xe sau khi uống.</p>`:""}`;
  $("#sm").onclick=()=>{if(serv>1){serv--;renderModal();}};
  $("#sp").onclick=()=>{if(serv<12){serv++;renderModal();}};
  $("#uBtn").onclick=()=>{st.unit=st.unit==="ml"?"oz":"ml";renderModal();syncUnitBtn();};
  $("#fBtn").onclick=()=>toggleFav(r.id);
  if(pair)$("#pBtn").onclick=()=>{cur=pair;serv=1;renderModal();$("#dBody").scrollTop=0;};
}
function syncUnitBtn(){
  const b=[...document.querySelectorAll("#fMisc .chip")].find(c=>c.textContent.startsWith("Đơn vị"));
  if(b){b.setAttribute("aria-pressed",String(st.unit==="oz"));b.textContent=st.unit==="oz"?"Đơn vị: oz":"Đơn vị: ml";}
}
if(dlg){
  $("#dClose").addEventListener("click",()=>dlg.close());
  dlg.addEventListener("click",e=>{if(e.target===dlg)dlg.close();});
}

/* ============ GIAO DIỆN SÁNG/TỐI ============ */
function applyTheme(t){if(t)document.documentElement.setAttribute("data-theme",t);else document.documentElement.removeAttribute("data-theme");}
applyTheme(store.get("cm-theme",null));
$("#themeBtn").addEventListener("click",()=>{
  const cur=document.documentElement.getAttribute("data-theme");
  const sysDark=window.matchMedia("(prefers-color-scheme: dark)").matches;
  const next=(cur?cur==="dark":sysDark)?"light":"dark";
  applyTheme(next);store.set("cm-theme",next);
});

/* ============ KHỞI TẠO ============ */
renderKnowledge();
if($("#rgrid")){
  const params=new URLSearchParams(location.search);
  const t=params.get("type");
  if(t==="cocktail"||t==="mocktail")st.type=t;
  initFilters();
  syncUnitBtn();
  renderCards();
  if(params.get("random")){const pick=R[Math.floor(Math.random()*R.length)];openRecipe(pick.id);}
}

if("serviceWorker"in navigator&&location.protocol!=="file:"){addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));}
