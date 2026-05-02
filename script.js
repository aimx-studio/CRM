// ── CONSTANTS ──
const MONTHS=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const COP=n=>'$'+parseInt(n||0).toLocaleString('es-CO');
const nid=()=>Date.now()+Math.floor(Math.random()*9999);
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem('am4_'+k))||d}catch{return d}};
const sv=(k,v)=>localStorage.setItem('am4_'+k,JSON.stringify(v));
const parseLocalDate=s=>{if(!s)return new Date(NaN);const[y,m,d]=s.split('-').map(Number);return new Date(y,m-1,d);};

// ── PASSWORD ──
const DEFAULT_PASS='24031066';
let currentPass=ld('pass',DEFAULT_PASS);

function checkPass(){
  const v=document.getElementById('lockPass').value;
  const err=document.getElementById('lockErr');
  if(v===currentPass){
    document.getElementById('lockScreen').style.display='none';
    sessionStorage.setItem('crm_auth','1');
    err.textContent='';
  } else {
    err.textContent='⚠️ Contraseña incorrecta';
    document.getElementById('lockPass').value='';
    document.getElementById('lockPass').focus();
    setTimeout(()=>err.textContent='',2500);
  }
}
if(sessionStorage.getItem('crm_auth')==='1'){
  document.getElementById('lockScreen').style.display='none';
}
document.getElementById('lockPass').addEventListener('keydown',e=>{if(e.key==='Enter')checkPass();});

// ── DATA ──
let cfg=ld('cfg',{agencia:'AIMAX STUDIO',moneda:'COP',planes:{basico:{label:'Plan Básico',mensual:50000,setup:222000},medio:{label:'Plan Medio',mensual:100000,setup:277000},max:{label:'Plan MAX',mensual:150000,setup:333000},especial:{label:'Especial',mensual:0,setup:0}}});
let clientes=ld('clientes',[
  {id:1,nombre:'Kosiaka',ciudad:'Medellín',telefono:'3015513793',admin:'Jorge Flores',whatsapp:'3017482600',plan:'basico',setup:250000,mensual:50000,estado:'activo',ultimoPago:'2026-04-01',proximoPago:'2026-05-01',pagomesactual:true,menuLink:'https://aimx-studio.github.io/Menu-Kosiaka/',dashboardUrl:'',sb_url:'',sb_key:'',sb_table:'pedidos',sb_user:'',sb_pass:'',cuotas:[{id:1,dia:1,monto:50000,estado:'pendiente'}],notas:'Primer cliente',archivos:[],fechaInicio:'2026-01-15',logNotas:[]},
  {id:2,nombre:'La Torre',ciudad:'Ocaña',telefono:'3222489307',admin:'Miller',whatsapp:'3182231625',plan:'basico',setup:200000,mensual:50000,estado:'activo',ultimoPago:'2026-03-23',proximoPago:'2026-05-01',pagomesactual:true,menuLink:'https://aimx-studio.github.io/Menu-LaTorre/',dashboardUrl:'',sb_url:'',sb_key:'',sb_table:'pedidos',sb_user:'',sb_pass:'',cuotas:[{id:1,dia:1,monto:50000,estado:'pendiente'}],notas:'Todo en orden',archivos:[],fechaInicio:'2026-01-20',logNotas:[]},
  {id:3,nombre:'Navarra',ciudad:'Pamplona',telefono:'3223101369',admin:'Heidy Triana',whatsapp:'3223101369',plan:'especial',setup:100000,mensual:0,estado:'activo',ultimoPago:'2026-03-29',proximoPago:'',pagomesactual:false,menuLink:'https://aimx-studio.github.io/Men-Navarra/',dashboardUrl:'',sb_url:'',sb_key:'',sb_table:'pedidos',sb_user:'',sb_pass:'',cuotas:[],notas:'Me dijo que tiene poco flujo',archivos:[],fechaInicio:'2026-02-01',logNotas:[]},
  {id:4,nombre:'El Bembe Gastro Bar',ciudad:'Funza',telefono:'3248009246',admin:'Valerie Tamayo',whatsapp:'3014825194',plan:'medio',setup:0,mensual:100000,estado:'prueba',ultimoPago:'',proximoPago:'',pagomesactual:false,menuLink:'https://aimx-studio.github.io/Menu-El-Bembe/',dashboardUrl:'',sb_url:'',sb_key:'',sb_table:'pedidos',sb_user:'',sb_pass:'',cuotas:[{id:1,dia:1,monto:50000,estado:'pendiente'},{id:2,dia:15,monto:50000,estado:'pendiente'}],notas:'En período de prueba',archivos:[],fechaInicio:'2026-04-01',logNotas:[]}
]);
let pagos=ld('pagos',[
  {id:1,clienteId:1,tipo:'instalacion',monto:250000,fecha:'2026-01-15',estado:'pagado',notas:'Set up Kosiaka'},
  {id:2,clienteId:2,tipo:'instalacion',monto:200000,fecha:'2026-01-20',estado:'pagado',notas:'Set up La Torre'},
  {id:3,clienteId:3,tipo:'instalacion',monto:100000,fecha:'2026-02-01',estado:'pagado',notas:'Set up Navarra'},
  {id:4,clienteId:1,tipo:'mensualidad',monto:50000,fecha:'2026-02-01',estado:'pagado',notas:''},
  {id:5,clienteId:2,tipo:'mensualidad',monto:50000,fecha:'2026-02-23',estado:'pagado',notas:''},
  {id:6,clienteId:1,tipo:'mensualidad',monto:50000,fecha:'2026-03-01',estado:'pagado',notas:''},
  {id:7,clienteId:2,tipo:'mensualidad',monto:50000,fecha:'2026-03-23',estado:'pagado',notas:''},
  {id:8,clienteId:1,tipo:'mensualidad',monto:50000,fecha:'2026-04-01',estado:'pagado',notas:''},
  {id:9,clienteId:2,tipo:'mensualidad',monto:50000,fecha:'2026-04-01',estado:'pagado',notas:''}
]);
let pipeline=ld('pipeline',[
  {id:1,nombre:'Restaurante El Rancho',ciudad:'Montería',contacto:'3001234567',etapa:'contactado',notas:'Le gustó el demo',fecha:'2026-04-10',interes:'alto'},
  {id:2,nombre:'Pizzería La Bella',ciudad:'Barranquilla',contacto:'3109876543',etapa:'propuesta',notas:'Enviada cotización Plan Medio',fecha:'2026-04-15',interes:'medio'},
  {id:3,nombre:'Asados Don Pedro',ciudad:'Medellín',contacto:'3207654321',etapa:'demo',notas:'Demo agendado para la semana',fecha:'2026-04-18',interes:'alto'}
]);
let tareas=ld('tareas',[
  {id:1,texto:'Revisar actualización de menú Kosiaka',clienteId:1,prioridad:'alta',hecha:false},
  {id:2,texto:'Seguimiento El Bembe Gastro Bar',clienteId:4,prioridad:'normal',hecha:false},
  {id:3,texto:'Enviar propuesta a restaurantes Montería',clienteId:null,prioridad:'normal',hecha:false}
]);
let archivos=ld('archivos',[
  {id:1,clienteId:1,nombre:'Repositorio GitHub Kosiaka',url:'https://github.com/aimx-studio/Menu-Kosiaka',tipo:'github'},
  {id:2,clienteId:2,nombre:'Repositorio GitHub La Torre',url:'https://github.com/aimx-studio/Menu-LaTorre',tipo:'github'}
]);
let metas=ld('metas',{ingresos:500000,clientes:8,leads:20,cierres:3});
let notas=ld('notas',[]);

// State
let clFil='todos',tkFil='todas',arFil='todos',pagoFil='todos',editClId=null,editPipeId=null;
let chartOffDash=0,chartOffAn=0;

const P=()=>cfg.planes;
const planLabel=p=>P()[p]?.label||p;
const planMensual=p=>P()[p]?.mensual||0;

// ── CLOCK ──
function tick(){document.getElementById('tbtime').textContent=new Date().toLocaleTimeString('es-CO',{hour:'2-digit',minute:'2-digit'});}
tick();setInterval(tick,30000);
document.getElementById('yr').textContent='© '+new Date().getFullYear();

// ── NAV ──
const titles={dashboard:'Dashboard',clientes:'Clientes',pagos:'Pagos',pipeline:'Pipeline',metas:'Metas',analytics:'Analytics',tareas:'Tareas',notas:'Notas',archivos:'Archivos',config:'Configuración'};
function go(page,el){
  document.querySelectorAll('.ni').forEach(n=>n.classList.remove('on'));
  (el||document.querySelector(`[data-p="${page}"]`))?.classList.add('on');
  document.querySelectorAll('.pg').forEach(p=>p.classList.remove('on'));
  document.getElementById('pg-'+page).classList.add('on');
  document.getElementById('ptitle').textContent=titles[page];
  render(page);
  if(window.innerWidth<=768)closeSB();
}
function render(p){
  if(p==='dashboard')rDash();
  if(p==='clientes')rCl();
  if(p==='pagos')rPagos();
  if(p==='pipeline')rPipe();
  if(p==='metas')rMetas();
  if(p==='analytics')rAnalytics();
  if(p==='tareas')rTareas();
  if(p==='notas')rNotas();
  if(p==='archivos'){rArchivos();rAimaxLinks();}
  if(p==='config')rConfig();
}
function toggleSB(){document.getElementById('sb').classList.toggle('open');document.getElementById('ov').classList.toggle('open');}
function closeSB(){document.getElementById('sb').classList.remove('open');document.getElementById('ov').classList.remove('open');}

// ── CHART NAV ──
function chartNav(which,dir){
  if(which==='dash'){chartOffDash+=dir;rDash();}
  else{chartOffAn+=dir;rAnalytics();}
}

// ── CHART BARS helper ──
function buildBars(months,offset,colorStyle){
  const now=new Date();
  const bars=[];
  for(let i=months-1;i>=0;i--){
    const d=new Date(now.getFullYear(),now.getMonth()-i+offset,1);
    const tot=pagos.filter(p=>{const pd=parseLocalDate(p.fecha);return pd.getMonth()===d.getMonth()&&pd.getFullYear()===d.getFullYear()&&p.estado==='pagado';}).reduce((s,p)=>s+p.monto,0);
    bars.push({l:MONTHS[d.getMonth()]+' '+String(d.getFullYear()).slice(2),v:tot,m:d.getMonth(),y:d.getFullYear()});
  }
  const mx=Math.max(...bars.map(b=>b.v),1);
  const endBar=bars[bars.length-1];
  const lbl=`${MONTHS[endBar.m]} ${endBar.y}`;
  return {html:bars.map(b=>`<div class="cbg"><div class="cbv">${b.v>0?COP(b.v):''}</div><div class="cbb" style="height:${Math.round(b.v/mx*100)}%;${colorStyle}"></div><div class="cbl">${b.l}</div></div>`).join(''),lbl};
}

