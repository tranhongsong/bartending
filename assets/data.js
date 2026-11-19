"use strict";
/* ============ DỮ LIỆU CÔNG THỨC ============ */
/* ing: [tên, số lượng | null, đơn vị, ghi chú]. Đơn vị "ml" sẽ được quy đổi sang oz khi cần. */
const R = [
/* ---------- COCKTAIL ---------- */
{id:"mojito",name:"Mojito",type:"cocktail",base:"rum",emoji:"🍃",hue:150,strength:2,diff:1,flavors:["tươi mát","chua"],
 glass:"Highball",method:"Build + Muddle",ice:"Đá viên",garnish:"Cành bạc hà, lát chanh",origin:"Havana, Cuba",pair:"virginmojito",
 desc:"Biểu tượng của sự sảng khoái: rum, chanh, bạc hà và soda.",
 ing:[["Rum trắng",40,"ml"],["Nước cốt chanh xanh",30,"ml"],["Syrup đường",20,"ml"],["Lá bạc hà",8,"lá"],["Soda",null,"","khoảng 60 ml, rót đầy ly"]],
 steps:["Cho lá bạc hà, syrup và nước cốt chanh vào ly highball. Dằm nhẹ 4–5 lần để tiết tinh dầu — đừng nghiền nát lá vì sẽ bị đắng.","Thêm rum, rồi xúc đá viên đầy ly.","Dùng bar spoon khuấy từ đáy lên 5–6 lần.","Rót soda lên trên, vỗ nhẹ cành bạc hà để dậy mùi rồi cắm lên miệng ly."],
 tip:"Dùng bạc hà Âu (spearmint) cho vị dịu; bạc hà Á quá the. Có thể thay syrup bằng 2 muỗng cà phê đường trắng."},

{id:"margarita",name:"Margarita",type:"cocktail",base:"tequila",emoji:"🧂",hue:75,strength:3,diff:1,flavors:["chua","tươi mát"],
 glass:"Coupe hoặc ly Margarita",method:"Shake",ice:"Đá viên (để lắc), ly không đá",garnish:"Viền muối, lát chanh",origin:"Mexico / Mỹ (có nhiều giai thoại)",
 desc:"Tequila, triple sec và chanh — chua mặn sắc nét, rất 'cân' theo công thức 5:2:1,5.",
 ing:[["Tequila blanco",50,"ml"],["Triple sec / Cointreau",20,"ml"],["Nước cốt chanh xanh",15,"ml"],["Muối hạt",null,"","để viền ly"]],
 steps:["Thoa lát chanh quanh mép ly, úp ly lên đĩa muối để tạo viền (chỉ viền nửa ngoài ly).","Cho tequila, triple sec, nước cốt chanh và đá vào shaker.","Lắc mạnh 10–12 giây đến khi thân shaker lạnh buốt.","Lọc (strain) vào ly đã viền muối. Trang trí lát chanh."],
 tip:"Muốn dịu hơn thì thêm 5 ml syrup agave. Chọn tequila ghi '100% agave'."},

{id:"oldfashioned",name:"Old Fashioned",type:"cocktail",base:"whisky",emoji:"🥃",hue:30,strength:3,diff:1,flavors:["đắng","ngọt"],
 glass:"Rocks (Old Fashioned)",method:"Build + Stir",ice:"1 viên đá lớn",garnish:"Vỏ cam vắt tinh dầu, cherry",origin:"Mỹ, đầu thế kỷ 19",
 desc:"Cocktail nguyên thủy: rượu mạnh, đường, nước, bitters. Đơn giản mà khó tìm sự cân bằng.",
 ing:[["Bourbon hoặc rye whiskey",45,"ml"],["Syrup đường (hoặc 1 viên đường)",5,"ml"],["Angostura bitters",2,"dash"],["Nước",null,"","vài giọt nếu dùng viên đường"]],
 steps:["Cho syrup và bitters vào ly rocks, khuấy đều.","Thêm whiskey và 1 viên đá lớn.","Khuấy nhẹ 20–30 giây để lạnh và pha loãng vừa đủ.","Vắt vỏ cam phía trên ly để tinh dầu tỏa ra, thả vỏ vào ly."],
 tip:"Đá lớn tan chậm giúp ly không bị loãng. Dùng bourbon cho vị ngọt, rye cho vị cay."},

{id:"negroni",name:"Negroni",type:"cocktail",base:"gin",emoji:"🍊",hue:5,strength:3,diff:1,flavors:["đắng","ngọt"],
 glass:"Rocks",method:"Stir (hoặc build)",ice:"Đá viên",garnish:"Lát cam",origin:"Florence, Ý (~1919)",
 desc:"Tỉ lệ 1:1:1 dễ nhớ nhất làng cocktail — đắng, thơm, phức tạp.",
 ing:[["Gin",30,"ml"],["Campari",30,"ml"],["Vermouth đỏ (sweet)",30,"ml"]],
 steps:["Cho đá vào ly rocks.","Rót gin, Campari và vermouth đỏ.","Khuấy 15–20 vòng.","Đặt lát cam lên trên (hoặc vắt vỏ cam)."],
 tip:"Mới tập uống thì giảm Campari xuống 20 ml. Thử thay gin bằng prosecco → 'Negroni Sbagliato'."},

{id:"daiquiri",name:"Daiquiri",type:"cocktail",base:"rum",emoji:"🍋",hue:95,strength:3,diff:1,flavors:["chua","tươi mát"],
 glass:"Coupe",method:"Shake",ice:"Đá viên (để lắc), ly không đá",garnish:"Lát chanh",origin:"Cuba, ~1900",
 desc:"Công thức Sour tinh gọn nhất: rum, chanh, đường. Phép thử bản lĩnh của mọi bartender.",
 ing:[["Rum trắng",60,"ml"],["Nước cốt chanh xanh",25,"ml"],["Syrup đường",15,"ml"]],
 steps:["Làm lạnh ly bằng đá hoặc tủ đông.","Cho toàn bộ nguyên liệu và đá vào shaker, lắc mạnh 12 giây.","Lọc vào ly coupe đã làm lạnh.","Trang trí lát chanh mỏng."],
 tip:"Không phải loại Daiquiri đá xay sinh tố — đây mới là bản gốc. Nếm và chỉnh chua/ngọt 5 ml mỗi lần."},

{id:"cosmopolitan",name:"Cosmopolitan",type:"cocktail",base:"vodka",emoji:"🍒",hue:340,strength:3,diff:1,flavors:["chua","trái cây"],
 glass:"Martini",method:"Shake",ice:"Đá viên (để lắc)",garnish:"Vỏ cam",origin:"Mỹ, thập niên 1980–90",
 desc:"Màu hồng thanh lịch, chua nhẹ vị nam việt quất.",
 ing:[["Vodka (hương chanh nếu có)",40,"ml"],["Cointreau",15,"ml"],["Nước ép nam việt quất",30,"ml"],["Nước cốt chanh xanh",15,"ml"]],
 steps:["Cho tất cả nguyên liệu và đá vào shaker.","Lắc mạnh khoảng 12 giây.","Lọc vào ly martini đã làm lạnh.","Vắt vỏ cam lấy tinh dầu rồi thả vào ly."],
 tip:"Dùng nước nam việt quất nguyên chất không đường để kiểm soát độ ngọt."},

{id:"whiskeysour",name:"Whiskey Sour",type:"cocktail",base:"whisky",emoji:"🍋",hue:45,strength:2,diff:2,flavors:["chua","ngọt"],
 glass:"Rocks",method:"Dry shake + Shake",ice:"Đá viên",garnish:"Lát cam, cherry",origin:"Mỹ, thế kỷ 19",
 desc:"Whiskey, chanh vàng, đường — thêm lòng trắng trứng sẽ có lớp bọt mịn quyến rũ.",
 ing:[["Bourbon",45,"ml"],["Nước cốt chanh vàng",25,"ml"],["Syrup đường",20,"ml"],["Lòng trắng trứng",15,"ml","tuỳ chọn, dùng trứng tiệt trùng"]],
 steps:["Cho nguyên liệu (kèm lòng trắng nếu dùng) vào shaker KHÔNG đá, lắc 10 giây (dry shake) để tạo bọt.","Thêm đá, lắc lại mạnh 12 giây.","Lọc vào ly rocks có đá.","Trang trí lát cam và cherry; có thể nhỏ vài giọt bitters lên bọt."],
 tip:"Không dùng trứng vẫn ngon — chỉ là kết cấu nhẹ hơn."},

{id:"moscowmule",name:"Moscow Mule",type:"cocktail",base:"vodka",emoji:"🫚",hue:30,strength:2,diff:1,flavors:["cay","tươi mát"],
 glass:"Cốc đồng (copper mug)",method:"Build",ice:"Đá viên",garnish:"Lát chanh, cành bạc hà",origin:"Mỹ, thập niên 1940",pair:"gingermule",
 desc:"Vodka, ginger beer và chanh — cay nồng, mát lạnh, cực dễ làm.",
 ing:[["Vodka",45,"ml"],["Nước cốt chanh xanh",15,"ml"],["Ginger beer",120,"ml"]],
 steps:["Cho đá đầy cốc đồng.","Rót vodka và nước cốt chanh.","Rót ginger beer lên trên, khuấy nhẹ 1 lần.","Trang trí lát chanh và bạc hà."],
 tip:"Chọn ginger beer cay (không phải ginger ale) để đúng vị."},

{id:"martini",name:"Dry Martini",type:"cocktail",base:"gin",emoji:"🍸",hue:200,strength:4,diff:2,flavors:["đắng","mặn"],
 glass:"Martini",method:"Stir",ice:"Đá viên (để khuấy)",garnish:"Vỏ chanh vàng hoặc ô-liu",origin:"Mỹ, thế kỷ 19",
 desc:"Ly cocktail kinh điển — chỉ gin và vermouth, sạch, khô, mạnh.",
 ing:[["Gin",60,"ml"],["Vermouth khô (dry)",10,"ml"]],
 steps:["Làm lạnh ly martini trong tủ đông 15 phút.","Cho gin, vermouth và nhiều đá vào ly trộn (mixing glass).","Khuấy 30–40 giây cho lạnh sâu.","Lọc vào ly. Vắt vỏ chanh lấy tinh dầu hoặc cắm ô-liu."],
 tip:"Muốn 'dirty' thì thêm 10 ml nước muối ô-liu. Vermouth đã mở nên bảo quản trong tủ lạnh."},

{id:"espressomartini",name:"Espresso Martini",type:"cocktail",base:"vodka",emoji:"☕",hue:25,strength:3,diff:2,flavors:["đắng","ngọt"],
 glass:"Martini hoặc Coupe",method:"Shake",ice:"Đá viên (để lắc)",garnish:"3 hạt cà phê",origin:"Luân Đôn, thập niên 1980",
 desc:"Cà phê, vodka và lớp bọt mịn — ly 'tỉnh táo' nhất của bữa tiệc.",
 ing:[["Vodka",50,"ml"],["Rượu mùi cà phê (Kahlúa…)",10,"ml","tăng lên 20 ml nếu thích ngọt"],["Espresso nóng vừa pha",30,"ml"],["Syrup đường",2,"dash"]],
 steps:["Pha espresso và để nguội 1–2 phút.","Cho tất cả vào shaker đầy đá.","Lắc thật mạnh 15 giây để tạo lớp bọt.","Lọc kép (double strain) vào ly lạnh, thả 3 hạt cà phê."],
 tip:"Espresso càng tươi thì bọt (crema) càng đẹp. Có thể thay bằng cold brew đậm."},

{id:"pinacolada",name:"Piña Colada",type:"cocktail",base:"rum",emoji:"🥥",hue:55,strength:2,diff:1,flavors:["béo","ngọt","trái cây"],
 glass:"Hurricane hoặc ly lớn",method:"Blend",ice:"Đá xay",garnish:"Lát dứa, cherry",origin:"Puerto Rico",pair:"virginColada",
 desc:"Hương vị nhiệt đới của dừa và dứa, béo mịn như kem.",
 ing:[["Rum trắng",50,"ml"],["Kem dừa (cream of coconut)",30,"ml"],["Nước ép dứa",50,"ml"],["Đá viên",1,"cốc","khoảng 150 g"]],
 steps:["Cho tất cả vào máy xay.","Xay 15–20 giây đến khi mịn như sorbet.","Rót vào ly hurricane.","Trang trí lát dứa và cherry."],
 tip:"Cream of coconut (loại có đường, như Coco López) khác với nước cốt dừa — nếu dùng nước cốt dừa, thêm 15 ml syrup."},

{id:"aperolspritz",name:"Aperol Spritz",type:"cocktail",base:"other",emoji:"🥂",hue:20,strength:1,diff:1,flavors:["đắng","tươi mát"],
 glass:"Ly vang lớn",method:"Build",ice:"Đá viên",garnish:"Lát cam",origin:"Veneto, Ý",
 desc:"Aperitivo nhẹ nhàng, tỉ lệ vàng 3:2:1 (prosecco : Aperol : soda).",
 ing:[["Prosecco",90,"ml"],["Aperol",60,"ml"],["Soda",30,"ml"]],
 steps:["Cho đá đầy ly vang.","Rót prosecco, rồi Aperol.","Thêm soda, khuấy nhẹ một lần.","Đặt lát cam lớn lên trên."],
 tip:"Giữ prosecco thật lạnh và rót nhẹ để không mất bọt."},

{id:"maitai",name:"Mai Tai",type:"cocktail",base:"rum",emoji:"🌺",hue:15,strength:3,diff:2,flavors:["trái cây","chua","ngọt"],
 glass:"Rocks hoặc cốc tiki",method:"Shake",ice:"Đá vụn",garnish:"Bạc hà, vỏ chanh",origin:"California, thập niên 1940",
 desc:"Cocktail tiki kinh điển với rum, cam và hạnh nhân.",
 ing:[["Rum đậm/lâu năm",40,"ml"],["Orange curaçao",20,"ml"],["Orgeat (syrup hạnh nhân)",15,"ml"],["Nước cốt chanh xanh",15,"ml"]],
 steps:["Cho tất cả nguyên liệu vào shaker với đá.","Lắc mạnh 12 giây.","Lọc vào ly rocks đầy đá vụn.","Trang trí bạc hà, nửa vỏ chanh."],
 tip:"Có thể 'float' thêm 10 ml rum đen lên mặt để thêm chiều sâu."},

{id:"manhattan",name:"Manhattan",type:"cocktail",base:"whisky",emoji:"🍷",hue:350,strength:4,diff:2,flavors:["đắng","ngọt"],
 glass:"Coupe hoặc Martini",method:"Stir",ice:"Đá viên (để khuấy)",garnish:"Cherry",origin:"New York, thế kỷ 19",
 desc:"Rye, vermouth đỏ và bitters — ấm, cay, sang trọng.",
 ing:[["Rye whiskey",50,"ml"],["Vermouth đỏ (sweet)",20,"ml"],["Angostura bitters",1,"dash"]],
 steps:["Làm lạnh ly coupe.","Khuấy rye, vermouth, bitters với đá 30 giây.","Lọc vào ly.","Thả 1 quả cherry (loại Luxardo nếu có)."],
 tip:"Đổi sang bourbon sẽ ngọt hơn; đổi tỷ lệ 2:1 cũng được."},

{id:"tequilasunrise",name:"Tequila Sunrise",type:"cocktail",base:"tequila",emoji:"🌅",hue:25,strength:2,diff:1,flavors:["ngọt","trái cây"],
 glass:"Highball",method:"Build (layer)",ice:"Đá viên",garnish:"Lát cam, cherry",origin:"Mỹ, thập niên 1970",pair:"sunriseVirgin",
 desc:"Hiệu ứng chuyển màu hoàng hôn rất bắt mắt.",
 ing:[["Tequila",45,"ml"],["Nước cam",90,"ml"],["Grenadine",15,"ml"]],
 steps:["Cho đá vào ly highball, rót tequila và nước cam.","Khuấy nhẹ.","Rót chậm grenadine dọc thành ly — nó chìm xuống đáy tạo lớp đỏ.","Trang trí lát cam và cherry."],
 tip:"Đừng khuấy sau khi cho grenadine nếu muốn giữ hiệu ứng chuyển màu."},

{id:"gintonic",name:"Gin & Tonic",type:"cocktail",base:"gin",emoji:"🍐",hue:120,strength:2,diff:1,flavors:["đắng","tươi mát"],
 glass:"Highball hoặc ly balloon",method:"Build",ice:"Nhiều đá viên",garnish:"Lát chanh xanh / cam / hoa oải hương",origin:"Ấn Độ thuộc Anh, thế kỷ 19",
 desc:"Đơn giản nhưng đẳng cấp — chất lượng tonic quyết định tất cả.",
 ing:[["Gin",50,"ml"],["Tonic water",150,"ml","tỉ lệ 1:3"],["Chanh xanh",1,"lát"]],
 steps:["Làm lạnh ly bằng đá đầy ly, đổ nước ra.","Cho đá mới, rót gin.","Rót tonic nghiêng ly, nhẹ nhàng để giữ bọt.","Vắt nhẹ lát chanh rồi thả vào ly."],
 tip:"Thử gin 'sạch' (London dry) với vỏ chanh, gin hoa với dưa leo hoặc hoa hồng."},

{id:"caipirinha",name:"Caipirinha",type:"cocktail",base:"other",emoji:"🍈",hue:105,strength:3,diff:1,flavors:["chua","ngọt"],
 glass:"Rocks",method:"Muddle + Build",ice:"Đá vụn hoặc viên",garnish:"Không cần",origin:"Brazil",
 desc:"Quốc tửu Brazil: cachaça (rượu mía), chanh và đường dằm trực tiếp trong ly.",
 ing:[["Cachaça",50,"ml"],["Chanh xanh",0.5,"quả","cắt 4 miếng"],["Đường trắng",2,"muỗng cà phê"]],
 steps:["Cho các miếng chanh và đường vào ly rocks.","Dằm mạnh để ép nước và tinh dầu vỏ chanh.","Thêm cachaça và đá vụn.","Khuấy đều từ đáy lên."],
 tip:"Thay cachaça bằng vodka → Caipiroska; bằng rum trắng → Caipirissima."},

{id:"longisland",name:"Long Island Iced Tea",type:"cocktail",base:"other",emoji:"🧋",hue:35,strength:4,diff:2,flavors:["chua","ngọt"],
 glass:"Collins",method:"Build + Shake",ice:"Đá viên",garnish:"Lát chanh vàng",origin:"New York, thập niên 1970",
 desc:"Không có trà — nhưng màu giống trà đá. Có 5 loại rượu mạnh nên rất 'nặng đô'.",
 ing:[["Vodka",15,"ml"],["Tequila",15,"ml"],["Rum trắng",15,"ml"],["Gin",15,"ml"],["Triple sec",15,"ml"],["Nước cốt chanh vàng",25,"ml"],["Syrup đường",20,"ml"],["Cola",null,"","khoảng 30 ml để phủ màu"]],
 steps:["Cho 5 loại rượu, nước chanh và syrup vào shaker với đá.","Lắc nhanh 8 giây.","Lọc vào ly Collins đầy đá.","Rót cola lên trên, thêm lát chanh."],
 tip:"Thực chất là rất mạnh — uống chậm. Cân nhắc giảm mỗi loại xuống 10 ml."},

{id:"bloodymary",name:"Bloody Mary",type:"cocktail",base:"vodka",emoji:"🍅",hue:0,strength:2,diff:2,flavors:["mặn","cay"],
 glass:"Highball",method:"Build / Roll",ice:"Đá viên",garnish:"Cần tây, chanh, ô-liu",origin:"Paris / New York, thập niên 1920–30",pair:"virginmary",
 desc:"Cocktail mặn – cay – umami, thường dùng cho bữa brunch.",
 ing:[["Vodka",45,"ml"],["Nước ép cà chua",90,"ml"],["Nước cốt chanh vàng",15,"ml"],["Sốt Worcestershire",2,"dash"],["Tương ớt Tabasco",2,"dash"],["Muối &amp; tiêu",null,"","vừa đủ"]],
 steps:["Cho đá vào ly highball.","Rót vodka, nước ép cà chua, chanh, sốt.","Thêm muối tiêu rồi 'roll' (đổ qua lại hai ly) cho hòa trộn nhẹ.","Cắm cần tây và lát chanh."],
 tip:"Thêm 1 muỗng cà phê cải ngựa (horseradish) nếu thích nồng."},

{id:"darknstormy",name:"Dark 'n' Stormy",type:"cocktail",base:"rum",emoji:"⛈️",hue:20,strength:2,diff:1,flavors:["cay","tươi mát"],
 glass:"Highball",method:"Build (float)",ice:"Đá viên",garnish:"Lát chanh",origin:"Bermuda",
 desc:"Rum đen 'nổi' trên ginger beer như cơn bão trên mặt biển.",
 ing:[["Ginger beer",100,"ml"],["Nước cốt chanh xanh",10,"ml"],["Rum đen",60,"ml"]],
 steps:["Cho đá vào ly, rót ginger beer và nước chanh.","Nhẹ nhàng rót rum đen lên mặt (dùng muỗng úp) để tạo lớp nổi.","Trang trí lát chanh."],
 tip:"Không khuấy trước khi dùng nếu muốn giữ hiệu ứng đẹp."},

/* ---------- MOCKTAIL ---------- */
{id:"virginmojito",name:"Virgin Mojito",type:"mocktail",base:"none",emoji:"🍃",hue:140,strength:0,diff:1,flavors:["tươi mát","chua"],
 glass:"Highball",method:"Build + Muddle",ice:"Đá viên",garnish:"Bạc hà, lát chanh",origin:"Biến thể không cồn của Mojito",pair:"mojito",
 desc:"Mojito không rượu — vẫn trọn vẹn sảng khoái.",
 ing:[["Lá bạc hà",8,"lá"],["Nước cốt chanh xanh",30,"ml"],["Syrup đường",20,"ml"],["Soda",null,"","rót đầy ly"],["Nước cốt dưa leo",30,"ml","tuỳ chọn, tăng độ 'tươi'"]],
 steps:["Dằm nhẹ bạc hà với syrup và nước chanh trong ly.","Thêm đá viên đầy ly.","Rót soda lên trên, khuấy từ đáy lên.","Trang trí bạc hà và lát chanh."],
 tip:"Thêm vài giọt bitters không cồn hoặc 1 lát gừng cho đỡ 'phẳng'."},

{id:"shirleytemple",name:"Shirley Temple",type:"mocktail",base:"none",emoji:"🍒",hue:350,strength:0,diff:1,flavors:["ngọt","trái cây"],
 glass:"Collins hoặc highball",method:"Build",ice:"Đá viên",garnish:"Cherry, lát cam",origin:"Mỹ, giữa thế kỷ 20",
 desc:"Mocktail biểu tượng cho trẻ em: ngọt, hồng và vui mắt.",
 ing:[["Ginger ale (hoặc 7Up)",150,"ml"],["Grenadine",15,"ml"],["Nước cốt chanh",5,"ml","tuỳ chọn"],["Cherry",2,"quả"]],
 steps:["Cho đá vào ly.","Rót ginger ale.","Rót grenadine nhẹ nhàng, để lắng xuống đáy.","Thêm cherry, trang trí lát cam."],
 tip:"Thêm 5 ml nước cốt chanh để bớt ngọt gắt."},

{id:"virginColada",name:"Virgin Colada",type:"mocktail",base:"none",emoji:"🥥",hue:55,strength:0,diff:1,flavors:["béo","ngọt","trái cây"],
 glass:"Hurricane hoặc ly lớn",method:"Blend",ice:"Đá xay",garnish:"Lát dứa",origin:"Biến thể không cồn của Piña Colada",pair:"pinacolada",
 desc:"Dừa – dứa – đá xay như kem lạnh.",
 ing:[["Nước ép dứa",90,"ml"],["Kem dừa (cream of coconut)",40,"ml"],["Nước cốt chanh",5,"ml"],["Đá viên",1,"cốc"]],
 steps:["Cho tất cả vào máy xay.","Xay mịn khoảng 20 giây.","Rót vào ly lạnh.","Trang trí lát dứa."],
 tip:"Đông lạnh sẵn dứa cắt miếng thay đá để vị đậm hơn, không bị nhạt."},

{id:"cinderella",name:"Cinderella",type:"mocktail",base:"none",emoji:"👑",hue:40,strength:0,diff:1,flavors:["chua","trái cây"],
 glass:"Collins",method:"Shake",ice:"Đá viên",garnish:"Lát cam",origin:"Châu Âu, thập niên 1930",
 desc:"Hỗn hợp ba loại nước ép với chút grenadine, chua ngọt cân bằng.",
 ing:[["Nước cam",30,"ml"],["Nước chanh vàng",30,"ml"],["Nước dứa",30,"ml"],["Grenadine",10,"ml"],["Ginger ale / soda",null,"","khoảng 30 ml rót lên"]],
 steps:["Cho nước cam, chanh, dứa và grenadine vào shaker với đá.","Lắc 10 giây.","Lọc vào ly Collins đầy đá.","Rót ginger ale lên trên và trang trí."],
 tip:"Pha sẵn nền nước ép lạnh để phục vụ nhiều ly nhanh."},

{id:"virginmary",name:"Virgin Mary",type:"mocktail",base:"none",emoji:"🍅",hue:5,strength:0,diff:1,flavors:["mặn","cay"],
 glass:"Highball",method:"Build / Roll",ice:"Đá viên",garnish:"Cần tây, chanh",origin:"Biến thể của Bloody Mary",pair:"bloodymary",
 desc:"Cay, mặn, umami — lựa chọn tuyệt vời cho bữa sáng.",
 ing:[["Nước ép cà chua",120,"ml"],["Nước cốt chanh vàng",15,"ml"],["Sốt Worcestershire",2,"dash"],["Tabasco",2,"dash"],["Muối &amp; tiêu",null,"","vừa đủ"]],
 steps:["Cho đá và nguyên liệu vào ly.","Khuấy hoặc roll nhẹ nhàng.","Nếm và chỉnh muối/cay.","Cắm cần tây và lát chanh."],
 tip:"Thêm một thìa nước muối ô-liu để có vị 'đậm' như bản cocktail."},

{id:"tradachanh",name:"Trà chanh mật ong",type:"mocktail",base:"none",emoji:"🍵",hue:85,strength:0,diff:1,flavors:["chua","ngọt","tươi mát"],
 glass:"Highball",method:"Build",ice:"Đá viên",garnish:"Lát chanh",origin:"Phong cách Việt Nam / Arnold Palmer",
 desc:"Trà đen ướp lạnh, chanh và mật ong — dễ làm, hợp ngày nóng.",
 ing:[["Trà đen đã ủ nguội",150,"ml"],["Nước cốt chanh vàng",25,"ml"],["Mật ong",15,"ml"],["Nước ấm",15,"ml","để hoà tan mật ong"]],
 steps:["Hoà mật ong với nước ấm.","Cho đá vào ly, rót trà và mật ong.","Vắt nước chanh, khuấy đều.","Thêm lát chanh."],
 tip:"Ủ trà lạnh (cold brew) 8 tiếng trong tủ lạnh cho vị ít chát."},

{id:"strawberrybasil",name:"Strawberry Basil Soda",type:"mocktail",base:"none",emoji:"🍓",hue:350,strength:0,diff:2,flavors:["trái cây","chua","thảo mộc"].filter(Boolean),
 glass:"Collins",method:"Muddle + Build",ice:"Đá viên",garnish:"Lá húng quế, dâu tây",origin:"Sáng tạo hiện đại",
 desc:"Dâu tây ngọt thơm gặp húng quế the nhẹ.",
 ing:[["Dâu tây",5,"quả"],["Lá húng quế",4,"lá"],["Nước cốt chanh vàng",25,"ml"],["Syrup đường",15,"ml"],["Soda",null,"","khoảng 100 ml"]],
 steps:["Dằm dâu tây và húng quế trong ly với syrup và nước chanh.","Thêm đá viên.","Rót soda, khuấy nhẹ.","Trang trí dâu và lá húng quế."],
 tip:"Lọc qua rây nhỏ nếu muốn ly trong, không có hạt dâu."},

{id:"sunriseVirgin",name:"Virgin Sunrise",type:"mocktail",base:"none",emoji:"🌅",hue:30,strength:0,diff:1,flavors:["ngọt","trái cây"],
 glass:"Highball",method:"Build (layer)",ice:"Đá viên",garnish:"Lát cam, cherry",origin:"Biến thể của Tequila Sunrise",pair:"tequilasunrise",
 desc:"Hiệu ứng hoàng hôn, hoàn toàn không rượu.",
 ing:[["Nước cam",120,"ml"],["Grenadine",15,"ml"],["Nước cốt chanh",5,"ml"]],
 steps:["Cho đá và nước cam vào ly highball.","Thêm nước chanh, khuấy nhẹ.","Rót chậm grenadine dọc thành ly để chìm xuống đáy.","Trang trí lát cam."],
 tip:"Dùng nước cam vắt tươi — khác biệt rất lớn so với loại đóng hộp."},

{id:"gingermule",name:"Virgin Mule",type:"mocktail",base:"none",emoji:"🫚",hue:35,strength:0,diff:1,flavors:["cay","tươi mát"],
 glass:"Cốc đồng hoặc highball",method:"Build",ice:"Đá viên",garnish:"Chanh, bạc hà",origin:"Biến thể của Moscow Mule",pair:"moscowmule",
 desc:"Vị gừng cay nồng thay cho hơi rượu.",
 ing:[["Nước cốt chanh xanh",20,"ml"],["Syrup đường",10,"ml"],["Ginger beer",120,"ml"],["Gừng tươi",2,"lát","tuỳ chọn, dằm nhẹ"]],
 steps:["Cho đá vào cốc.","Cho nước chanh, syrup (và gừng nếu dùng).","Rót ginger beer, khuấy nhẹ.","Trang trí bạc hà, lát chanh."],
 tip:"Thêm 2 giọt bitters không cồn cho cảm giác 'người lớn'."},

{id:"bluelagoon",name:"Blue Lagoon (không cồn)",type:"mocktail",base:"none",emoji:"🌊",hue:205,strength:0,diff:1,flavors:["ngọt","chua"],
 glass:"Highball",method:"Build",ice:"Đá viên",garnish:"Lát chanh, cherry",origin:"Biến thể không cồn của Blue Lagoon",
 desc:"Màu xanh biển rực rỡ, vị chua ngọt kiểu soda chanh.",
 ing:[["Syrup Blue Curaçao (không cồn)",30,"ml"],["Nước cốt chanh vàng",20,"ml"],["Soda chanh / Sprite",120,"ml"]],
 steps:["Cho đá vào ly.","Rót syrup Blue Curaçao và nước chanh.","Rót soda chanh, khuấy nhẹ.","Trang trí lát chanh."],
 tip:"Rót soda từ từ để tạo hiệu ứng chuyển màu."},

{id:"chanhday",name:"Soda chanh dây",type:"mocktail",base:"none",emoji:"🍈",hue:65,strength:0,diff:1,flavors:["chua","ngọt","trái cây"],
 glass:"Highball",method:"Build",ice:"Đá viên",garnish:"Lát chanh, bạc hà",origin:"Phong cách Việt Nam",
 desc:"Thơm đậm chanh dây (passion fruit) — vị chua ngọt đặc trưng nhiệt đới.",
 ing:[["Cùi chanh dây",2,"quả"],["Nước cốt chanh xanh",15,"ml"],["Syrup đường",20,"ml"],["Soda",null,"","khoảng 120 ml"]],
 steps:["Múc cùi chanh dây vào ly cùng syrup và nước chanh.","Khuấy đều, thêm đá viên.","Rót soda lên trên.","Trang trí bạc hà và lát chanh."],
 tip:"Có thể thêm 1 lát gừng mỏng để vị 'sâu' hơn."},

{id:"cucumbermint",name:"Cucumber Mint Cooler",type:"mocktail",base:"none",emoji:"🥒",hue:130,strength:0,diff:1,flavors:["tươi mát","thảo mộc"],
 glass:"Collins",method:"Muddle + Build",ice:"Đá viên",garnish:"Lát dưa leo, bạc hà",origin:"Phong cách spa hiện đại",
 desc:"Nhẹ, thanh, gần như 'detox' nhưng vẫn có chiều sâu.",
 ing:[["Dưa leo",4,"lát"],["Lá bạc hà",6,"lá"],["Nước cốt chanh xanh",25,"ml"],["Syrup đường",15,"ml"],["Soda",null,"","khoảng 100 ml"]],
 steps:["Dằm dưa leo, bạc hà với syrup và nước chanh.","Thêm đá viên.","Rót soda lên trên, khuấy nhẹ.","Trang trí lát dưa leo xếp vòng quanh ly."],
 tip:"Nếm thử và thêm một ít muối biển (một nhúm nhỏ) sẽ làm vị dưa leo nổi hơn."},

{id:"coffeetonic",name:"Cà phê Tonic",type:"mocktail",base:"none",emoji:"☕",hue:28,strength:0,diff:1,flavors:["đắng","tươi mát"],
 glass:"Highball",method:"Build (layer)",ice:"Đá viên",garnish:"Lát chanh hoặc cam",origin:"Xu hướng cà phê hiện đại",
 desc:"Espresso chồng lên tonic lạnh — đắng sắc, thơm, sảng khoái, nhưng không phải cho mọi người!",
 ing:[["Tonic water",150,"ml"],["Espresso",30,"ml"],["Lát chanh hoặc cam",1,"lát"]],
 steps:["Cho đá đầy ly, rót tonic.","Đặt lát chanh/cam vào ly.","Rót chậm espresso lên mặt bằng muỗng để tạo lớp.","Uống khi còn thấy hai lớp."],
 tip:"Dùng cà phê rang vừa – chua nhẹ (trái cây) sẽ hợp tonic hơn cà phê rang đậm."},

{id:"spicedapple",name:"Spiced Apple Fizz",type:"mocktail",base:"none",emoji:"🍎",hue:10,strength:0,diff:1,flavors:["ngọt","cay"],
 glass:"Rocks hoặc highball",method:"Shake",ice:"Đá viên",garnish:"Que quế, lát táo",origin:"Mocktail mùa thu – đông",
 desc:"Táo, quế và gừng ấm áp.",
 ing:[["Nước ép táo",90,"ml"],["Nước cốt chanh vàng",15,"ml"],["Syrup quế (hoặc mật ong)",10,"ml"],["Ginger ale",90,"ml"]],
 steps:["Lắc nước táo, chanh, syrup với đá.","Lọc vào ly có đá.","Rót ginger ale lên trên.","Cắm que quế, lát táo."],
 tip:"Syrup quế: đun 1 phần đường, 1 phần nước với 2 que quế 10 phút."},

{id:"tradao",name:"Trà đào cam sả",type:"mocktail",base:"none",emoji:"🍑",hue:25,strength:0,diff:1,flavors:["trái cây","chua","thảo mộc"],
 glass:"Ly lớn / bình",method:"Build",ice:"Đá viên",garnish:"Lát cam, đào, sả",origin:"Việt Nam",
 desc:"Món trà trái cây nổi tiếng: đào ngâm, cam, sả đập giập, trà đen.",
 ing:[["Trà đen đã nguội",200,"ml"],["Đào ngâm (kèm 20 ml nước ngâm)",3,"lát"],["Cam",2,"lát"],["Sả",1,"cây","đập dập, cắt khúc"],["Syrup đào / đường",20,"ml"]],
 steps:["Cho sả đập dập, lát cam, lát đào vào ly hoặc bình.","Rót syrup và nước ngâm đào, trà lạnh.","Thêm đá viên, khuấy nhẹ.","Để 2–3 phút cho thấm vị rồi uống."],
 tip:"Sả vừa đủ — nhiều quá sẽ át vị đào."}
];

