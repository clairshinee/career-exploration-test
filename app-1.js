
'use strict';
const V3_KEY='career-compass-v3';
const MODEL_VERSION='3.4';
const RIASEC={R:'實作型 Realistic',I:'研究型 Investigative',A:'藝術型 Artistic',S:'社會型 Social',E:'企業型 Enterprising',C:'事務型 Conventional'};
const valueLabels={compensation:'收入回報',stability:'穩定可預期',autonomy:'自主決策',growth:'持續成長',balance:'生活平衡',achievement:'成就挑戰',belonging:'人際歸屬',creativity:'創意空間',security:'安全保障',leadership:'影響與領導',expertise:'專業深度',flexibility:'時間彈性',support:'主管支持與公平',recognition:'成果認可與發展',service:'助人與意義',resources:'資源支持',focus:'深度專注',collaboration:'合作交流',customer:'客戶互動',pace:'工作節奏',remote:'遠端混合',field:'現場外勤',variety:'多元任務',routine:'固定重複',risk:'安全風險',income_growth:'提高收入',recovery:'恢復生活節奏',career_change:'探索轉職',portfolio:'建立作品',relationship:'照顧重要關係',self_employed:'自主工作',social_impact:'社會貢獻'};
const skillLabels={communication:'清楚表達',data:'數據判讀',content:'視覺與內容創作',project:'專案推進',empathy:'傾聽與同理',learning:'快速學習',quality:'細節與品質',problem_solving:'自主解題',negotiation:'協商與整合',teaching:'教學與帶人',craft:'實作與修復',adaptability:'應變與轉換'};
const categoryNames={interest:'興趣卡',ability:'能力卡',value:'價值觀卡',environment:'工作情境卡',life:'人生需求卡',dealbreaker:'排除條件'};
const cards={
interest:[
{id:'interest-1',name:'創作與表達',description:'把想法轉化成文字、影像、設計或作品。',riasec:['A'],question:'你最近一次主動創作了什麼？'},
{id:'interest-2',name:'拆解問題',description:'追查事情背後的原因、規律與解法。',riasec:['I'],question:'什麼問題會讓你想一直查下去？'},
{id:'interest-3',name:'陪伴與助人',description:'協助他人跨過困難、理解需求或學會新事物。',riasec:['S'],question:'你最樂於協助誰解決什麼事？'},
{id:'interest-4',name:'科技與工具',description:'探索科技、系統與工具，改善做事方式。',riasec:['I','R'],question:'哪個工具讓你願意主動研究與反覆練習？'},
{id:'interest-5',name:'規劃與整理',description:'把混亂資訊整理成清楚流程、表格與步驟。',riasec:['C'],question:'你會忍不住想整理哪一類混亂？'},
{id:'interest-6',name:'交流與連結',description:'透過對話、合作或社群認識人並交換想法。',riasec:['S','E'],question:'哪種對話會讓你更有能量？'},
{id:'interest-7',name:'動手實作',description:'親手製作、操作、組裝、修復或改善具體事物。',riasec:['R'],question:'你做過什麼實際成果讓自己滿意？'},
{id:'interest-8',name:'商業與市場',description:'理解需求、說服、交易，思考產品或服務如何被接受。',riasec:['E'],question:'你對哪一種顧客需求特別有興趣？'},
{id:'interest-9',name:'研究與閱讀',description:'深入一個主題，蒐集資料並建立知識。',riasec:['I'],question:'你願意反覆閱讀或研究什麼？'},
{id:'interest-10',name:'發起新事物',description:'從零開始，把構想變成新的計畫、產品或活動。',riasec:['E','A'],question:'你最想自己發起什麼計畫？'},
{id:'interest-11',name:'帶領與協調',description:'凝聚共識、推動決策並帶大家往前。',riasec:['E','S'],question:'你享受帶領或協調的哪個環節？'},
{id:'interest-12',name:'跨領域探索',description:'在不同主題之間找連結，組合成新的可能。',riasec:['I','A'],question:'哪些領域讓你想把它們結合？'}],
ability:[
{id:'ability-1',name:'清楚表達',description:'能讓別人理解複雜資訊。',skill:'communication',question:'別人曾因你的說明理解了什麼？'},
{id:'ability-2',name:'數據判讀',description:'能用資料比較差異、找問題並支持決策。',skill:'data',question:'你曾用哪些資料支持決定？'},
{id:'ability-3',name:'視覺與內容創作',description:'能把概念做成可閱讀、可觀看或可使用的成品。',skill:'content',question:'你能展示哪一件作品？'},
{id:'ability-4',name:'專案推進',description:'能安排時程、追蹤進度並完成交付。',skill:'project',question:'你曾推進哪個卡住的任務？'},
{id:'ability-5',name:'傾聽與同理',description:'能理解需求並做出合適回應。',skill:'empathy',question:'你如何確認自己真的理解對方？'},
{id:'ability-6',name:'快速學習',description:'能在陌生任務中找到資源並快速上手。',skill:'learning',question:'你最近獨立學會了什麼？'},
{id:'ability-7',name:'細節與品質',description:'能發現遺漏、錯誤並完成檢查。',skill:'quality',question:'你曾攔下什麼錯誤或風險？'},
{id:'ability-8',name:'自主解題',description:'能在指引不完整時整理問題並提出做法。',skill:'problem_solving',question:'沒有完整指引時，你如何開始？'},
{id:'ability-9',name:'協商與整合',description:'能處理分歧，找到各方可合作的方式。',skill:'negotiation',question:'你曾如何協調不同意見？'},
{id:'ability-10',name:'教學與帶人',description:'能拆解任務，支持他人理解與學會。',skill:'teaching',question:'你曾教會別人什麼？'},
{id:'ability-11',name:'實作與修復',description:'能把材料、設備或具體流程轉為可用成果。',skill:'craft',question:'哪項實作能力可以由成品證明？'},
{id:'ability-12',name:'應變與轉換',description:'能在需求改變時重新安排並保持推進。',skill:'adaptability',question:'突然變動時你通常怎麼調整？'}],
value:[
{id:'value-1',name:'收入回報',description:'希望付出能換得足夠且合理的財務回報。',tag:'compensation',question:'足夠的收入要支持什麼？'},
{id:'value-2',name:'工作穩定',description:'重視工作的持續性與可預期性。',tag:'stability',question:'哪些承諾會讓你感到穩定？'},
{id:'value-3',name:'高度自主',description:'希望保有工作方法與安排的決定權。',tag:'autonomy',question:'哪些事情你希望自己決定？'},
{id:'value-4',name:'持續成長',description:'希望工作持續帶來新能力、回饋與挑戰。',tag:'growth',question:'一年後你想增加什麼能力？'},
{id:'value-5',name:'生活平衡',description:'希望工作之外仍保有休息、關係與興趣。',tag:'balance',question:'每週最想守住哪些私人時間？'},
{id:'value-6',name:'成就與挑戰',description:'重視完成有難度、能看見成果的任務。',tag:'achievement',question:'哪種成果會讓你覺得值得？'},
{id:'value-7',name:'人際歸屬',description:'希望和能信任、互相尊重的人一起工作。',tag:'belonging',question:'你認同怎樣的合作關係？'},
{id:'value-8',name:'創意空間',description:'希望新想法有被提出、測試與改善的空間。',tag:'creativity',question:'你最希望改變哪些既定做法？'},
{id:'value-9',name:'安全保障',description:'重視基本保障、合理風險與可承擔的底線。',tag:'security',question:'你需要什麼保障才敢做選擇？'},
{id:'value-10',name:'影響與領導',description:'希望參與決策、影響方向或帶動他人。',tag:'leadership',question:'你想影響哪些事情？'},
{id:'value-11',name:'專業深度',description:'希望累積可被信任、可長期帶走的專長。',tag:'expertise',question:'你想在哪個主題上被信任？'},
{id:'value-12',name:'時間彈性',description:'希望能依生活需求協調時間與安排。',tag:'flexibility',question:'哪一種彈性對你最有用？'},
{id:'value-13',name:'主管支持與公平',description:'重視主管提供資源、回饋並以一致標準對待成員。',tag:'support',question:'你希望主管怎麼支持與評估你？'},
{id:'value-14',name:'成果認可與發展',description:'希望成果被看見，並有合理的發展或升遷機會。',tag:'recognition',question:'你希望努力如何被看見與回饋？'}],
environment:[
{id:'environment-1',name:'制度清楚',description:'角色、流程、責任與決策界線明確。',tag:'stability'},
{id:'environment-2',name:'自主授權',description:'目標清楚，執行方法可由自己決定。',tag:'autonomy'},
{id:'environment-3',name:'主管支持',description:'主管願意給方向、資源與具體回饋。',tag:'support'},
{id:'environment-4',name:'學習回饋',description:'工作中有帶教、檢討與持續學習機會。',tag:'growth'},
{id:'environment-5',name:'團隊合作',description:'需要頻繁交換資訊與共同解題。',tag:'collaboration'},
{id:'environment-6',name:'獨立專注',description:'有較長、不受打擾的深度工作時間。',tag:'focus'},
{id:'environment-7',name:'客戶互動',description:'工作需要理解、服務或說服外部客戶。',tag:'customer'},
{id:'environment-8',name:'高節奏工作',description:'任務速度快、變化多，需要快速回應。',tag:'pace'},
{id:'environment-9',name:'固定工時',description:'上下班時間與休息界線清楚。',tag:'balance'},
{id:'environment-10',name:'彈性工時',description:'可協調開始、結束或部分工作時間。',tag:'flexibility'},
{id:'environment-11',name:'遠端／混合',description:'可以依制度在不同地點完成部分工作。',tag:'remote'},
{id:'environment-12',name:'現場／外勤',description:'工作包含現場、外出、拜訪或移動。',tag:'field'},
{id:'environment-13',name:'資源完整',description:'設備、人力、資訊與工具相對充足。',tag:'resources'},
{id:'environment-14',name:'創新容錯',description:'允許小規模試驗，能從錯誤中調整。',tag:'creativity'},
{id:'environment-15',name:'多元任務',description:'工作內容多樣，需要切換不同角色。',tag:'variety'},
{id:'environment-16',name:'規律重複',description:'流程穩定、任務規律，可熟練累積效率。',tag:'routine'},
{id:'environment-17',name:'成果導向',description:'有明確目標與成果標準，重視完成度。',tag:'achievement'},
{id:'environment-18',name:'安全低風險',description:'重視職安、風險控制與可預期的工作條件。',tag:'security'}],
life:[
{id:'life-1',name:'建立財務緩衝',description:'讓收入支撐生活與預備金。',tag:'security'},
{id:'life-2',name:'提高收入',description:'增加現階段可以運用的收入。',tag:'income_growth'},
{id:'life-3',name:'恢復生活節奏',description:'把休息與生活安排重新放回日常。',tag:'recovery'},
{id:'life-4',name:'探索轉職',description:'用小實驗釐清下一個職涯方向。',tag:'career_change'},
{id:'life-5',name:'累積專長',description:'建立可長期帶走的專業能力。',tag:'expertise'},
{id:'life-6',name:'照顧重要關係',description:'保留陪伴家人、伴侶與重要他人的時間。',tag:'relationship'},
{id:'life-7',name:'嘗試自主工作',description:'逐步探索接案、創業或自主發展。',tag:'self_employed'},
{id:'life-8',name:'建立作品',description:'完成可展示、可證明能力的具體成果。',tag:'portfolio'},
{id:'life-9',name:'穩定一段時間',description:'維持可預期的收入與生活，不急著大變動。',tag:'stability'},
{id:'life-10',name:'準備帶人',description:'開始練習管理、授權與承擔團隊責任。',tag:'leadership'},
{id:'life-11',name:'調整工作安排',description:'讓工作時間與目前生活更相容。',tag:'flexibility'},
{id:'life-12',name:'增加社會貢獻',description:'把能力用在自己認同的人或需求上。',tag:'social_impact'}],
dealbreaker:[
{id:'dealbreaker-1',name:'長期加班',description:'不希望常態性犧牲下班後與休息時間。',risk:'overtime'},
{id:'dealbreaker-2',name:'高度業績壓力',description:'不希望主要績效長期綁定高壓業績目標。',risk:'sales_pressure'},
{id:'dealbreaker-3',name:'頻繁出差',description:'不希望經常跨縣市或長時間出差。',risk:'travel'},
{id:'dealbreaker-4',name:'大量陌生開發',description:'不希望工作核心是大量冷開發或陌生拜訪。',risk:'cold_outreach'},
{id:'dealbreaker-5',name:'高度重複',description:'不希望主要工作長期只有少數固定重複任務。',risk:'repetitive'},
{id:'dealbreaker-6',name:'輪班／夜班',description:'不希望工作需要不固定輪班或夜間班。',risk:'shift'},
{id:'dealbreaker-7',name:'高度體力工作',description:'不希望長時間以體力負荷作為工作核心。',risk:'physical'},
{id:'dealbreaker-8',name:'缺乏自主',description:'不希望每個細節都需核准、沒有方法選擇權。',risk:'low_autonomy'},
{id:'dealbreaker-9',name:'制度混亂',description:'不希望責任、流程與決策方式長期不清楚。',risk:'chaos'},
{id:'dealbreaker-10',name:'長時間獨立工作',description:'不希望大多數時間缺乏交流與合作。',risk:'isolated'},
{id:'dealbreaker-11',name:'頻繁社交',description:'不希望大量會議、交際或人際互動佔據工作核心。',risk:'high_social'},
{id:'dealbreaker-12',name:'收入高度波動',description:'不希望主要收入長期依業績、案量或不固定來源變動。',risk:'income_volatility'}]
};
const allCards=Object.values(cards).flat();
const byId=Object.fromEntries(allCards.map(c=>[c.id,c]));
const limits={interest:5,ability:5,value:5,core:3,environment:4,life:3,dealbreaker:3};
const stages=['首頁','興趣探索','能力探索','能力證據','價值觀探索','核心價值排序','工作情境探索','人生需求探索','排除條件','價值取捨','深度探索','綜合分析','我的職涯決策報告'];
const stageCategory={1:'interest',2:'ability',4:'value',5:'core',6:'environment',7:'life',8:'dealbreaker'};
const icons={interest:['🎨','🔎','🤲','💡','🗂️','💬','🛠️','🛍️','📖','🚀','🧭','🪄'],ability:['💬','📊','🎨','🗓️','🤲','🌱','🔍','🧩','🤝','✨','🛠️','🍃'],value:['💰','🏡','🕊️','🌱','🌿','🏔️','🤝','🎨','🪴','🧭','📚','☁️','⚖️','🌟'],environment:['📋','🕊️','🫶','🌱','🤝','📖','💬','⚡','🌙','🕰️','☁️','🚗','🧰','💡','🪄','🔁','🎯','🦺'],life:['🪴','💰','🌿','🧭','📚','💛','🕊️','🎨','🏡','✨','☁️','🤲'],dealbreaker:['🌙','📈','✈️','📞','🔁','🕛','🏋️','🔒','🌪️','🧍','🗣️','🎢']};
function cardIcon(c){const n=Number(c.id.split('-').pop())-1;return icons[c.id.split('-')[0]]?.[n]||'✨';}