// ── DASHBOARD ──
function rDash(){
  const act=clientes.filter(c=>c.estado==='activo');
  const mrr=act.reduce((s,c)=>s+planMensual(c.plan),0);
  const now=new Date();
  const mesPag=pagos.filter(p=>{const d=parseLocalDate(p.fecha);return p.estado==='pagado'&&d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();}).reduce((s,p)=>s+p.monto,0);
  const totRec=pagos.filter(p=>p.estado==='pagado').reduce((s,p)=>s+p.monto,0);
  document.getElementById('d-kpis').innerHTML=[
    {l:'MRR Activo',v:COP(mrr),s:'mensual',cls:''},
    {l:'Este mes',v:COP(mesPag),s:'ingresado',cls:'green'},
    {l:'Total histórico',v:COP(totRec),s:'recaudado',cls:''},
    {l:'Clientes activos',v:act.length,s:`de ${clientes.length}`,cls:'blue'}
  ].map(k=>`<div class="kpi ${k.cls}"><div class="kpi-l">${k.l}</div><div class="kpi-v">${k.v}</div><div class="kpi-s">${k.s}</div></div>`).join('');

  const months=parseInt(document.getElementById('d-months')?.value||6);
  const {html,lbl}=buildBars(months,chartOffDash,'');
  document.getElementById('d-bar').innerHTML=html;
  document.getElementById('d-lbl').textContent=lbl;

  drawDonut('d-donut','d-dleg',[
    {l:'Activos',v:clientes.filter(c=>c.estado==='activo').length,c:'#C9A227'},
    {l:'Prueba',v:clientes.filter(c=>c.estado==='prueba').length,c:'#3B82F6'},
    {l:'Inactivos',v:clientes.filter(c=>c.estado==='inactivo').length,c:'#2a2a2a'}
  ]);

  // Cobros alert banner — próximos 5 días
  const hoy=new Date();hoy.setHours(0,0,0,0);
  const en5=new Date(hoy);en5.setDate(en5.getDate()+5);
  // Generar alertas por cuotas individuales
  const alertasCuotas=[];
  clientes.forEach(c=>{
    if(planMensual(c.plan)<=0)return;
    if(c.cuotas&&c.cuotas.length>0){
      // Cuotas definidas: generar alerta por cada cuota
      c.cuotas.forEach(cuota=>{
        const diaHoy=hoy.getDate();
        const mesHoy=hoy.getMonth();
        const anioHoy=hoy.getFullYear();
        // Calcular próxima fecha de esta cuota
        let fechaCuota=new Date(anioHoy,mesHoy,cuota.dia);fechaCuota.setHours(0,0,0,0);
        if(fechaCuota<hoy){fechaCuota=new Date(anioHoy,mesHoy+1,cuota.dia);fechaCuota.setHours(0,0,0,0);}
        if(fechaCuota>=hoy&&fechaCuota<=en5){
          alertasCuotas.push({nombre:c.nombre,dia:cuota.dia,monto:cuota.monto,fecha:fechaCuota,clienteId:c.id});
        }
      });
    } else if(c.proximoPago){
      // Sin cuotas definidas: usar proximoPago normal
      const fp=new Date(c.proximoPago);fp.setHours(0,0,0,0);
      if(fp>=hoy&&fp<=en5){
        alertasCuotas.push({nombre:c.nombre,dia:fp.getDate(),monto:planMensual(c.plan),fecha:fp,clienteId:c.id});
      }
    }
  });
  alertasCuotas.sort((a,b)=>a.fecha-b.fecha);
  const alertEl=document.getElementById('d-cobro-alert');
  if(alertasCuotas.length){
    const diasLabel=d=>{const diff=Math.round((d-hoy)/(1000*60*60*24));return diff===0?'HOY':diff===1?'MAÑANA':`en ${diff} días`;};
    alertEl.innerHTML=`<div class="cobro-alert">
      <div class="cobro-alert-ico">⚡</div>
      <div class="cobro-alert-body">
        <div class="cobro-alert-title">Cobros en los próximos 5 días</div>
        <div class="cobro-alert-items">
          ${alertasCuotas.map(a=>`<div class="cobro-alert-item"><b>${a.nombre}</b><span style="color:var(--ye);font-weight:700">${diasLabel(a.fecha)} · día ${a.dia} · ${COP(a.monto)}</span></div>`).join('')}
        </div>
      </div>
    </div>`;
  } else {
    alertEl.innerHTML='';
  }

  // Cobros como cards — con desglose de cuotas
  document.getElementById('d-cobros').innerHTML=clientes.map(c=>{
    const m=planMensual(c.plan);
    const waNum=(c.whatsapp||c.telefono||'').replace(/\D/g,'');
    const waMsg=encodeURIComponent(`Hola ${c.admin||c.nombre} 👋, te escribo de *AIMAX STUDIO*.\n\nTu mensualidad de *${COP(m)}* está próxima (${c.proximoPago||'este mes'}). Por favor avísame cuando puedas hacer el pago. ¡Gracias! 🙏`);
    const waLink=waNum?`<a href="https://wa.me/57${waNum}?text=${waMsg}" target="_blank" class="btn btn-ghost btn-sm" title="Enviar recordatorio por WhatsApp" style="color:#25D366;border-color:rgba(37,211,102,.3)">💬 WhatsApp</a>`:'';
    const cuotasHtml=c.cuotas&&c.cuotas.length>1?`<div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:5px">${c.cuotas.map(q=>`<span style="font-size:10px;background:var(--b5);border:1px solid var(--bd2);border-radius:5px;padding:2px 7px;color:var(--t2)">Día ${q.dia}: ${COP(q.monto)}</span>`).join('')}</div>`:'';
    return `<div class="pago-card" style="margin-bottom:9px">
      <div class="pago-row">
        <div class="pago-info">
          <div class="pago-main" style="display:flex;align-items:center;gap:7px">
            <div class="pay-dot ${c.pagomesactual?'paid':'unpaid'}"></div>
            ${c.nombre}
          </div>
          <div class="pago-sub">📍 ${c.ciudad} · <span class="bdg bgo" style="font-size:10px">${planLabel(c.plan)}</span></div>
          ${cuotasHtml}
        </div>
        <div class="pago-amount">${m>0?COP(m):'N/A'}</div>
      </div>
      <div class="pago-footer">
        <span style="font-size:11px;color:var(--t3)">Próx: ${c.proximoPago||'—'}</span>
        <div style="display:flex;align-items:center;gap:6px">
          ${c.pagomesactual?'<span class="bdg bg">✅ Pagado</span>':'<span class="bdg by">⏳ Pendiente</span>'}
          ${!c.pagomesactual&&m>0?waLink:''}
        </div>
      </div>
    </div>`;
  }).join('');

  // Pipeline mini
  const openLeads=pipeline.filter(p=>p.etapa!=='cerrado').slice(0,4);
  document.getElementById('d-pipe-mini').innerHTML=openLeads.length?openLeads.map(p=>`<div class="pipe-card" onclick="go('pipeline',null)">
    <div class="pc-name">${p.nombre}</div>
    <div class="pc-city">📍 ${p.ciudad||'—'}</div>
    <div class="pc-bottom"><span class="bdg ${p.etapa==='contactado'?'by':p.etapa==='demo'?'bb':p.etapa==='propuesta'?'bpu':'bg'}">${p.etapa}</span><div class="int-dot int-${p.interes}"></div></div>
  </div>`).join(''):`<div class="empty"><div class="ei">📣</div><div class="et">Sin leads activos</div></div>`;
  updateBadges();
}

// ── CLIENTES ──
function rCl(s=''){
  let list=[...clientes];
  if(['activo','prueba','inactivo'].includes(clFil))list=list.filter(c=>c.estado===clFil);
  else if(['basico','medio','max','especial'].includes(clFil))list=list.filter(c=>c.plan===clFil);
  if(s)list=list.filter(c=>[c.nombre,c.ciudad,c.admin||''].some(x=>x.toLowerCase().includes(s.toLowerCase())));
  document.getElementById('cl-list').innerHTML=list.length?list.map(c=>{
    const diasCliente=c.fechaInicio?Math.floor((new Date()-new Date(c.fechaInicio))/(1000*60*60*24)):null;
    return `
    <div class="cl-card">
      <div class="cl-card-top">
        <div class="cl-card-name" style="display:flex;align-items:center;gap:7px">
          <div class="pay-dot ${c.pagomesactual?'paid':'unpaid'}" title="${c.pagomesactual?'Pago al día':'Pendiente de pago'}"></div>
          ${c.nombre}
        </div>
        <span class="bdg ${c.estado==='activo'?'bg':c.estado==='prueba'?'bb':'br'}">${c.estado}</span>
      </div>
      <div class="cl-card-meta">
        <span>📍 ${c.ciudad}</span>
        <span>👤 ${c.admin||'—'}</span>
        <span class="bdg bgo" style="font-size:10px">${planLabel(c.plan)}</span>
        <span style="color:var(--gr);font-weight:700">${planMensual(c.plan)>0?COP(planMensual(c.plan)):'N/A'}</span>
        ${diasCliente!==null?`<span class="days-badge">📅 <b>${diasCliente}</b> días contigo</span>`:''}
      </div>
      <div class="cl-card-actions">
        <button class="btn btn-ghost btn-sm" onclick="verCl(${c.id})">Ver detalle</button>
        ${c.menuLink?`<a class="btn btn-ghost btn-sm" href="${c.menuLink}" target="_blank">🔗 Menú</a>`:''}
        ${c.dashboardUrl?`<a class="btn btn-blue btn-sm" href="${c.dashboardUrl}" target="_blank">📊 Dashboard</a>`:''}
        ${c.repo?`<button class="btn btn-sm ${c.menuActivo===false?'btn-g':'btn-danger'}" onclick="toggleMenu(${c.id})">${c.menuActivo===false?'✅ Activar menú':'⛔ Desactivar menú'}</button><span style="font-size:10px;color:${c.menuActivo===false?'var(--re)':'var(--gr)'}"> ${c.menuActivo===false?'● Suspendido':'● Activo'}</span>`:''}
        <button class="btn btn-danger btn-sm" onclick="delCl(${c.id})">🗑</button>
      </div>
    </div>`;
  }).join(''):`<div class="empty"><div class="ei">🍽️</div><div class="et">Sin clientes aquí</div></div>`;
}
function filtCl(v){rCl(v);}
function setClF(f,el){clFil=f;document.querySelectorAll('#pg-clientes .chip').forEach(c=>c.classList.remove('on'));el.classList.add('on');rCl();}

