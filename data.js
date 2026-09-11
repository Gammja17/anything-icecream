// ============================================================
//  뭐든 아이스크림 - 콘텐츠 데이터 (엔진과 분리. 유니티 이식 시 ScriptableObject로)
//  맛 축 순서: [달콤, 고소, 비린, 야성, 괴식]  (0~3)
// ============================================================
const DATA = {
TASTE_AXES: ['달콤','고소','비린','야성','괴식'],
XP_TABLE: [0, 20, 50, 100, 180],           // 누적 XP -> Lv1~5
DAY_LEN: 120,                               // 하루 = 120초
ENDING_DAY: 30,

JOBS: { farm:'농사', gather:'채집', hunt:'사냥', ranch:'목축', fish:'낚시' },

// ---------- 아이스크림 (키 = 재료 키. vanilla/mystery 제외) ----------
ICE: {
  vanilla:      {name:'바닐라',            price:3,   col:'#fff2c9', taste:[1,0,0,0,0], job:null,
    desc:'그냥 바닐라. 우유는 매일 배달된다.', src:'기본'},
  // 농사
  fruit:        {name:'과일 아이스크림',    price:8,   col:'#f28c28', taste:[2,0,0,0,0], job:'farm',
    desc:'밭에서 키운 과일. 동결건조해도 과일 맛은 남는다.', story:'유일하게 정상적으로 보이는 메뉴라 오히려 잘 안 팔린다.', src:'밭에 과일 씨앗'},
  pumpkin:      {name:'호박 아이스크림',    price:12,  col:'#e0862a', taste:[1,1,0,0,0], job:'farm',
    desc:'통호박을 통째로 얼렸다. 숟가락이 안 들어간다.', story:'가을 한정이라고 써 붙였지만 사계절 판다.', src:'호박 씨앗 (농사 Lv2)'},
  strawberry:   {name:'딸기 아이스크림',    price:15,  col:'#e84a5f', taste:[3,0,0,0,0], job:'farm',
    desc:'이 가게에서 가장 정상적인 메뉴. 아이들이 좋아한다.', story:'딸기는 원래 아이스크림이 되고 싶어 했다.', src:'딸기 씨앗 (농사 Lv4)'},
  fireberry:    {name:'불꽃 과일 아이스크림', price:90, col:'#ff5a1f', taste:[2,0,0,2,2], job:'farm',
    desc:'드래곤 피로 키운 과일. 얼어 있는데 뜨겁다.', story:'농부와 슬레이어가 손잡으면 이런 게 나온다.', src:'드래곤 피 비료 (교차 스킬)'},
  // 채집
  honey:        {name:'벌집 아이스크림',    price:15,  col:'#f4d35e', taste:[3,0,0,0,1], job:'gather',
    desc:'벌집째로 동결건조했다.', story:'벌은 대부분 뺐다. 대부분.', src:'숲의 벌집'},
  mushroom:     {name:'버섯 아이스크림',    price:12,  col:'#c9a27e', taste:[0,2,0,0,1], job:'gather',
    desc:'숲 버섯. 독버섯은 아니라고 한다.', story:'마녀가 단골이 되었다.', src:'숲 바닥의 버섯'},
  herb:         {name:'약초 아이스크림',    price:18,  col:'#7bbf6a', taste:[0,1,0,1,1], job:'gather',
    desc:'쓰다. 몸에 좋다고 하면 팔린다.', story:'약초 감식을 배우기 전엔 잡초로 보였다.', src:'숲의 약초 (채집 Lv2)'},
  flower:       {name:'희귀 꽃 아이스크림',  price:40,  col:'#d98fe0', taste:[2,0,0,0,2], job:'gather',
    desc:'향이 강하다. 먹는 건지 꽂는 건지.', story:'꽃 감정사가 되어야 보이는 꽃.', src:'숲의 희귀 꽃 (채집 Lv4)'},
  spirit:       {name:'정령 열매 아이스크림', price:120, col:'#9fe8ff', taste:[3,1,0,1,3], job:'gather',
    desc:'먹으면 잠깐 정령이 보인다. 정령은 화나 있다.', story:'정령과 교감한 채집가만 딸 수 있다.', src:'깊은 숲의 정령 열매 (채집 Lv5)'},
  // 목축
  pork:         {name:'삼겹살 아이스크림',  price:25,  col:'#e58a8a', taste:[0,3,0,0,1], job:'ranch',
    desc:'동결건조한 삼겹살을 갈아 넣었다. 고소하다.', story:'돼지는 사흘이면 다 자란다. 사료에 뭐가 들었는지는 묻지 말자.', src:'돼지를 길러 도축'},
  milk:         {name:'우유 아이스크림',    price:20,  col:'#fdfdf5', taste:[2,2,0,0,0], job:'ranch',
    desc:'그냥 우유 아이스크림. 이 가게에서 제일 이상한 메뉴 취급을 받는다.', story:'정상적인 게 제일 비정상.', src:'소의 우유 (목축 Lv3)'},
  beef:         {name:'소고기 아이스크림',  price:35,  col:'#b8544a', taste:[0,3,0,1,1], job:'ranch',
    desc:'등급은 묻지 마라.', story:'소를 잡던 날 마을이 조용했다.', src:'소 도축'},
  wool:         {name:'양털 아이스크림',    price:30,  col:'#eeeeee', taste:[0,0,0,0,3], job:'ranch',
    desc:'털을 얼렸다. 씹으면 씹힌다.', story:'양은 멀쩡하다. 털만 없다.', src:'양의 털 (목축 Lv4)'},
  mutton:       {name:'양고기 아이스크림',  price:30,  col:'#c98a7a', taste:[0,2,0,1,1], job:'ranch',
    desc:'노린내는 얼려서 없앴다.', story:'양털 다음은 양이었다.', src:'양 도축'},
  // 사냥
  rabbit:       {name:'토끼 아이스크림',    price:14,  col:'#d9c7b8', taste:[0,1,0,1,1], job:'hunt',
    desc:'귀엽던 것을 얼렸다.', story:'아이들에게는 "토끼 모양"이라고 한다.', src:'숲의 토끼'},
  bear:         {name:'곰발바닥 아이스크림', price:80,  col:'#6b4a3a', taste:[0,1,0,2,2], job:'hunt',
    desc:'동결건조한 곰발바닥. 발톱은 빼드립니다.', story:'전 주인은 이 곰 때문에 허리가 나갔다. 이제 곰은 아이스크림이다.', src:'숲의 곰'},
  wolf:         {name:'늑대 아이스크림',    price:60,  col:'#8a8f9a', taste:[0,1,0,3,1], job:'hunt',
    desc:'야성의 맛. 먹고 나면 달을 보고 싶어진다.', story:'산길을 개척하니 늑대가 있었다.', src:'산의 늑대 (사냥 Lv3)'},
  boar:         {name:'멧돼지 아이스크림',  price:55,  col:'#5f4b3a', taste:[0,2,0,2,1], job:'hunt',
    desc:'삼겹살의 야생 버전.', story:'조합장이 이걸 먹고 가게를 밀어주기로 했다.', src:'산의 멧돼지 (사냥 Lv3)'},
  dragon_scale: {name:'드래곤 비늘 아이스크림', price:200, col:'#3fa07a', taste:[0,0,0,2,3], job:'hunt',
    desc:'바삭하다. 이가 나갈 수도 있다.', story:'용을 잡은 날, 가게 앞에 줄이 섰다.', src:'드래곤 해체'},
  dragon_heart: {name:'드래곤 심장 아이스크림', price:500, col:'#c9262b', taste:[0,2,0,3,3], job:'hunt',
    desc:'아직 뛰는 것 같다. 기분 탓이다.', story:'기사 롤랑이 평생 궁금해하던 맛. 그냥저냥이었다.', src:'드래곤 해체'},
  dragon_eye:   {name:'드래곤 눈알 아이스크림', price:300, col:'#f2c14e', taste:[0,0,1,1,3], job:'hunt',
    desc:'쳐다본다. 먹을 때까지.', story:'괴식파 손님들의 성지가 되었다.', src:'드래곤 해체'},
  dragon_wing:  {name:'드래곤 날개막 아이스크림', price:250, col:'#7a5cbf', taste:[0,1,0,3,2], job:'hunt',
    desc:'쫄깃하다. 하늘을 나는 꿈을 꾼다.', story:'해체 정밀 스킬이 있으면 더 많이 나온다.', src:'드래곤 해체'},
  // 낚시
  carp:         {name:'붕어 아이스크림',    price:10,  col:'#b58b5a', taste:[0,0,2,0,0], job:'fish',
    desc:'연못 붕어. 흙내가 난다.', story:'어부 만석이 낚싯대를 줬다.', src:'연못 낚시'},
  hairtail:     {name:'갈치구이 아이스크림', price:40,  col:'#b9c7d6', taste:[0,1,3,0,0], job:'fish',
    desc:'구운 갈치를 동결건조했다. 비린내는 얼려서 없앴다.', story:'바다에 나가니 갈치가 제철이었다.', src:'바다 낚시 (낚시 Lv2)'},
  marlin:       {name:'청새치 아이스크림',  price:120, col:'#4a78b8', taste:[0,2,2,1,0], job:'fish',
    desc:'노인과 바다. 아이스크림.', story:'대물 낚시를 배운 뒤 잡을 수 있었다.', src:'바다 낚시 (낚시 Lv4)'},
  seadragon:    {name:'수룡 아이스크림',    price:600, col:'#2fd3c8', taste:[0,0,3,3,3], job:'fish',
    desc:'바다의 용. 낚고 나서 싸워야 한다.', story:'낚시꾼이면서 사냥꾼이어야 한다.', src:'부두 심해 낚시 (낚시 Lv5 + 사냥 Lv4)'},
  // 어둠
  mystery:      {name:'??? 아이스크림',     price:150, col:'#3a2a4a', taste:[0,0,0,0,3], job:null,
    desc:'마녀가 준 수상한 재료로 만들었다. 묻지 않는 게 좋다.', story:'잘 팔린다. 그게 문제다.', src:'마녀 이바의 거래', dark:true},
},
ING_EXTRA: { feed:'사료' },

// ---------- 씨앗 ----------
SEEDS: {
  fruit:      {name:'과일 씨앗',  price:4,  days:2, yield:2, crop:'fruit'},
  pumpkin:    {name:'호박 씨앗',  price:10, days:3, yield:1, crop:'pumpkin',    farm:2},
  strawberry: {name:'딸기 씨앗',  price:8,  days:2, yield:3, crop:'strawberry', farm:4},
  fire:       {name:'불꽃 씨앗',  price:0,  days:3, yield:2, crop:'fireberry',  skill:'dragon_fert', nosell:true},
},

// ---------- 동물 ----------
ANIMALS: {
  pig:   {name:'새끼돼지', price:30,  feeds:3, butcher:{pork:3},   xp:6},
  cow:   {name:'소',      price:120, ranch:3, product:{key:'milk', every:1}, butcher:{beef:3}, xp:8},
  sheep: {name:'양',      price:80,  ranch:4, product:{key:'wool', every:2}, butcher:{mutton:2}, xp:8},
  cub:   {name:'새끼곰',  price:0,   product:{key:'bear', every:3}, butcher:{bear:2}, xp:10, nosell:true},
},

// ---------- 몬스터 ----------
MONSTERS: {
  rabbit: {name:'토끼',   hp:1,  dmg:0, speed:55, aggro:0,   flee:true, drops:{rabbit:1}, xp:3,  respawn:1},
  bear:   {name:'곰',     hp:3,  dmg:1, speed:45, aggro:5,   drops:{bear:2}, xp:8,  respawn:2},
  wolf:   {name:'늑대',   hp:4,  dmg:1, speed:70, aggro:7,   drops:{wolf:1}, xp:10, respawn:2},
  boar:   {name:'멧돼지', hp:6,  dmg:2, speed:60, aggro:4,   drops:{boar:2}, xp:15, respawn:3},
  dragon: {name:'드래곤', hp:30, dmg:3, speed:35, aggro:8,   size:2, drops:{dragon_scale:3, dragon_heart:1, dragon_eye:2, dragon_wing:2}, xp:80, respawn:7},
  seadragon:{name:'수룡', hp:20, dmg:2, speed:50, aggro:9, size:2, drops:{seadragon:2}, xp:60, respawn:99},  // 낚시로만 등장
},
// 스폰 위치는 엔진의 SPAWNS에 (맵 좌표 의존)

// ---------- 물고기 ----------
FISH: {
  carp:      {name:'붕어',   zone:'pond', speed:2.2, zoneW:0.34, xp:4,  w:1},
  hairtail:  {name:'갈치',   zone:'sea',  speed:3.0, zoneW:0.26, xp:8,  w:3},
  marlin:    {name:'청새치', zone:'sea',  speed:4.2, zoneW:0.18, xp:20, w:1, fishLv:4},
  seadragon: {name:'수룡',   zone:'deep', speed:5.0, zoneW:0.15, xp:60, w:1, skill:'seadragon', fight:true},
},

// ---------- 스킬 (job+lv = 직업 스킬, req = 교차 스킬) ----------
SKILLS: {
  farm2:  {name:'넓은 밭',     job:'farm',   lv:2, desc:'밭 6칸 추가'},
  farm3:  {name:'비료',        job:'farm',   lv:3, desc:'작물이 하루 빨리 자란다'},
  farm4:  {name:'온실',        job:'farm',   lv:4, desc:'딸기 씨앗 구매 가능, 밭 6칸 추가'},
  farm5:  {name:'전설의 농부', job:'farm',   lv:5, desc:'수확량 +1'},
  gather2:{name:'약초 감식',   job:'gather', lv:2, desc:'약초가 보인다'},
  gather3:{name:'벌 친구',     job:'gather', lv:3, desc:'벌에 안 쏘이고 벌집 2개'},
  gather4:{name:'꽃 감정',     job:'gather', lv:4, desc:'희귀 꽃이 보인다'},
  gather5:{name:'정령 교감',   job:'gather', lv:5, desc:'깊은 숲의 정령 열매'},
  hunt2:  {name:'창 숙련',     job:'hunt',   lv:2, desc:'공격력 +1'},
  hunt3:  {name:'산길 개척',   job:'hunt',   lv:3, desc:'산 입구가 열린다 (늑대·멧돼지)'},
  hunt4:  {name:'해체 정밀',   job:'hunt',   lv:4, desc:'몬스터 부위 +1'},
  hunt5:  {name:'드래곤 슬레이어', job:'hunt', lv:5, desc:'용의 둥지가 열린다, 공격력 +1'},
  ranch2: {name:'두 번째 우리', job:'ranch', lv:2, desc:'우리 2개'},
  ranch3: {name:'젖소 사육',   job:'ranch',  lv:3, desc:'소 구매 가능'},
  ranch4: {name:'양 사육',     job:'ranch',  lv:4, desc:'양 구매 가능, 우리 3개'},
  ranch5: {name:'명품 사료',   job:'ranch',  lv:5, desc:'돼지가 2일 만에 자란다'},
  fish2:  {name:'바다 낚시',   job:'fish',   lv:2, desc:'해변에서 낚시 가능'},
  fish3:  {name:'미끼 제조',   job:'fish',   lv:3, desc:'낚시 성공 구간이 넓어진다'},
  fish4:  {name:'대물 낚시',   job:'fish',   lv:4, desc:'청새치가 문다'},
  fish5:  {name:'심해 낚시',   job:'fish',   lv:5, desc:'부두 끝에서 낚시 가능'},
  // 교차
  tame:        {name:'길들이기',      req:{hunt:3, ranch:3}, desc:'곰을 잡으면 새끼곰을 데려올 수 있다. 우리에서 키우면 발바닥이 난다 (도축 없이)'},
  apiary:      {name:'양봉 밭',       req:{farm:2, gather:2}, desc:'수확량 +1'},
  seadragon:   {name:'수룡 사냥',     req:{fish:5, hunt:4},   desc:'부두에서 수룡을 낚아 싸울 수 있다'},
  dragon_fert: {name:'드래곤 피 비료', req:{hunt:5, farm:4},  desc:'드래곤 해체 시 불꽃 씨앗을 얻는다'},
  aquafarm:    {name:'양식장',        req:{ranch:3, fish:3},  desc:'매일 아침 붕어 1마리가 연못에서 나온다'},
},

// ---------- 손님 취향 ----------
CUSTOMER_TYPES: [
  {name:'단맛파',  axis:0, w:3, spr:'cust0'},
  {name:'고소파',  axis:1, w:3, spr:'cust1'},
  {name:'비린내파', axis:2, w:2, spr:'cust2'},
  {name:'야성파',  axis:3, w:2, spr:'cust3'},
  {name:'괴식파',  axis:4, w:2, spr:'cust4'},
  {name:'뜨내기',  axis:-1, w:3, spr:'cust5'},
],

// ---------- 단골 (에피소드) ----------
// steps: need = 사야 하는 아이스크림 (null이면 방문만으로 진행). reward는 선언형.
REGULARS: [
  {id:'sunja', name:'할머니 순자', spr:'reg_sunja', first:2, every:3, steps:[
    {need:'pork', text:['우리 영감이 삼겹살을 참 좋아했는데...','아이스크림으로라도 먹어봐야지.'], reward:{money:10}},
    {need:'pork', text:['영감 무덤에 하나 놓고 왔어.','녹지도 않더라. 동결건조라.'], reward:{xp:{ranch:10}}},
    {need:'pork', text:['고맙다. 이거 영감이 쓰던 사료 배합법이야.','돼지가 잘 클 거야.'], reward:{items:{feed:10}, morality:1}},
  ]},
  {id:'roland', name:'기사 롤랑', spr:'reg_roland', first:3, every:4, steps:[
    {need:'bear', text:['곰발바닥... 기사단 시절 먹던 맛이군.','(맛은 그냥저냥이지만.)'], reward:{money:30}},
    {need:'bear', text:['산 너머엔 늑대가 있네. 창으론 부족해.','이 검을 쓰게. 나는 이제 허리가 안 좋아서.'], reward:{items:{sword:1}, xp:{hunt:15}}},
    {need:'wolf', text:['늑대를 잡았군. 산 꼭대기 동굴에 용이 있네.','그놈 심장으로 아이스크림을 만들면... 나도 궁금하군.'], reward:{xp:{hunt:30}}},
    {need:'dragon_heart', text:['...정말 만들었군. 맛은?','"그냥저냥."','그럴 줄 알았네. 값은 치르지.'], reward:{money:500, fame:50}},
  ]},
  {id:'manseok', name:'어부 만석', spr:'reg_manseok', first:2, every:3, steps:[
    {need:null, text:['낚싯대도 없이 바닷가 가게라니.','이거 쓰게. 연못부터 시작해.'], reward:{items:{rod:1}}},
    {need:'carp', text:['붕어 아이스크림이라...','바다에 나가보게. 갈치가 제철이야.'], reward:{xp:{fish:15}}},
    {need:'hairtail', text:['갈치를 이렇게도 먹는군.','청새치를 낚는 날엔 내 배를 빌려주지.'], reward:{xp:{fish:20}}},
    {need:'marlin', text:['청새치를! 부두 끝에서 밤에 낚시해봤나?','뭔가 큰 게 있어. 낚싯대만으론 안 될 거야.'], reward:{xp:{fish:40}, xp2:{hunt:20}}},
    {need:'seadragon', text:['...수룡을.','자네 이제 바다의 전설이야.'], reward:{money:300, fame:50}},
  ]},
  {id:'iva', name:'마녀 이바', spr:'reg_iva', first:4, every:3, steps:[
    {need:'mushroom', text:['버섯 아이스크림. 좋아. 나 괴식파야.'], reward:{money:20}},
    {need:'herb', text:['약초도 다루는군.','그럼 이런 것도 팔 수 있겠지? 수상한 재료야. 뭔지는 묻지 마.'],
      choice:{q:'수상한 재료를 받는다?', yes:{text:'현명해. 잘 팔릴 거야.', reward:{items:{mystery:2}, morality:-1}}, no:{text:'...쫄보. 다음에 또 물을게.', stay:true}}},
    {need:'mystery', text:['팔았군. 잘 팔리지? 더 줄게.'], reward:{items:{mystery:3}, morality:-2}, repeat:true},
  ]},
  {id:'yuri', name:'꼬마 유리', spr:'reg_yuri', first:1, every:2, steps:[
    {need:'fruit', text:['과일 아이스크림! 엄마가 이건 먹어도 된대요.'], reward:{money:5}},
    {need:'strawberry', text:['딸기다!! 최고예요!'], reward:{xp:{farm:20}, fame:5}},
    {need:'milk', text:['우유 아이스크림은... 그냥 우유 맛이네요.','근데 제일 좋아요.'], reward:{money:50, morality:2}},
  ]},
  {id:'guild', name:'상인조합장', spr:'reg_guild', first:5, every:5, steps:[
    {need:null, text:['명성이 자자하더군.','30일째 되는 날 평가단이 올 걸세. 준비하게.'], reward:{}},
    {need:'honey', text:['벌집... 벌이 들었군. 대부분 뺐다고? 대부분이라.'], reward:{money:40}},
    {need:'boar', text:['멧돼지까지. 조합에서 자네 가게를 밀어주지.'], reward:{fame:30, money:100}},
  ]},
],

// ---------- 엔딩 (30일차 아침, 위에서부터 첫 조건 충족) ----------
ENDINGS: [
  {id:'hero',   title:'용사의 아이스크림 집', cond:{dragonKilled:true, moralityMin:0},
    text:['평가단은 드래곤 심장 아이스크림 앞에서 말을 잃었다.','왕은 당신을 용사로 임명했다. 당신은 가게로 돌아갔다.','"맛은 그냥저냥인데."']},
  {id:'dark',   title:'어둠의 가게', cond:{moralityMax:-6},
    text:['??? 아이스크림이 제일 잘 팔린다.','손님들은 밤에만 온다. 마녀는 웃는다.','당신은 재료가 뭔지 끝내 묻지 않았다.']},
  {id:'sea',    title:'바다의 전설', cond:{seadragon:true},
    text:['수룡을 낚은 사람이 아이스크림을 판다는 소문이 대륙에 퍼졌다.','어부 만석은 당신 이름을 배에 붙였다.']},
  {id:'broke',  title:'쪽박', cond:{moneyMax:50, soldMax:60},
    text:['평가단은 텅 빈 진열장을 보고 돌아갔다.','바닐라는 남았다. 우유는 내일도 배달된다.']},
  {id:'tycoon', title:'아이스크림 재벌', cond:{fameMin:400},
    text:['줄이 마을 끝까지 섰다. 2호점, 3호점.','당신은 더 이상 동결건조기를 직접 돌리지 않는다.','가끔 그립다.']},
  {id:'farmer', title:'건실한 농장주', cond:{farmLv:4, ranchLv:4},
    text:['밭과 우리가 가게보다 커졌다.','아이스크림은 이제 부업이다. 그래도 매일 하나씩 만든다.']},
  {id:'good',   title:'그냥 좋은 아이스크림 집', cond:{},
    text:['평가단은 "이상한데 좋다"고 썼다.','단골들이 매일 온다. 맛은 그냥저냥이다.','그걸로 충분했다.']},
],

TUTORIAL_SLOTS: ['pork','bear','dragon_heart','seadragon','wool','spirit','mystery','strawberry'],
};
