const CATEGORY_META={
'b_grifo':['Cervezas de grifo','生啤','beer'],'gin':['Ginebra','金酒','spirit'],'ron':['Ron','朗姆酒','spirit'],'whisky':['Whisky','威士忌','spirit'],'vodka':['Vodka','伏特加','spirit'],'brandy':['Brandy','白兰地','spirit'],'tequila':['Tequila','龙舌兰','spirit'],'licores':['Licores y Aperitivos','利口酒与开胃酒','spirit'],'vermut':['Vermuts y Aperitivos','味美思与开胃饮品','spirit'],'v_blanco':['Vinos blancos','白葡萄酒','whitewine'],'v_tinto':['Vinos tintos','红葡萄酒','redwine'],'b_botella':['Cervezas de botella','瓶装啤酒','beer'],'cafe':['Cafés y bebidas calientes','咖啡与热饮','coffee'],'tea':['Infusiones','茶与花草茶','tea'],'juice':['Zumos','果汁','juice'],'soft':['Refrescos','软饮','soft'],'water':['Agua','水','water'],'other':['Otras bebidas','其他饮料','soft'],'platos':['Platos combinados','套餐拼盘','food'],'bocadillos':['Bocadillos','法棍夹馅','food'],'raciones':['Raciones','小食拼盘','food'],'gyoza':['Gyozas','饺子','food']};
const RAW_PRODUCTS=`
beer-cana|drink|b_grifo|Caña|小杯生啤
beer-doble|drink|b_grifo|Doble|大杯生啤
gin-obsession|drink|gin|Obsession Purple Gin|Obsession 紫色金酒
gin-puerto|drink|gin|Puerto de Indias Strawberry Gin|Puerto de Indias 草莓金酒
gin-bombay|drink|gin|Bombay Sapphire London Dry Gin|孟买蓝宝石金酒
gin-nordes|drink|gin|Nordés Gin|Nordés 金酒
gin-larios|drink|gin|Larios Ginebra Mediterránea|Larios 地中海金酒
gin-beefeater|drink|gin|Beefeater London Dry Gin|必富达伦敦干金酒
gin-beefeater-black|drink|gin|Beefeater Black|Beefeater Black 金酒
gin-seagrams|drink|gin|Seagram's Dry Gin|Seagram's 干金酒
gin-martin|drink|gin|Martin Miller's Gin|Martin Miller's 金酒
gin-bulldog|drink|gin|Bulldog London Dry Gin|Bulldog 伦敦干金酒
ron-brugal|drink|ron|Brugal Añejo|Brugal 陈年朗姆酒
ron-bacardi|drink|ron|Bacardi Carta Blanca|百加得白朗姆酒
ron-cacique|drink|ron|Cacique Añejo|Cacique 陈年朗姆酒
ron-barcelo|drink|ron|Barceló Añejo|Barceló 陈年朗姆酒
wh-dewars-white|drink|whisky|Dewar's White Label|帝王白牌威士忌
wh-bushmills|drink|whisky|Bushmills Original|布什米尔原味爱尔兰威士忌
wh-jw-red|drink|whisky|Johnnie Walker Red Label|尊尼获加红牌
wh-jw-black|drink|whisky|Johnnie Walker Black Label 12|尊尼获加黑牌12年
wh-ballantines|drink|whisky|Ballantine's Finest|百龄坛特醇
wh-jb|drink|whisky|J&B Rare|J&B Rare 威士忌
wh-jack|drink|whisky|Jack Daniel's Old No.7|杰克丹尼 Old No.7
wh-dewars8|drink|whisky|Dewar's French Smooth 8|帝王 French Smooth 8
wh-dyc|drink|whisky|DYC Selected|DYC 双重蒸馏威士忌
vodka-absolut|drink|vodka|Absolut Vodka|绝对伏特加
brandy-terry|drink|brandy|Terry Centenario|Terry Centenario 白兰地
brandy-veterano|drink|brandy|Osborne Veterano|Osborne Veterano 白兰地
tequila-cuervo|drink|tequila|José Cuervo Especial Reposado|豪帅快活金标龙舌兰
licor43|drink|licores|Licor 43|43号利口酒
campari|drink|licores|Campari Bitter|金巴利苦味酒
baileys|drink|licores|Baileys Original|百利甜酒
ruavieja|drink|licores|Ruavieja Licor de Hierbas|Ruavieja 草本利口酒
navarra|drink|licores|Pacharán La Navarra|La Navarra 黑刺李利口酒
bandarra|drink|vermut|El Bandarra|El Bandarra 味美思
martini-rosso|drink|vermut|Martini Rosso|Martini 红味美思
vermut-zarro|drink|vermut|Vermut Zarro|Zarro 味美思
tinto-verano|drink|vermut|Tinto de verano|夏日红酒汽水
white-estilete|drink|v_blanco|Estilete Rueda|Estilete Rueda 白葡萄酒
white-alma|drink|v_blanco|Alma|Alma 白葡萄酒
white-pulpo|drink|v_blanco|La Madre del Pulpo|La Madre del Pulpo 白葡萄酒
white-carlos|drink|v_blanco|Carlos|Carlos 白葡萄酒
red-oriza|drink|v_tinto|Oriza Ribera del Duero|Oriza 杜埃罗河岸红酒
red-morena|drink|v_tinto|Viña Morena Vino Tinto|Viña Morena 红葡萄酒
red-lopez|drink|v_tinto|López de Haro Rioja|López de Haro 里奥哈红酒
red-azpilicueta|drink|v_tinto|Azpilicueta Rioja|Azpilicueta 里奥哈红酒
bot-est-galicia|drink|b_botella|Estrella Galicia|Estrella Galicia 啤酒
bot-est00|drink|b_botella|Estrella Galicia 0,0|Estrella Galicia 无酒精啤酒
bot-especial|drink|b_botella|Estrella Galicia Especial|Estrella Galicia Especial
bot-1906|drink|b_botella|1906 Milnueve|1906 Milnueve 啤酒
bot-tostada|drink|b_botella|Estrella Galicia 0,0 Tostada|Estrella Galicia 0.0 烘烤型无酒精啤酒
coffee-leche|drink|cafe|Café con leche|牛奶咖啡
coffee-solo|drink|cafe|Café solo|浓缩咖啡
coffee-desc|drink|cafe|Café descafeinado|无咖啡因咖啡
coffee-solo-desc|drink|cafe|Café solo descafeinado|无咖啡因浓缩咖啡
milk|drink|cafe|Leche|牛奶
capuchino|drink|cafe|Capuchino|卡布奇诺
americano|drink|cafe|Café americano|美式咖啡
colacao|drink|cafe|ColaCao|ColaCao 热可可
bombon|drink|cafe|Café bombón|炼乳咖啡
manchado|drink|cafe|Café manchado|淡奶咖啡
expreso|drink|cafe|Expreso|意式浓缩咖啡
tea-pakistani|drink|tea|Pakistani|巴基斯坦风味茶
tea-tuareg|drink|tea|Le Tuareg|图阿雷格风味茶
tea-japan|drink|tea|Japonés con cerezas|日式樱桃茶
tea-roo-orange|drink|tea|Rooibos galleta-naranja|南非国宝茶·饼干橙味
tea-relax|drink|tea|Rooibos Relax|舒缓南非国宝茶
tea-mint|drink|tea|Menta|薄荷茶
tea-chamomile|drink|tea|Manzanilla|洋甘菊茶
tea-digest|drink|tea|Mezcla Digest|消化混合茶
tea-pina|drink|tea|Mezcla Piña Colada|椰林飘香风味茶
tea-forest|drink|tea|Frutas del Bosque|森林水果茶
tea-cuerpo|drink|tea|Cuerpo del Deseo|Cuerpo del Deseo 风味茶
tea-ginger|drink|tea|Jengibre Limón|姜柠檬茶
tea-turmeric|drink|tea|Cúrcuma Detox|姜黄茶
tea-chunmee|drink|tea|Chun Mee|珍眉绿茶
tea-chai|drink|tea|Rooibos Chai|Chai 风味南非国宝茶
juice-grape|drink|juice|Zumo de uva|葡萄汁
juice-orange|drink|juice|Zumo de naranja|橙汁
juice-peach|drink|juice|Zumo de melocotón|桃汁
juice-pineapple|drink|juice|Zumo de piña|菠萝汁
soft-tonic|drink|soft|Tónica|汤力水
soft-sprite|drink|soft|Sprite|雪碧
soft-coke|drink|soft|Coca-Cola|可口可乐
soft-cokezero|drink|soft|Coca-Cola Zero|零度可乐
soft-coke00|drink|soft|Coca-Cola Zero Zero|无糖无咖啡因可乐
soft-fanta-lemon|drink|soft|Fanta Limón|柠檬芬达
soft-fanta-orange|drink|soft|Fanta Naranja|橙味芬达
soft-bitter|drink|soft|Bitter Kas|Bitter Kas 苦味汽水
soft-nestea|drink|soft|Nestea|Nestea 冰茶
water|drink|water|Agua|矿泉水
water-gas|drink|water|Agua con gas|气泡水
aq-lemon|drink|other|Aquarius Limón|Aquarius 柠檬味
aq-orange|drink|other|Aquarius Naranja|Aquarius 橙味
redbull|drink|other|Red Bull|红牛
pc-bacon|food|platos|Bacon con huevo, patatas o ensalada|培根＋鸡蛋＋薯条/沙拉
pc-pollo|food|platos|Pechuga de pollo con huevo, patatas o ensalada|鸡胸肉＋鸡蛋＋薯条/沙拉
pc-ternera|food|platos|Filete de ternera con huevo, patatas o ensalada|牛排＋鸡蛋＋薯条/沙拉
pc-lomo|food|platos|Lomo de cerdo con huevo, patatas o ensalada|猪里脊＋鸡蛋＋薯条/沙拉
pc-longaniza|food|platos|Longaniza con huevo, patatas o ensalada|香肠＋鸡蛋＋薯条/沙拉
boc-calamares|food|bocadillos|Bocadillo de calamares|炸鱿鱼法棍
boc-bacon|food|bocadillos|Bocadillo de bacon|培根法棍
boc-jamon|food|bocadillos|Bocadillo de jamón serrano|塞拉诺火腿法棍
boc-ternera|food|bocadillos|Pepito de ternera|牛肉法棍
boc-lomo|food|bocadillos|Pepito de lomo|猪里脊法棍
boc-pollo|food|bocadillos|Bocadillo de pechuga de pollo|鸡胸肉法棍
r-bravas|food|raciones|Patatas bravas|辣汁土豆
r-fritas|food|raciones|Patatas fritas|炸薯条
r-rusa|food|raciones|Ensaladilla rusa|西式土豆沙拉
r-alitas|food|raciones|Alitas de pollo|鸡翅
r-nuggets|food|raciones|Nuggets|鸡块
r-padron|food|raciones|Pimientos de Padrón|帕德龙青椒
r-huevos|food|raciones|Huevos rotos con jamón ibérico|伊比利亚火腿碎蛋土豆
r-croquetas|food|raciones|Croquetas de jamón|火腿可乐饼
r-rollitos|food|raciones|Rollitos vegetales|蔬菜春卷
r-boquerones|food|raciones|Boquerones fritos|炸小凤尾鱼
r-calamares|food|raciones|Calamares a la romana|炸鱿鱼圈
r-ensalada|food|raciones|Ensalada mediterránea|地中海沙拉
r-tortilla|food|raciones|Pincho de tortilla|西班牙土豆蛋饼
r-champ|food|raciones|Champiñones a la plancha|铁板蘑菇
r-gambas|food|raciones|Gambas al ajillo|蒜香虾
r-oreja|food|raciones|Oreja a la plancha|铁板猪耳
g-veg|food|gyoza|Gyoza vegetal|蔬菜饺子
g-gamba|food|gyoza|Gyoza de gambas|虾饺
g-ternera|food|gyoza|Gyoza de ternera|牛肉饺子
g-cerdo|food|gyoza|Gyoza de cerdo|猪肉饺子`;
const PRODUCTS=RAW_PRODUCTS.trim().split('\n').map(r=>{const [id,section,cat,es,zh]=r.split('|');return{id,section,cat,es,zh}});