function verCl(id){
  const c=clientes.find(x=>x.id===id);if(!c)return;
  const hist=pagos.filter(p=>p.clienteId===id);
  const tot=hist.filter(p=>p.estado==='pagado').reduce((s,p)=>s+p.monto,0);
  const diasCliente=c.fechaInicio?Math.floor((new Date()-new Date(c.fechaInicio))/(1000*60*60*24)):null;
  document.getElementById('mVer-title').textContent=c.nombre;
  document.getElementById('mVer-body').innerHTML=`
    <div class="cdg">
      <div><div class="cl">Ciudad</div><div class="cv">${c.ciudad}</div></div>
      <div><div class="cl">Admin</div><div class="cv">${c.admin||'—'}</div></div>
      <div><div class="cl">WhatsApp</div><div class="cv">${c.whatsapp||'—'}</div></div>
      <div><div class="cl">Teléfono</div><div class="cv">${c.telefono||'—'}</div></div>
      <div><div class="cl">Plan</div><div class="cv"><span class="bdg bgo">${planLabel(c.plan)}</span></div></div>
      <div><div class="cl">Mensualidad</div><div class="cv" style="color:var(--gr);font-weight:700">${planMensual(c.plan)>0?COP(planMensual(c.plan)):'N/A'}</div></div>
      <div><div class="cl">Set up</div><div class="cv">${c.setup>0?COP(c.setup):'—'}</div></div>
      <div><div class="cl">Total recaudado</div><div class="cv" style="color:var(--g);font-weight:700">${COP(tot+c.setup)}</div></div>
      <div><div class="cl">Último pago</div><div class="cv">${c.ultimoPago||'—'}</div></div>
      <div><div class="cl">Estado</div><div class="cv"><span class="bdg ${c.estado==='activo'?'bg':c.estado==='prueba'?'bb':'br'}">${c.estado}</span></div></div>
      ${diasCliente!==null?`<div><div class="cl">Cliente desde</div><div class="cv" style="color:var(--g);font-weight:700">${diasCliente} días</div></div>`:''}
      <div><div class="cl">Pago este mes</div><div class="cv"><div class="pay-dot ${c.pagomesactual?'paid':'unpaid'}" style="display:inline-block;margin-right:5px"></div>${c.pagomesactual?'Al día':'Pendiente'}</div></div>
    </div>
    ${c.menuLink?`<div style="margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;background:var(--b4);border-radius:8px;padding:8px 12px"><a class="alink" href="${c.menuLink}" target="_blank">🔗 Link menú WhatsApp</a><button class="btn btn-ghost btn-xs" onclick="navigator.clipboard.writeText('${c.menuLink}').then(()=>toast('📋 Link copiado'))">📋</button></div>`:''}
    ${c.dashboardUrl?`<div style="margin-bottom:10px;display:flex;align-items:center;justify-content:space-between;background:var(--b4);border-radius:8px;padding:8px 12px"><a class="alink" href="${c.dashboardUrl}" target="_blank" style="color:var(--bl)">📊 Dashboard Netlify</a><button class="btn btn-ghost btn-xs" onclick="navigator.clipboard.writeText('${c.dashboardUrl}').then(()=>toast('📋 URL copiada'))">📋</button></div>`:''}
    ${(c.sb_url||c.sb_key||c.sb_user)?`
    <div style="background:var(--b4);border:1px solid rgba(201,162,39,.15);border-radius:var(--r2);padding:12px;margin-bottom:12px">
      <div style="font-size:10px;color:var(--g);font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:10px">🔐 Credenciales Dashboard</div>
      ${c.sb_url?`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px"><div><div style="font-size:9px;color:var(--t3);text-transform:uppercase;letter-spacing:1px">URL Supabase</div><div style="font-size:12px;color:var(--t2);word-break:break-all">${c.sb_url}</div></div><button class="btn btn-ghost btn-xs" onclick="navigator.clipboard.writeText('${c.sb_url}').then(()=>toast('📋 Copiado'))">📋</button></div>`:''}
      ${c.sb_key?`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px"><div><div style="font-size:9px;color:var(--t3);text-transform:uppercase;letter-spacing:1px">API Key</div><div style="font-size:12px;color:var(--t2);font-family:'JetBrains Mono';word-break:break-all">${c.sb_key.substring(0,30)}…</div></div><button class="btn btn-ghost btn-xs" onclick="navigator.clipboard.writeText('${c.sb_key}').then(()=>toast('📋 Copiado'))">📋</button></div>`:''}
      ${c.sb_table?`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px"><div><div style="font-size:9px;color:var(--t3);text-transform:uppercase;letter-spacing:1px">Tabla</div><div style="font-size:12px;color:var(--t2)">${c.sb_table}</div></div><button class="btn btn-ghost btn-xs" onclick="navigator.clipboard.writeText('${c.sb_table}').then(()=>toast('📋 Copiado'))">📋</button></div>`:''}
      ${c.sb_user?`<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px"><div><div style="font-size:9px;color:var(--t3);text-transform:uppercase;letter-spacing:1px">Usuario</div><div style="font-size:12px;color:var(--t2)">${c.sb_user}</div></div><button class="btn btn-ghost btn-xs" onclick="navigator.clipboard.writeText('${c.sb_user}').then(()=>toast('📋 Copiado'))">📋</button></div>`:''}
      ${c.sb_pass?`<div style="display:flex;align-items:center;justify-content:space-between"><div><div style="font-size:9px;color:var(--t3);text-transform:uppercase;letter-spacing:1px">Contraseña</div><div style="font-size:12px;color:var(--t2);font-family:'JetBrains Mono'">${c.sb_pass}</div></div><button class="btn btn-ghost btn-xs" onclick="navigator.clipboard.writeText('${c.sb_pass}').then(()=>toast('📋 Copiado'))">📋</button></div>`:''}
    </div>`:''}
    ${c.cuotas&&c.cuotas.length>1?`
    <div style="background:var(--b4);border:1px solid rgba(59,130,246,.15);border-radius:var(--r2);padding:12px;margin-bottom:12px">
      <div style="font-size:10px;color:var(--bl);font-weight:700;text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px">💳 Esquema de cuotas</div>
      ${c.cuotas.map(q=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;border-bottom:1px solid var(--bd)"><span style="font-size:13px;color:var(--t2)">Cuota día <b>${q.dia}</b></span><span style="color:var(--gr);font-weight:700;font-size:13px">${COP(q.monto)}</span></div>`).join('')}
    </div>`:''}
    ${c.notas?`<div class="nbox" style="margin-bottom:12px">${c.notas}</div>`:''}
    <div style="font-size:10px;color:var(--t3);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">Historial de pagos</div>
    <div style="max-height:150px;overflow-y:auto">
      ${hist.length?hist.sort((a,b)=>parseLocalDate(b.fecha)-parseLocalDate(a.fecha)).map(p=>`<div class="hi"><div><div style="font-size:13px;font-weight:600">${p.tipo==='mensualidad'?'Mensualidad':p.tipo==='instalacion'?'Instalación':'Otro'}</div><div class="hi-d">${p.fecha}</div></div><div style="text-align:right"><div class="hi-a">${COP(p.monto)}</div><span class="bdg ${p.estado==='pagado'?'bg':'by'}">${p.estado}</span></div></div>`).join(''):'<div style="color:var(--t3);font-size:13px;padding:6px 0">Sin pagos</div>'}
    </div>
    <div style="font-size:10px;color:var(--t3);text-transform:uppercase;letter-spacing:1px;margin:12px 0 6px">📋 Log de conversaciones</div>
    <div class="log-list" id="log-list-${id}">
      ${(c.logNotas||[]).length?(c.logNotas).slice().reverse().map(n=>`<div class="log-item"><div class="log-item-meta">${n.fecha}</div><div class="log-item-txt">${escHtml(n.texto)}</div></div>`).join(''):'<div style="color:var(--t3);font-size:12px;padding:4px 0">Sin notas aún</div>'}
    </div>
    <div class="log-add-row">
      <textarea id="log-inp-${id}" placeholder="Agregar nota de conversación..." rows="1"></textarea>
      <button class="btn btn-g btn-sm" onclick="addLogNota(${id})">＋</button>
    </div>`;
  document.getElementById('mVer-del').onclick=()=>{delCl(id);closeM('mVerCl');};
  document.getElementById('mVer-edit').onclick=()=>{closeM('mVerCl');editCl(id);};
  openM('mVerCl');
}
function editCl(id){
  const c=clientes.find(x=>x.id===id);if(!c)return;
  editClId=id;
  document.getElementById('mCl-title').textContent='Editar Cliente';
  document.getElementById('c_nom').value=c.nombre;
  document.getElementById('c_ciu').value=c.ciudad;
  document.getElementById('c_tel').value=c.telefono||'';
  document.getElementById('c_adm').value=c.admin||'';
  document.getElementById('c_wa').value=c.whatsapp||'';
  document.getElementById('c_su').value=c.setup||'';
  document.getElementById('c_dia').value=c.diaPago||'';
  document.getElementById('c_up').value=c.ultimoPago||'';
  document.getElementById('c_inicio').value=c.fechaInicio||'';
  document.getElementById('c_lnk').value=c.menuLink||'';
  document.getElementById('c_dash').value=c.dashboardUrl||'';
  document.getElementById('c_repo').value=c.repo||'';
  document.getElementById('c_not').value=c.notas||'';
  document.getElementById('c_plan').value=c.plan;
  document.getElementById('c_est').value=c.estado;
  // Credenciales Supabase
  document.getElementById('c_sb_url').value=c.sb_url||'';
  document.getElementById('c_sb_key').value=c.sb_key||'';
  document.getElementById('c_sb_table').value=c.sb_table||'pedidos';
  document.getElementById('c_sb_user').value=c.sb_user||'';
  document.getElementById('c_sb_pass').value=c.sb_pass||'';
  // Cuotas
  renderCuotasForm(c.cuotas||[]);
  openM('mCl');
}
function delCl(id){if(!confirm('¿Eliminar cliente?'))return;clientes=clientes.filter(c=>c.id!==id);sv('clientes',clientes);rCl();rDash();toast('Cliente eliminado');}

function addLogNota(id){
  const inp=document.getElementById('log-inp-'+id);
  if(!inp)return;
  const txt=inp.value.trim();
  if(!txt){toast('⚠️ Escribe algo');return;}
  const c=clientes.find(x=>x.id===id);if(!c)return;
  if(!c.logNotas)c.logNotas=[];
  const ahora=new Date().toLocaleDateString('es-CO',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});
  c.logNotas.push({id:nid(),texto:txt,fecha:ahora});
  sv('clientes',clientes);
  inp.value='';
  const list=document.getElementById('log-list-'+id);
  if(list)list.innerHTML=c.logNotas.slice().reverse().map(n=>`<div class="log-item"><div class="log-item-meta">${n.fecha}</div><div class="log-item-txt">${escHtml(n.texto)}</div></div>`).join('');
  toast('📋 Nota agregada');
}

// ── PAGOS ──
let pagoFil2='todos';
function setPagoF(f,el){pagoFil2=f;document.querySelectorAll('#pg-pagos .chip').forEach(c=>c.classList.remove('on'));el.classList.add('on');rPagos();}

function rPagos(){
  const now=new Date();
  const mes=pagos.filter(p=>{const d=parseLocalDate(p.fecha);return p.estado==='pagado'&&d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();}).reduce((s,p)=>s+p.monto,0);
  const pend=pagos.filter(p=>p.estado==='pendiente').reduce((s,p)=>s+p.monto,0);
  const inst=pagos.filter(p=>p.tipo==='instalacion'&&p.estado==='pagado').reduce((s,p)=>s+p.monto,0);
  document.getElementById('p-kpis').innerHTML=[
    {l:'Este mes',v:COP(mes),cls:'green'},{l:'Por cobrar',v:COP(pend),cls:'red'},{l:'Instalaciones',v:COP(inst),cls:''}
  ].map(k=>`<div class="kpi ${k.cls}"><div class="kpi-l">${k.l}</div><div class="kpi-v">${k.v}</div></div>`).join('');

  let list=[...pagos].sort((a,b)=>parseLocalDate(b.fecha)-parseLocalDate(a.fecha));
  if(pagoFil2==='pagado')list=list.filter(p=>p.estado==='pagado');
  else if(pagoFil2==='pendiente')list=list.filter(p=>p.estado==='pendiente');
  else if(pagoFil2==='mensualidad')list=list.filter(p=>p.tipo==='mensualidad');
  else if(pagoFil2==='instalacion')list=list.filter(p=>p.tipo==='instalacion');

  document.getElementById('p-list').innerHTML=list.length?list.map(p=>{
    const cl=clientes.find(c=>c.id===p.clienteId);
    return `<div class="pago-card">
      <div class="pago-row">
        <div class="pago-info">
          <div class="pago-main">${cl?cl.nombre:'—'}</div>
          <div class="pago-sub">${p.tipo==='mensualidad'?'Mensualidad':p.tipo==='instalacion'?'Set up':'Otro'} · ${p.fecha}</div>
          ${p.notas?`<div style="font-size:11px;color:var(--t3);margin-top:2px">${p.notas}</div>`:''}
        </div>
        <div style="text-align:right;flex-shrink:0">
          <div class="pago-amount">${COP(p.monto)}</div>
          <span class="bdg ${p.estado==='pagado'?'bg':'by'}">${p.estado}</span>
        </div>
      </div>
      <div class="pago-footer">
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          ${p.estado==='pendiente'?`<button class="btn btn-ghost btn-xs" onclick="markPaid(${p.id})">✓ Marcar pagado</button>`:''}
          <button class="btn btn-ghost btn-xs" onclick="editPago(${p.id})">✏️ Editar</button>
          <button class="btn btn-danger btn-xs" onclick="delPago(${p.id})">🗑 Eliminar</button>
        </div>
      </div>
    </div>`;
  }).join(''):`<div class="empty"><div class="ei">💳</div><div class="et">Sin pagos aquí</div></div>`;
}

function editPago(id){
  const p=pagos.find(x=>x.id===id);if(!p)return;
  document.getElementById('ep_id').value=id;
  document.getElementById('ep_cl').innerHTML=clientes.map(c=>`<option value="${c.id}" ${c.id===p.clienteId?'selected':''}>${c.nombre}</option>`).join('');
  document.getElementById('ep_tp').value=p.tipo;
  document.getElementById('ep_mo').value=p.monto;
  document.getElementById('ep_fe').value=p.fecha;
  document.getElementById('ep_es').value=p.estado;
  document.getElementById('ep_nt').value=p.notas||'';
  openM('mEditPago');
}
function saveEditPago(){
  const id=parseInt(document.getElementById('ep_id').value);
  const monto=parseInt(document.getElementById('ep_mo').value);
  const fecha=document.getElementById('ep_fe').value;
  if(!monto||!fecha){toast('⚠️ Completa los campos requeridos');return;}
  const i=pagos.findIndex(p=>p.id===id);
  if(i>=0){
    pagos[i]={...pagos[i],
      clienteId:parseInt(document.getElementById('ep_cl').value),
      tipo:document.getElementById('ep_tp').value,
      monto,fecha,
      estado:document.getElementById('ep_es').value,
      notas:document.getElementById('ep_nt').value
    };
  }
  sv('pagos',pagos);closeM('mEditPago');rPagos();rDash();toast('✅ Pago actualizado');
}
function markPaid(id){const p=pagos.find(x=>x.id===id);if(p){p.estado='pagado';sv('pagos',pagos);rPagos();toast('✅ Marcado como pagado');}}
function delPago(id){if(!confirm('¿Eliminar pago?'))return;pagos=pagos.filter(p=>p.id!==id);sv('pagos',pagos);rPagos();toast('Pago eliminado');}

// ── PIPELINE ──
const etapas=[{k:'contactado',l:'📞 Contactado',c:'by'},{k:'demo',l:'🎬 Demo',c:'bb'},{k:'propuesta',l:'📄 Propuesta',c:'bpu'},{k:'cerrado',l:'🎉 Cerrado',c:'bg'}];
function rPipe(){
  const cerrados=pipeline.filter(p=>p.etapa==='cerrado').length;
  document.getElementById('pi-kpis').innerHTML=[
    {l:'Total leads',v:pipeline.length,cls:''},
    {l:'En proceso',v:pipeline.filter(p=>p.etapa!=='cerrado').length,cls:'blue'},
    {l:'Cerrados',v:cerrados,cls:'green'},
    {l:'Conversión',v:pipeline.length?Math.round(cerrados/pipeline.length*100)+'%':'0%',cls:''}
  ].map(k=>`<div class="kpi ${k.cls}"><div class="kpi-l">${k.l}</div><div class="kpi-v">${k.v}</div></div>`).join('');
  document.getElementById('pi-board').innerHTML=etapas.map(e=>{
    const leads=pipeline.filter(p=>p.etapa===e.k);
    return `<div class="pipe-col">
      <div class="pipe-col-title" style="color:var(--t2)">${e.l} <span style="color:var(--t3);font-weight:400">(${leads.length})</span></div>
      ${leads.map(p=>`<div class="pipe-card" onclick="editPipe(${p.id})">
        <div class="pc-name">${p.nombre}</div>
        <div class="pc-city">📍 ${p.ciudad||'—'}</div>
        ${p.proximaAccion?`<div style="font-size:11px;color:var(--ye);margin:4px 0;border-top:1px solid var(--bd);padding-top:4px">▶ ${p.proximaAccion}${p.proximaAccionFecha?` · <b>${new Date(p.proximaAccionFecha).toLocaleDateString('es-CO',{day:'2-digit',month:'short'})}</b>`:''}</div>`:''}
        <div class="pc-bottom">
          <span class="bdg ${e.c}" style="font-size:10px">${e.l.split(' ')[1]||e.l}</span>
          <div style="display:flex;align-items:center;gap:5px">
            <div class="int-dot int-${p.interes}"></div>
            <button class="btn btn-danger btn-xs" onclick="delPipe(${p.id},event)">✕</button>
          </div>
        </div>
      </div>`).join('')}
    </div>`;
  }).join('');
}
function editPipe(id){
  const p=pipeline.find(x=>x.id===id);if(!p)return;
  editPipeId=id;
  document.getElementById('mPipe-title').textContent='Editar Lead';
  document.getElementById('pi_nom').value=p.nombre;
  document.getElementById('pi_ciu').value=p.ciudad||'';
  document.getElementById('pi_wa').value=p.contacto||'';
  document.getElementById('pi_eta').value=p.etapa;
  document.getElementById('pi_int').value=p.interes;
  document.getElementById('pi_not').value=p.notas||'';
  document.getElementById('pi_prox').value=p.proximaAccion||'';
  document.getElementById('pi_prox_fecha').value=p.proximaAccionFecha||'';
  openM('mPipe');
}
function delPipe(id,e){e&&e.stopPropagation();if(!confirm('¿Eliminar lead?'))return;pipeline=pipeline.filter(p=>p.id!==id);sv('pipeline',pipeline);rPipe();toast('Lead eliminado');}

// ── METAS ──
function rMetas(){
  const now=new Date();
  const mesPag=pagos.filter(p=>{const d=parseLocalDate(p.fecha);return p.estado==='pagado'&&d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();}).reduce((s,p)=>s+p.monto,0);
  const items=[
    {label:'Ingresos del mes',actual:mesPag,meta:metas.ingresos,fmt:v=>COP(v),color:'',icon:'💵'},
    {label:'Clientes activos',actual:clientes.filter(c=>c.estado==='activo').length,meta:metas.clientes,fmt:v=>v,color:'green',icon:'🍽️'},
    {label:'Leads en pipeline',actual:pipeline.length,meta:metas.leads,fmt:v=>v,color:'blue',icon:'📣'},
    {label:'Cierres este mes',actual:pipeline.filter(p=>p.etapa==='cerrado').length,meta:metas.cierres,fmt:v=>v,color:'',icon:'🎉'}
  ];
  document.getElementById('metas-wrap').innerHTML=items.map(it=>{
    const pct=Math.min(Math.round(it.actual/Math.max(it.meta,1)*100),100);
    const over=it.actual>=it.meta;
    return `<div class="card" style="margin-bottom:11px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
        <div style="font-size:14px;font-weight:600">${it.icon} ${it.label}</div>
        <span class="bdg ${over?'bg':'by'}">${over?'✅ Lograda':'En progreso'}</span>
      </div>
      <div style="display:flex;align-items:baseline;gap:6px;margin-bottom:8px">
        <span style="font-family:Bebas Neue;font-size:28px;color:var(--g)">${it.fmt(it.actual)}</span>
        <span style="font-size:12px;color:var(--t3)">/ ${it.fmt(it.meta)}</span>
      </div>
      <div class="prog-bar"><div class="prog-fill ${it.color}" style="width:${pct}%"></div></div>
      <div style="font-size:10px;color:var(--t3);margin-top:4px;text-align:right">${pct}% completado</div>
    </div>`;
  }).join('');
}

// ── ANALYTICS ──
function rAnalytics(){
  const totRec=pagos.filter(p=>p.estado==='pagado').reduce((s,p)=>s+p.monto,0);
  const mrr=clientes.filter(c=>c.estado==='activo').reduce((s,c)=>s+planMensual(c.plan),0);
  document.getElementById('an-kpis').innerHTML=[
    {l:'MRR',v:COP(mrr),s:'mensual recurrente',cls:''},
    {l:'ARR estimado',v:COP(mrr*12),s:'anualizado',cls:''},
    {l:'Total histórico',v:COP(totRec),s:'recaudado',cls:'green'},
    {l:'Rev. por cliente',v:COP(clientes.length?Math.round(totRec/clientes.length):0),s:'promedio',cls:''}
  ].map(k=>`<div class="kpi ${k.cls}"><div class="kpi-l">${k.l}</div><div class="kpi-v">${k.v}</div><div class="kpi-s">${k.s}</div></div>`).join('');

  const months=parseInt(document.getElementById('an-months')?.value||6);
  const {html,lbl}=buildBars(months,chartOffAn,'background:linear-gradient(180deg,#3B82F6,#1D4ED8)');
  document.getElementById('an-mrr').innerHTML=html;
  document.getElementById('an-lbl').textContent=lbl;

  const planColors={basico:'#C9A227',medio:'#3B82F6',max:'#A855F7',especial:'#22C55E'};
  const planCounts={};clientes.forEach(c=>{planCounts[c.plan]=(planCounts[c.plan]||0)+1;});
  drawDonut('an-donut','an-dleg',Object.entries(planCounts).map(([k,v])=>({l:planLabel(k),v,c:planColors[k]||'#555'})));

  const byType=[
    {l:'Mensualidad',v:pagos.filter(p=>p.tipo==='mensualidad'&&p.estado==='pagado').reduce((s,p)=>s+p.monto,0)},
    {l:'Set up',v:pagos.filter(p=>p.tipo==='instalacion'&&p.estado==='pagado').reduce((s,p)=>s+p.monto,0)},
    {l:'Otro',v:pagos.filter(p=>p.tipo==='otro'&&p.estado==='pagado').reduce((s,p)=>s+p.monto,0)}
  ];
  const mxT=Math.max(...byType.map(b=>b.v),1);
  document.getElementById('an-tipos').innerHTML=byType.map(b=>`<div class="cbg"><div class="cbv">${b.v>0?COP(b.v):'$0'}</div><div class="cbb" style="height:${Math.round(b.v/mxT*100)}%;background:linear-gradient(180deg,#A855F7,#7C3AED)"></div><div class="cbl">${b.l}</div></div>`).join('');

  const retention=clientes.length?Math.round(clientes.filter(c=>c.estado==='activo').length/clientes.length*100):0;
  const convRate=pipeline.length?Math.round(pipeline.filter(p=>p.etapa==='cerrado').length/pipeline.length*100):0;
  document.getElementById('an-stats').innerHTML=`<div class="card-t">Métricas clave</div>
    ${[
      {l:'Tasa de retención',v:retention+'%',c:'var(--gr)'},
      {l:'Tasa de conversión',v:convRate+'%',c:'var(--ye)'},
      {l:'Clientes activos',v:clientes.filter(c=>c.estado==='activo').length,c:'var(--g)'},
      {l:'Pipeline abierto',v:pipeline.filter(p=>p.etapa!=='cerrado').length,c:'var(--bl)'},
      {l:'Pagos pendientes',v:pagos.filter(p=>p.estado==='pendiente').length,c:'var(--re)'},
      {l:'Total clientes',v:clientes.length,c:'var(--t)'},
    ].map(m=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid var(--bd)"><span style="font-size:13px;color:var(--t2)">${m.l}</span><span style="font-weight:700;color:${m.c};font-size:14px">${m.v}</span></div>`).join('')}`;
}

// ── TAREAS ──
function rTareas(){
  let list=[...tareas];
  if(tkFil==='pendiente')list=list.filter(t=>!t.hecha);
  if(tkFil==='hecha')list=list.filter(t=>t.hecha);
  // Sort: pending first, then by deadline (overdue first, then soonest), then priority
  const prioVal={alta:0,normal:1,baja:2};
  const hoy=new Date();hoy.setHours(0,0,0,0);
  list.sort((a,b)=>{
    if(a.hecha!==b.hecha)return a.hecha?1:-1;
    const da=a.deadline?new Date(a.deadline):null;
    const db=b.deadline?new Date(b.deadline):null;
    if(da&&!db)return -1;if(!da&&db)return 1;
    if(da&&db&&da.getTime()!==db.getTime())return da-db;
    return prioVal[a.prioridad]-prioVal[b.prioridad];
  });
  const pm={alta:'🔴',normal:'🟡',baja:'🟢'};
  const dlLabel=d=>{
    if(!d)return null;
    const fd=new Date(d);fd.setHours(0,0,0,0);
    const diff=Math.round((fd-hoy)/(1000*60*60*24));
    if(diff<0)return {cls:'overdue',txt:`⚠️ Venció hace ${Math.abs(diff)} día${Math.abs(diff)!==1?'s':''}`};
    if(diff===0)return {cls:'soon',txt:'⏰ Vence HOY'};
    if(diff<=3)return {cls:'soon',txt:`⏰ Vence en ${diff} día${diff!==1?'s':''}`};
    return {cls:'ok',txt:`📅 ${new Date(d).toLocaleDateString('es-CO',{day:'2-digit',month:'short'})}`};
  };
  document.getElementById('tk-wrap').innerHTML=list.length?list.map(t=>{
    const cl=t.clienteId?clientes.find(c=>c.id===t.clienteId):null;
    const dl=dlLabel(t.deadline);
    const gcBtn=t.deadline&&!t.hecha?`<a href="${buildGCalLink(t.texto,t.deadline,cl?`Cliente: ${cl.nombre} · AIMAX STUDIO`:'AIMAX STUDIO CRM')}" target="_blank" title="Agregar a Google Calendar" style="font-size:14px;text-decoration:none;opacity:.7;transition:opacity .15s" onmouseover="this.style.opacity=1" onmouseout="this.style.opacity=.7">📅</a>`:'';
    return `<div class="task-item"><div class="tck ${t.hecha?'done':''}" onclick="togTask(${t.id})">${t.hecha?'✓':''}</div><div style="flex:1"><div class="ttx ${t.hecha?'done':''}">${pm[t.prioridad]||'🟡'} ${t.texto}</div>${cl?`<div style="font-size:11px;color:var(--gd);margin-top:2px">🍽️ ${cl.nombre}</div>`:''} ${dl&&!t.hecha?`<div class="task-deadline ${dl.cls}">${dl.txt}</div>`:''}</div>${gcBtn}<button class="btn btn-danger btn-xs" onclick="delTask(${t.id})">✕</button></div>`;
  }).join(''):`<div class="empty"><div class="ei">✅</div><div class="et">¡Todo al día!</div></div>`;
  updateBadges();
}
function setTkF(f,el){tkFil=f;document.querySelectorAll('#pg-tareas .chip').forEach(c=>c.classList.remove('on'));el.classList.add('on');rTareas();}
function togTask(id){const t=tareas.find(x=>x.id===id);if(t){t.hecha=!t.hecha;sv('tareas',tareas);rTareas();}}
function delTask(id){tareas=tareas.filter(t=>t.id!==id);sv('tareas',tareas);rTareas();toast('Tarea eliminada');}

// ── ARCHIVOS ──
const tipoIco=t=>({github:'💻',drive:'📂',notion:'📝',contrato:'📋',otro:'🔗'}[t]||'🔗');
function rArchivos(){
  const chips=document.getElementById('ar-chips');
  chips.innerHTML=`<div class="chip ${arFil==='todos'?'on':''}" onclick="setArF('todos',this)">Todos (${archivos.length})</div>`;
  clientes.forEach(c=>{
    const cnt=archivos.filter(a=>a.clienteId===c.id).length;
    if(cnt>0){const ch=document.createElement('div');ch.className='chip'+(arFil===String(c.id)?' on':'');ch.textContent=`${c.nombre} (${cnt})`;ch.onclick=function(){setArF(String(c.id),this);};chips.appendChild(ch);}
  });
  let list=arFil==='todos'?[...archivos]:archivos.filter(a=>String(a.clienteId)===arFil);
  const wrap=document.getElementById('ar-wrap');
  if(!list.length){wrap.innerHTML=`<div class="empty"><div class="ei">📁</div><div class="et">Sin archivos aquí</div></div>`;return;}
  const grouped={};
  list.forEach(a=>{if(!grouped[a.clienteId])grouped[a.clienteId]=[];grouped[a.clienteId].push(a);});
  wrap.innerHTML=Object.entries(grouped).map(([cid,arcs])=>{
    const cl=clientes.find(c=>c.id===parseInt(cid));
    return `<div class="card" style="margin-bottom:11px">
      <div style="font-size:11px;color:var(--g);font-weight:700;margin-bottom:10px;text-transform:uppercase;letter-spacing:1px">🍽️ ${cl?cl.nombre:'Cliente'}</div>
      ${arcs.map(a=>`<div class="file-item">
        <div style="display:flex;align-items:center;flex:1;gap:9px;min-width:0">
          <span style="font-size:20px">${tipoIco(a.tipo)}</span>
          <div style="min-width:0;flex:1"><div class="fi-name">${a.nombre}</div><a class="alink" href="${a.url}" target="_blank" style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%">${a.url}</a></div>
        </div>
        <button class="btn btn-danger btn-xs" onclick="delArchivo(${a.id})">✕</button>
      </div>`).join('')}
    </div>`;
  }).join('');
}
function setArF(f,el){arFil=f;document.querySelectorAll('#ar-chips .chip').forEach(c=>c.classList.remove('on'));el.classList.add('on');rArchivos();}
function delArchivo(id){archivos=archivos.filter(a=>a.id!==id);sv('archivos',archivos);rArchivos();toast('Archivo eliminado');}

// ── AIMAX LINKS ──
let aimaxLinks=ld('aimaxLinks',[
  {id:1,nombre:'Propuesta Comercial',desc:'Enviar cuando el cliente muestra interés real',url:'',tipo:'propuesta'},
  {id:2,nombre:'Términos y Condiciones',desc:'Enviar antes del pago para formalizar el acuerdo',url:'',tipo:'terminos'}
]);
const alIco=t=>({terminos:'📄',propuesta:'💼',menu:'🍽️',github:'💻',drive:'📂',otro:'🔗'}[t]||'🔗');
function rAimaxLinks(){
  const wrap=document.getElementById('aimax-links-wrap');
  if(!wrap)return;
  if(!aimaxLinks.length){wrap.innerHTML=`<div class="empty" style="padding:20px 0"><div class="ei" style="font-size:28px">🔗</div><div class="et">Sin links aún</div></div>`;return;}
  wrap.innerHTML=aimaxLinks.map(l=>`
    <div class="file-item" style="margin-bottom:8px">
      <div style="display:flex;align-items:center;flex:1;gap:10px;min-width:0">
        <span style="font-size:22px">${alIco(l.tipo)}</span>
        <div style="min-width:0;flex:1">
          <div class="fi-name">${l.nombre}</div>
          ${l.desc?`<div style="font-size:11px;color:var(--t3);margin-bottom:3px">${l.desc}</div>`:''}
          ${l.url?`<a class="alink" href="${l.url}" target="_blank" style="display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:100%">🔗 ${l.url}</a>`:`<span style="font-size:11px;color:var(--re);opacity:.7">Sin URL — edita para agregar</span>`}
        </div>
      </div>
      <div style="display:flex;gap:5px;flex-shrink:0">
        ${l.url?`<button class="btn btn-ghost btn-xs" onclick="copyLink('${l.url}')">📋 Copiar</button>`:''}
        <button class="btn btn-ghost btn-xs" onclick="editAimaxLink(${l.id})">✏️</button>
        <button class="btn btn-danger btn-xs" onclick="delAimaxLink(${l.id})">✕</button>
      </div>
    </div>`).join('');
}
function saveAimaxLink(){
  const nom=document.getElementById('al_nom').value.trim();
  const url=document.getElementById('al_url').value.trim();
  if(!nom){toast('⚠️ Escribe el nombre');return;}
  const editId=document.getElementById('mAimaxLink').dataset.editId;
  if(editId){
    const l=aimaxLinks.find(x=>x.id===parseInt(editId));
    if(l){l.nombre=nom;l.desc=document.getElementById('al_desc').value.trim();l.url=url;l.tipo=document.getElementById('al_tp').value;}
    delete document.getElementById('mAimaxLink').dataset.editId;
  } else {
    aimaxLinks.push({id:nid(),nombre:nom,desc:document.getElementById('al_desc').value.trim(),url,tipo:document.getElementById('al_tp').value});
  }
  sv('aimaxLinks',aimaxLinks);closeM('mAimaxLink');rAimaxLinks();toast('✅ Link guardado');
}
function editAimaxLink(id){
  const l=aimaxLinks.find(x=>x.id===id);if(!l)return;
  document.getElementById('al_nom').value=l.nombre;
  document.getElementById('al_desc').value=l.desc||'';
  document.getElementById('al_url').value=l.url||'';
  document.getElementById('al_tp').value=l.tipo;
  document.getElementById('mAimaxLink').dataset.editId=id;
  openM('mAimaxLink');
}
function delAimaxLink(id){aimaxLinks=aimaxLinks.filter(l=>l.id!==id);sv('aimaxLinks',aimaxLinks);rAimaxLinks();toast('Link eliminado');}
function copyLink(url){navigator.clipboard.writeText(url).then(()=>toast('📋 Link copiado')).catch(()=>toast('No se pudo copiar'));}

// ── CONFIG ──
function rConfig(){
  document.getElementById('cfg-wrap').innerHTML=`
    <!-- AGENCIA -->
    <div class="cfg-section">
      <div class="cfg-title">🏢 Agencia</div>
      <div class="cfg-row"><div><div class="cfg-lbl">Nombre</div></div><input class="fi" id="cfg-agencia" value="${cfg.agencia}" style="width:180px;flex-shrink:0" oninput="cfg.agencia=this.value;sv('cfg',cfg)"></div>
      <div class="cfg-row"><div><div class="cfg-lbl">Moneda</div></div><select class="fs" style="width:100px;flex-shrink:0" onchange="cfg.moneda=this.value;sv('cfg',cfg)"><option ${cfg.moneda==='COP'?'selected':''}>COP</option><option ${cfg.moneda==='USD'?'selected':''}>USD</option></select></div>
    </div>

    <!-- CONTRASEÑA -->
    <div class="pass-section">
      <div class="cfg-title">🔐 Cambiar contraseña</div>
      <div class="pass-hint">Mínimo 6 caracteres. Se requiere verificar la contraseña actual.</div>
      <div class="fg"><label class="fl">Contraseña actual</label><input class="fi" type="password" id="pass_actual" placeholder="••••••••"></div>
      <div class="fg">
        <label class="fl">Nueva contraseña</label>
        <input class="fi" type="password" id="pass_nueva" placeholder="Mínimo 6 caracteres" oninput="checkPassStr(this.value)">
        <div class="pass-strength" id="pass-strength-bar"></div>
        <div class="pass-strength-lbl" id="pass-strength-lbl" style="color:var(--t3)"></div>
      </div>
      <div class="fg"><label class="fl">Confirmar nueva contraseña</label><input class="fi" type="password" id="pass_confirma" placeholder="Repite la nueva contraseña"></div>
      <button class="btn btn-g btn-sm" style="margin-top:4px" onclick="changePass()">🔒 Cambiar contraseña</button>
      <div id="pass-msg" style="font-size:12px;margin-top:8px;min-height:16px"></div>
    </div>

    <!-- PLANES -->
    <div class="cfg-section">
      <div class="cfg-title">💰 Planes y precios</div>
      <div style="font-size:11px;color:var(--t3);margin-bottom:12px">Edita los precios — se actualizan en todo el CRM</div>
      ${Object.entries(cfg.planes).map(([k,p])=>`
        <div class="plan-row">
          <div class="plan-row-name">${p.label}</div>
          <div class="plan-row-inputs">
            <div><div class="fl" style="margin-bottom:3px">Mensual</div><input class="fi" type="number" value="${p.mensual}" inputmode="numeric" onchange="cfg.planes['${k}'].mensual=parseInt(this.value)||0;sv('cfg',cfg);toast('✅ Precio actualizado')"></div>
            <div><div class="fl" style="margin-bottom:3px">Set up</div><input class="fi" type="number" value="${p.setup}" inputmode="numeric" onchange="cfg.planes['${k}'].setup=parseInt(this.value)||0;sv('cfg',cfg);toast('✅ Precio actualizado')"></div>
          </div>
        </div>`).join('')}
    </div>

    <!-- GITHUB -->
    <div class="cfg-section">
      <div class="cfg-title">🐙 GitHub — Control de menús</div>
      <div style="font-size:11px;color:var(--t3);margin-bottom:14px">Tu token se guarda solo en este dispositivo (localStorage). Nunca sale de aquí.</div>
      <div class="cfg-row">
        <div><div class="cfg-lbl">Token GitHub (classic)</div><div class="cfg-sub">ghp_xxxxxxxxxxxxxxxxxxxx</div></div>
        <input class="fi" id="cfg-gh-token" type="password" placeholder="Pega tu token aquí" value="${ld('ghToken','')}" style="width:180px;flex-shrink:0" oninput="sv('ghToken',this.value);toast('🔐 Token guardado')">
      </div>
      <div class="cfg-row" style="border-bottom:none">
        <div><div class="cfg-lbl">Usuario GitHub</div></div>
        <input class="fi" id="cfg-gh-user" placeholder="aimx-studio" value="${ld('ghUser','aimx-studio')}" style="width:180px;flex-shrink:0" oninput="sv('ghUser',this.value)">
      </div>
    </div>

    <!-- DATOS -->
    <div class="cfg-section">
      <div class="cfg-title">📊 Datos</div>
      <div class="cfg-row"><div><div class="cfg-lbl">Exportar</div><div class="cfg-sub">JSON con todos los datos</div></div><button class="btn btn-ghost btn-sm" onclick="exportData()">⬇️ Exportar</button></div>
      <div class="cfg-row"><div><div class="cfg-lbl">Importar</div><div class="cfg-sub">Carga un backup JSON</div></div><label class="btn btn-ghost btn-sm" style="cursor:pointer">📂 Importar<input type="file" accept=".json" style="display:none" onchange="importData(this)"></label></div>
      <div class="cfg-row" style="border-bottom:none"><div><div class="cfg-lbl" style="color:var(--re)">Borrar todo</div><div class="cfg-sub">Esta acción no se puede deshacer</div></div><button class="btn btn-danger btn-sm" onclick="resetAll()">🗑 Resetear</button></div>
    </div>

    <!-- ACERCA -->
    <div class="cfg-section">
      <div class="cfg-title">ℹ️ Acerca de</div>
      <div class="cfg-row"><div class="cfg-lbl">Versión</div><div>AIMAX CRM v8.0</div></div>
      <div class="cfg-row" style="border-bottom:none"><div class="cfg-lbl">Almacenamiento</div><div id="cfg-storage">—</div></div>
    </div>`;
  const used=Object.keys(localStorage).filter(k=>k.startsWith('am4_')).reduce((s,k)=>s+(localStorage.getItem(k)||'').length,0);
  document.getElementById('cfg-storage').textContent=`${(used/1024).toFixed(1)} KB usados`;
}

// ── CHANGE PASSWORD ──
function checkPassStr(v){
  const bar=document.getElementById('pass-strength-bar');
  const lbl=document.getElementById('pass-strength-lbl');
  if(!v){bar.style.background='var(--b5)';bar.style.width='0';lbl.textContent='';return;}
  let score=0;
  if(v.length>=6)score++;
  if(v.length>=10)score++;
  if(/[A-Z]/.test(v))score++;
  if(/[0-9]/.test(v))score++;
  if(/[^A-Za-z0-9]/.test(v))score++;
  const levels=[{c:'var(--re)',l:'Muy débil',w:'20%'},{c:'var(--re)',l:'Débil',w:'35%'},{c:'var(--ye)',l:'Regular',w:'55%'},{c:'var(--g)',l:'Buena',w:'75%'},{c:'var(--gr)',l:'Muy fuerte',w:'100%'}];
  const lv=levels[Math.max(0,score-1)];
  bar.style.background=lv.c;bar.style.width=lv.w;lbl.style.color=lv.c;lbl.textContent=lv.l;
}

function changePass(){
  const actual=document.getElementById('pass_actual').value;
  const nueva=document.getElementById('pass_nueva').value;
  const confirma=document.getElementById('pass_confirma').value;
  const msg=document.getElementById('pass-msg');
  if(actual!==currentPass){msg.style.color='var(--re)';msg.textContent='❌ La contraseña actual es incorrecta';return;}
  if(nueva.length<6){msg.style.color='var(--re)';msg.textContent='❌ La nueva contraseña debe tener al menos 6 caracteres';return;}
  if(nueva!==confirma){msg.style.color='var(--re)';msg.textContent='❌ Las contraseñas no coinciden';return;}
  if(nueva===actual){msg.style.color='var(--ye)';msg.textContent='⚠️ La nueva contraseña debe ser diferente a la actual';return;}
  currentPass=nueva;
  sv('pass',currentPass);
  document.getElementById('pass_actual').value='';
  document.getElementById('pass_nueva').value='';
  document.getElementById('pass_confirma').value='';
  document.getElementById('pass-strength-bar').style.width='0';
  document.getElementById('pass-strength-lbl').textContent='';
  msg.style.color='var(--gr)';msg.textContent='✅ Contraseña cambiada correctamente';
  toast('🔐 Contraseña actualizada');
  setTimeout(()=>msg.textContent='',4000);
}

// ── SAVE FUNCTIONS ──
function saveCl(){
  const nom=document.getElementById('c_nom').value.trim();
  const ciu=document.getElementById('c_ciu').value.trim();
  if(!nom||!ciu){toast('⚠️ Nombre y ciudad requeridos');return;}
  const planV=document.getElementById('c_plan').value;
  // Recoger cuotas del formulario
  const cuotasRows=document.querySelectorAll('#cuotas-list .cuota-row');
  const cuotas=[];
  cuotasRows.forEach((row,i)=>{
    const dia=parseInt(row.querySelector('.cuota-dia').value)||1;
    const monto=parseInt(row.querySelector('.cuota-monto').value)||0;
    if(monto>0)cuotas.push({id:nid()+i,dia,monto,estado:'pendiente'});
  });
  const obj={
    id:editClId||nid(),nombre:nom,ciudad:ciu,
    telefono:document.getElementById('c_tel').value.trim(),
    admin:document.getElementById('c_adm').value.trim(),
    whatsapp:document.getElementById('c_wa').value.trim(),
    plan:planV,mensual:planMensual(planV),
    setup:parseInt(document.getElementById('c_su').value)||0,
    diaPago:parseInt(document.getElementById('c_dia').value)||1,
    estado:document.getElementById('c_est').value,
    ultimoPago:document.getElementById('c_up').value,
    proximoPago:'',pagomesactual:false,
    menuLink:document.getElementById('c_lnk').value.trim(),
    dashboardUrl:document.getElementById('c_dash').value.trim(),
    repo:document.getElementById('c_repo').value.trim(),
    notas:document.getElementById('c_not').value.trim(),
    sb_url:document.getElementById('c_sb_url').value.trim(),
    sb_key:document.getElementById('c_sb_key').value.trim(),
    sb_table:document.getElementById('c_sb_table').value.trim()||'pedidos',
    sb_user:document.getElementById('c_sb_user').value.trim(),
    sb_pass:document.getElementById('c_sb_pass').value.trim(),
    cuotas,
    archivos:[]
  };
  obj.fechaInicio=document.getElementById('c_inicio').value||null;
  if(editClId){
    const i=clientes.findIndex(c=>c.id===editClId);
    if(i>=0){obj.logNotas=clientes[i].logNotas||[];obj.menuActivo=clientes[i].menuActivo!==false?true:false;clientes[i]=obj;}
  } else {
    obj.logNotas=[];
    clientes.push(obj);
  }
  sv('clientes',clientes);editClId=null;
  document.getElementById('mCl-title').textContent='Nuevo Cliente';
  closeM('mCl');rCl();rDash();toast('✅ Cliente guardado');
}

function savePago(){
  const cid=parseInt(document.getElementById('p_cl').value);
  const monto=parseInt(document.getElementById('p_mo').value);
  const fecha=document.getElementById('p_fe').value;
  if(!cid||!monto||!fecha){toast('⚠️ Completa los campos requeridos');return;}
  pagos.push({id:nid(),clienteId:cid,tipo:document.getElementById('p_tp').value,monto,fecha,estado:document.getElementById('p_es').value,notas:document.getElementById('p_nt').value});
  sv('pagos',pagos);closeM('mPago');rPagos();rDash();toast('✅ Pago registrado');
}

function savePipe(){
  const nom=document.getElementById('pi_nom').value.trim();
  if(!nom){toast('⚠️ Nombre requerido');return;}
  const obj={id:editPipeId||nid(),nombre:nom,ciudad:document.getElementById('pi_ciu').value.trim(),contacto:document.getElementById('pi_wa').value.trim(),etapa:document.getElementById('pi_eta').value,interes:document.getElementById('pi_int').value,notas:document.getElementById('pi_not').value.trim(),fecha:new Date().toISOString().split('T')[0],proximaAccion:document.getElementById('pi_prox').value.trim(),proximaAccionFecha:document.getElementById('pi_prox_fecha').value||null};
  if(editPipeId){const i=pipeline.findIndex(p=>p.id===editPipeId);if(i>=0)pipeline[i]=obj;}
  else pipeline.push(obj);
  editPipeId=null;document.getElementById('mPipe-title').textContent='Nuevo Lead';
  sv('pipeline',pipeline);closeM('mPipe');rPipe();toast('✅ Lead guardado');
}

function saveMeta(){
  metas={ingresos:parseInt(document.getElementById('m_ing').value)||500000,clientes:parseInt(document.getElementById('m_cl').value)||8,leads:parseInt(document.getElementById('m_pi').value)||20,cierres:parseInt(document.getElementById('m_ci').value)||3};
  sv('metas',metas);closeM('mMeta');rMetas();toast('✅ Metas actualizadas');
}

function saveTarea(){
  const txt=document.getElementById('t_tx').value.trim();
  if(!txt){toast('⚠️ Describe la tarea');return;}
  const cid=document.getElementById('t_cl').value;
  const dl=document.getElementById('t_dl').value;
  const prio=document.getElementById('t_pr').value;
  const tarea={id:nid(),texto:txt,clienteId:cid?parseInt(cid):null,prioridad:prio,hecha:false,deadline:dl||null};
  tareas.push(tarea);
  sv('tareas',tareas);closeM('mTarea');rTareas();
  if(dl){
    const cl=cid?clientes.find(c=>c.id===parseInt(cid)):null;
    const gcLink=buildGCalLink(txt,dl,cl?`Cliente: ${cl.nombre}`:'AIMAX STUDIO CRM','AIMAX STUDIO CRM');
    toast(`✅ Tarea agregada — <a href="${gcLink}" target="_blank" style="color:var(--g);text-decoration:underline;font-weight:700">📅 Agregar a Google Calendar</a>`,6000);
  } else {
    toast('✅ Tarea agregada');
  }
}

function buildGCalLink(titulo,fechaISO,details='',location=''){
  // fechaISO: "2026-05-10" → fecha allday en Google Calendar
  const d=fechaISO.replace(/-/g,'');
  const next=fechaISO.split('-');next[2]=String(parseInt(next[2])+1).padStart(2,'0');
  const d2=next.join('').replace(/-/g,'');
  const params=new URLSearchParams({action:'TEMPLATE',text:`[AIMAX] ${titulo}`,dates:`${d}/${d2}`,details,location});
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function saveArchivo(){
  const cid=parseInt(document.getElementById('a_cl').value);
  const nom=document.getElementById('a_nom').value.trim();
  const url=document.getElementById('a_url').value.trim();
  if(!cid||!nom||!url){toast('⚠️ Completa todos los campos');return;}
  archivos.push({id:nid(),clienteId:cid,nombre:nom,url,tipo:document.getElementById('a_tp').value});
  sv('archivos',archivos);closeM('mArchivo');rArchivos();toast('✅ Archivo guardado');
}

// ── MODAL HELPERS ──
function openM(id){
  document.getElementById(id).classList.add('open');
  if(id==='mPago'){
    document.getElementById('p_cl').innerHTML=clientes.map(c=>`<option value="${c.id}">${c.nombre}</option>`).join('');
    document.getElementById('p_fe').value=new Date().toISOString().split('T')[0];
    document.getElementById('p_mo').value='';
    document.getElementById('p_nt').value='';
  }
  if(id==='mEditPago'){
    document.getElementById('ep_cl').innerHTML=clientes.map(c=>`<option value="${c.id}">${c.nombre}</option>`).join('');
  }
  if(id==='mTarea'){document.getElementById('t_cl').innerHTML=`<option value="">— Ninguno —</option>`+clientes.map(c=>`<option value="${c.id}">${c.nombre}</option>`).join('');document.getElementById('t_dl').value='';}
  if(id==='mArchivo'){document.getElementById('a_cl').innerHTML=clientes.map(c=>`<option value="${c.id}">${c.nombre}</option>`).join('');}
  if(id==='mMeta'){document.getElementById('m_ing').value=metas.ingresos;document.getElementById('m_cl').value=metas.clientes;document.getElementById('m_pi').value=metas.leads;document.getElementById('m_ci').value=metas.cierres;}
  if(id==='mCl'&&!editClId){
    document.getElementById('mCl-title').textContent='Nuevo Cliente';
    ['c_nom','c_ciu','c_tel','c_adm','c_wa','c_su','c_dia','c_up','c_inicio','c_lnk','c_dash','c_repo','c_not','c_sb_url','c_sb_key','c_sb_user','c_sb_pass'].forEach(i=>document.getElementById(i).value='');
    document.getElementById('c_sb_table').value='pedidos';
    document.getElementById('c_plan').value='basico';
    document.getElementById('c_est').value='activo';
    renderCuotasForm([]);
  }
  if(id==='mPipe'&&!editPipeId){
    ['pi_nom','pi_ciu','pi_wa','pi_not','pi_prox','pi_prox_fecha'].forEach(i=>document.getElementById(i).value='');
    document.getElementById('pi_eta').value='contactado';
    document.getElementById('pi_int').value='alto';
  }
}
function closeM(id){
  document.getElementById(id).classList.remove('open');
  if(id==='mCl'){editClId=null;document.getElementById('mCl-title').textContent='Nuevo Cliente';}
  if(id==='mPipe'){editPipeId=null;document.getElementById('mPipe-title').textContent='Nuevo Lead';}
}
document.querySelectorAll('.mo').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)m.classList.remove('open');}));

// ── BADGES ──
function updateBadges(){
  document.getElementById('nb-cl').textContent=clientes.filter(c=>c.estado==='activo').length;
  document.getElementById('nb-pipe').textContent=pipeline.filter(p=>p.etapa!=='cerrado').length;
  const pk=tareas.filter(t=>!t.hecha).length;
  const hoy=new Date();hoy.setHours(0,0,0,0);
  const overdue=tareas.filter(t=>!t.hecha&&t.deadline&&new Date(t.deadline)<hoy).length;
  const nb=document.getElementById('nb-tk');
  if(pk>0){nb.classList.add('show');nb.textContent=overdue>0?`${pk} ⚠️`:pk;nb.style.background=overdue>0?'var(--re)':'var(--g)';}
  else nb.classList.remove('show');
}

// ── DONUT ──
function drawDonut(canvasId,legId,segs){
  const cv=document.getElementById(canvasId);if(!cv)return;
  const ctx=cv.getContext('2d');
  const w=cv.width,h=cv.height,cx=w/2,cy=h/2,r=Math.min(w,h)/2-4,ri=r*0.55;
  ctx.clearRect(0,0,w,h);
  const tot=segs.reduce((s,x)=>s+x.v,0)||1;
  let s=-Math.PI/2;
  segs.forEach(sg=>{
    const e=s+sg.v/tot*2*Math.PI;
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,s,e);ctx.closePath();
    ctx.fillStyle=sg.c;ctx.fill();s=e;
  });
  ctx.beginPath();ctx.arc(cx,cy,ri,0,Math.PI*2);ctx.fillStyle='var(--b2)';ctx.fill();
  document.getElementById(legId).innerHTML=segs.filter(s=>s.v>0).map(s=>`<div class="dl"><div class="dd" style="background:${s.c}"></div>${s.l}: <b style="color:${s.c}">${s.v}</b></div>`).join('');
}

// ── GITHUB MENU TOGGLE ──
async function toggleMenu(id){
  const c=clientes.find(x=>x.id===id);if(!c||!c.repo){toast('⚠️ Este cliente no tiene repo configurado');return;}
  const token=ld('ghToken','');
  const user=ld('ghUser','aimx-studio');
  if(!token){toast('⚠️ Configura tu token de GitHub en Configuración');go('config',null);return;}

  const activar=c.menuActivo===false; // solo activa si está explícitamente false; undefined = activo
  const accion=activar?'activar':'desactivar';
  if(!confirm(`¿${accion.charAt(0).toUpperCase()+accion.slice(1)} el menú de ${c.nombre}?`))return;

  toast('⏳ Conectando con GitHub...');

  const apiBase=`https://api.github.com/repos/${user}/${c.repo}/contents/index.html`;
  const headers={'Authorization':`token ${token}`,'Accept':'application/vnd.github.v3+json','Content-Type':'application/json'};

  try{
    // 1. Obtener SHA del archivo actual
    const res=await fetch(apiBase,{headers});
    if(!res.ok){const e=await res.json();toast(`❌ GitHub: ${e.message}`);return;}
    const data=await res.json();
    const sha=data.sha;

    if(activar){
      // Reactivar: recuperar backup
      const backupRes=await fetch(`https://api.github.com/repos/${user}/${c.repo}/contents/index.backup.html`,{headers});
      if(!backupRes.ok){toast('❌ No se encontró el backup del menú. Reactívalo manualmente.');return;}
      const backupData=await backupRes.json();
      // Restaurar index.html con el contenido del backup
      const putRes=await fetch(apiBase,{method:'PUT',headers,body:JSON.stringify({message:'✅ Menú reactivado desde AIMAX CRM',content:backupData.content.replace(/\n/g,''),sha})});
      if(!putRes.ok){const e=await putRes.json();toast(`❌ Error al restaurar: ${e.message}`);return;}
      // Borrar backup
      await fetch(`https://api.github.com/repos/${user}/${c.repo}/contents/index.backup.html`,{method:'DELETE',headers,body:JSON.stringify({message:'🗑 Backup eliminado',sha:backupData.sha})});
      c.menuActivo=true;
    } else {
      // Desactivar: guardar backup y reemplazar con página de suspensión
      // Verificar si ya existe un backup previo para obtener su SHA
      const backupUrl=`https://api.github.com/repos/${user}/${c.repo}/contents/index.backup.html`;
      let backupShaExistente=undefined;
      const backupCheck=await fetch(backupUrl,{headers});
      if(backupCheck.ok){const bd=await backupCheck.json();backupShaExistente=bd.sha;}
      // Guardar backup (con SHA si ya existía, sin SHA si es nuevo)
      const backupBody={message:'💾 Backup antes de suspender',content:data.content.replace(/\n/g,'')};
      if(backupShaExistente)backupBody.sha=backupShaExistente;
      const backupPut=await fetch(backupUrl,{method:'PUT',headers,body:JSON.stringify(backupBody)});
      if(!backupPut.ok){const e=await backupPut.json();toast(`❌ Error al crear backup: ${e.message}`);return;}
      // Reemplazar index.html con página de suspensión
      const suspended=btoa(unescape(encodeURIComponent(`<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Servicio suspendido</title><style>*{margin:0;padding:0;box-sizing:border-box}body{background:#080808;color:#F0E8D2;font-family:system-ui,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;text-align:center;padding:20px}.box{max-width:380px}.ico{font-size:64px;margin-bottom:20px}.title{font-size:28px;font-weight:700;color:#C9A227;margin-bottom:10px}.sub{font-size:15px;color:#9A8660;line-height:1.6;margin-bottom:24px}.note{font-size:13px;color:#504030;border:1px solid #1C1C1C;border-radius:10px;padding:14px}</style></head><body><div class="box"><div class="ico">🔒</div><div class="title">Menú no disponible</div><div class="sub">Este menú digital está temporalmente suspendido. Por favor comunícate con el restaurante.</div><div class="note">Si eres el administrador, contacta a AIMAX STUDIO para reactivar tu servicio.</div></div></body></html>`)));
      const putRes=await fetch(apiBase,{method:'PUT',headers,body:JSON.stringify({message:'⛔ Menú suspendido desde AIMAX CRM',content:suspended,sha})});
      if(!putRes.ok){const e=await putRes.json();toast(`❌ Error al suspender: ${e.message}`);return;}
      c.menuActivo=false;
    }

    sv('clientes',clientes);
    rCl();
    toast(`${activar?'✅ Menú activado':'⛔ Menú suspendido'} — ${c.nombre} (puede tardar ~2 min)`);
  } catch(err){
    toast('❌ Error de red. Verifica tu conexión.');
    console.error(err);
  }
}