/* ============ NỘI DUNG KIẾN THỨC ============ */
const TOOLS=[
 ["🥤","Shaker (Boston / Cobbler)","Dùng để lắc: làm lạnh nhanh, pha loãng và trộn đều. Boston (2 phần) linh hoạt, Cobbler (3 phần, có nắp lọc) dễ dùng cho người mới."],
 ["🥄","Jigger","Dụng cụ đo hai đầu (thường 30/45 ml hoặc 25/50 ml). Đo chính xác là bí quyết của sự ổn định."],
 ["🥢","Bar spoon","Muỗng cán dài xoắn để khuấy, chồng lớp (layer) và đo ~5 ml."],
 ["🕳️","Strainer (Hawthorne / lưới lọc)","Hawthorne có lò xo giữ đá khi rót; lưới lọc mịn (fine strainer) giữ lại mảnh vụn khi lọc kép."],
 ["🔨","Muddler","Chày dằm để ép nước, tinh dầu từ chanh, bạc hà, trái cây."],
 ["🥛","Mixing glass","Ly trộn thành dày, dùng cho cocktail khuấy: Martini, Manhattan, Negroni."],
 ["🔪","Dao &amp; thớt nhỏ, peeler","Cắt lát chanh, vỏ cam; dụng cụ bào vỏ (peeler) tạo twist đẹp."],
 ["🍋","Dụng cụ vắt chanh","Luôn vắt nước chanh tươi — nước chanh đóng chai làm hỏng hương vị."],
 ["⚙️","Máy xay","Cho Piña Colada, đá xay, frozen drinks, mocktail dạng sinh tố."],
 ["🧊","Khuôn đá lớn","Đá viên lớn (5 cm) tan chậm, giữ rượu không bị loãng."]
];
const INGREDIENTS=[
 ["🥃 Rượu nền (base spirits)",[
   ["Vodka","Trung tính, dễ pha. Dùng trong Cosmopolitan, Moscow Mule, Bloody Mary."],
   ["Gin","Hương thảo mộc, đặc trưng là quả bách xu (juniper). Dùng cho Martini, Negroni, G&T."],
   ["Rum (trắng / vàng / đen)","Chưng cất từ mía. Trắng cho Mojito, Daiquiri; đen đậm cho Dark 'n' Stormy."],
   ["Tequila / Mezcal","Từ cây agave. Blanco cho Margarita; Reposado/Añejo để nhâm nhi. Mezcal có vị khói."],
   ["Whiskey (bourbon / rye / scotch)","Bourbon ngọt – vani; rye cay; scotch có thể khói. Old Fashioned, Manhattan, Whiskey Sour."],
   ["Brandy / Cognac","Chưng cất từ nho, trái cây. Dùng trong Sidecar, Brandy Alexander."]]],
 ["🍷 Rượu mùi &amp; rượu khai vị",[
   ["Triple sec / Cointreau","Rượu mùi vỏ cam — Margarita, Cosmopolitan."],
   ["Vermouth (đỏ ngọt / trắng khô)","Rượu vang tăng cường hương thảo mộc — Martini, Manhattan, Negroni."],
   ["Campari / Aperol","Rượu khai vị đắng cam thảo — Negroni, Aperol Spritz."],
   ["Rượu mùi cà phê","Kahlúa, Tia Maria — Espresso Martini, White Russian."],
   ["Orgeat, Curaçao","Syrup hạnh nhân và rượu mùi cam — thành phần của Mai Tai."]]],
 ["🍋 Chua &amp; ngọt",[
   ["Chanh xanh (lime) &amp; chanh vàng (lemon)","Luôn dùng nước vắt tươi trong 24 giờ."],
   ["Syrup đơn (1:1)","Tỉ lệ nước:đường 1:1; hòa tan nhanh, dễ tính toán."],
   ["Syrup đậm (2:1)","Tỉ lệ đường:nước 2:1 — ngọt hơn, ít làm loãng."],
   ["Agave, mật ong, maple","Các lựa chọn thay thế tạo hương riêng."],
   ["Grenadine","Siro lựu: tự làm từ nước ép lựu và đường."]]],
 ["🌿 Thơm &amp; gia vị",[
   ["Bitters","Cô đặc thảo mộc và vỏ cây — Angostura, orange bitters. Vài giọt đủ thay đổi cả ly."],
   ["Thảo mộc tươi","Bạc hà, húng quế, rosemary, thyme: vỗ nhẹ để tỏa hương."],
   ["Vỏ họ cam chanh","Vắt tinh dầu trên mặt ly (express) — thay đổi hoàn toàn mùi hương."],
   ["Gia vị","Quế, hồi, tiêu, gừng — dùng nguyên hoặc làm syrup."]]],
 ["🫧 Soda &amp; nước giải khát",[
   ["Soda / nước khoáng có gas","Nên dùng loại sủi bọt mịn, giữ lạnh."],
   ["Tonic water","Vị đắng quinine — chọn loại chất lượng tốt cho G&T."],
   ["Ginger beer / ginger ale","Ginger beer cay hơn, ginger ale ngọt dịu."],
   ["Nước ép trái cây","Cam, dứa, nam việt quất, cà chua… ưu tiên nước ép nguyên chất."]]],
 ["🍹 Dành riêng cho mocktail",[
   ["Spirit không cồn","Seedlip, Lyre's, Ritual… mô phỏng hương gin/whiskey/rum nhưng 0% cồn."],
   ["Trà &amp; cold brew","Đen, xanh, hoa hồng, hibiscus: tạo độ chát và chiều sâu giống rượu."],
   ["Shrub (giấm trái cây)","Hỗn hợp trái cây, đường và giấm: chua, thơm, tạo cảm giác 'gắt' như rượu."],
   ["Kombucha, nước dừa, nước ép lên men","Tạo độ phức hợp và hơi gas tự nhiên."]]]
];
const TECH=[
 ["Shake — Lắc","Cho nguyên liệu và đá vào shaker, lắc mạnh 10–15 giây cho đến khi thân shaker đóng sương. Dùng khi có nước ép, siro, trứng, kem.","Margarita, Daiquiri, Cosmopolitan"],
 ["Stir — Khuấy","Khuấy bằng bar spoon trong mixing glass 20–40 giây. Giữ độ trong, mượt, không bọt.","Martini, Manhattan, Negroni"],
 ["Build — Pha trực tiếp","Cho trực tiếp từng nguyên liệu vào ly phục vụ, thường theo thứ tự đá → rượu → soda.","Gin &amp; Tonic, Moscow Mule"],
 ["Muddle — Dằm","Dùng chày ép nhẹ để tiết nước và tinh dầu. Đừng nghiền nát lá thảo mộc.","Mojito, Caipirinha"],
 ["Blend — Xay","Xay với đá để tạo kết cấu đá sinh tố hoặc sorbet.","Piña Colada, Frozen Daiquiri"],
 ["Layer — Chồng lớp","Rót từ từ theo thành ly hoặc qua lưng muỗng, đi từ nặng (đặc) đến nhẹ.","Tequila Sunrise, B-52"],
 ["Dry shake — Lắc không đá","Lắc trước không đá để đánh bông lòng trắng trứng, sau đó thêm đá lắc lại.","Whiskey Sour, Pisco Sour"],
 ["Double strain — Lọc kép","Lọc qua cả strainer thường và lưới mịn để loại mảnh đá và vụn.","Espresso Martini, cocktail 'lên ly coupe'"],
 ["Rim — Viền ly","Thoa chanh quanh mép ly rồi chấm vào muối, đường hoặc gia vị.","Margarita, Salty Dog"],
 ["Express — Vắt tinh dầu vỏ","Bóp vỏ cam/chanh để phun tinh dầu lên mặt ly rồi thả vỏ hoặc vắt xung quanh viền.","Old Fashioned, Martini"]
];
const GLASSES=[
 ["🥃","Rocks / Old Fashioned","200–300 ml","Cocktail serve với đá: Old Fashioned, Negroni, Caipirinha."],
 ["🥛","Highball","250–350 ml","Pha cùng soda/nước ép: Mojito, Tequila Sunrise, G&T."],
 ["🧉","Collins","300–400 ml","Cao và mảnh hơn highball: Tom Collins, Long Island."],
 ["🍸","Martini","150–200 ml","Hình chữ V: Martini, Cosmopolitan."],
 ["🥂","Coupe","150–200 ml","Thân tròn kiểu cổ: Daiquiri, Manhattan."],
 ["🍷","Ly vang lớn","350+ ml","Cocktail dạng Spritz: Aperol Spritz."],
 ["🏺","Cốc đồng (copper mug)","350–470 ml","Giữ lạnh cực tốt cho Moscow Mule."],
 ["🌪️","Hurricane","400+ ml","Ly frozen, tropical: Piña Colada."],
 ["🥤","Mason jar / ly bình","~500 ml","Mocktail trà trái cây, bình thủy tinh."]
];
const ICE=[
 ["🧊","Đá viên thường","Cho hầu hết thức uống build. Dùng đá tinh khiết, tránh đá có mùi."],
 ["🧊","Đá lớn / đá cầu","Tan chậm, giữ rượu không loãng — Old Fashioned, Negroni."],
 ["❄️","Đá vụn / crushed","Cho cocktail tiki, Mojito, Julep. Làm lạnh nhanh và lạnh sâu."],
 ["🧊","Đá xay","Cho frozen drink. Dùng đá viên nhỏ và máy xay mạnh."]
];
const BASICS=[
 ["Syrup đơn 1:1","1 phần đường trắng + 1 phần nước nóng (theo thể tích hoặc khối lượng). Khuấy đến khi tan hoàn toàn (không cần đun sôi). Để nguội, bảo quản ngăn mát tối đa 2–4 tuần."],
 ["Syrup đậm 2:1","2 phần đường + 1 phần nước nóng. Ngọt gấp đôi, ít làm loãng, bảo quản lâu hơn (~1–2 tháng). Dùng bằng nửa lượng so với syrup 1:1."],
 ["Syrup mật ong","3 phần mật ong + 1 phần nước nóng. Khuấy đến khi tan, giúp mật ong dễ hòa với đồ uống lạnh."],
 ["Grenadine tự làm","1 phần nước ép lựu (nguyên chất) + 1 phần đường; đun nhẹ cho tan; thêm vài giọt nước hoa cam (tuỳ chọn). Màu đỏ tươi, thơm trái cây thật."],
 ["Syrup bạc hà","Đun syrup 1:1 với một nắm bạc hà trong 2 phút, tắt bếp ngâm 15 phút, lọc bỏ lá."],
 ["Syrup gừng","Gừng tươi thái lát + đường + nước tỉ lệ 1:1:1, đun nhỏ lửa 15 phút, để nguội rồi lọc. Dùng cho Moscow Mule, mocktail gừng."],
 ["Sour mix đơn giản","1 phần nước cốt chanh + 1 phần syrup 1:1 (hoặc theo khẩu vị). Dùng ngay trong 1–2 ngày."],
 ["Trà lạnh (cold brew tea)","Ngâm 10 g trà trong 1 lít nước lạnh 8–12 giờ trong tủ lạnh, lọc. Ít chát hơn trà pha nóng."]
];
const TIPS=[
 ["🧊","Dùng nhiều đá","Đá nhiều làm lạnh nhanh và ít bị tan hơn; ly đầy đá giữ nhiệt độ lâu hơn ly ít đá."],
 ["📏","Luôn đo lường","Ước lượng bằng mắt khiến hương vị mỗi lần một khác. Jigger là khoản đầu tư rẻ nhất."],
 ["🍋","Chanh tươi","Vắt ngay trước khi pha. Nước chanh để qua đêm đã mất mùi thơm."],
 ["❄️","Làm lạnh ly","Ly lạnh giữ thức uống mát lâu. Ly coupe/martini nên cho vào tủ đông 15 phút."],
 ["👅","Nếm trước khi phục vụ","Dùng ống hút nhỏ hoặc muỗng nếm. Chỉnh từng 5 ml một."],
 ["🧂","Một nhúm muối","Một nhúm rất nhỏ làm vị trái cây nổi hơn, giảm vị đắng."],
 ["🌿","Vỗ, đừng nghiền","Thảo mộc chỉ cần vỗ nhẹ để tỏa hương; nghiền nát sẽ ra vị cỏ, đắng."],
 ["🥃","Rượu tốt vừa phải","Không cần rượu đắt tiền cho cocktail trộn, nhưng tránh loại quá rẻ."],
 ["⏱️","Uống ngay","Cocktail ngon nhất trong 5–10 phút đầu, trước khi đá tan quá nhiều."],
 ["🥂","Mocktail xứng đáng ly đẹp","Dùng cùng ly, đá và trang trí như cocktail để trải nghiệm trọn vẹn."]
];
const GLOSS=[
 ["ABV","Alcohol By Volume — nồng độ cồn theo thể tích (%)."],
 ["Neat","Uống rượu nguyên chất, không đá, không pha."],
 ["On the rocks","Rượu uống với đá."],
 ["Up","Lắc/khuấy với đá nhưng lọc ra, phục vụ không đá."],
 ["Dash","Khoảng 1 lần giật của chai bitters (~0,5–1 ml)."],
 ["Twist","Dải vỏ chanh/cam, thường vắt tinh dầu rồi thả vào ly."],
 ["Float","Rót nhẹ một lớp lên trên mặt thức uống."],
 ["Top","Rót thêm (thường là soda, tonic) cho đầy ly."],
 ["Garnish","Phần trang trí: lát chanh, bạc hà, cherry…"],
 ["Mixology","Nghệ thuật và khoa học pha chế cocktail, đặc biệt là khía cạnh sáng tạo."],
 ["Bitters","Chiết xuất đắng thảo mộc cô đặc, dùng vài giọt để tăng hương vị."],
 ["Sour","Họ cocktail gồm rượu + vị chua (chanh) + vị ngọt (đường)."],
 ["Spritz","Cocktail nhẹ với rượu vang sủi bọt và soda."],
 ["Shrub","Syrup giấm trái cây có vị chua ngọt, dùng nhiều cho mocktail."],
 ["Speakeasy","Quán bar kín thời Cấm rượu ở Mỹ; ngày nay là phong cách bar ẩn."]
];
