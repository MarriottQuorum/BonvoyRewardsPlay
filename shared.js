const SETTINGS_KEY='bonvoyRewardsPlaySettingsV3';
const PRIZE_CSV='https://docs.google.com/spreadsheets/d/e/2PACX-1vSghLINBiTIV-kBxQ1W5tHwMFTdJg_8SS5ut_EcagFvcszr0FLLUmV8k5gQUR7YKA/pub?gid=966349411&single=true&output=csv';
const DEFAULT_SETTINGS={soundOn:true,popupSeconds:6,afterWinAction:'menu',luckyLoopRandomPath:false};
function getSettings(){try{return Object.assign({},DEFAULT_SETTINGS,JSON.parse(localStorage.getItem(SETTINGS_KEY)||'{}'))}catch(e){return {...DEFAULT_SETTINGS}}}
function saveSettings(next){const merged=Object.assign({},getSettings(),next||{});localStorage.setItem(SETTINGS_KEY,JSON.stringify(merged));return merged}
function fullScreenToggle(){if(!document.fullscreenElement)document.documentElement.requestFullscreen().catch(()=>{});else document.exitFullscreen().catch(()=>{})}
async function loadPrizes(){
  const fallback=[
    {label:'2,500 Points',short:'2,500 PTS',type:'points'},
    {label:'1,500 Points',short:'1,500 PTS',type:'points'},
    {label:'500 Points',short:'500 PTS',type:'points'},
    {label:'Free Appetizer',short:'APPETIZER',type:'dining'},
    {label:'Starbucks Drink',short:'DRINK',type:'drink'},
    {label:'Breakfast for 2',short:'BREAKFAST',type:'breakfast'},
    {label:'Free Parking',short:'PARKING',type:'parking'},
    {label:'MClub Access',short:'MCLUB',type:'mclub'},
    {label:'Room Upgrade',short:'UPGRADE',type:'upgrade'},
    {label:'Spin Again',short:'AGAIN',type:'bonus'},
    {label:'Surprise Gift',short:'SURPRISE',type:'gift'},
    {label:'Bonus Prize',short:'BONUS',type:'surprise'}
  ];
  try{
    const res=await fetch(PRIZE_CSV,{cache:'no-store'});
    const text=await res.text();
    const rows=parseCsv(text);
    const header=(rows.shift()||[]).map(h=>String(h).toLowerCase().trim());
    const idx=Object.fromEntries(header.map((h,i)=>[h,i]));
    const mapped=rows.map(r=>{
      const prize=r[idx.prize]||r[idx.name]||r[idx.label]||r[0]||'';
      const short=r[idx.short]||r[idx.shortlabel]||r[idx.display]||prize;
      const type=(r[idx.type]||inferType(prize)).toLowerCase();
      return prize?{label:prize,short:short||prize,type}:null;
    }).filter(Boolean);
    return mapped.length?mapped:fallback;
  }catch(e){return fallback}
}
function parseCsv(text){
  const rows=[];let row=[],cell='',q=false;
  for(let i=0;i<text.length;i++){
    const c=text[i],n=text[i+1];
    if(c==='"'){ if(q && n==='"'){cell+='"'; i++;} else q=!q; continue;}
    if(c===',' && !q){row.push(cell.trim()); cell=''; continue;}
    if((c==='\n' || c==='\r') && !q){
      if(c==='\r' && n==='\n') i++;
      row.push(cell.trim()); rows.push(row); row=[]; cell=''; continue;
    }
    cell+=c;
  }
  if(cell.length||row.length){row.push(cell.trim()); rows.push(row)}
  return rows.filter(r=>r.some(v=>String(v).trim()!==''));
}
function inferType(label){
  const s=String(label).toLowerCase();
  if(s.includes('point')) return 'points';
  if(s.includes('breakfast')) return 'breakfast';
  if(s.includes('drink')||s.includes('starbucks')||s.includes('bar')) return 'drink';
  if(s.includes('parking')) return 'parking';
  if(s.includes('upgrade')) return 'upgrade';
  if(s.includes('mclub')) return 'mclub';
  if(s.includes('gift')) return 'gift';
  if(s.includes('appetizer')||s.includes('dining')) return 'dining';
  if(s.includes('again')||s.includes('bonus')) return 'bonus';
  return 'surprise';
}
function iconForType(type){
  return {
    points:'◎', star:'★', gift:'◈', surprise:'✦', dining:'✢',
    drink:'◐', coffee:'☕', breakfast:'◒', parking:'P', mclub:'M',
    upgrade:'↑', bonus:'↻'
  }[type]||'✦';
}
function sample(arr){return arr[Math.floor(Math.random()*arr.length)]}
function createPopupOverlay(){
  const wrap=document.createElement('div');
  wrap.className='overlay';
  wrap.innerHTML=`<div class="popup"><div class="confetti"></div><div class="eyebrow">Winner</div><h2 id="popTitle">Prize</h2><p id="popText"></p><div style="margin-top:18px"><button class="btn gold" id="closePopup">Continue</button></div></div>`;
  document.body.appendChild(wrap);
  wrap.querySelector('#closePopup').onclick=()=>hidePopup(wrap);
  return wrap;
}
function showPopup(overlay,title,text,cb){
  overlay.querySelector('#popTitle').textContent=title;
  overlay.querySelector('#popText').textContent=text||'';
  overlay.classList.add('show');
  launchConfetti(overlay.querySelector('.confetti'));
  const sec=getSettings().popupSeconds||6;
  clearTimeout(overlay._timer);
  overlay._timer=setTimeout(()=>{hidePopup(overlay); if(cb) cb()},sec*1000);
}
function hidePopup(overlay){
  overlay.classList.remove('show');
  overlay.querySelector('.confetti').innerHTML='';
}
function launchConfetti(box){
  box.innerHTML='';
  for(let i=0;i<42;i++){
    const p=document.createElement('div');
    p.className='piece';
    p.style.left=(Math.random()*100)+'%';
    p.style.top='-20px';
    p.style.background=['#f1df93','#d4af37','#ffffff','#8f57ff','#2eb5ac','#1ea75e','#d78c23'][i%7];
    p.style.animationDuration=(2.2+Math.random()*2.2)+'s';
    p.style.animationDelay=(Math.random()*0.5)+'s';
    p.style.transform=`translateY(0) rotate(${Math.random()*120}deg)`;
    box.appendChild(p);
  }
}
function afterWinGo(gameHref){
  const action=getSettings().afterWinAction;
  if(action==='menu') window.location.href='index.html';
  else if(gameHref) window.location.href=gameHref;
}
function installCommonUI(){
  const panel=document.getElementById('settingsPanel');
  const sbtn=document.getElementById('settingsBtn');
  if(sbtn && panel){
    sbtn.onclick=(e)=>{e.stopPropagation(); panel.classList.toggle('show')};
    document.addEventListener('click',e=>{if(!panel.contains(e.target)&&!sbtn.contains(e.target)) panel.classList.remove('show')});
    document.getElementById('headerFs')?.addEventListener('click',fullScreenToggle);
    document.getElementById('menuFs')?.addEventListener('click',fullScreenToggle);
    document.getElementById('saveSettings')?.addEventListener('click',()=>{
      saveSettings({
        soundOn:document.getElementById('soundOn').checked,
        popupSeconds:Number(document.getElementById('popupSeconds').value)||6,
        afterWinAction:document.getElementById('afterWinAction').value,
        luckyLoopRandomPath:document.getElementById('luckyLoopRandomPath').checked
      });
      panel.classList.remove('show');
    });
    const s=getSettings();
    if(document.getElementById('soundOn')) document.getElementById('soundOn').checked=s.soundOn;
    if(document.getElementById('popupSeconds')) document.getElementById('popupSeconds').value=s.popupSeconds;
    if(document.getElementById('afterWinAction')) document.getElementById('afterWinAction').value=s.afterWinAction;
    if(document.getElementById('luckyLoopRandomPath')) document.getElementById('luckyLoopRandomPath').checked=s.luckyLoopRandomPath;
  }
}