// ── DATA OPS ──
function exportData(){
  const data={clientes,pagos,pipeline,tareas,archivos,notas,metas,cfg,aimaxLinks,exportado:new Date().toISOString()};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`aimax-crm-${new Date().toISOString().split('T')[0]}.json`;a.click();
  toast('✅ Datos exportados');
}
function importData(input){
  const file=input.files[0];if(!file)return;
  const reader=new FileReader();
  reader.onload=e=>{
    try{
      const d=JSON.parse(e.target.result);
      if(d.clientes){clientes=d.clientes;sv('clientes',clientes);}
      if(d.pagos){pagos=d.pagos;sv('pagos',pagos);}
      if(d.pipeline){pipeline=d.pipeline;sv('pipeline',pipeline);}
      if(d.tareas){tareas=d.tareas;sv('tareas',tareas);}
      if(d.archivos){archivos=d.archivos;sv('archivos',archivos);}
      if(d.aimaxLinks){aimaxLinks=d.aimaxLinks;sv('aimaxLinks',aimaxLinks);}
      if(d.notas){notas=d.notas;sv('notas',notas);}
      if(d.metas){metas=d.metas;sv('metas',metas);}
      if(d.cfg){cfg=d.cfg;sv('cfg',cfg);}
      rDash();toast('✅ Datos importados');
    }catch{toast('❌ Error al importar');}
  };
  reader.readAsText(file);
}
function resetAll(){
  if(!confirm('¿Seguro? Se borrarán TODOS los datos.'))return;
  ['clientes','pagos','pipeline','tareas','archivos','notas','metas','cfg','pass','aimaxLinks'].forEach(k=>localStorage.removeItem('am4_'+k));
  location.reload();
}
function toast(msg,dur=2800){const t=document.getElementById('toast');const tm=document.getElementById('tmsg');if(msg.includes('<')){tm.innerHTML=msg;}else{tm.textContent=msg;}t.classList.add('show');clearTimeout(t._to);t._to=setTimeout(()=>t.classList.remove('show'),dur);}

