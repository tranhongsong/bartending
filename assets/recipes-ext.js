"use strict";
/* Hàm tạo công thức dạng rút gọn + siêu dữ liệu (nhóm IBA, họ, dịp) cho các công thức có sẵn.
   K(id, tên, nền, emoji, màu, độ mạnh, độ khó, "vị1,vị2", ly, kỹ thuật, đá, trang trí, xuất xứ, mô tả,
     "nguyên liệu;nguyên liệu", "bước / bước / bước", mẹo, {i:nhóm IBA U|C|N, f:họ, o:dịp, p:cặp, c:1 = nên đối chiếu})
   Nguyên liệu: "40ml Rum trắng", "2dash Bitters", "8lá Bạc hà", "- Soda|ghi chú" (không số lượng). Đơn vị: ml dash lá lát quả giọt tsp bsp cup cây miếng viên */
const UNIT_MAP={tsp:"muỗng cà phê",bsp:"muỗng bar",cup:"cốc"};
function parseIng(s){
  return s.split(";").map(x=>{
    const [main,note]=x.trim().split("|");
    const m=main.match(/^(-|\d+(?:\.\d+)?)(ml|dash|lá|lát|quả|giọt|tsp|bsp|cup|cây|miếng|viên)? (.+)$/);
    if(!m)throw new Error("Nguyên liệu sai định dạng: "+x);
    const q=m[1]==="-"?null:parseFloat(m[1]);
    const u=m[2]?(UNIT_MAP[m[2]]||m[2]):"";
    return note?[m[3],q,u,note]:[m[3],q,u];
  });
}
function K(id,name,base,emoji,hue,strength,diff,flv,glass,method,ice,garnish,origin,desc,ing,steps,tip,o={}){
  R.push({id,name,type:strength===0?"mocktail":"cocktail",base,emoji,hue,strength,diff,
    flavors:flv.split(","),glass,method,ice,garnish,origin,desc,ing:parseIng(ing),steps:steps.split(" / "),tip,
    iba:o.i||"",fam:o.f||"ot",occ:(o.o||"").split(",").filter(Boolean),pair:o.p,chk:!!o.c});
}
const IBA_LABEL={U:"The Unforgettables",C:"Contemporary Classics",N:"New Era Drinks"};
const FAM_LABEL={sour:"Sour (chua)",hb:"Highball / Collins / Fizz",st:"Khuấy kiểu cổ điển",sp:"Có bọt (sparkling)",tk:"Tiki / nhiệt đới",cr:"Béo / tráng miệng",ho:"Đồ uống nóng",bl:"Xay / sinh tố",tea:"Trà & cà phê",ot:"Khác"};
const OCC_LABEL={kv:"Khai vị",sb:"Sau bữa tối",tt:"Tiệc tùng",br:"Brunch",gn:"Giải nhiệt",nl:"Ngày lạnh",nh:"Nhâm nhi"};

/* Siêu dữ liệu cho 35 công thức đầu tiên (trong data.js) */
const META={
 mojito:["C","hb","gn,tt"],margarita:["C","sour","tt,gn"],oldfashioned:["U","st","nh,nl"],negroni:["U","st","kv,nh"],
 daiquiri:["U","sour","gn,tt"],cosmopolitan:["C","sour","tt"],whiskeysour:["U","sour","nh"],moscowmule:["C","hb","tt,gn"],
 martini:["U","st","kv,nh"],espressomartini:["N","ot","sb,tt"],pinacolada:["C","tk","gn"],aperolspritz:["N","sp","kv,br,gn"],
 maitai:["C","tk","tt,gn"],manhattan:["U","st","nh,nl"],tequilasunrise:["C","hb","br,tt"],gintonic:["","hb","kv,gn"],
 caipirinha:["C","sour","gn,tt"],longisland:["C","hb","tt"],bloodymary:["C","hb","br"],darknstormy:["N","hb","gn"],
 virginmojito:["","hb","gn,tt"],shirleytemple:["","hb","tt"],virginColada:["","bl","gn"],cinderella:["","hb","tt"],
 virginmary:["","hb","br"],tradachanh:["","tea","gn"],strawberrybasil:["","hb","gn,br"],sunriseVirgin:["","hb","br"],
 gingermule:["","hb","tt"],bluelagoon:["","hb","tt,gn"],chanhday:["","hb","gn"],cucumbermint:["","hb","gn"],
 coffeetonic:["","tea","br"],spicedapple:["","hb","nl"],tradao:["","tea","gn"]
};
R.forEach(r=>{const m=META[r.id];if(m){r.iba=m[0];r.fam=m[1];r.occ=m[2].split(",");}r.chk=!!r.chk;});
