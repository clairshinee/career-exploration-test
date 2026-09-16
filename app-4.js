const skillRiasec={communication:['S','E'],data:['I','C'],content:['A','E'],project:['C','E'],empathy:['S'],learning:['I'],quality:['C','I'],problem_solving:['I','R'],negotiation:['E','S'],teaching:['S'],craft:['R'],adaptability:['E','R']};
function tagName(tag){return valueLabels[tag]||tag}
function topRiasecCodes(p,ratio=.55){const max=maxObj(p.riasec);return Object.entries(p.riasec).filter(([,v])=>v>=max*ratio).sort((a,b)=>b[1]-a[1]).map(([k])=>k)}
function evidenceNames(levels){return selected('ability').filter(c=>levels.includes(state.skillEvidence[c.id]||0)).map(c=>c.name)}
function boundaryBuckets(){const out={keep:[],trade:[],unclear:[],avoid:[]};for(const q of state.followups){const a=state.depth[q.id]||{};if(!a.stance)continue;if(q.stanceMode==='avoid'){if(a.stance==='core')out.avoid.push(q.text);else if(a.stance==='trade')out.trade.push(q.text);else if(a.stance==='unclear')out.unclear.push(q.text)}else if(q.stanceMode==='condition'){if(a.stance==='core')out.keep.push(q.text);else if(a.stance==='trade')out.trade.push(q.text);else if(a.stance==='unclear')out.unclear.push(q.text)}}return out}
function insightEngine(){
 const e=fitEngine(),p=e.profile,topR=topRiasecCodes(p),topRNames=topR.slice(0,2).map(r=>RIASEC[r].split(' ')[0]),coreCards=selected('core'),envCards=selected('environment'),lifeCards=selected('life'),dealCards=selected('dealbreaker');
 const strong=evidenceNames([3]),develop=evidenceNames([2]),unverified=evidenceNames([1]);
 const signalMap={};
 const add=(tag,src)=>{if(!tag)return;(signalMap[tag]||(signalMap[tag]=new Set())).add(src)};
 coreCards.forEach(c=>add(c.tag,'核心價值'));envCards.forEach(c=>add(c.tag,'工作情境'));lifeCards.forEach(c=>add(c.tag,'人生需求'));Object.entries(p.trade).forEach(([t,v])=>{if(v>=.55)add(t,'取捨題')});
 if(dealCards.some(c=>c.risk==='low_autonomy'))add('autonomy','排除條件');if(dealCards.some(c=>c.risk==='overtime'))add('balance','排除條件');if(dealCards.some(c=>c.risk==='chaos'))add('stability','排除條件');if(dealCards.some(c=>c.risk==='income_volatility'))add('security','排除條件');
 const stableSignals=Object.entries(signalMap).filter(([,s])=>s.size>=2).sort((a,b)=>b[1].size-a[1].size).slice(0,5).map(([tag,s])=>({tag,title:tagName(tag),sources:[...s],text:'「'+tagName(tag)+'」不只出現在單一選卡，而是跨 '+s.size+' 個面向重複出現，因此可視為目前較值得優先查核的職涯條件。'}));
 const tensions=[];const hasCore=t=>coreCards.some(c=>c.tag===t);const hasEnv=t=>envCards.some(c=>c.tag===t);const hasLife=t=>lifeCards.some(c=>c.tag===t);const hasDeal=r=>dealCards.some(c=>c.risk===r);
 if((hasCore('growth')||hasEnv('growth')||hasLife('career_change'))&&(hasCore('balance')||hasLife('recovery')||hasDeal('overtime')))tensions.push({title:'成長 × 生活界線',text:'你同時保留成長／轉換需求，也對生活節奏或長期加班設下界線。綜合目前回答，更接近「可持續成長」：可以接受學習與挑戰，但不希望高壓變成常態。'});
 if((hasCore('autonomy')||hasEnv('autonomy'))&&(hasEnv('stability')||hasCore('stability')||hasDeal('chaos')))tensions.push({title:'自主 × 清楚框架',text:'你同時重視自主與清楚制度。這不等於想要完全自由；綜合目前回答，更接近「有框架的自主」：目標、責任與資源清楚，但執行方法保有選擇權。'});
 if(hasCore('compensation')&&(hasCore('balance')||hasDeal('overtime')||hasLife('recovery')))tensions.push({title:'收入 × 可持續投入',text:'收入對你重要，但你同時保留生活或工時界線。綜合目前回答，更接近追求「合理且可持續的報酬」，而不是單純把收入最大化。'});
 if((hasCore('flexibility')||hasEnv('flexibility')||hasEnv('remote'))&&(hasCore('belonging')||hasEnv('collaboration')))tensions.push({title:'彈性 × 連結感',text:'你希望安排有彈性，也保留交流與合作。適合查核的不是「有沒有遠端」而已，而是遠端情境下是否仍有足夠同步、回饋與團隊連結。'});
 if((hasCore('expertise')||hasLife('expertise'))&&hasEnv('variety'))tensions.push({title:'專業深度 × 多元任務',text:'你一方面想累積可帶走的專長，一方面又偏好多元任務。較值得探索的是「固定主專長＋跨領域專案」，而不是完全單一或完全無主軸的工作。'});
 const topCodes=new Set(topRiasecCodes(p,.5));const matrix={priority:[],experiment:[],transfer:[],low:[]};
 selected('ability').forEach(c=>{const interested=(skillRiasec[c.skill]||[]).some(r=>topCodes.has(r)),lvl=state.skillEvidence[c.id]||1;if(interested&&lvl===3)matrix.priority.push(c);else if(interested)matrix.experiment.push(c);else if(lvl>=2)matrix.transfer.push(c);else matrix.low.push(c)});
 const envNames=envCards.map(c=>c.name),dealNames=dealCards.map(c=>c.name);
 const thrive='你比較容易在「'+(envNames.slice(0,3).join('、')||'尚待確認的工作情境')+'」中發揮。這些條件如果同時能支持「'+(coreCards.slice(0,2).map(c=>c.name).join('、')||'核心需求')+'」，工作內容本身的興趣與能力才較容易穩定轉成長期適配。';
 const drain=dealNames.length?'你目前已明確標出「'+dealNames.join('、')+'」為優先排除條件。即使職務內容有趣或薪資不錯，只要這些情境長期存在，就應視為實際職缺查核的高優先風險。':'你這次沒有設定明確 Deal Breaker；因此「消耗環境」證據較少。看職缺時仍應特別觀察責任邊界、工時、主管方式與實際工作節奏。';
 const topDir=e.priority[0]||e.extended[0]||e.all[0];
 let issue='你現在最值得處理的課題，是把「喜歡、做得到、工作條件」三件事放在一起驗證，而不是急著先定下一個職稱。';
 if(tensions.length)issue='你現在的核心課題不是單純「選哪個職稱」，而是如何處理「'+tensions[0].title+'」這組條件。下一份工作若只滿足其中一邊，短期可能吸引你，但長期適配仍需要實際查核。';
 else if(unverified.length>=2)issue='你已經看見一些想發展的能力，但其中有多項仍停留在「尚待驗證」。目前最重要的不是再蒐集更多職稱，而是用小型作品或真實任務確認這些能力是否真的能穩定發揮。';
 const hypotheses=[];
 if(topDir)hypotheses.push('如果你實際做過「'+topDir.name+'」的核心任務，投入感是否仍然存在，而不是只喜歡這個職稱的想像？');
 if(unverified[0])hypotheses.push('「'+unverified[0]+'」目前是你自評的能力，但證據仍少；用一個 30 天內可完成的小成果，確認它是否能成為穩定優勢。');
 else if(develop[0])hypotheses.push('「'+develop[0]+'」已有相關經驗；下一步要驗證的是能否整理成作品、成果或他人可辨識的證據。');
 if(tensions[0])hypotheses.push('面對「'+tensions[0].title+'」，你的最低可接受條件究竟是什麼？請用具體工時、授權方式、回饋頻率或期限來驗證。');
 else if(dealCards[0])hypotheses.push('「'+dealCards[0].name+'」是現在的排除條件；它是完全不能接受，還是只在特定頻率／期限下不能接受？');
 else hypotheses.push('你目前沒有明確排除條件；實際比較 3 則職缺後，是否會浮現新的「不想接受」條件？');
 const profileSummary='你的職涯興趣目前較集中在「'+(topRNames.join('、')||'多元方向')+'」，已選能力中'+(strong.length?'「'+strong.slice(0,2).join('、')+'」已有較具體經驗支持':'仍需要更多成果證據')+'。你最優先的工作價值是「'+(coreCards.slice(0,3).map(c=>c.name).join('、')||'尚待確認')+'」，同時偏好「'+(envNames.slice(0,2).join('、')||'尚待確認')+'」的工作情境。'+(dealNames.length?'你也已替「'+dealNames.slice(0,2).join('、')+'」設下排除界線。':'這次尚未設定明確排除條件。')+'整體來看，較適合你的不是只看職稱，而是找能同時讓興趣、已有能力與核心條件交集的工作版本。';
 const boundaries=boundaryBuckets();
 return{profileSummary,stableSignals,tensions,matrix,thrive,drain,careerIssue:issue,hypotheses:hypotheses.slice(0,3),boundaries};
}