// ── NOTAS ──
let notaFil='todas';
let editNotaId=null;

function setNotaF(f,el){notaFil=f;document.querySelectorAll('#pg-notas .chip').forEach(c=>c.classList.remove('on'));el.classList.add('on');rNotas();}

function rNotas(){
  let list=[...notas].sort((a,b)=>{
    if(a.starred&&!b.starred)return -1;
    if(!a.starred&&b.starred)return 1;
    return new Date(b.fecha)-new Date(a.fecha);
  });
  if(notaFil==='destacadas')list=list.filter(n=>n.starred);
  const grid=document.getElementById('notas-grid');
  const cards=list.map(n=>`
    <div class="nota-card${n.starred?' starred':''}" onclick="openNotaScreen(${n.id})">
      <span class="nota-star${n.starred?' on':''}" onclick="event.stopPropagation();toggleStar(${n.id})">${n.starred?'⭐':'☆'}</span>
      <div class="nota-title">${escHtml(n.titulo||'Sin título')}</div>
      <div class="nota-preview">${escHtml(n.cuerpo)}</div>
      <div class="nota-date">${formatNotaDate(n.editado||n.fecha)}</div>
    </div>`).join('');
  grid.innerHTML=cards+`
    <div class="nota-add" onclick="newNota()">
      <span class="nota-add-ico">＋</span>
      <span>Nueva nota</span>
    </div>`;
}

function escHtml(s){return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function formatNotaDate(iso){
  if(!iso)return '';
  const d=new Date(iso);
  return d.toLocaleDateString('es-CO',{day:'2-digit',month:'short',year:'numeric'});
}

function openNotaScreen(id){
  const n=notas.find(x=>x.id===id);if(!n)return;
  editNotaId=id;
  document.getElementById('n_tit').value=n.titulo||'';
  document.getElementById('n_bod').value=n.cuerpo||'';
  const star=document.getElementById('ns-star');
  star.textContent=n.starred?'⭐':'☆';
  star.className='nota-star-btn'+(n.starred?' on':'');
  document.getElementById('ns-del').style.display='inline-block';
  document.getElementById('ns-footer').textContent=formatNotaDate(n.editado||n.fecha);
  document.getElementById('notaScreen').classList.add('open');
  setTimeout(()=>document.getElementById('n_bod').focus(),280);
}

function newNota(){
  editNotaId=null;
  document.getElementById('n_tit').value='';
  document.getElementById('n_bod').value='';
  const star=document.getElementById('ns-star');
  star.textContent='☆';star.className='nota-star-btn';
  document.getElementById('ns-del').style.display='none';
  document.getElementById('ns-footer').textContent='';
  document.getElementById('notaScreen').classList.add('open');
  setTimeout(()=>document.getElementById('n_bod').focus(),280);
}

function closeNotaScreen(){
  document.getElementById('notaScreen').classList.remove('open');
  editNotaId=null;
  rNotas();
}

function saveNota(){
  const cuerpo=document.getElementById('n_bod').value.trim();
  if(!cuerpo){toast('⚠️ Escribe algo en la nota');return;}
  const titulo=document.getElementById('n_tit').value.trim();
  const ahora=new Date().toISOString();
  if(editNotaId){
    const i=notas.findIndex(n=>n.id===editNotaId);
    if(i>=0){notas[i].titulo=titulo;notas[i].cuerpo=cuerpo;notas[i].editado=ahora;}
  } else {
    const nuevo={id:nid(),titulo,cuerpo,starred:false,fecha:ahora};
    notas.push(nuevo);
    editNotaId=nuevo.id;
    document.getElementById('ns-del').style.display='inline-block';
  }
  sv('notas',notas);
  document.getElementById('ns-footer').textContent=formatNotaDate(ahora);
  toast('✅ Nota guardada');
}

function delNotaScreen(){
  if(!editNotaId)return;
  if(!confirm('¿Eliminar esta nota?'))return;
  notas=notas.filter(n=>n.id!==editNotaId);
  sv('notas',notas);closeNotaScreen();toast('Nota eliminada');
}

function toggleStar(id){
  const n=notas.find(x=>x.id===id);if(!n)return;
  n.starred=!n.starred;sv('notas',notas);rNotas();
}

function toggleStarScreen(){
  if(editNotaId){
    const n=notas.find(x=>x.id===editNotaId);
    if(n){n.starred=!n.starred;sv('notas',notas);
      const star=document.getElementById('ns-star');
      star.textContent=n.starred?'⭐':'☆';
      star.className='nota-star-btn'+(n.starred?' on':'');
      toast(n.starred?'⭐ Destacada':'Quitada de destacadas');
    }
  } else {
    // nueva nota aún no guardada — guardar primero
    saveNota();
    if(editNotaId){const n=notas.find(x=>x.id===editNotaId);if(n){n.starred=true;sv('notas',notas);document.getElementById('ns-star').textContent='⭐';document.getElementById('ns-star').className='nota-star-btn on';}}
  }
}

// ── CUOTAS FORM HELPERS ──
function renderCuotasForm(cuotas){
  const list=document.getElementById('cuotas-list');
  if(!list)return;
  if(cuotas.length===0){list.innerHTML='<div style="font-size:12px;color:var(--t3);padding:4px 0">Sin cuotas definidas — el pago se cobra completo en el día de cobro.</div>';return;}
  list.innerHTML=cuotas.map((q,i)=>`
    <div class="cuota-row" style="display:flex;align-items:center;gap:7px;background:var(--b5);border-radius:7px;padding:7px 10px">
      <div style="flex:1">
        <div style="font-size:9px;color:var(--t3);text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">Día del mes</div>
        <input class="fi cuota-dia" type="number" min="1" max="31" value="${q.dia}" placeholder="1" inputmode="numeric" style="padding:6px 8px;font-size:13px">
      </div>
      <div style="flex:1">
        <div style="font-size:9px;color:var(--t3);text-transform:uppercase;letter-spacing:1px;margin-bottom:3px">Monto (COP)</div>
        <input class="fi cuota-monto" type="number" value="${q.monto}" placeholder="50000" inputmode="numeric" style="padding:6px 8px;font-size:13px">
      </div>
      <button type="button" onclick="removeCuotaRow(this)" style="background:none;border:none;color:var(--re);font-size:18px;cursor:pointer;padding:4px;flex-shrink:0;margin-top:12px">✕</button>
    </div>`).join('');
}
function addCuotaRow(){
  const list=document.getElementById('cuotas-list');
  // Collect current rows first
  const existing=Array.from(list.querySelectorAll('.cuota-row')).map(r=>({dia:parseInt(r.querySelector('.cuota-dia').value)||1,monto:parseInt(r.querySelector('.cuota-monto').value)||0,estado:'pendiente'}));
  existing.push({dia:1,monto:0,estado:'pendiente'});
  renderCuotasForm(existing);
}
function removeCuotaRow(btn){
  const row=btn.closest('.cuota-row');
  const list=document.getElementById('cuotas-list');
  row.remove();
  if(!list.querySelectorAll('.cuota-row').length)renderCuotasForm([]);
}

// ── INIT ──
rDash();updateBadges();
