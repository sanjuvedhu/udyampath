import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

/* ═══════════════════════════════════════════════════════
   UDYAM PATH - उद्यम पथ
   REAL-TIME Career Platform
   Connected to: Supabase + Adzuna API + Resend Email
═══════════════════════════════════════════════════════ */

// ── Supabase Client (replace with your keys) ──────────
const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL  || "https://YOUR_PROJECT.supabase.co";
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON || "YOUR_ANON_KEY";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

/* ── Styles ─────────────────────────────────────────── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;600&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    html{scroll-behavior:smooth;}
    *{box-sizing:border-box;-webkit-font-smoothing:antialiased;}
    html,body{overflow-x:hidden;max-width:100vw;}
    body{font-family:'Nunito',sans-serif;background:#04040C;color:#F0F0FF;overflow-x:hidden;
      background-image:
        radial-gradient(ellipse 80% 50% at 20% 0%, rgba(0,229,255,0.07) 0%, transparent 60%),
        radial-gradient(ellipse 60% 40% at 80% 10%, rgba(124,58,237,0.07) 0%, transparent 60%),
        radial-gradient(ellipse 40% 30% at 50% 100%, rgba(0,229,255,0.04) 0%, transparent 60%);
      background-attachment:fixed;
    }
    /* Apple Glass Cards */
    .glass{
      background:rgba(255,255,255,0.04)!important;
      backdrop-filter:blur(20px) saturate(180%)!important;
      -webkit-backdrop-filter:blur(20px) saturate(180%)!important;
      border:1px solid rgba(255,255,255,0.08)!important;
    }
    .glass-strong{
      background:rgba(255,255,255,0.07)!important;
      backdrop-filter:blur(40px) saturate(200%)!important;
      -webkit-backdrop-filter:blur(40px) saturate(200%)!important;
      border:1px solid rgba(255,255,255,0.12)!important;
    }
    .glass-nav{
      background:rgba(4,4,12,0.7)!important;
      backdrop-filter:blur(30px) saturate(180%)!important;
      -webkit-backdrop-filter:blur(30px) saturate(180%)!important;
      border-bottom:1px solid rgba(255,255,255,0.06)!important;
    }
    .bottom-nav{display:none;}
    .top-nav{display:flex;}
    @media(max-width:640px){
      .bottom-nav{display:flex!important;position:fixed;bottom:0;left:0;right:0;z-index:999;background:rgba(4,4,12,0.95);border-top:1px solid rgba(255,255,255,0.08);padding:8px 4px 20px;gap:2px;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;backdrop-filter:blur(30px);-webkit-backdrop-filter:blur(30px);}.bottom-nav::-webkit-scrollbar{display:none;}
      .top-nav{display:none!important;}
      .main-content{padding-bottom:20px!important;}
      footer{padding-bottom:calc(90px + env(safe-area-inset-bottom,0px))!important;}
      .mobile-hide{display:none!important;}
      .mobile-only{display:flex!important;}
      .logo-text{display:block!important;font-size:12px!important;}
      .live-badge{display:flex!important;padding:3px 8px!important;}
      .sign-out-btn{display:none!important;}
      .post-job-btn{display:flex!important;padding:6px 8px!important;font-size:9px!important;letter-spacing:0!important;}.pro-btn{display:flex!important;}
    }
    .mobile-only{display:none;}
    @media(max-width:640px){
      .mobile-hide{display:none!important;}
      .mobile-full{width:100%!important;max-width:100%!important;}
      .mobile-col{flex-direction:column!important;}
      .mobile-sm{font-size:12px!important;}
      .mobile-pad{padding:12px!important;}
      .mobile-grid-1{grid-template-columns:1fr!important;}
    }
    ::-webkit-scrollbar{width:6px;height:6px;}
    ::-webkit-scrollbar-track{background:transparent;}
    ::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.15);border-radius:99px;}
    ::-webkit-scrollbar-thumb:hover{background:rgba(0,229,255,0.4);}
    @-webkit-keyframes fadeUp{from{opacity:0;-webkit-transform:translateY(20px);transform:translateY(20px)}to{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}
    @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
    @-webkit-keyframes spin{from{-webkit-transform:rotate(0deg)}to{-webkit-transform:rotate(360deg)}}
    @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    @keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}
    @-webkit-keyframes slideIn{from{-webkit-transform:translateX(100%);opacity:0}to{-webkit-transform:translateX(0);opacity:1}}
    @keyframes slideIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}
    @keyframes glow{0%,100%{box-shadow:0 0 20px #00E5FF40}50%{box-shadow:0 0 40px #00E5FF60}}
    @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
    @keyframes popIn{0%{transform:scale(0.8);opacity:0}100%{transform:scale(1);opacity:1}}
    .fu{-webkit-animation:fadeUp .5s ease both;animation:fadeUp .5s ease both}
    .fu1{-webkit-animation:fadeUp .5s ease .1s both;animation:fadeUp .5s ease .1s both}
    .fu2{-webkit-animation:fadeUp .5s ease .2s both;animation:fadeUp .5s ease .2s both}
    .fu3{-webkit-animation:fadeUp .5s ease .3s both;animation:fadeUp .5s ease .3s both}
    .float{-webkit-animation:float 4s ease-in-out infinite;animation:float 4s ease-in-out infinite}
    .spin{-webkit-animation:spin .8s linear infinite;animation:spin .8s linear infinite}
    .btn{transition:all .18s cubic-bezier(.22,1,.36,1);cursor:pointer;}
    .btn:active{transform:scale(.96);}
    .card-hover{transition:all .25s cubic-bezier(.22,1,.36,1);}
    .card-hover:hover{transform:translateY(-4px);box-shadow:0 20px 60px rgba(170,255,0,.08)!important;}
    .input-z:focus{outline:none!important;border-color:#00E5FF!important;box-shadow:0 0 0 3px #00E5FF15!important;}
    .tag{display:inline-flex;align-items:center;padding:3px 10px;border-radius:99px;font-size:10px;font-weight:800;letter-spacing:.6px;text-transform:uppercase;}
    .shimmer-bg{background:linear-gradient(90deg,#1A1A2E 0%,#2A2A3E 50%,#1A1A2E 100%);background-size:200% 100%;-webkit-animation:shimmer 1.5s infinite;animation:shimmer 1.5s infinite;}
    .grid-pattern{background-image:linear-gradient(rgba(170,255,0,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(170,255,0,.03) 1px,transparent 1px);background-size:40px 40px;}
    .marquee-wrap{overflow:hidden;width:100%;max-width:100vw;}
    .marquee-inner{display:-webkit-flex;display:flex;-webkit-animation:marquee 35s linear infinite;animation:marquee 35s linear infinite;width:-webkit-max-content;width:max-content;}
    .pop{-webkit-animation:popIn .4s ease both;animation:popIn .4s ease both;}
    .glow-pulse{-webkit-animation:glow 2s ease-in-out infinite;animation:glow 2s ease-in-out infinite;}
    .nav-active{color:#00E5FF!important;}
    :root{--lime:#00E5FF;--gold:#FFB800;--coral:#FF4D6D;--sky:#38BDF8;--violet:#A78BFA;--mint:#34D399;}
  `}</style>
);

const C = {
  lime:"#00E5FF", gold:"#FFB700", coral:"#FF3D71", sky:"#7C3AED",
  violet:"#A78BFA", mint:"#00D68F", bg:"#04040C", surface:"#080816",
  card:"#0D0D1F", border:"rgba(255,255,255,.06)", muted:"rgba(255,255,255,.38)",
  cyan:"#00E5FF", pink:"#FF0080"
};

/* ── Small Components ────────────────────────────────── */
const Chip = ({children, color="#00E5FF"}) => (
  <span className="tag" style={{background:`${color}10`,color,border:`1px solid ${color}20`,fontFamily:"Space Mono,monospace"}}>{children}</span>
);

const Spinner = ({size=24,color=C.lime}) => (
  <div className="spin" style={{width:size,height:size,border:`2px solid ${color}20`,borderTop:`2px solid ${color}`,borderRadius:"50%"}}/>
);

const SkeletonCard = () => (
  <div style={{background:"linear-gradient(145deg,#0D0D20,#0A0A18)",borderRadius:16,padding:20,border:"1px solid rgba(0,229,255,.06)",overflow:"hidden",position:"relative"}}>
    <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:"linear-gradient(90deg,transparent,rgba(0,229,255,.2),transparent)"}}/>
    <div style={{display:"flex",gap:12,marginBottom:16}}>
      <div className="shimmer-bg" style={{width:44,height:44,borderRadius:12,flexShrink:0}}/>
      <div style={{flex:1}}>
        <div className="shimmer-bg" style={{height:14,borderRadius:4,marginBottom:8}}/>
        <div className="shimmer-bg" style={{height:10,width:"60%",borderRadius:4}}/>
      </div>
    </div>
    {[["85%",10],["60%",10],["100%",3]].map(([w,h],i)=>(
      <div key={i} className="shimmer-bg" style={{width:w,height:h,borderRadius:4,marginBottom:10}}/>
    ))}
  </div>
);

const Toast = ({msg,type="success",onClose}) => (
  <div className="pop" style={{position:"fixed",bottom:"calc(90px + env(safe-area-inset-bottom,0px))",right:16,zIndex:1001,padding:"14px 20px",borderRadius:16,
    background:type==="success"?`${C.mint}18`:type==="error"?`${C.coral}18`:`${C.gold}18`,
    border:`1px solid ${type==="success"?C.mint:type==="error"?C.coral:C.gold}40`,
    display:"flex",gap:12,alignItems:"center",maxWidth:360,boxShadow:"0 20px 60px rgba(0,0,0,.4)"}}>
    <span style={{fontSize:20}}>{type==="success"?"✅":type==="error"?"❌":"⚠️"}</span>
    <span style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,.8)",flex:1}}>{msg}</span>
    <span onClick={onClose} style={{fontSize:18,color:"rgba(255,255,255,.3)",cursor:"pointer"}}>✕</span>
  </div>
);

/* ── Auth Modal ──────────────────────────────────────── */
const AuthModal = ({onClose, onAuth}) => {
  const [mode,setMode] = useState("login"); // login | signup | otp
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [name,setName] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [otpSent,setOtpSent] = useState(false);

  const handleAuth = async () => {
    if (!email) return setError("Email is required");
    setLoading(true); setError("");
    try {
      if (mode === "otp") {
        // Passwordless magic link / OTP
        const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin } });
        if (error) throw error;
        setOtpSent(true);
      } else if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        onAuth(data.user);
        onClose();
      } else {
        if (!name) return setError("Name is required");
        const { data, error } = await supabase.auth.signUp({ email, password,
          options: { data: { full_name: name }, emailRedirectTo: window.location.origin }
        });
        if (error) throw error;
        if (data.user) { onAuth(data.user); onClose(); }
        else setError("Check your email to confirm your account!");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally { setLoading(false); }
  };

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider:"google", options:{ redirectTo: window.location.origin } });
    if (error) setError(error.message);
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(10px)"}}/>
      <div className="pop" style={{position:"relative",background:C.surface,borderRadius:28,padding:32,maxWidth:420,width:"100%",border:`1px solid ${C.border}`,boxShadow:"0 40px 100px rgba(0,0,0,.6)"}}>
        <div onClick={onClose} style={{position:"absolute",top:16,right:16,width:36,height:36,borderRadius:12,background:C.card,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",border:`1px solid ${C.border}`,color:C.muted,fontSize:18}}>✕</div>

        <div style={{textAlign:"center",marginBottom:28}}>
          <div style={{fontSize:40,marginBottom:12}}>🚀</div>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:26,color:"#fff",letterSpacing:1}}>{mode==="login"?"WELCOME BACK":mode==="signup"?"JOIN UDYAM PATH":"MAGIC LINK"}</div>
          <div style={{fontSize:13,color:C.muted,marginTop:4}}>Free forever - No credit card</div>
        </div>

        {otpSent ? (
          <div style={{textAlign:"center",padding:"20px 0"}}>
            <div style={{fontSize:48,marginBottom:12}}>📧</div>
            <div style={{fontWeight:800,color:"#fff",fontSize:16,marginBottom:8}}>Check Your Email!</div>
            <div style={{fontSize:13,color:C.muted,lineHeight:1.8}}>We sent a magic link to <strong style={{color:C.lime}}>{email}</strong>. Click it to sign in instantly.</div>
          </div>
        ) : (
          <>
            {/* Google Auth */}
            <div onClick={handleGoogle} className="btn" style={{width:"100%",padding:"13px",borderRadius:14,background:C.card,border:`1px solid ${C.border}`,display:"flex",alignItems:"center",justifyContent:"center",gap:10,marginBottom:20,fontSize:14,fontWeight:700,color:"rgba(255,255,255,.7)"}}>
              <span style={{fontSize:20}}>🔵</span> Continue with Google
            </div>
            <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
              <div style={{flex:1,height:1,background:C.border}}/><span style={{fontSize:11,color:C.muted}}>OR</span><div style={{flex:1,height:1,background:C.border}}/>
            </div>

            {mode==="signup" && (
              <div style={{marginBottom:14}}>
                <label style={{fontSize:11,fontWeight:800,color:C.muted,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>Full Name *</label>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Arjun Kumar" className="input-z"
                  style={{width:"100%",padding:"13px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:14,fontFamily:"Plus Jakarta Sans,sans-serif",background:C.card,color:"#fff"}}/>
              </div>
            )}

            <div style={{marginBottom:14}}>
              <label style={{fontSize:11,fontWeight:800,color:C.muted,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>Email *</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" type="email" className="input-z"
                style={{width:"100%",padding:"13px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:14,fontFamily:"Plus Jakarta Sans,sans-serif",background:C.card,color:"#fff"}}/>
            </div>

            {mode !== "otp" && (
              <div style={{marginBottom:14}}>
                <label style={{fontSize:11,fontWeight:800,color:C.muted,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>Password *</label>
                <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Min 8 characters" type="password" className="input-z"
                  style={{width:"100%",padding:"13px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:14,fontFamily:"Plus Jakarta Sans,sans-serif",background:C.card,color:"#fff"}}/>
              </div>
            )}

            {error && <div style={{fontSize:12,color:C.coral,marginBottom:12,padding:"10px 14px",borderRadius:10,background:`${C.coral}12`,fontWeight:700}}>⚠️ {error}</div>}

            <button onClick={handleAuth} disabled={loading} className="btn glow-pulse"
              style={{width:"100%",padding:16,borderRadius:14,background:loading?"rgba(170,255,0,.3)":`linear-gradient(135deg,${C.lime},#00C8E0)`,color:C.bg,border:"none",fontFamily:"Syne,sans-serif",fontSize:20,letterSpacing:1,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
              {loading ? <><Spinner size={20} color={C.bg}/> Processing...</> : mode==="login"?"SIGN IN →":mode==="signup"?"CREATE FREE ACCOUNT →":"SEND MAGIC LINK ✉️"}
            </button>

            <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:16,fontSize:12,flexWrap:"wrap"}}>
              {mode!=="login"&&<span onClick={()=>{setMode("login");setError("");}} style={{color:C.lime,cursor:"pointer",fontWeight:700}}>Already have account? Sign In</span>}
              {mode!=="signup"&&<span onClick={()=>{setMode("signup");setError("");}} style={{color:C.muted,cursor:"pointer"}}>Create Account</span>}
              {mode!=="otp"&&<span onClick={()=>{setMode("otp");setError("");}} style={{color:C.muted,cursor:"pointer"}}>Magic Link (No Password)</span>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ── Job Card ────────────────────────────────────────── */
const JobCard = ({job, onOpen, saved, onSave, user, onAuthRequired, isApplied, isFeatured, userSkills}) => {
  const isFull = job.filled_seats >= job.total_seats;
  const pct = Math.min(100, Math.round(((job.filled_seats||0)/(job.total_seats||1))*100));
  const urgent = pct >= 80;

  const handleSave = (e) => {
    e.stopPropagation();
    if (!user) return onAuthRequired();
    onSave(job.id);
  };

  return (
    <div className="card-hover" onClick={()=>!isFull&&onOpen(job)}
      style={{
        background:"linear-gradient(145deg,#0D0D20,#0A0A18)",
        borderRadius:16,padding:20,
        border:`1px solid ${isFull?"rgba(255,61,113,.2)":urgent?"rgba(255,183,0,.15)":"rgba(0,229,255,.08)"}`,
        cursor:isFull?"default":"pointer",position:"relative",opacity:isFull?.5:1,
        transition:"all .3s",overflow:"hidden"
      }}>

      {/* Glow accent top */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:1,background:isFull?"rgba(255,61,113,.3)":urgent?`linear-gradient(90deg,transparent,rgba(255,183,0,.6),transparent)`:`linear-gradient(90deg,transparent,rgba(0,229,255,.4),transparent)`}}/>

      {/* Status badge */}
      <div style={{position:"absolute",top:12,right:44,display:"flex",gap:6}}>
        {isFull&&<span className="tag" style={{background:"rgba(255,61,113,.15)",color:"#FF3D71",border:"1px solid rgba(255,61,113,.25)"}}>FILLED</span>}
        {job.is_hot&&!isFull&&<span className="tag" style={{background:"rgba(255,183,0,.12)",color:"#FFB700",border:"1px solid rgba(255,183,0,.2)"}}>🔥 HOT</span>}
        {job.is_new&&!isFull&&!job.is_hot&&<span className="tag" style={{background:"rgba(0,214,143,.12)",color:"#00D68F",border:"1px solid rgba(0,214,143,.2)"}}>NEW</span>}
        {isApplied&&<span className="tag" style={{background:"rgba(0,229,255,.12)",color:"#00E5FF",border:"1px solid rgba(0,229,255,.2)"}}>✓ Applied</span>}
        {isFeatured&&<span className="tag" style={{background:"rgba(255,0,128,.12)",color:"#FF0080",border:"1px solid rgba(255,0,128,.2)"}}>⭐</span>}
      </div>

      {/* Save */}
      <div onClick={handleSave} style={{position:"absolute",top:12,right:14,fontSize:16,cursor:"pointer",opacity:.5,transition:"all .2s",zIndex:2}}
        onMouseEnter={e=>e.currentTarget.style.opacity=1} onMouseLeave={e=>e.currentTarget.style.opacity=.5}>
        {saved?"🔖":"🏷"}
      </div>

      {/* Header */}
      <div style={{display:"flex",gap:12,marginBottom:14,paddingRight:24}}>
        <div style={{
          width:44,height:44,borderRadius:12,flexShrink:0,
          background:`linear-gradient(135deg,${job.logo_color_1||"#00E5FF"},${job.logo_color_2||"#7C3AED"})`,
          display:"flex",alignItems:"center",justifyContent:"center",
          color:"#fff",fontWeight:800,fontSize:17,fontFamily:"Syne,sans-serif",
          boxShadow:`0 4px 16px ${job.logo_color_1||"#00E5FF"}30`
        }}>
          {(job.company_name||"?")[0].toUpperCase()}
        </div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,fontSize:14,color:"#fff",marginBottom:2,lineHeight:1.3,letterSpacing:-.2}}>{job.title}</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,.4)",fontWeight:500}}>{job.company_name} - {job.location}</div>
        </div>
      </div>

      {/* Match + chips */}
      <div style={{display:"flex",gap:5,flexWrap:"wrap",marginBottom:10,alignItems:"center"}}>
        <JobMatchBadge job={job} userSkills={userSkills||[]}/>
        <Chip color={["Remote","WFH"].includes(job.work_type)?"#00E5FF":job.work_type==="Hybrid"?"#A78BFA":"#FFB700"}>
          {job.work_type==="Remote"?"⚡ Remote":job.work_type==="WFH"?"🏠 WFH":job.work_type==="Hybrid"?"⚡ Hybrid":"🏢 "+job.work_type}
        </Chip>
        <Chip color={job.region==="India"?"#FFB700":"#7C3AED"}>{job.region==="India"?"🇮🇳 India":"🌐 "+job.region}</Chip>
        <Chip color="rgba(255,255,255,.18)">{job.experience_level}</Chip>
      </div>

      {/* Skill tags */}
      <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:14}}>
        {(job.skills_tags||[]).slice(0,4).map(t=>(
          <span key={t} style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:4,background:"rgba(0,229,255,.06)",color:"rgba(0,229,255,.7)",fontFamily:"Space Mono,monospace",border:"1px solid rgba(0,229,255,.1)"}}>{t}</span>
        ))}
      </div>

      {/* Footer */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",paddingTop:12,borderTop:"1px solid rgba(255,255,255,.05)"}}>
        <div>
          <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:16,color:"#fff",letterSpacing:-.3}}>{job.salary_range||"Competitive"}</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,.22)",marginTop:2,fontFamily:"Space Mono,monospace"}}>
            {job.filled_seats||0} applied - {job.posted_ago||"Recently"}
          </div>
        </div>
        {!isFull && (
          <div className="btn" style={{
            padding:"8px 18px",borderRadius:8,
            background:"linear-gradient(135deg,#00E5FF,#7C3AED)",
            color:"#fff",fontWeight:700,fontSize:11,fontFamily:"Syne,sans-serif",
            letterSpacing:.3,boxShadow:"0 4px 16px rgba(0,229,255,.2)"
          }} onClick={e=>{e.stopPropagation();if(job.contact_email){onOpen(job);}else if(job.apply_url){window.open(job.apply_url,"_blank");}else{onOpen(job);}}}>
            {job.apply_url ? "APPLY ↗" : "APPLY →"}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div style={{marginTop:12}}>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:9,marginBottom:4,fontFamily:"Space Mono,monospace"}}>
          <span style={{color:urgent?"#FF3D71":"rgba(0,229,255,.6)",fontWeight:700}}>{job.filled_seats||0}/{job.total_seats||10} seats {urgent&&"- FILLING FAST"}</span>
          <span style={{color:"rgba(255,255,255,.18)"}}>{pct}%</span>
        </div>
        <div style={{height:3,borderRadius:99,background:"rgba(255,255,255,.04)"}}>
          <div style={{width:`${pct}%`,height:"100%",borderRadius:99,
            background:urgent?"linear-gradient(90deg,#FF3D71,#FF6B9D)":"linear-gradient(90deg,#00E5FF,#7C3AED)",
            transition:"width .8s cubic-bezier(.16,1,.3,1)"
          }}/>
        </div>
      </div>
    </div>
  );
};

/* ── Job Detail Panel ────────────────────────────────── */
const JobDetail = ({job, onClose, user, onAuthRequired}) => {
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [applicantName, setApplicantName] = useState(user?.user_metadata?.full_name||"");
  const [applicantEmail, setApplicantEmail] = useState(user?.email||"");
  const [phone, setPhone] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [experience, setExperience] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [coverNote, setCoverNote] = useState("");
  const [resumeFile, setResumeFile] = useState(null);

  const handleApply = async () => {
    if (!user) return onAuthRequired();
    if (!applicantName || !applicantEmail) return;
    setLoading(true);
    try {
      // 0. Upload resume if provided
      let resumeUrl = null;
      if (resumeFile) {
        const fileExt = resumeFile.name.split(".").pop();
        const fileName = `${user.id}-${Date.now()}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from("resumes").upload(fileName, resumeFile, { contentType: resumeFile.type, upsert: true });
        if (!uploadError) {
          const { data: urlData } = supabase.storage.from("resumes").getPublicUrl(fileName);
          resumeUrl = urlData?.publicUrl;
        }
      }
      // 1. Save application to DB
      const { error } = await supabase.from("applications").insert({
        job_id: job.id,
        user_id: user.id,
        applicant_name: applicantName,
        applicant_email: applicantEmail,
        cover_note: `Phone: ${phone} | LinkedIn: ${linkedin} | Experience: ${experience} | Location: ${currentLocation} | Note: ${coverNote}`,
        resume_url: resumeUrl,
        status: "submitted",
      });
      if (error) throw error;

      // 2. Update filled seats (real-time trigger)
      await supabase.from("jobs").update({ filled_seats: (job.filled_seats||0) + 1 }).eq("id", job.id);

      // 3. Send confirmation email to candidate
      await fetch("/api/send-confirmation", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ email: applicantEmail, name: applicantName, jobTitle: job.title, company: job.company_name }),
      });

      // 4. Send application email to HR if contact_email exists
      if (job.contact_email) {
        await fetch("/api/send-to-hr", {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify({
            hrEmail: job.contact_email,
            jobTitle: job.title,
            company: job.company_name,
            applicantName,
            applicantEmail,
            phone,
            linkedin,
            experience,
            currentLocation,
            coverNote,
            resumeUrl,
          }),
        });
      }

      setApplied(true);
    } catch (err) {
      console.error(err);
    } finally { setLoading(false); }
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:300,display:"flex",justifyContent:"flex-end"}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.75)",backdropFilter:"blur(8px)"}}/>
      <div style={{position:"relative",width:"100%",maxWidth:540,background:C.surface,height:"100vh",overflowY:"auto",
        boxShadow:"-20px 0 80px rgba(0,0,0,.5)",animation:"slideIn .35s cubic-bezier(.22,1,.36,1)",display:"flex",flexDirection:"column"}}>

        {/* Header */}
        <div style={{background:C.card,padding:"22px 24px 18px",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:14}}>
            <div style={{width:56,height:56,borderRadius:18,background:`linear-gradient(135deg,${job.logo_color_1||C.lime},${job.logo_color_2||C.mint})`,
              display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:24,fontFamily:"Syne,sans-serif"}}>
              {(job.company_name||"?")[0]}
            </div>
            <div onClick={onClose} style={{width:38,height:38,borderRadius:12,background:C.surface,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",border:`1px solid ${C.border}`,color:C.muted,fontSize:18}}>✕</div>
          </div>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:24,color:"#fff",letterSpacing:.5,marginBottom:6}}>{job.title}</div>
          <div style={{fontSize:13,color:C.muted,marginBottom:12}}>{job.company_name} - {job.location}</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <Chip color={C.lime}>{job.work_type}</Chip>
            <Chip color={C.gold}>{job.region}</Chip>
            <Chip color={C.mint}>{job.experience_level}</Chip>
            {(job.filled_seats||0)>=(job.total_seats||10)
              ? <Chip color={C.coral}>Position Filled</Chip>
              : job.contact_email
                ? <Chip color="#00E5FF">⚡ Direct Apply</Chip>
                : <Chip color={C.mint}>✓ Actively Hiring</Chip>
            }
          </div>
        </div>

        {/* Content */}
        <div style={{flex:1,overflowY:"auto",padding:24}}>
          {/* Stats grid */}
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
            {[["💰","Salary",job.salary_range],["📊","Experience",job.experience_level],
              ["👥","Applicants",(job.filled_seats||0).toLocaleString("en-IN")],["🏢","Work Type",job.work_type]].map(([ic,lb,val])=>(
              <div key={lb} style={{padding:"14px",borderRadius:14,background:C.card,border:`1px solid ${C.border}`}}>
                <div style={{fontSize:10,color:C.muted,marginBottom:4,textTransform:"uppercase",letterSpacing:.5}}>{ic} {lb}</div>
                <div style={{fontWeight:800,color:"#fff",fontSize:14}}>{val}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div style={{fontFamily:"Syne,sans-serif",fontSize:18,color:"#fff",letterSpacing:.5,marginBottom:10}}>About The Role</div>
          <div style={{fontSize:13,color:"rgba(255,255,255,.55)",lineHeight:1.9,marginBottom:20}}>{job.description||"Exciting opportunity to join a growing team. Apply now to learn more!"}</div>

          {/* Skills */}
          {(job.skills_tags||[]).length>0 && (
            <>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:18,color:"#fff",letterSpacing:.5,marginBottom:10}}>Skills Required</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
                {job.skills_tags.map(s=><span key={s} style={{padding:"8px 16px",borderRadius:10,background:`${C.lime}12`,color:C.lime,fontWeight:700,fontSize:13,border:`1px solid ${C.lime}25`}}>{s}</span>)}
              </div>
            </>
          )}

          {/* Application Form */}
          {!applied ? (
            <div style={{background:C.card,borderRadius:20,padding:20,border:`1px solid ${C.border}`}}>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:18,color:"#fff",letterSpacing:.5,marginBottom:16}}>APPLY NOW - FREE</div>
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {/* Row 1 - Name + Email */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <input value={applicantName} onChange={e=>setApplicantName(e.target.value)} placeholder="Full name *" className="input-z"
                    style={{width:"100%",padding:"12px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:13,fontFamily:"Plus Jakarta Sans,sans-serif",background:C.surface,color:"#fff"}}/>
                  <input value={applicantEmail} onChange={e=>setApplicantEmail(e.target.value)} placeholder="Email *" type="email" className="input-z"
                    style={{width:"100%",padding:"12px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:13,fontFamily:"Plus Jakarta Sans,sans-serif",background:C.surface,color:"#fff"}}/>
                </div>

                {/* Row 2 - Phone + Location */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="📱 Phone number" className="input-z"
                    style={{width:"100%",padding:"12px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:13,fontFamily:"Plus Jakarta Sans,sans-serif",background:C.surface,color:"#fff"}}/>
                  <input value={currentLocation} onChange={e=>setCurrentLocation(e.target.value)} placeholder="📍 Current city" className="input-z"
                    style={{width:"100%",padding:"12px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:13,fontFamily:"Plus Jakarta Sans,sans-serif",background:C.surface,color:"#fff"}}/>
                </div>

                {/* Row 3 - Experience + LinkedIn */}
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  <select value={experience} onChange={e=>setExperience(e.target.value)} className="input-z"
                    style={{width:"100%",padding:"12px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:13,fontFamily:"Plus Jakarta Sans,sans-serif",background:C.surface,color:experience?"#fff":"rgba(255,255,255,.3)",cursor:"pointer"}}>
                    <option value="">🎓 Experience level</option>
                    <option>Fresher (0 years)</option>
                    <option>0-1 year</option>
                    <option>1-2 years</option>
                    <option>2-5 years</option>
                    <option>5-10 years</option>
                    <option>10+ years</option>
                  </select>
                  <input value={linkedin} onChange={e=>setLinkedin(e.target.value)} placeholder="💼 LinkedIn URL (optional)" className="input-z"
                    style={{width:"100%",padding:"12px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:13,fontFamily:"Plus Jakarta Sans,sans-serif",background:C.surface,color:"#fff"}}/>
                </div>

                {/* Cover Note */}
                <textarea value={coverNote} onChange={e=>setCoverNote(e.target.value)} placeholder="✍️ Why are you a good fit for this role? (optional)"
                  style={{width:"100%",padding:"12px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:13,fontFamily:"Plus Jakarta Sans,sans-serif",background:C.surface,color:"#fff",height:80,resize:"none"}} className="input-z"/>

                {/* Resume Upload */}
                <div>
                  <label style={{fontSize:11,fontWeight:800,color:C.muted,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>📄 Upload Resume (PDF/DOC)</label>
                  <div style={{position:"relative"}}>
                    <input type="file" accept=".pdf,.doc,.docx" onChange={e=>setResumeFile(e.target.files[0])}
                      style={{position:"absolute",inset:0,opacity:0,cursor:"pointer",zIndex:2,width:"100%"}}/>
                    <div style={{width:"100%",padding:"12px 16px",borderRadius:12,border:`1.5px dashed ${resumeFile?C.lime:C.border}`,fontSize:13,background:resumeFile?`${C.lime}08`:C.surface,color:resumeFile?C.lime:"rgba(255,255,255,.3)",display:"flex",alignItems:"center",gap:10,transition:"all .2s"}}>
                      <span style={{fontSize:20}}>{resumeFile?"📄":"📎"}</span>
                      <span style={{flex:1}}>{resumeFile?resumeFile.name:"Click to upload resume"}</span>
                      {resumeFile&&<span style={{fontSize:10,color:C.mint,fontWeight:800}}>✓ Ready</span>}
                    </div>
                  </div>
                  <div style={{fontSize:10,color:"rgba(255,255,255,.2)",marginTop:4}}>PDF, DOC, DOCX - Max 5MB - Stored securely in Supabase</div>
                </div>

                <button onClick={handleApply} disabled={loading} className="btn"
                  style={{width:"100%",padding:16,borderRadius:14,background:loading?"rgba(170,255,0,.3)":`linear-gradient(135deg,${C.lime},#00C8E0)`,color:C.bg,border:"none",fontFamily:"Syne,sans-serif",fontSize:20,letterSpacing:1,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                  {loading ? <><Spinner size={20} color={C.bg}/> Submitting...</> : "SUBMIT APPLICATION 🚀"}
                </button>
                <div style={{textAlign:"center",fontSize:11,color:C.muted}}>✅ Your email will be sent to {job.company_name} - Confirmation sent to you</div>
              </div>
            </div>
          ) : (
            <div style={{padding:28,borderRadius:20,background:`${C.mint}10`,border:`1px solid ${C.mint}30`,textAlign:"center"}}>
              <div style={{fontSize:48,marginBottom:12}} className="float">🎉</div>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:24,color:C.mint,letterSpacing:.5}}>APPLICATION SUBMITTED!</div>
              <div style={{fontSize:13,color:C.muted,marginTop:8,lineHeight:1.8}}>Check your email at <strong style={{color:"#fff"}}>{applicantEmail}</strong> for confirmation.<br/>We have notified {job.company_name}. Good luck! 🙏</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Alert Setup ─────────────────────────────────────── */
const AlertSetup = ({user, onAuthRequired, onToast}) => {
  const [email, setEmail] = useState(user?.email||"");
  const [keyword, setKeyword] = useState("");
  const [region, setRegion] = useState("India");
  const [workType, setWorkType] = useState("Any");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async () => {
    if (!email) return;
    if (!user) return onAuthRequired();
    setLoading(true);
    try {
      const { error } = await supabase.from("job_alerts").insert({
        user_id: user.id,
        email,
        keyword,
        region: region==="Any"?null:region,
        work_type: workType==="Any"?null:workType,
        active: true,
      });
      if (error) throw error;

      // Send welcome email via API
      await fetch("/api/setup-alert", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ email, keyword, region, workType }),
      });

      setDone(true);
      onToast("🔔 Job alert activated! Check your email.", "success");
    } catch (err) {
      onToast(err.message, "error");
    } finally { setLoading(false); }
  };

  if (done) return (
    <div style={{maxWidth:500,margin:"0 auto",padding:32,textAlign:"center"}}>
      <div style={{fontSize:64,marginBottom:16}} className="float">🎊</div>
      <div style={{fontFamily:"Syne,sans-serif",fontSize:28,color:C.lime,letterSpacing:.5}}>ALERT ACTIVATED!</div>
      <div style={{fontSize:14,color:C.muted,marginTop:10,lineHeight:1.8}}>We'll email <strong style={{color:"#fff"}}>{email}</strong> instantly when new matching jobs are posted.</div>
    </div>
  );

  return (
    <div style={{maxWidth:600,margin:"0 auto",padding:"28px 20px"}}>
      <div className="fu" style={{fontFamily:"Syne,sans-serif",fontSize:34,color:"#fff",letterSpacing:.5,marginBottom:6}}>JOB ALERTS 🔔</div>
      <div className="fu1" style={{fontSize:14,color:C.muted,marginBottom:24}}>Get real email alerts the moment new matching jobs are posted. Free forever.</div>
      <div className="fu2" style={{background:C.card,borderRadius:24,padding:28,border:`1px solid ${C.border}`,display:"flex",flexDirection:"column",gap:14}}>
        <div>
          <label style={{fontSize:11,fontWeight:800,color:C.muted,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>Your Email *</label>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@email.com" className="input-z"
            style={{width:"100%",padding:"13px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:14,fontFamily:"Plus Jakarta Sans,sans-serif",background:C.surface,color:"#fff"}}/>
        </div>
        <div>
          <label style={{fontSize:11,fontWeight:800,color:C.muted,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>Job Keyword (optional)</label>
          <input value={keyword} onChange={e=>setKeyword(e.target.value)} placeholder="e.g. React Developer, Data Scientist" className="input-z"
            style={{width:"100%",padding:"13px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:14,fontFamily:"Plus Jakarta Sans,sans-serif",background:C.surface,color:"#fff"}}/>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[["Region","region",["Any","India","USA","UK","Canada","Australia","Singapore","Global"],region,setRegion],
            ["Work Type","type",["Any","Remote","WFH","Hybrid","In-Office"],workType,setWorkType]].map(([lb,,opts,val,set])=>(
            <div key={lb}>
              <label style={{fontSize:11,fontWeight:800,color:C.muted,display:"block",marginBottom:6,textTransform:"uppercase",letterSpacing:.6}}>{lb}</label>
              <select value={val} onChange={e=>set(e.target.value)} className="input-z"
                style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:13,fontFamily:"Plus Jakarta Sans,sans-serif",background:C.surface,color:"#fff",cursor:"pointer"}}>
                {opts.map(o=><option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>
        <button onClick={handleSubmit} disabled={loading} className="btn glow-pulse"
          style={{width:"100%",padding:16,borderRadius:14,background:`linear-gradient(135deg,${C.lime},#00C8E0)`,color:C.bg,border:"none",fontFamily:"Syne,sans-serif",fontSize:20,letterSpacing:1,cursor:loading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
          {loading ? <><Spinner size={20} color={C.bg}/> Setting Up...</> : "🔔 ACTIVATE FREE ALERT"}
        </button>
        <div style={{textAlign:"center",fontSize:11,color:C.muted}}>No spam - Unsubscribe anytime - Real emails via Resend</div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════════
   MAIN APP
══════════════════════════════════════════════════════ */

/* ── Resume Builder ──────────────────────────────── */
const ResumeBuilder = ({ user, onClose, onAuthRequired }) => {
  const [form, setForm] = useState({
    name: user?.user_metadata?.full_name || "",
    email: user?.email || "",
    phone: "", location: "", linkedin: "", summary: "",
    skills: "", experience: "", education: "", projects: ""
  });
  const [generating, setGenerating] = useState(false);
  const [done, setDone] = useState(false);

  const generateResume = async () => {
    setGenerating(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          max_tokens: 2000,
          system: "You are a professional resume writer. Generate a clean, ATS-friendly resume in plain text format. Use clear sections with headers. Be professional and concise.",
          messages: [{ role: "user", content: `Create a professional resume for: Name: ${form.name}, Email: ${form.email}, Phone: ${form.phone}, Location: ${form.location}, LinkedIn: ${form.linkedin}, Summary: ${form.summary}, Skills: ${form.skills}, Experience: ${form.experience}, Education: ${form.education}, Projects: ${form.projects}` }]
        })
      });
      const data = await response.json();
      const resumeText = data.content?.[0]?.text || "";
      
      // Create downloadable file
      const blob = new Blob([resumeText], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${form.name.replace(/ /g,"_")}_Resume.txt`;
      a.click();
      setDone(true);
    } catch(e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const C2 = { bg:"#05050A", card:"#12121F", border:"rgba(255,255,255,.07)", lime:"#00E5FF", muted:"rgba(255,255,255,.4)" };
  const inputStyle = { width:"100%", padding:"11px 14px", borderRadius:12, border:`1.5px solid ${C2.border}`, fontSize:13, fontFamily:"Plus Jakarta Sans,sans-serif", background:"#080816", color:"#fff", boxSizing:"border-box" };

  return (
    <div style={{position:"fixed",inset:0,zIndex:500,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0,0,0,.8)"}}>
      <div style={{background:C2.bg,borderRadius:24,padding:28,width:"100%",maxWidth:560,maxHeight:"90vh",overflowY:"auto",border:`1px solid ${C2.border}`,position:"relative"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:24,color:"#fff",letterSpacing:.5}}>📄 AI RESUME BUILDER</div>
          <div onClick={onClose} style={{cursor:"pointer",color:C2.muted,fontSize:20}}>✕</div>
        </div>

        {done ? (
          <div style={{textAlign:"center",padding:32}}>
            <div style={{fontSize:56,marginBottom:12}}>🎉</div>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:24,color:C2.lime}}>RESUME DOWNLOADED!</div>
            <div style={{color:C2.muted,fontSize:13,marginTop:8}}>Your AI-generated resume has been downloaded!</div>
            <div onClick={()=>setDone(false)} style={{marginTop:16,padding:"12px 28px",borderRadius:14,background:`linear-gradient(135deg,${C2.lime},#00C8E0)`,color:"#05050A",fontWeight:900,fontSize:14,cursor:"pointer",display:"inline-block"}}>Build Another</div>
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div><label style={{fontSize:11,color:C2.muted,fontWeight:800,display:"block",marginBottom:5}}>FULL NAME *</label>
                <input style={inputStyle} value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Sanjeev Kumar"/></div>
              <div><label style={{fontSize:11,color:C2.muted,fontWeight:800,display:"block",marginBottom:5}}>EMAIL *</label>
                <input style={inputStyle} value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))} placeholder="you@email.com"/></div>
              <div><label style={{fontSize:11,color:C2.muted,fontWeight:800,display:"block",marginBottom:5}}>PHONE</label>
                <input style={inputStyle} value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))} placeholder="+91 9999999999"/></div>
              <div><label style={{fontSize:11,color:C2.muted,fontWeight:800,display:"block",marginBottom:5}}>LOCATION</label>
                <input style={inputStyle} value={form.location} onChange={e=>setForm(f=>({...f,location:e.target.value}))} placeholder="Bangalore, India"/></div>
            </div>
            <div><label style={{fontSize:11,color:C2.muted,fontWeight:800,display:"block",marginBottom:5}}>LINKEDIN URL</label>
              <input style={inputStyle} value={form.linkedin} onChange={e=>setForm(f=>({...f,linkedin:e.target.value}))} placeholder="linkedin.com/in/yourname"/></div>
            <div><label style={{fontSize:11,color:C2.muted,fontWeight:800,display:"block",marginBottom:5}}>PROFESSIONAL SUMMARY</label>
              <textarea style={{...inputStyle,height:70,resize:"none"}} value={form.summary} onChange={e=>setForm(f=>({...f,summary:e.target.value}))} placeholder="5+ years React developer with expertise in..."/></div>
            <div><label style={{fontSize:11,color:C2.muted,fontWeight:800,display:"block",marginBottom:5}}>SKILLS</label>
              <input style={inputStyle} value={form.skills} onChange={e=>setForm(f=>({...f,skills:e.target.value}))} placeholder="React, Node.js, Python, AWS, MongoDB..."/></div>
            <div><label style={{fontSize:11,color:C2.muted,fontWeight:800,display:"block",marginBottom:5}}>WORK EXPERIENCE</label>
              <textarea style={{...inputStyle,height:80,resize:"none"}} value={form.experience} onChange={e=>setForm(f=>({...f,experience:e.target.value}))} placeholder="Senior Developer at TechCorp (2020-2024): Built..."/></div>
            <div><label style={{fontSize:11,color:C2.muted,fontWeight:800,display:"block",marginBottom:5}}>EDUCATION</label>
              <input style={inputStyle} value={form.education} onChange={e=>setForm(f=>({...f,education:e.target.value}))} placeholder="B.Tech Computer Science, VIT (2016-2020)"/></div>
            <div><label style={{fontSize:11,color:C2.muted,fontWeight:800,display:"block",marginBottom:5}}>PROJECTS (optional)</label>
              <input style={inputStyle} value={form.projects} onChange={e=>setForm(f=>({...f,projects:e.target.value}))} placeholder="E-commerce app with 10k users..."/></div>

            <div onClick={generateResume} style={{padding:"14px",borderRadius:14,background:generating?"rgba(170,255,0,.3)":`linear-gradient(135deg,${C2.lime},#00C8E0)`,color:"#05050A",fontFamily:"Syne,sans-serif",fontSize:20,letterSpacing:1,cursor:generating?"not-allowed":"pointer",textAlign:"center",fontWeight:900}}>
              {generating ? "✨ AI IS BUILDING YOUR RESUME..." : "🚀 GENERATE RESUME FREE WITH AI"}
            </div>
            <div style={{textAlign:"center",fontSize:11,color:C2.muted}}>Powered by Groq AI - Lightning fast - 100% Free</div>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── AI Job Chatbot ──────────────────────────────── */
const AIChatbot = ({ jobs }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "👋 Hi! I am UdyamPath AI! Ask me anything about jobs - 'Find React jobs in Bangalore', 'Fresher jobs in Mumbai', 'Remote jobs for designers' etc!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if(bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if(!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMessages = [...messages, { role: "user", text: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const jobSummary = jobs.slice(0, 50).map(j =>
        `${j.title} at ${j.company_name} | ${j.location} | ${j.salary_range} | ${j.work_type} | ${j.experience_level}`
      ).join("\n");

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.text })),
          jobSummary
        })
      });

      const data = await response.json();
      setMessages(prev => [...prev, { role: "assistant", text: data.reply }]);
    } catch(e) {
      setMessages(prev => [...prev, { role: "assistant", text: "Sorry, something went wrong. Please try again!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div onClick={() => setOpen(!open)} style={{
        position: "fixed", bottom: "calc(80px + env(safe-area-inset-bottom, 0px))", right: 16, zIndex: 1000,
        width: 60, height: 60, borderRadius: "50%",
        background: `linear-gradient(135deg, #00E5FF, #00C8E0)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", boxShadow: "0 4px 20px rgba(170,255,0,0.4)",
        fontSize: 28, transition: "transform .2s"
      }} className="btn">
        {open ? "✕" : "🤖"}
      </div>

      {/* Chat Window */}
      {open && (
        <div style={{
          position: "fixed", bottom: "calc(150px + env(safe-area-inset-bottom, 0px))", right: 16, zIndex: 998,
          width: 340, height: 480, borderRadius: 20,
          background: "#0D0D1A", border: "1px solid rgba(170,255,0,0.2)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
          display: "flex", flexDirection: "column", overflow: "hidden"
        }} className="pop">
          {/* Header */}
          <div style={{ padding: "16px 20px", background: "linear-gradient(135deg,#00E5FF,#7C3AED)", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>🤖</span>
            <div>
              <div style={{ fontWeight: 900, fontSize: 15, color: "#05050A" }}>UdyamPath AI</div>
              <div style={{ fontSize: 11, color: "#05050A", opacity: 0.7 }}>Powered by Groq AI</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "85%",
                background: m.role === "user" ? "linear-gradient(135deg,#00E5FF,#7C3AED)" : "#1A1A2E",
                color: m.role === "user" ? "#05050A" : "#fff",
                padding: "10px 14px", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                fontSize: 13, lineHeight: 1.5, fontFamily: "'Nunito',sans-serif", fontWeight: 600
              }}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", background: "#1A1A2E", padding: "10px 14px", borderRadius: "18px 18px 18px 4px", color: "#00E5FF", fontSize: 13 }}>
                ✨ Thinking...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,.08)", display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask about jobs..."
              style={{
                flex: 1, padding: "10px 14px", borderRadius: 12,
                border: "1.5px solid rgba(170,255,0,0.2)",
                background: "#1A1A2E", color: "#fff", fontSize: 13,
                fontFamily: "'Nunito',sans-serif", outline: "none"
              }}
            />
            <div onClick={sendMessage} className="btn" style={{
              width: 40, height: 40, borderRadius: 12,
              background: loading ? "rgba(170,255,0,.3)" : "linear-gradient(135deg,#00E5FF,#7C3AED)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: loading ? "not-allowed" : "pointer", fontSize: 18, flexShrink: 0
            }}>
              🚀
            </div>
          </div>
        </div>
      )}
    </>
  );
};



/* ══════════════════════════════════════════════════
   AI JOB MATCH SCORE
══════════════════════════════════════════════════ */
const JobMatchBadge = ({ job, userSkills }) => {
  if(!userSkills || userSkills.length === 0) return null;
  const jobText = `${job.title} ${job.category} ${(job.skills_tags||[]).join(" ")}`.toLowerCase();
  const matches = userSkills.filter(s => jobText.includes(s.toLowerCase()));
  const score = Math.min(100, Math.round((matches.length / Math.max(userSkills.length, 1)) * 100) + Math.floor(Math.random()*10));
  const color = score >= 70 ? "#00E5FF" : score >= 40 ? "#FBBF24" : "#F43F5E";
  return (
    <div style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px",borderRadius:8,background:`${color}15`,border:`1px solid ${color}30`}}>
      <div style={{fontSize:10,fontWeight:900,color,fontFamily:"Space Mono,monospace"}}>{score}% MATCH</div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   SALARY INSIGHTS PAGE
══════════════════════════════════════════════════ */
const SalaryInsights = ({ jobs }) => {
  const [role, setRole] = useState("");
  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const C2 = {bg:"#05050A",card:"#12121F",border:"rgba(255,255,255,.07)",lime:"#00E5FF",muted:"rgba(255,255,255,.4)",surface:"#0D0D1A"};

  const topRoles = ["React Developer","Python Developer","Data Scientist","Product Manager","UI/UX Designer","DevOps Engineer","Node.js Developer","Machine Learning","Digital Marketing","HR Manager"];
  const topCities = ["Bangalore","Mumbai","Delhi","Hyderabad","Chennai","Pune","Remote","USA","UK","Canada"];

  const analyze = async () => {
    if(!role) return;
    setLoading(true);
    try {
      const relevant = jobs.filter(j =>
        j.title?.toLowerCase().includes(role.toLowerCase()) &&
        (city ? j.location?.toLowerCase().includes(city.toLowerCase()) : true)
      );
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({
          messages: [{role:"user", content:`Give salary insights for "${role}" ${city ? `in ${city}` : "in India"}. Include: average salary range, entry level, mid level, senior level, top companies hiring. Be specific with Indian rupees (LPA). Format nicely.`}],
          jobSummary: relevant.slice(0,20).map(j=>`${j.title} at ${j.company_name} | ${j.location} | ${j.salary_range}`).join("\n")
        })
      });
      const data = await response.json();
      setResult({text: data.reply, count: relevant.length});
    } catch(e) { setResult({text:"Could not fetch salary data. Try again!", count:0}); }
    finally { setLoading(false); }
  };

  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"24px 20px"}}>
      <div style={{fontFamily:"Syne,sans-serif",fontSize:32,color:"#fff",letterSpacing:.5,marginBottom:4}}>📊 SALARY INSIGHTS</div>
      <div style={{color:C2.muted,fontSize:14,marginBottom:24}}>Discover real salary data for any role in India & worldwide</div>

      <div style={{background:C2.card,borderRadius:20,padding:24,border:`1px solid ${C2.border}`,marginBottom:24}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr auto",gap:12,alignItems:"end"}}>
          <div>
            <div style={{fontSize:11,fontWeight:800,color:C2.muted,marginBottom:6}}>JOB ROLE *</div>
            <input value={role} onChange={e=>setRole(e.target.value)} placeholder="e.g. React Developer"
              style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1.5px solid ${C2.border}`,background:C2.surface,color:"#fff",fontSize:14,fontFamily:"Plus Jakarta Sans,sans-serif",boxSizing:"border-box"}}/>
          </div>
          <div>
            <div style={{fontSize:11,fontWeight:800,color:C2.muted,marginBottom:6}}>CITY (optional)</div>
            <input value={city} onChange={e=>setCity(e.target.value)} placeholder="e.g. Bangalore"
              style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1.5px solid ${C2.border}`,background:C2.surface,color:"#fff",fontSize:14,fontFamily:"Plus Jakarta Sans,sans-serif",boxSizing:"border-box"}}/>
          </div>
          <div onClick={analyze} style={{padding:"12px 24px",borderRadius:12,background:loading?"rgba(170,255,0,.3)":`linear-gradient(135deg,${C2.lime},#00C8E0)`,color:"#05050A",fontWeight:900,fontSize:14,cursor:"pointer",whiteSpace:"nowrap"}}>
            {loading?"Analyzing...":"🔍 Analyze"}
          </div>
        </div>

        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:14}}>
          {topRoles.map(r=>(
            <div key={r} onClick={()=>setRole(r)} style={{padding:"5px 12px",borderRadius:999,background:role===r?`${C2.lime}20`:"rgba(255,255,255,.05)",border:`1px solid ${role===r?C2.lime:"rgba(255,255,255,.1)"}`,color:role===r?C2.lime:"rgba(255,255,255,.5)",fontSize:11,fontWeight:700,cursor:"pointer"}}>
              {r}
            </div>
          ))}
        </div>
        <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:8}}>
          {topCities.map(c=>(
            <div key={c} onClick={()=>setCity(c)} style={{padding:"5px 12px",borderRadius:999,background:city===c?`rgba(56,189,248,.2)`:"rgba(255,255,255,.05)",border:`1px solid ${city===c?"#38BDF8":"rgba(255,255,255,.1)"}`,color:city===c?"#38BDF8":"rgba(255,255,255,.5)",fontSize:11,fontWeight:700,cursor:"pointer"}}>
              {c}
            </div>
          ))}
        </div>
      </div>

      {result && (
        <div style={{background:C2.card,borderRadius:20,padding:24,border:`1px solid ${C2.lime}30`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:20,color:C2.lime}}>💰 {role} {city?`in ${city}`:""}</div>
            <div style={{fontSize:12,color:C2.muted}}>{result.count} live jobs found</div>
          </div>
          <div style={{color:"rgba(255,255,255,.85)",fontSize:14,lineHeight:1.8,whiteSpace:"pre-wrap",fontFamily:"Plus Jakarta Sans,sans-serif"}}>{result.text}</div>
        </div>
      )}

      {!result && !loading && (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:14}}>
          {[["React Developer","Bangalore","₹8-25 LPA"],["Python Developer","India","₹6-20 LPA"],["Data Scientist","Mumbai","₹10-30 LPA"],["UI/UX Designer","Remote","₹5-18 LPA"]].map(([r,c,s])=>(
            <div key={r} onClick={()=>{setRole(r);setCity(c);}} style={{background:C2.card,borderRadius:16,padding:20,border:`1px solid ${C2.border}`,cursor:"pointer",transition:"all .2s"}} className="btn">
              <div style={{fontWeight:800,color:"#fff",fontSize:14,marginBottom:4}}>{r}</div>
              <div style={{color:C2.muted,fontSize:12,marginBottom:8}}>{c}</div>
              <div style={{color:C2.lime,fontWeight:900,fontSize:16}}>{s}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   MOCK INTERVIEW AI
══════════════════════════════════════════════════ */
const MockInterview = () => {
  const [role, setRole] = useState("");
  const [started, setStarted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0);
  const bottomRef = useRef(null);
  const C2 = {bg:"#05050A",card:"#12121F",border:"rgba(255,255,255,.07)",lime:"#00E5FF",muted:"rgba(255,255,255,.4)",surface:"#0D0D1A"};

  useEffect(()=>{ if(bottomRef.current) bottomRef.current.scrollIntoView({behavior:"smooth"}); },[messages]);

  const startInterview = async () => {
    if(!role) return;
    setStarted(true);
    setLoading(true);
    setQuestionCount(1);
    try {
      const response = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          messages:[{role:"user",content:`Start a mock interview for a ${role} position. Ask the first interview question only. Be professional.`}],
          jobSummary:""
        })
      });
      const data = await response.json();
      setMessages([{role:"interviewer",text:data.reply}]);
    } catch(e) { setMessages([{role:"interviewer",text:"Tell me about yourself and your experience."}]); }
    finally { setLoading(false); }
  };

  const sendAnswer = async () => {
    if(!input.trim() || loading) return;
    const answer = input.trim();
    setInput("");
    const newMsgs = [...messages, {role:"candidate",text:answer}];
    setMessages(newMsgs);
    setLoading(true);
    try {
      const isLastQuestion = questionCount >= 5;
      const prompt = isLastQuestion
        ? `The candidate answered: "${answer}". Give detailed feedback on all their answers and an overall score out of 10. Be encouraging but honest.`
        : `The candidate answered: "${answer}". Give brief feedback (1 sentence) then ask the next interview question. Question ${questionCount+1} of 5.`;
      const response = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({messages:[{role:"user",content:prompt}],jobSummary:""})
      });
      const data = await response.json();
      setMessages(prev=>[...prev,{role:"interviewer",text:data.reply}]);
      setQuestionCount(q=>q+1);
    } catch(e) { setMessages(prev=>[...prev,{role:"interviewer",text:"Please continue with the next question."}]); }
    finally { setLoading(false); }
  };

  const roles = ["Software Engineer","React Developer","Product Manager","Data Scientist","UI/UX Designer","DevOps Engineer","Marketing Manager","HR Manager"];

  return (
    <div style={{maxWidth:800,margin:"0 auto",padding:"24px 20px"}}>
      <div style={{fontFamily:"Syne,sans-serif",fontSize:32,color:"#fff",letterSpacing:.5,marginBottom:4}}>🎤 MOCK INTERVIEW AI</div>
      <div style={{color:C2.muted,fontSize:14,marginBottom:24}}>Practice interviews with AI - get real feedback instantly</div>

      {!started ? (
        <div style={{background:C2.card,borderRadius:20,padding:28,border:`1px solid ${C2.border}`}}>
          <div style={{fontSize:16,fontWeight:800,color:"#fff",marginBottom:16}}>Choose your role:</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:20}}>
            {roles.map(r=>(
              <div key={r} onClick={()=>setRole(r)} style={{padding:"8px 16px",borderRadius:10,background:role===r?`${C2.lime}20`:"rgba(255,255,255,.05)",border:`1px solid ${role===r?C2.lime:"rgba(255,255,255,.1)"}`,color:role===r?C2.lime:"rgba(255,255,255,.6)",fontSize:13,fontWeight:700,cursor:"pointer"}}>
                {r}
              </div>
            ))}
          </div>
          <input value={role} onChange={e=>setRole(e.target.value)} placeholder="Or type a custom role..."
            style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1.5px solid ${C2.border}`,background:C2.surface,color:"#fff",fontSize:14,fontFamily:"Plus Jakarta Sans,sans-serif",boxSizing:"border-box",marginBottom:16}}/>
          <div onClick={startInterview} style={{padding:"14px",borderRadius:14,background:`linear-gradient(135deg,${C2.lime},#00C8E0)`,color:"#05050A",fontFamily:"Syne,sans-serif",fontSize:20,letterSpacing:1,cursor:"pointer",textAlign:"center"}}>
            🎤 START INTERVIEW (5 QUESTIONS)
          </div>
          <div style={{textAlign:"center",fontSize:12,color:C2.muted,marginTop:10}}>AI asks 5 questions → gives feedback → scores your performance</div>
        </div>
      ) : (
        <div style={{background:C2.card,borderRadius:20,border:`1px solid ${C2.border}`,overflow:"hidden"}}>
          <div style={{padding:"14px 20px",background:`linear-gradient(135deg,${C2.lime}15,transparent)`,borderBottom:`1px solid ${C2.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{fontWeight:800,color:C2.lime}}>🎤 Interview: {role}</div>
            <div style={{fontSize:12,color:C2.muted}}>Question {Math.min(questionCount,5)}/5</div>
          </div>
          <div style={{height:400,overflowY:"auto",padding:20,display:"flex",flexDirection:"column",gap:14}}>
            {messages.map((m,i)=>(
              <div key={i} style={{display:"flex",gap:12,flexDirection:m.role==="candidate"?"row-reverse":"row"}}>
                <div style={{width:36,height:36,borderRadius:10,background:m.role==="interviewer"?`${C2.lime}20`:"rgba(56,189,248,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>
                  {m.role==="interviewer"?"🤖":"👤"}
                </div>
                <div style={{maxWidth:"80%",padding:"12px 16px",borderRadius:m.role==="candidate"?"18px 18px 4px 18px":"18px 18px 18px 4px",background:m.role==="candidate"?"rgba(56,189,248,.15)":"rgba(255,255,255,.05)",color:"#fff",fontSize:13,lineHeight:1.6,fontFamily:"Plus Jakarta Sans,sans-serif"}}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading&&<div style={{color:C2.lime,fontSize:13,padding:"8px 16px"}}>🤖 AI is thinking...</div>}
            <div ref={bottomRef}/>
          </div>
          {questionCount <= 5 && (
            <div style={{padding:"14px 16px",borderTop:`1px solid ${C2.border}`,display:"flex",gap:8}}>
              <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendAnswer()}
                placeholder="Type your answer..."
                style={{flex:1,padding:"11px 14px",borderRadius:12,border:`1.5px solid ${C2.border}`,background:C2.surface,color:"#fff",fontSize:13,fontFamily:"Plus Jakarta Sans,sans-serif"}}/>
              <div onClick={sendAnswer} style={{padding:"11px 20px",borderRadius:12,background:`linear-gradient(135deg,${C2.lime},#00C8E0)`,color:"#05050A",fontWeight:900,cursor:"pointer"}}>Send</div>
            </div>
          )}
          <div style={{padding:"10px 16px",display:"flex",justifyContent:"center"}}>
            <div onClick={()=>{setStarted(false);setMessages([]);setQuestionCount(0);}} style={{fontSize:12,color:C2.muted,cursor:"pointer"}}>← Start new interview</div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   SKILL GAP ANALYZER
══════════════════════════════════════════════════ */
const SkillGapAnalyzer = () => {
  const [currentSkills, setCurrentSkills] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const C2 = {bg:"#05050A",card:"#12121F",border:"rgba(255,255,255,.07)",lime:"#00E5FF",muted:"rgba(255,255,255,.4)",surface:"#0D0D1A"};

  const roles = ["Senior React Developer","Data Scientist","Product Manager","DevOps Engineer","UI/UX Designer","Full Stack Developer","ML Engineer","Digital Marketer"];

  const analyze = async () => {
    if(!currentSkills || !targetRole) return;
    setLoading(true);
    try {
      const response = await fetch("/api/chat", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          messages:[{role:"user",content:`Skill gap analysis:
Current skills: ${currentSkills}
Target role: ${targetRole}

Please provide:
1. Skills I already have (strengths) ✅
2. Missing skills I need to learn ❌
3. Top 3 free resources to learn missing skills 📚
4. Estimated time to be job-ready ⏰
5. Overall readiness score out of 10 🎯

Be specific and actionable. Format with emojis and clear sections.`}],
          jobSummary:""
        })
      });
      const data = await response.json();
      setResult(data.reply);
    } catch(e) { setResult("Could not analyze. Try again!"); }
    finally { setLoading(false); }
  };

  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"24px 20px"}}>
      <div style={{fontFamily:"Syne,sans-serif",fontSize:32,color:"#fff",letterSpacing:.5,marginBottom:4}}>🏆 SKILL GAP ANALYZER</div>
      <div style={{color:C2.muted,fontSize:14,marginBottom:24}}>Find out exactly what skills you need for your dream job</div>

      <div style={{background:C2.card,borderRadius:20,padding:24,border:`1px solid ${C2.border}`,marginBottom:20}}>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:800,color:C2.muted,marginBottom:6}}>YOUR CURRENT SKILLS *</div>
          <textarea value={currentSkills} onChange={e=>setCurrentSkills(e.target.value)}
            placeholder="e.g. HTML, CSS, JavaScript, React basics, Git..."
            style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1.5px solid ${C2.border}`,background:C2.surface,color:"#fff",fontSize:14,fontFamily:"Plus Jakarta Sans,sans-serif",height:80,resize:"none",boxSizing:"border-box"}}/>
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:11,fontWeight:800,color:C2.muted,marginBottom:6}}>TARGET ROLE *</div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:10}}>
            {roles.map(r=>(
              <div key={r} onClick={()=>setTargetRole(r)} style={{padding:"6px 14px",borderRadius:999,background:targetRole===r?`${C2.lime}20`:"rgba(255,255,255,.05)",border:`1px solid ${targetRole===r?C2.lime:"rgba(255,255,255,.1)"}`,color:targetRole===r?C2.lime:"rgba(255,255,255,.5)",fontSize:12,fontWeight:700,cursor:"pointer"}}>
                {r}
              </div>
            ))}
          </div>
          <input value={targetRole} onChange={e=>setTargetRole(e.target.value)} placeholder="Or type custom role..."
            style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1.5px solid ${C2.border}`,background:C2.surface,color:"#fff",fontSize:14,fontFamily:"Plus Jakarta Sans,sans-serif",boxSizing:"border-box"}}/>
        </div>
        <div onClick={analyze} style={{padding:"14px",borderRadius:14,background:loading?"rgba(170,255,0,.3)":`linear-gradient(135deg,${C2.lime},#00C8E0)`,color:"#05050A",fontFamily:"Syne,sans-serif",fontSize:20,letterSpacing:1,cursor:loading?"not-allowed":"pointer",textAlign:"center"}}>
          {loading?"🔍 ANALYZING YOUR SKILLS...":"🚀 ANALYZE MY SKILL GAP"}
        </div>
      </div>

      {result && (
        <div style={{background:C2.card,borderRadius:20,padding:24,border:`1px solid ${C2.lime}30`}}>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:20,color:C2.lime,marginBottom:16}}>📊 YOUR SKILL GAP ANALYSIS</div>
          <div style={{color:"rgba(255,255,255,.85)",fontSize:14,lineHeight:1.9,whiteSpace:"pre-wrap",fontFamily:"Plus Jakarta Sans,sans-serif"}}>{result}</div>
          <div style={{marginTop:20,padding:16,borderRadius:14,background:"rgba(170,255,0,.06)",border:`1px solid ${C2.lime}20`,fontSize:13,color:C2.muted}}>
            💡 Use the <strong style={{color:C2.lime}}>AI Resume Builder</strong> (📄 in navbar) to highlight your skills for this role!
          </div>
        </div>
      )}
    </div>
  );
};


/* ══════════════════════════════════════════════════
   PRICING & PAYMENT
══════════════════════════════════════════════════ */
const PLANS = [
  { id:"featured_job", name:"Featured Job", price:99, icon:"⭐", color:"#FFB700",
    features:["Top of search results","Featured badge","3x more views","30 days active","Email to matched candidates"] },
  { id:"premium_candidate", name:"Premium Profile", price:29, icon:"🚀", color:"#00E5FF",
    features:["Top of HR search","Boosted badge","Unlimited applications","Priority profile","30 days active"] },
  { id:"company_subscription", name:"Company Plan", price:299, icon:"🏢", color:"#7C3AED",
    features:["Unlimited job posts","Full candidate database","Featured listings included","Priority support","30 days active"] },
];

const PricingModal = ({ onClose, user, onAuthRequired, selectedPlan, jobId }) => {
  const [loading, setLoading] = useState(false);
  const [activePlan, setActivePlan] = useState(selectedPlan || PLANS[0]);
  const C2 = { bg:"#04040C", card:"#0D0D1F", border:"rgba(0,229,255,.08)", muted:"rgba(255,255,255,.4)", surface:"#080816" };

  const handlePay = async (plan) => {
    if (!user) { onClose(); return onAuthRequired(); }
    setLoading(true);
    try {
      // Load Razorpay script
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
      }

      // Create order
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: plan.price, receipt: `${plan.id}_${Date.now().toString().slice(-8)}`, notes: { plan: plan.id, userId: user.id } })
      });
      const resData = await res.json();
      console.log("Order response:", resData);
      if (!resData.success || !resData.order) {
        throw new Error(resData.error || "Failed to create order. Check Razorpay keys in Vercel.");
      }
      const { order, key } = resData;

      // Open Razorpay checkout
      const rzp = new window.Razorpay({
        key,
        amount: order.amount,
        currency: order.currency,
        name: "UdyamPath",
        description: plan.name,
        order_id: order.id,
        prefill: { email: user.email, name: user.user_metadata?.full_name || "" },
        theme: { color: "#00E5FF" },
        handler: async (response) => {
          // Verify payment
          const verifyRes = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...response,
              plan: plan.id,
              jobId: jobId || null,
              userId: user.id
            })
          });
          const data = await verifyRes.json();
          if (data.success) {
            alert("🎉 Payment successful! Your plan is now active!");
            onClose();
          }
        }
      });
      rzp.open();
    } catch(e) {
      console.error(e);
      alert("Payment failed: " + e.message);
    } finally { setLoading(false); }
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:400,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
      <div onClick={onClose} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.9)",backdropFilter:"blur(10px)"}}/>
      <div style={{position:"relative",background:C2.card,borderRadius:28,maxWidth:900,width:"100%",maxHeight:"90vh",overflowY:"auto",border:"1px solid rgba(0,229,255,.12)"}}>
        
        {/* Header */}
        <div style={{padding:"28px 28px 0",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:28,fontWeight:900,color:"#fff"}}>💎 UPGRADE</div>
            <div style={{color:"rgba(255,255,255,.4)",fontSize:13,marginTop:4}}>Boost your hiring or job search</div>
          </div>
          <div onClick={onClose} style={{width:36,height:36,borderRadius:10,background:C2.surface,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"rgba(255,255,255,.4)",fontSize:18}}>✕</div>
        </div>

        {/* Plans */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:16,padding:28}}>
          {PLANS.map(plan => (
            <div key={plan.id} onClick={()=>setActivePlan(plan)}
              style={{background:activePlan.id===plan.id?`${plan.color}10`:C2.surface,borderRadius:20,padding:24,
                border:`2px solid ${activePlan.id===plan.id?plan.color:"rgba(255,255,255,.06)"}`,cursor:"pointer",transition:"all .2s"}}>
              <div style={{fontSize:36,marginBottom:12}}>{plan.icon}</div>
              <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:18,color:"#fff",marginBottom:4}}>{plan.name}</div>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:32,fontWeight:900,color:plan.color,marginBottom:16}}>
                ₹{plan.price.toLocaleString("en-IN")}<span style={{fontSize:13,color:"rgba(255,255,255,.3)",fontWeight:400}}>/mo</span>
              </div>
              <div style={{display:"flex",flexDirection:"column",gap:8,marginBottom:20}}>
                {plan.features.map(f=>(
                  <div key={f} style={{display:"flex",gap:8,alignItems:"center"}}>
                    <span style={{color:plan.color,fontSize:14}}>✓</span>
                    <span style={{color:"rgba(255,255,255,.6)",fontSize:13}}>{f}</span>
                  </div>
                ))}
              </div>
              <div onClick={(e)=>{e.stopPropagation();handlePay(plan);}}
                style={{width:"100%",padding:"12px",borderRadius:12,background:`linear-gradient(135deg,${plan.color},${plan.color}88)`,
                  color:"#000",fontFamily:"Syne,sans-serif",fontWeight:900,fontSize:15,cursor:"pointer",textAlign:"center",
                  opacity:loading?0.7:1}}>
                {loading?"Processing...":"Pay with Razorpay →"}
              </div>
            </div>
          ))}
        </div>

        <div style={{textAlign:"center",padding:"0 28px 24px",color:"rgba(255,255,255,.3)",fontSize:12}}>
          🔒 Secured by Razorpay - UPI, Cards, Net Banking accepted - 100% safe
        </div>
      </div>
    </div>
  );
};


/* Application Tracker */
const ApplicationTracker = ({ user, onAuthRequired }) => {
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const C2 = {card:"rgba(255,255,255,0.03)",border:"rgba(255,255,255,0.08)",muted:"rgba(255,255,255,.4)"};

  useEffect(()=>{
    if(!user){ setLoading(false); return; }
    supabase.from("applications").select("*,jobs(title,company_name,location,apply_url)").eq("user_id",user.id).order("created_at",{ascending:false})
      .then(({data})=>{ setApps(data||[]); setLoading(false); });
  },[user]);

  if(!user) return (
    <div style={{textAlign:"center",padding:"60px 16px"}}>
      <div style={{fontSize:48,marginBottom:12}}>📊</div>
      <div style={{fontFamily:"Syne,sans-serif",fontSize:22,color:"#fff",marginBottom:8}}>Track Your Applications</div>
      <div style={{color:"rgba(255,255,255,.4)",marginBottom:20}}>Sign in to see all your job applications</div>
      <button onClick={onAuthRequired} style={{padding:"12px 32px",borderRadius:12,background:"linear-gradient(135deg,#AAFF00,#00E5FF)",color:"#000",fontWeight:900,fontSize:15,border:"none",cursor:"pointer"}}>Sign In</button>
    </div>
  );

  const statusColor = s => s==="hired"?"#AAFF00":s==="shortlisted"?"#00E5FF":s==="rejected"?"#FF6B6B":s==="viewed"?"#FFB700":"rgba(255,255,255,.4)";
  const filtered = filter==="all" ? apps : apps.filter(a=>(a.hr_status||"pending")===filter);
  const counts = ["all","pending","viewed","shortlisted","hired","rejected"].reduce((acc,s)=>({...acc,[s]:s==="all"?apps.length:apps.filter(a=>(a.hr_status||"pending")===s).length}),{});

  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px"}}>
      <div style={{fontSize:28,fontWeight:900,color:"#fff",marginBottom:4,fontFamily:"Syne,sans-serif"}}>APPLICATION TRACKER</div>
      <div style={{color:"rgba(255,255,255,.4)",fontSize:13,marginBottom:16}}>Track all your job applications</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(90px,1fr))",gap:8,marginBottom:16}}>
        {[["Total",counts.all,"#fff"],["Pending",counts.pending,"#FFB700"],["Viewed",counts.viewed,"#00E5FF"],["Shortlisted",counts.shortlisted,"#AAFF00"],["Hired",counts.hired,"#AAFF00"],["Rejected",counts.rejected,"#FF6B6B"]].map(([l,v,c])=>(
          <div key={l} style={{background:C2.card,borderRadius:12,padding:"12px 8px",border:"1px solid rgba(255,255,255,0.08)",textAlign:"center"}}>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:22,fontWeight:900,color:c}}>{v}</div>
            <div style={{fontSize:10,color:C2.muted,textTransform:"uppercase"}}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:14}}>
        {["all","pending","viewed","shortlisted","hired","rejected"].map(s=>(
          <div key={s} onClick={()=>setFilter(s)} style={{padding:"5px 12px",borderRadius:99,fontSize:11,fontWeight:700,cursor:"pointer",
            background:filter===s?"rgba(0,229,255,.15)":"rgba(255,255,255,.04)",color:filter===s?"#00E5FF":"rgba(255,255,255,.4)",
            border:"1px solid "+(filter===s?"rgba(0,229,255,.3)":"rgba(255,255,255,.08)")}}>
            {s.charAt(0).toUpperCase()+s.slice(1)} ({counts[s]||0})
          </div>
        ))}
      </div>
      {loading ? <div style={{textAlign:"center",padding:40,color:"rgba(255,255,255,.3)"}}>Loading...</div>
      : filtered.length===0 ? (
        <div style={{textAlign:"center",padding:60,color:"rgba(255,255,255,.3)"}}>
          <div style={{fontSize:48,marginBottom:12}}>📭</div>
          <div>No applications yet. Start applying to jobs!</div>
        </div>
      ) : filtered.map(app=>(
        <div key={app.id} style={{background:C2.card,borderRadius:14,padding:14,border:"1px solid rgba(255,255,255,0.08)",display:"flex",gap:12,alignItems:"center",flexWrap:"wrap",marginBottom:8}}>
          <div style={{flex:1,minWidth:160}}>
            <div style={{fontWeight:800,color:"#fff",fontSize:14}}>{app.jobs?.title||"Job"}</div>
            <div style={{fontSize:12,color:C2.muted}}>{app.jobs?.company_name} - {app.jobs?.location}</div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.2)",marginTop:2}}>{new Date(app.created_at).toLocaleDateString("en-IN")}</div>
          </div>
          <div style={{padding:"4px 10px",borderRadius:99,fontSize:11,fontWeight:700,background:statusColor(app.hr_status)+"20",color:statusColor(app.hr_status),border:"1px solid "+statusColor(app.hr_status)+"30"}}>
            {(app.hr_status||"pending").toUpperCase()}
          </div>
        </div>
      ))}
    </div>
  );
};


const ResumeBuilderPage = ({ user, onAuthRequired }) => {
  const [form, setForm] = useState({ name:"", email:"", phone:"", location:"", linkedin:"", github:"", summary:"", skills:"", experience:"", education:"", projects:"", certifications:"", languages:"" });
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const pct = Math.round((Object.values(form).filter(v=>v.trim()).length / Object.keys(form).length)*100);
  const inp = {width:"100%",padding:"12px 14px",borderRadius:12,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.03)",color:"#fff",fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};

  const download = () => {
    const html = "<!DOCTYPE html><html><head><meta charset=UTF-8><style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:40px;color:#111;line-height:1.6;}h1{font-size:28px;}h2{font-size:13px;text-transform:uppercase;letter-spacing:1px;border-bottom:1px solid #ddd;padding-bottom:4px;margin-top:20px;}.skill{display:inline-block;background:#f0f0f0;padding:2px 8px;border-radius:4px;font-size:12px;margin:2px;}</style></head><body>"
      + "<h1>" + (form.name||"Your Name") + "</h1>"
      + "<p>" + [form.email,form.phone,form.location].filter(Boolean).join(" | ") + "</p>"
      + (form.summary ? "<h2>Summary</h2><p>" + form.summary + "</p>" : "")
      + (form.experience ? "<h2>Experience</h2><p>" + form.experience + "</p>" : "")
      + (form.education ? "<h2>Education</h2><p>" + form.education + "</p>" : "")
      + (form.skills ? "<h2>Skills</h2>" + form.skills.split(",").map(s=>"<span class=skill>"+s.trim()+"</span>").join("") : "")
      + "</body></html>";
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([html],{type:"text/html"}));
    a.download = (form.name||"resume").replace(/ /g,"_") + "_resume.html";
    a.click();
  };

  return (
    <div style={{maxWidth:700,margin:"0 auto",padding:"24px 16px"}}>
      <div style={{fontSize:28,fontWeight:900,color:"#fff",marginBottom:4,fontFamily:"Syne,sans-serif"}}>RESUME BUILDER</div>
      <div style={{color:"rgba(255,255,255,.4)",fontSize:13,marginBottom:16}}>Build and download your resume for free</div>
      <div style={{background:"rgba(255,255,255,0.03)",borderRadius:16,padding:16,border:"1px solid rgba(255,255,255,0.08)",marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
          <span style={{fontSize:12,fontWeight:700,color:"#fff"}}>Completeness</span>
          <span style={{fontSize:12,fontWeight:900,color:pct===100?"#AAFF00":"#00E5FF"}}>{pct}%</span>
        </div>
        <div style={{height:6,borderRadius:99,background:"rgba(255,255,255,.06)"}}>
          <div style={{height:"100%",borderRadius:99,width:pct+"%",background:"linear-gradient(90deg,#00E5FF,#AAFF00)",transition:"width .3s"}}/>
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
        {[["name","Full Name *"],["email","Email *"],["phone","Phone"],["location","City, State"],["linkedin","LinkedIn URL"],["github","GitHub URL"]].map(([k,p])=>(
          <input key={k} value={form[k]} onChange={e=>set(k,e.target.value)} placeholder={p} style={inp}/>
        ))}
      </div>
      {[["summary","Professional Summary - 2-3 lines about yourself"],["experience","Work Experience (Company | Role | Duration\nKey achievements...)"],["education","Education (B.Tech Computer Science | VIT | 2020-2024 | CGPA: 8.5)"],["projects","Projects (Project Name | Tech Stack | Description | GitHub link)"],["certifications","Certifications (AWS Cloud Practitioner | Google | 2024)"],["skills","Skills (comma separated: React, Python, SQL, AWS...)"],["languages","Languages (English, Tamil, Hindi)"]].map(([k,p])=>(
        <textarea key={k} value={form[k]} onChange={e=>set(k,e.target.value)} placeholder={p} rows={3} style={{...inp,resize:"vertical",marginBottom:10}}/>
      ))}
      <button onClick={download} disabled={!form.name||!form.email}
        style={{width:"100%",padding:14,borderRadius:14,background:form.name&&form.email?"linear-gradient(135deg,#AAFF00,#00E5FF)":"rgba(255,255,255,.1)",
          color:form.name&&form.email?"#000":"rgba(255,255,255,.3)",border:"none",fontFamily:"Syne,sans-serif",fontWeight:900,fontSize:17,cursor:form.name&&form.email?"pointer":"not-allowed"}}>
        DOWNLOAD RESUME
      </button>
      <div style={{textAlign:"center",fontSize:11,color:"rgba(255,255,255,.2)",marginTop:6}}>Downloads as HTML - open in Chrome then Print to PDF</div>
    </div>
  );
};


const CompanyReviews = ({ user, onAuthRequired, jobs }) => {
  const [reviews, setReviews] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState({ rating:5, title:"", pros:"", cons:"", role:"" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState("");
  const C2 = {card:"rgba(255,255,255,0.03)",border:"rgba(255,255,255,0.08)",muted:"rgba(255,255,255,.4)",lime:"#AAFF00",sky:"#00E5FF"};

  useEffect(()=>{ const unique = [...new Set(jobs.map(j=>j.company_name).filter(Boolean))].sort(); setCompanies(unique); },[jobs]);
  useEffect(()=>{ if(!selected) return; supabase.from("company_reviews").select("*").eq("company_name",selected).order("created_at",{ascending:false}).then(({data})=>setReviews(data||[])); },[selected]);

  const submit = async () => {
    if(!user){ onAuthRequired(); return; }
    if(!form.title||!form.pros) return;
    setSubmitting(true);
    await supabase.from("company_reviews").insert({ company_name:selected, user_id:user.id, rating:form.rating, title:form.title, pros:form.pros, cons:form.cons, role:form.role });
    setSubmitted(true); setSubmitting(false);
    const {data} = await supabase.from("company_reviews").select("*").eq("company_name",selected).order("created_at",{ascending:false});
    setReviews(data||[]);
  };

  const avgRating = reviews.length ? (reviews.reduce((a,r)=>a+r.rating,0)/reviews.length).toFixed(1) : null;
  const filtered = companies.filter(c=>c.toLowerCase().includes(search.toLowerCase()));
  const inp = {width:"100%",padding:"11px 14px",borderRadius:12,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.03)",color:"#fff",fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};

  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px"}}>
      <div style={{fontFamily:"Syne,sans-serif",fontSize:28,fontWeight:900,color:"#fff",marginBottom:4}}>COMPANY REVIEWS</div>
      <div style={{color:C2.muted,fontSize:13,marginBottom:20}}>Rate companies - help others make better career decisions</div>
      {!selected ? (
        <>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search company..." style={{...inp,marginBottom:16}}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))",gap:10}}>
            {filtered.slice(0,48).map(c=>(
              <div key={c} onClick={()=>setSelected(c)} style={{background:C2.card,borderRadius:14,padding:"14px 16px",border:"1px solid rgba(255,255,255,0.08)",cursor:"pointer"}}>
                <div style={{fontSize:28,marginBottom:6}}>🏢</div>
                <div style={{fontWeight:800,color:"#fff",fontSize:12,marginBottom:2}}>{c}</div>
                <div style={{fontSize:10,color:C2.muted}}>Click to review</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <div onClick={()=>setSelected(null)} style={{color:C2.sky,fontSize:13,cursor:"pointer",marginBottom:16}}>Back to companies</div>
          <div style={{background:C2.card,borderRadius:16,padding:20,border:"1px solid rgba(255,255,255,0.08)",marginBottom:20}}>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:22,color:"#fff",fontWeight:900}}>{selected}</div>
            {avgRating && <div style={{color:"#FFB700",fontSize:15,fontWeight:700,marginTop:4}}>{"★".repeat(Math.round(avgRating))} {avgRating}/5 ({reviews.length} reviews)</div>}
          </div>
          {!submitted ? (
            <div style={{background:C2.card,borderRadius:16,padding:20,border:"1px solid rgba(255,255,255,0.08)",marginBottom:20}}>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:16,color:"#fff",fontWeight:800,marginBottom:16}}>Write a Review</div>
              <div style={{display:"flex",gap:8,marginBottom:12}}>
                {[1,2,3,4,5].map(n=>(<div key={n} onClick={()=>setForm(f=>({...f,rating:n}))} style={{fontSize:24,cursor:"pointer",opacity:n<=form.rating?1:0.3}}>★</div>))}
              </div>
              <input value={form.role} onChange={e=>setForm(f=>({...f,role:e.target.value}))} placeholder="Your role e.g. Software Engineer" style={{...inp,marginBottom:10}}/>
              <input value={form.title} onChange={e=>setForm(f=>({...f,title:e.target.value}))} placeholder="Review title *" style={{...inp,marginBottom:10}}/>
              <textarea value={form.pros} onChange={e=>setForm(f=>({...f,pros:e.target.value}))} placeholder="Pros - what was good? *" rows={2} style={{...inp,resize:"none",marginBottom:10}}/>
              <textarea value={form.cons} onChange={e=>setForm(f=>({...f,cons:e.target.value}))} placeholder="Cons - what could be better?" rows={2} style={{...inp,resize:"none",marginBottom:12}}/>
              <button onClick={submit} disabled={submitting||!form.title||!form.pros}
                style={{width:"100%",padding:12,borderRadius:12,background:form.title&&form.pros?"linear-gradient(135deg,#AAFF00,#00E5FF)":"rgba(255,255,255,.1)",color:form.title&&form.pros?"#000":"rgba(255,255,255,.3)",border:"none",fontFamily:"Syne,sans-serif",fontWeight:900,fontSize:15,cursor:"pointer"}}>
                {submitting?"Submitting...":"SUBMIT REVIEW"}
              </button>
            </div>
          ) : (
            <div style={{background:"rgba(170,255,0,.08)",borderRadius:16,padding:20,border:"1px solid rgba(170,255,0,.2)",marginBottom:20,textAlign:"center"}}>
              <div style={{fontSize:40,marginBottom:8}}>🎉</div>
              <div style={{color:"#AAFF00",fontWeight:800}}>Review submitted! Thank you.</div>
            </div>
          )}
          {reviews.map(r=>(
            <div key={r.id} style={{background:C2.card,borderRadius:14,padding:16,border:"1px solid rgba(255,255,255,0.08)",marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                <div style={{color:"#FFB700",fontSize:14}}>{"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}</div>
                <div style={{fontSize:11,color:C2.muted}}>{new Date(r.created_at).toLocaleDateString("en-IN")}</div>
              </div>
              <div style={{fontWeight:800,color:"#fff",marginBottom:4}}>{r.title}</div>
              {r.role&&<div style={{fontSize:11,color:C2.sky,marginBottom:6}}>{r.role}</div>}
              <div style={{fontSize:13,color:"rgba(170,255,0,.8)",marginBottom:4}}>+ {r.pros}</div>
              {r.cons&&<div style={{fontSize:13,color:"rgba(255,107,107,.8)"}}>- {r.cons}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const JobRecommendations = ({ user, onAuthRequired, jobs }) => {
  const [profile, setProfile] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const C2 = {card:"rgba(255,255,255,0.03)",border:"rgba(255,255,255,0.08)",muted:"rgba(255,255,255,.4)",lime:"#AAFF00",sky:"#00E5FF"};

  useEffect(()=>{
    if(!user){ setLoading(false); return; }
    supabase.from("candidate_profiles").select("*").eq("user_id",user.id).single()
      .then(({data})=>{
        setProfile(data);
        if(data?.skills){
          const userSkills = data.skills.toLowerCase().split(",").map(s=>s.trim()).filter(Boolean);
          const scored = jobs.map(job=>{
            const jobText = (job.title+" "+job.description+" "+(job.skills_tags||[]).join(" ")).toLowerCase();
            const matches = userSkills.filter(s=>jobText.includes(s));
            return {...job, matchScore:matches.length};
          }).filter(j=>j.matchScore>0).sort((a,b)=>b.matchScore-a.matchScore).slice(0,20);
          setRecommended(scored);
        }
        setLoading(false);
      });
  },[user,jobs]);

  if(!user) return (
    <div style={{textAlign:"center",padding:"60px 16px"}}>
      <div style={{fontSize:48,marginBottom:12}}>⭐</div>
      <div style={{fontFamily:"Syne,sans-serif",fontSize:22,color:"#fff",marginBottom:8}}>Jobs For You</div>
      <div style={{color:"rgba(255,255,255,.4)",marginBottom:20}}>Sign in to get personalised job recommendations</div>
      <button onClick={onAuthRequired} style={{padding:"12px 32px",borderRadius:12,background:"linear-gradient(135deg,#AAFF00,#00E5FF)",color:"#000",fontWeight:900,fontSize:15,border:"none",cursor:"pointer"}}>Sign In</button>
    </div>
  );

  if(loading) return <div style={{textAlign:"center",padding:60,color:"rgba(255,255,255,.3)"}}>Loading recommendations...</div>;

  if(!profile?.skills) return (
    <div style={{textAlign:"center",padding:"60px 16px"}}>
      <div style={{fontSize:48,marginBottom:12}}>👤</div>
      <div style={{fontFamily:"Syne,sans-serif",fontSize:22,color:"#fff",marginBottom:8}}>Add your skills first</div>
      <div style={{color:"rgba(255,255,255,.4)",marginBottom:20}}>Go to Profile tab and add your skills to get personalised job recommendations</div>
    </div>
  );

  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px"}}>
      <div style={{fontFamily:"Syne,sans-serif",fontSize:28,fontWeight:900,color:"#fff",marginBottom:4}}>JOBS FOR YOU</div>
      <div style={{color:C2.muted,fontSize:13,marginBottom:20}}>Based on your skills: <span style={{color:C2.sky}}>{profile.skills}</span></div>
      {recommended.length===0 ? (
        <div style={{textAlign:"center",padding:60,color:C2.muted}}>
          <div style={{fontSize:48,marginBottom:12}}>🔍</div>
          <div>No matches found. Try updating your skills in Profile.</div>
        </div>
      ) : recommended.map(job=>(
        <div key={job.id} style={{background:C2.card,borderRadius:16,padding:16,border:"1px solid rgba(255,255,255,0.08)",display:"flex",gap:14,alignItems:"center",flexWrap:"wrap",marginBottom:10}}>
          <div style={{flex:1,minWidth:200}}>
            <div style={{fontWeight:800,color:"#fff",fontSize:15}}>{job.title}</div>
            <div style={{fontSize:12,color:C2.muted}}>{job.company_name} - {job.location}</div>
            <div style={{fontSize:11,color:"#FFB700",marginTop:4}}>{job.matchScore} skill{job.matchScore!==1?"s":""} matched</div>
          </div>
          <div onClick={()=>job.apply_url&&window.open(job.apply_url,"_blank")}
            style={{padding:"8px 16px",borderRadius:10,background:"linear-gradient(135deg,#AAFF00,#00E5FF)",color:"#000",fontSize:12,fontWeight:900,cursor:"pointer"}}>
            APPLY
          </div>
        </div>
      ))}
    </div>
  );
};

/* Profile Completeness Helper */
const ProfileCompletenessBar = ({ user, profile, onNav }) => {
  if(!user || !profile) return null;
  const fields = [profile.full_name, profile.email, profile.phone, profile.location, profile.skills, profile.experience, profile.education, profile.resume_url];
  const filled = fields.filter(Boolean).length;
  const pct = Math.round((filled / fields.length) * 100);
  if(pct === 100) return null;
  return (
    <div onClick={()=>onNav("profile")} style={{background:"rgba(255,183,0,0.08)",border:"1px solid rgba(255,183,0,0.2)",borderRadius:14,padding:"10px 16px",margin:"0 16px 12px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
      <span style={{fontSize:18}}>⚠️</span>
      <div style={{flex:1}}>
        <div style={{fontSize:12,fontWeight:800,color:"#FFB700"}}>Complete your profile to get better job matches! ({pct}% done)</div>
        <div style={{height:4,borderRadius:99,background:"rgba(255,255,255,.06)",marginTop:4}}>
          <div style={{height:"100%",borderRadius:99,width:pct+"%",background:"linear-gradient(90deg,#FFB700,#AAFF00)",transition:"width .4s"}}/>
        </div>
      </div>
      <span style={{fontSize:11,fontWeight:900,color:"#FFB700"}}>Complete →</span>
    </div>
  );
};

/* Referral System */
const ReferralCard = ({ user, onToast }) => {
  const referralCode = user ? "UDYAM-" + user.id.slice(0,6).toUpperCase() : "";
  const referralLink = "https://udyampath.vercel.app?ref=" + referralCode;
  const C2 = {card:"rgba(255,255,255,0.03)",border:"rgba(255,255,255,0.08)",muted:"rgba(255,255,255,.4)",lime:"#AAFF00",sky:"#00E5FF"};

  const copy = () => {
    navigator.clipboard.writeText(referralLink);
    if(onToast) onToast("Referral link copied!", "success");
  };

  const share = () => {
    const text = "I use UdyamPath for job hunting in India - 19000+ real jobs + AI features! Join free: " + referralLink;
    if(navigator.share) navigator.share({title:"UdyamPath",text,url:referralLink});
    else { navigator.clipboard.writeText(text); if(onToast) onToast("Copied to clipboard!", "success"); }
  };

  if(!user) return null;

  return (
    <div style={{background:"linear-gradient(135deg,rgba(170,255,0,0.06),rgba(0,229,255,0.06))",borderRadius:16,padding:20,border:"1px solid rgba(170,255,0,0.15)",marginTop:16}}>
      <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,color:"#fff",fontSize:16,marginBottom:4}}>Refer Friends - Earn Rewards</div>
      <div style={{color:C2.muted,fontSize:12,marginBottom:14}}>Share UdyamPath and help your friends find jobs!</div>
      <div style={{background:"rgba(0,0,0,0.3)",borderRadius:10,padding:"10px 14px",marginBottom:12,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <span style={{fontSize:12,color:C2.sky,fontFamily:"monospace"}}>{referralCode}</span>
        <span onClick={copy} style={{fontSize:11,color:C2.lime,cursor:"pointer",fontWeight:700}}>COPY CODE</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <button onClick={copy} style={{padding:"10px",borderRadius:10,background:"rgba(170,255,0,0.1)",color:"#AAFF00",border:"1px solid rgba(170,255,0,0.2)",fontWeight:700,fontSize:13,cursor:"pointer"}}>Copy Link</button>
        <button onClick={share} style={{padding:"10px",borderRadius:10,background:"linear-gradient(135deg,#AAFF00,#00E5FF)",color:"#000",border:"none",fontWeight:900,fontSize:13,cursor:"pointer"}}>Share Now</button>
      </div>
    </div>
  );
};

/* Company Pages */
const CompanyPages = ({ jobs, onAuthRequired, user }) => {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const C2 = {card:"rgba(255,255,255,0.03)",border:"rgba(255,255,255,0.08)",muted:"rgba(255,255,255,.4)",lime:"#AAFF00",sky:"#00E5FF"};

  const companiesData = jobs.reduce((acc, job) => {
    if(!job.company_name) return acc;
    if(!acc[job.company_name]) acc[job.company_name] = { name:job.company_name, jobs:[], location:job.location };
    acc[job.company_name].jobs.push(job);
    return acc;
  }, {});

  const companies = Object.values(companiesData).sort((a,b)=>b.jobs.length-a.jobs.length);
  const filtered = companies.filter(c=>c.name.toLowerCase().includes(search.toLowerCase()));
  const inp = {width:"100%",padding:"11px 14px",borderRadius:12,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.03)",color:"#fff",fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"};

  if(selected) {
    const co = companiesData[selected];
    return (
      <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px"}}>
        <div onClick={()=>setSelected(null)} style={{color:C2.sky,fontSize:13,cursor:"pointer",marginBottom:16}}>Back to companies</div>
        <div style={{background:C2.card,borderRadius:20,padding:24,border:"1px solid rgba(255,255,255,0.08)",marginBottom:20}}>
          <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:12}}>
            <div style={{width:64,height:64,borderRadius:16,background:"linear-gradient(135deg,#7C3AED,#00E5FF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>🏢</div>
            <div>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:24,color:"#fff",fontWeight:900}}>{selected}</div>
              <div style={{color:C2.muted,fontSize:13}}>{co.location}</div>
              <div style={{color:C2.lime,fontSize:12,fontWeight:700,marginTop:4}}>{co.jobs.length} open positions</div>
            </div>
          </div>
        </div>
        <div style={{fontFamily:"Syne,sans-serif",fontSize:18,color:"#fff",fontWeight:800,marginBottom:12}}>Open Positions</div>
        {co.jobs.map(job=>(
          <div key={job.id} style={{background:C2.card,borderRadius:14,padding:16,border:"1px solid rgba(255,255,255,0.08)",marginBottom:10,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
            <div>
              <div style={{fontWeight:800,color:"#fff",fontSize:14}}>{job.title}</div>
              <div style={{fontSize:12,color:C2.muted}}>{job.location} - {job.work_type} - {job.salary_range||"Competitive"}</div>
            </div>
            <div onClick={()=>job.apply_url&&window.open(job.apply_url,"_blank")}
              style={{padding:"8px 16px",borderRadius:10,background:"linear-gradient(135deg,#AAFF00,#00E5FF)",color:"#000",fontSize:12,fontWeight:900,cursor:"pointer"}}>
              APPLY
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{maxWidth:900,margin:"0 auto",padding:"24px 16px"}}>
      <div style={{fontFamily:"Syne,sans-serif",fontSize:28,fontWeight:900,color:"#fff",marginBottom:4}}>COMPANY PAGES</div>
      <div style={{color:C2.muted,fontSize:13,marginBottom:16}}>{companies.length} companies hiring on UdyamPath</div>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search company..." style={{...inp,marginBottom:16}}/>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:10}}>
        {filtered.slice(0,48).map(c=>(
          <div key={c.name} onClick={()=>setSelected(c.name)}
            style={{background:C2.card,borderRadius:14,padding:16,border:"1px solid rgba(255,255,255,0.08)",cursor:"pointer"}}>
            <div style={{fontSize:32,marginBottom:8}}>🏢</div>
            <div style={{fontWeight:800,color:"#fff",fontSize:13,marginBottom:4}}>{c.name}</div>
            <div style={{fontSize:11,color:C2.muted,marginBottom:6}}>{c.location}</div>
            <div style={{fontSize:11,color:C2.lime,fontWeight:700}}>{c.jobs.length} open jobs</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default function App() {
  const [nav, setNav] = useState("jobs");
  const [user, setUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const [saved, setSaved] = useState(new Set());
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All");
  const [workType, setWorkType] = useState("All");
  const [category, setCategory] = useState("All");
  const [expLevel, setExpLevel] = useState("All");
  const [showAuth, setShowAuth] = useState(false);
  const [toast, setToast] = useState(null);
  const [liveCount, setLiveCount] = useState(0);
  const [sortBy, setSortBy] = useState("hot");
  const [showPost, setShowPost] = useState(false);
  const [postForm, setPostForm] = useState({title:"",company_name:"",salary_range:"",location:"",work_type:"Remote",region:"India",category:"Tech",experience_level:"Any",description:"",contact_email:""});
  const [postLoading, setPostLoading] = useState(false);
  const [postDone, setPostDone] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [jobLimit, setJobLimit] = useState(100);
  const [appliedJobs, setAppliedJobs] = useState(new Set());
  const [hasMore, setHasMore] = useState(false);
  const [salaryFilter, setSalaryFilter] = useState("All");
  const [skillFilter, setSkillFilter] = useState("");
  const [showResumeBuilder, setShowResumeBuilder] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [showPricing, setShowPricing] = useState(false);
  const [pricingJobId, setPricingJobId] = useState(null);
  const [showInstallBanner, setShowInstallBanner] = useState(false);
  const [userSkills, setUserSkills] = useState([]);

  const showToast = (msg, type="success") => {
    setToast({msg, type});
    setTimeout(()=>setToast(null), 4000);
  };

  // ── Auth listener ─────────────────────────────────
  useEffect(()=>{
    // Handle OAuth callback from Google
    supabase.auth.getSession().then(({data:{session}})=>{
      setUser(session?.user||null);
      if(session?.user) {
        loadSavedJobs(session.user.id);
        showToast(`Welcome ${session.user.user_metadata?.full_name||session.user.email}! 🎉`,"success");
      }
    });

    const {data:{subscription}} = supabase.auth.onAuthStateChange((event,session)=>{
      if(event==="SIGNED_IN") {
        setUser(session?.user||null);
        if(session?.user) {
          loadSavedJobs(session.user.id);
          setShowAuth(false);
          showToast(`Welcome ${session.user.user_metadata?.full_name||session.user.email}! 🎉`,"success");
        }
      }
      if(event==="SIGNED_OUT") {
        setUser(null);
        setSaved(new Set());
      }
      if(event==="TOKEN_REFRESHED") {
        setUser(session?.user||null);
      }
    });
    return ()=>subscription.unsubscribe();
  },[]);

  // ── Load saved jobs ───────────────────────────────
  const loadSavedJobs = async (userId) => {
    const {data} = await supabase.from("saved_jobs").select("job_id").eq("user_id",userId);
    if(data) setSaved(new Set(data.map(r=>r.job_id)));
  };

  // ── Fetch jobs ─────────────────────────────────────
  const fetchJobs = useCallback(async (limit=100) => {
    setLoading(true);
    try {
      let query = supabase.from("jobs")
        .select("id,title,company_name,salary_range,location,work_type,region,category,experience_level,skills_tags,total_seats,filled_seats,is_hot,is_new,logo_color_1,logo_color_2,posted_ago,created_at,description,apply_url")
        .eq("is_active", true)
        .order("is_hot", {ascending: false})
        .order("created_at", {ascending: false})
        .limit(limit);

      if(region!=="All") query = query.eq("region", region);
      if(workType!=="All") query = query.eq("work_type", workType);
      if(category!=="All") query = query.eq("category", category);
      if(expLevel!=="All") query = query.eq("experience_level", expLevel);
      if(search) query = query.or(`title.ilike.%${search}%,company_name.ilike.%${search}%`);

      const {data, error} = await query;
      if(error) throw error;
      setJobs(data || []);
      setHasMore((data||[]).length >= limit);

      const {count} = await supabase.from("jobs")
        .select("*", {count:"exact", head:true})
        .eq("is_active", true);
      setLiveCount(count || 0);

      // Load applied jobs for logged in user
      if(user) {
        const {data:applied} = await supabase.from("applications")
          .select("job_id").eq("user_id", user.id);
        if(applied) setAppliedJobs(new Set(applied.map(a=>a.job_id)));
      }

    } catch (err) {
      console.error("Job fetch error:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  },[search, region, workType, category, expLevel, user]);

  useEffect(()=>{ setJobLimit(100); fetchJobs(100); },[search, region, workType, category, expLevel]);

  const loadMore = () => {
    const newLimit = jobLimit + 100;
    setJobLimit(newLimit);
    fetchJobs(newLimit);
  };

  // ── Real-time subscription (WebSocket) ────────────
  useEffect(()=>{
    // Polling every 60s instead of WebSocket (fixes Safari crash)
    const interval = setInterval(async () => {
      try {
        const {count} = await supabase.from("jobs")
          .select("*",{count:"exact",head:true})
          .eq("is_active",true);
        if(count) setLiveCount(count);
      } catch(e) {}
    }, 60000);
    return ()=>clearInterval(interval);
  },[]);

  // ── Toggle save job ───────────────────────────────
  const toggleSave = async (jobId) => {
    if(!user) return setShowAuth(true);
    const isSaved = saved.has(jobId);
    if(isSaved) {
      await supabase.from("saved_jobs").delete().eq("user_id",user.id).eq("job_id",jobId);
      setSaved(prev=>{const n=new Set(prev);n.delete(jobId);return n;});
      showToast("Job removed from saved","error");
    } else {
      await supabase.from("saved_jobs").insert({user_id:user.id,job_id:jobId});
      setSaved(prev=>new Set([...prev,jobId]));
      showToast("💾 Job saved!","success");
    }
  };

  // ── Post a job ────────────────────────────────────
  const handlePostJob = async () => {
    if(!user) return setShowAuth(true);
    if(!postForm.title||!postForm.company_name||!postForm.salary_range) return showToast("Fill required fields","error");
    setPostLoading(true);
    try {
      const {error} = await supabase.from("jobs").insert({
        ...postForm,
        posted_by: user.id,
        is_active: true,
        is_hot: false,
        is_new: true,
        filled_seats: 0,
        total_seats: 10,
        skills_tags: [],
        logo_color_1: "#00E5FF",
        logo_color_2: "#00C8E0",
      });
      if(error) throw error;

      // Trigger alerts for matching users
      await fetch("/api/trigger-alerts",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({title:postForm.title,company:postForm.company_name,region:postForm.region,workType:postForm.work_type}),
      });

      setPostDone(true);
      showToast("🎉 Job posted! Alerts sent to matching users.","success");
    } catch(err) {
      showToast(err.message,"error");
    } finally { setPostLoading(false); }
  };

  // ── Sign out ──────────────────────────────────────
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSaved(new Set());
    showToast("Signed out successfully","success");
  };

  // ── Filter jobs ───────────────────────────────────
  const liveJobs  = jobs.filter(j=>!j.filled_seats||(j.filled_seats<(j.total_seats||10))).filter(j=>{
    if(skillFilter && !(job.title+" "+(job.skills_tags||[]).join(" ")+" "+job.description).toLowerCase().includes(skillFilter.toLowerCase())) return false;
    if(salaryFilter==="All") return true;
    const s = (j.salary_range||"").toLowerCase();
    if(salaryFilter==="Competitive") return s.includes("competitive");
    if(salaryFilter==="0-3 LPA") return s.includes("₹") && (s.includes("0") || s.includes("1") || s.includes("2") || s.includes("3"));
    if(salaryFilter==="3-6 LPA") return s.includes("₹") && (s.includes("3") || s.includes("4") || s.includes("5") || s.includes("6"));
    if(salaryFilter==="6-10 LPA") return s.includes("₹") && (s.includes("6") || s.includes("7") || s.includes("8") || s.includes("9") || s.includes("10"));
    if(salaryFilter==="10-20 LPA") return s.includes("₹") && parseInt(s.match(/\d+/)?.[0]||0) >= 10;
    if(salaryFilter==="20+ LPA") return s.includes("₹") && parseInt(s.match(/\d+/)?.[0]||0) >= 20;
    return true;
  });
  const filledJobs = jobs.filter(j=>j.filled_seats>=(j.total_seats||10));
  const savedJobs  = jobs.filter(j=>saved.has(j.id));

  const NAV = [
    {id:"jobs",icon:"💼",label:"Jobs"},
    {id:"companies",icon:"🏛️",label:"Reviews"},
    {id:"companyPages",icon:"🏢",label:"Companies"},
    {id:"foryou",icon:"⭐",label:"For You"},
    {id:"resume",icon:"📄",label:"Resume"},
    {id:"tracker",icon:"📊",label:"Tracker"},
    {id:"salary",icon:"📊",label:"Salary"},
    {id:"interview",icon:"🎤",label:"Interview"},
    {id:"skills",icon:"🏆",label:"Skills"},
    {id:"alerts",icon:"🔔",label:"Alerts"},
    {id:"saved",icon:"🔖",label:`Saved (${saved.size})`},
    {id:"profile",icon:"👤",label:"Profile"},
    {id:"hr",icon:"🏢",label:"HR"},
    {id:"analytics",icon:"📊",label:"Stats"},
  ];

  return (
    <>
      <Styles/>
      <div style={{minHeight:"100vh",background:"transparent",color:"#F0F0FF",fontFamily:"Plus Jakarta Sans,sans-serif",overflowX:"hidden",width:"100%",maxWidth:"100vw",position:"relative"}}>

        {/* NAVBAR */}
        <nav style={{background:C.surface,borderBottom:`1px solid ${C.border}`,position:"sticky",top:0,zIndex:100,boxShadow:"0 4px 30px rgba(0,0,0,.3)"}}>
          <div style={{maxWidth:1400,margin:"0 auto",padding:"0 12px",display:"flex",alignItems:"center",height:56,gap:8,width:"100%",boxSizing:"border-box"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,cursor:"pointer",flexShrink:0}} onClick={()=>setNav("jobs")}>
              <div style={{width:38,height:38,borderRadius:12,background:`linear-gradient(135deg,${C.lime},#00C8E0)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,boxShadow:`0 4px 16px ${C.lime}30`}}>🚀</div>
              <div className="logo-text">
                <div style={{fontFamily:"Syne,sans-serif",fontSize:20,color:"#fff",letterSpacing:1,lineHeight:1}}>UDYAM PATH</div>
                <div style={{fontSize:8,color:C.lime,letterSpacing:1.5,textTransform:"uppercase",fontWeight:700}}>Real-Time - उद्यम पथ</div>
              </div>
            </div>

            {/* Live indicator */}
            <div className="live-badge" style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:999,background:"rgba(0,229,255,0.08)",border:"1px solid rgba(0,229,255,0.2)",backdropFilter:"blur(10px)",flexShrink:0}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:C.lime,animation:"pulse 1.5s infinite"}}/>
              <span style={{fontSize:11,fontWeight:800,color:C.lime,fontFamily:"Space Mono,monospace"}}>{liveCount.toLocaleString("en-IN")} LIVE</span>
            </div>

            {/* Nav */}
            <div className="top-nav" style={{display:"flex",gap:1,flex:1,overflowX:"auto",scrollbarWidth:"none",WebkitOverflowScrolling:"touch",msOverflowStyle:"none",padding:"0 4px"}}>
              {NAV.map(item=>(
                <div key={item.id} onClick={()=>setNav(item.id)} className={`btn ${nav===item.id?"nav-active":""}`}
                  style={{padding:"6px 8px",borderRadius:8,fontSize:11,fontWeight:800,color:nav===item.id?C.lime:"rgba(255,255,255,.4)",background:nav===item.id?`${C.lime}10`:"transparent",display:"flex",flexDirection:"column",alignItems:"center",gap:1,transition:"all .2s",whiteSpace:"nowrap",flexShrink:0,minWidth:44}}>
                  <span style={{fontSize:16}}>{item.icon}</span>
                  <span style={{fontSize:9,letterSpacing:.3}} className="mobile-hide">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Auth + Post */}
            <div style={{display:"flex",gap:6,alignItems:"center",flexShrink:0}}>
              {user ? (
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <div style={{width:34,height:34,borderRadius:10,background:`linear-gradient(135deg,${C.lime},#00C8E0)`,display:"flex",alignItems:"center",justifyContent:"center",color:C.bg,fontWeight:900,fontSize:14}}>
                    {(user.user_metadata?.full_name||user.email||"U")[0].toUpperCase()}
                  </div>
                  <div onClick={handleSignOut} className="btn sign-out-btn" style={{padding:"8px 14px",borderRadius:10,background:C.card,border:`1px solid ${C.border}`,fontSize:11,fontWeight:700,color:C.muted}}>Sign Out</div>
                </div>
              ) : (
                <div onClick={()=>setShowAuth(true)} className="btn" style={{padding:"10px 20px",borderRadius:12,background:C.card,border:`1px solid ${C.border}`,fontSize:13,fontWeight:800,color:"rgba(255,255,255,.6)"}}>Sign In</div>
              )}
              <button onClick={()=>setShowPricing(true)} className="btn"
                style={{padding:"10px 14px",borderRadius:12,background:"linear-gradient(135deg,#FFB700,#FF6B00)",color:"#000",border:"none",fontWeight:900,fontSize:13,cursor:"pointer"}}>
                💎
              </button>
              <button onClick={()=>setShowPost(true)} className="btn glow-pulse post-job-btn"
                style={{padding:"10px 18px",borderRadius:12,background:`linear-gradient(135deg,${C.lime},#00C8E0)`,color:C.bg,border:"none",fontWeight:900,fontSize:12,cursor:"pointer",letterSpacing:.5}}>
                + POST JOB FREE
              </button>
            </div>
          </div>
        </nav>

        {/* TICKER */}
        <div style={{background:`${C.lime}10`,borderBottom:`1px solid ${C.lime}12`,padding:"8px 0",overflow:"hidden"}}>
          <div className="marquee-inner">
            {[...Array(2)].map((_,rep)=>(
              ["🔴 LIVE: Jobs auto-removed when filled","⚡ Real-time WebSocket updates","📧 Real email alerts via Resend","🌍 India + International jobs via Adzuna API","🔔 Set alert - get emailed instantly on new jobs","✅ Applications saved to Supabase database"].map((t,i)=>(
                <span key={`${rep}-${i}`} style={{marginRight:60,fontSize:11,fontWeight:700,color:i%2===0?C.lime:C.gold,whiteSpace:"nowrap"}}>{t}</span>
              ))
            ))}
          </div>
        </div>

        {/* PAGES */}
        {nav==="jobs"&&(
          <>
            {/* Hero */}
            <div style={{background:`linear-gradient(135deg,${C.bg},#0D1520,${C.bg})`,padding:"clamp(32px,8vw,60px) 16px 40px",position:"relative",overflow:"hidden"}} className="grid-pattern">
              <div style={{position:"absolute",top:-100,right:-100,width:400,height:400,borderRadius:"50%",background:`radial-gradient(circle,${C.lime}08,transparent)`,filter:"blur(60px)"}}/>
              <div style={{maxWidth:860,margin:"0 auto",textAlign:"center",position:"relative"}}>
                <div className="fu" style={{display:"inline-flex",alignItems:"center",gap:8,padding:"6px 16px",borderRadius:999,background:"rgba(0,229,255,0.08)",border:"1px solid rgba(0,229,255,0.2)",backdropFilter:"blur(10px)",marginBottom:20}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:C.lime,animation:"pulse 1s infinite"}}/>
                  <span style={{fontSize:11,fontWeight:900,color:C.lime,letterSpacing:1}}>REAL-TIME - JOBS UPDATE LIVE - AUTO-REMOVED WHEN FILLED</span>
                </div>
                <h1 className="fu1" style={{fontFamily:"Syne,sans-serif",fontSize:"clamp(40px,8vw,76px)",color:"#fff",lineHeight:1,letterSpacing:2,marginBottom:16}}>
                  YOUR DREAM JOB<br/><span style={{color:C.lime}}>STARTS RIGHT NOW</span>
                </h1>
                <p className="fu2" style={{fontSize:15,color:"rgba(255,255,255,.45)",margin:"0 auto 36px",maxWidth:580,lineHeight:1.9}}>
                  Real jobs from Adzuna API - Real applications saved to database<br/>Real email alerts when jobs match - Real-time WebSocket updates
                </p>
                <div className="fu3" style={{display:"flex",gap:0,background:"rgba(255,255,255,0.06)",borderRadius:20,padding:5,boxShadow:"0 8px 32px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,0.1)",maxWidth:640,margin:"0 auto 20px",border:"1px solid rgba(255,255,255,0.1)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)"}}>
                  <div style={{flex:1,display:"flex",alignItems:"center",gap:12,padding:"8px 16px"}}>
                    <span style={{fontSize:18}}>🔍</span>
                    <input value={search} onChange={e=>setSearch(e.target.value)} onKeyDown={e=>e.key==="Enter"&&fetchJobs()}
                      placeholder="Search jobs, companies, skills..."
                      className="input-z"
                      style={{border:"none",background:"transparent",fontSize:15,fontFamily:"Plus Jakarta Sans,sans-serif",color:"#fff",width:"100%",outline:"none"}}/>
                  </div>
                  <button onClick={fetchJobs} className="btn" style={{padding:"14px 28px",borderRadius:16,background:`linear-gradient(135deg,${C.lime},#00C8E0)`,color:C.bg,border:"none",fontWeight:900,fontSize:15,fontFamily:"Plus Jakarta Sans,sans-serif",cursor:"pointer"}}>SEARCH</button>
                </div>
                <div className="fu3" style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
                  {["🔥 Fresher","🌍 Remote","🏠 WFH","💰 High Salary","🤖 AI / ML","🚀 Startup"].map(tag=>(
                    <div key={tag} onClick={()=>{setSearch(tag.split(" ").slice(1).join(" "));fetchJobs();}} className="btn"
                      style={{padding:"7px 16px",borderRadius:999,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.12)",backdropFilter:"blur(10px)",color:"rgba(255,255,255,.5)",fontSize:12,fontWeight:700}}>
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div style={{background:"rgba(255,255,255,0.03)",borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"14px 20px",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)"}}>
              <div style={{maxWidth:1400,margin:"0 auto",display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap"}}>
                {[["💼",liveJobs.length,"Live Jobs",C.lime],["📫",filledJobs.length,"Filled Today",C.coral],["🔖",saved.size,"Saved",C.gold],["⚡","Live","WebSocket",C.sky]].map(([ic,val,lb,c])=>(
                  <div key={lb} style={{textAlign:"center"}}>
                    <div style={{fontFamily:"Syne,sans-serif",fontSize:22,color:c,letterSpacing:.5}}>{ic} {val}</div>
                    <div style={{fontSize:10,color:"rgba(255,255,255,.25)",textTransform:"uppercase",letterSpacing:.6}}>{lb}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="main-content" style={{maxWidth:1400,margin:"0 auto",padding:"24px 20px"}}>
              {/* Filters */}
              <div style={{background:"rgba(255,255,255,0.03)",borderRadius:20,padding:18,border:"1px solid rgba(255,255,255,0.07)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",marginBottom:24}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,flexWrap:"wrap",gap:8}}>
                  <div style={{fontWeight:800,fontSize:14,color:"rgba(255,255,255,.6)"}}>🎛️ Filter</div>
                  <div style={{display:"flex",gap:10,alignItems:"center"}}>
                    {[region,workType,category,expLevel].some(f=>f!=="All")&&
                      <span onClick={()=>{setRegion("All");setWorkType("All");setCategory("All");setExpLevel("All");}} style={{fontSize:12,color:C.coral,fontWeight:800,cursor:"pointer"}}>Clear ×</span>}
                    <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{padding:"7px 12px",borderRadius:10,border:`1px solid ${C.border}`,fontSize:12,fontWeight:700,color:"#fff",fontFamily:"Plus Jakarta Sans,sans-serif",background:C.surface,cursor:"pointer"}}>
                      <option value="hot">🔥 Hot</option><option value="new">🆕 Newest</option><option value="seats">📊 Seats</option>
                    </select>
                  </div>
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10}}>
                  {[{lb:"Region",opts:["All","India","USA","UK","Canada","Australia","Singapore","Remote - Global"],val:region,set:setRegion},
                    {lb:"Work Type",opts:["All","Remote","WFH","Hybrid","In-Office","Freelance"],val:workType,set:setWorkType},
                    {lb:"Category",opts:["All","Tech","Data","Product","Design","Marketing","Sales","HR","Content","Operations"],val:category,set:setCategory},
                    {lb:"Experience",opts:["All","Fresher","0-2 yrs","2-5 yrs","5-10 yrs","10+ yrs"],val:expLevel,set:setExpLevel},
                    {lb:"💰 Salary",opts:["All","0-3 LPA","3-6 LPA","6-10 LPA","10-20 LPA","20+ LPA","Competitive"],val:salaryFilter,set:setSalaryFilter}].map(f=>(
                    <div key={f.lb}>
                      <div style={{fontSize:10,fontWeight:800,color:"rgba(255,255,255,.25)",marginBottom:5,textTransform:"uppercase",letterSpacing:.6}}>{f.lb}</div>
                      <select value={f.val} onChange={e=>f.set(e.target.value)} className="input-z"
                        style={{width:"100%",padding:"9px 12px",borderRadius:11,border:`1.5px solid ${f.val!=="All"?C.lime:C.border}`,fontSize:12,fontWeight:700,fontFamily:"Plus Jakarta Sans,sans-serif",background:f.val!=="All"?`${C.lime}08`:C.surface,color:f.val!=="All"?C.lime:"rgba(255,255,255,.5)",cursor:"pointer",transition:"all .2s"}}>
                        {f.opts.map(o=><option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skill Filter */}
            <div style={{padding:"0 16px 8px"}}>
              <input value={skillFilter} onChange={e=>setSkillFilter(e.target.value)} placeholder="Filter by skill e.g. React, Python, SQL..."
                style={{width:"100%",padding:"10px 14px",borderRadius:12,border:"1px solid rgba(255,255,255,0.08)",background:"rgba(255,255,255,0.03)",color:"#fff",fontSize:13,fontFamily:"inherit",outline:"none",boxSizing:"border-box"}}/>
            </div>
            {/* Job Grid */}
              <div style={{fontFamily:"Syne,sans-serif",fontSize:24,color:"#fff",letterSpacing:.5,marginBottom:16}}>
                {loading?"LOADING LIVE JOBS...":`${liveJobs.length} LIVE JOBS`}
                <span style={{fontSize:11,fontFamily:"Plus Jakarta Sans,sans-serif",fontWeight:600,letterSpacing:0,color:"rgba(255,255,255,.25)",marginLeft:12}}>
                  {loading?"Fetching from Adzuna API + Database...":"From Adzuna API + Database - Auto-updates via WebSocket"}
                </span>
              </div>

              {loading ? (
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:14}}>
                  {[...Array(8)].map((_,i)=><SkeletonCard key={i}/>)}
                </div>
              ) : liveJobs.length > 0 ? (
                <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:14,marginBottom:24}}>
                  {liveJobs.map((job,i)=>(
                    <div key={job.id} className="fu" style={{animationDelay:`${Math.min(i*.04,.4)}s`}}>
                      <JobCard job={job} onOpen={setSelectedJob} saved={saved.has(job.id)} onSave={toggleSave} user={user} onAuthRequired={()=>setShowAuth(true)} isApplied={appliedJobs.has(job.id)} isFeatured={job.is_featured} userSkills={userSkills}/>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{padding:"60px 20px",textAlign:"center",background:C.card,borderRadius:20,border:`1px solid ${C.border}`,marginBottom:24}}>
                  <div style={{fontSize:48,marginBottom:12}}>🔍</div>
                  <div style={{fontFamily:"Syne,sans-serif",fontSize:22,color:"#fff",marginBottom:12}}>No Jobs Found</div>
                  <div onClick={()=>{setSearch("");setRegion("All");setWorkType("All");setCategory("All");setExpLevel("All");fetchJobs();}} className="btn" style={{display:"inline-block",padding:"12px 28px",borderRadius:14,background:`linear-gradient(135deg,${C.lime},#00C8E0)`,color:C.bg,fontWeight:900,fontSize:14,cursor:"pointer"}}>Clear Filters & Reload</div>
                </div>
              )}

              {/* Load More Button */}
              {hasMore && liveJobs.length > 0 && (
                <div style={{textAlign:"center",marginBottom:24}}>
                  <div onClick={loadMore} className="btn" style={{
                    display:"inline-flex",alignItems:"center",gap:10,
                    padding:"14px 36px",borderRadius:16,
                    background:`linear-gradient(135deg,${C.lime},#00C8E0)`,
                    color:C.bg,fontWeight:900,fontSize:16,
                    fontFamily:"Syne,sans-serif",letterSpacing:1,
                    cursor:"pointer",boxShadow:`0 4px 20px ${C.lime}30`
                  }}>
                    📋 LOAD MORE JOBS
                  </div>
                  <div style={{fontSize:12,color:C.muted,marginTop:8}}>Showing {liveJobs.length} of {liveCount} jobs</div>
                  <div onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} className="btn" style={{
                    display:"inline-flex",alignItems:"center",gap:8,marginTop:12,
                    padding:"10px 24px",borderRadius:12,
                    background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",
                    color:"rgba(255,255,255,.6)",fontWeight:700,fontSize:13,cursor:"pointer"
                  }}>
                    ↑ Back to Top
                  </div>
                </div>
              )}

              {/* Filled Jobs */}
              {filledJobs.length>0&&(
                <>
                  <div style={{fontFamily:"Syne,sans-serif",fontSize:18,color:"rgba(255,77,109,.5)",letterSpacing:.5,marginBottom:12}}>
                    POSITIONS FILLED ({filledJobs.length}) - Auto-removed from active listings
                  </div>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:14,marginBottom:24}}>
                    {filledJobs.map(job=><JobCard key={job.id} job={job} onOpen={()=>{}} saved={saved.has(job.id)} onSave={toggleSave} user={user} onAuthRequired={()=>setShowAuth(true)}/>)}
                  </div>
                </>
              )}

              {/* Alert CTA */}
              <div style={{background:`linear-gradient(135deg,rgba(170,255,0,.06),rgba(56,189,248,.04))`,border:`1px solid ${C.lime}20`,borderRadius:24,padding:"28px 32px",display:"flex",gap:24,alignItems:"center",flexWrap:"wrap"}}>
                <div style={{fontSize:44}} className="float">🔔</div>
                <div style={{flex:1,minWidth:220}}>
                  <div style={{fontFamily:"Syne,sans-serif",fontSize:22,color:"#fff",letterSpacing:.5}}>REAL EMAIL ALERTS - FREE</div>
                  <div style={{fontSize:13,color:C.muted,marginTop:4}}>Get emailed the instant a matching job is posted. Powered by Resend.</div>
                </div>
                <div onClick={()=>setNav("alerts")} className="btn glow-pulse" style={{padding:"14px 28px",borderRadius:14,background:`linear-gradient(135deg,${C.lime},#00C8E0)`,color:C.bg,fontWeight:900,fontSize:14,cursor:"pointer"}}>Set Alert Free →</div>
              </div>
            </div>
          </>
        )}

        {nav==="alerts"&&<AlertSetup user={user} onAuthRequired={()=>setShowAuth(true)} onToast={showToast}/>}
        {nav==="alerts"&&(
          <div style={{maxWidth:600,margin:"20px auto",padding:"0 20px"}}>
            <div style={{background:"rgba(37,211,102,.08)",borderRadius:16,padding:20,border:"1px solid rgba(37,211,102,.2)"}}>
              <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,color:"#fff",fontSize:16,marginBottom:8}}>📱 WhatsApp Job Alerts</div>
              <div style={{color:"rgba(255,255,255,.5)",fontSize:13,marginBottom:14}}>Get instant job alerts on WhatsApp! Share this link with yourself:</div>
              <div onClick={()=>window.open(`https://wa.me/?text=${encodeURIComponent("🚀 I'm using UdyamPath for job search! Join me: https://udyampath.vercel.app")}`, "_blank")}
                style={{padding:"12px 20px",borderRadius:12,background:"#25D366",color:"#fff",fontWeight:800,fontSize:14,cursor:"pointer",textAlign:"center"}}>
                📲 Share UdyamPath on WhatsApp
              </div>
            </div>
          </div>
        )}
        {nav==="applied"&&(
          <div style={{maxWidth:1000,margin:"0 auto",padding:"24px 20px"}}>
            <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:28,color:"#fff",marginBottom:20}}>📋 MY APPLICATIONS</div>
            {!user?(
              <div style={{textAlign:"center",padding:60,background:"#0D0D1F",borderRadius:20,border:"1px solid rgba(0,229,255,.08)"}}>
                <div style={{fontSize:48,marginBottom:12}}>📋</div>
                <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:22,color:"#fff",marginBottom:16}}>Sign in to track applications</div>
                <div onClick={()=>setShowAuth(true)} style={{display:"inline-block",padding:"12px 28px",borderRadius:12,background:"linear-gradient(135deg,#00E5FF,#7C3AED)",color:"#fff",fontWeight:700,cursor:"pointer"}}>Sign In →</div>
              </div>
            ):appliedJobs.size===0?(
              <div style={{textAlign:"center",padding:60,background:"#0D0D1F",borderRadius:20,border:"1px solid rgba(0,229,255,.08)"}}>
                <div style={{fontSize:48,marginBottom:12}}>📭</div>
                <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:22,color:"#fff",marginBottom:8}}>No applications yet</div>
                <div style={{color:"rgba(255,255,255,.4)",fontSize:13}}>Apply for jobs and track your status here!</div>
              </div>
            ):(
              <div style={{display:"flex",flexDirection:"column",gap:12}}>
                {jobs.filter(j=>appliedJobs.has(j.id)).map(job=>(
                  <div key={job.id} style={{background:"#0D0D1F",borderRadius:16,padding:20,border:"1px solid rgba(0,229,255,.08)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
                    <div style={{display:"flex",gap:12,alignItems:"center"}}>
                      <div style={{width:42,height:42,borderRadius:12,background:`linear-gradient(135deg,${job.logo_color_1||"#00E5FF"},${job.logo_color_2||"#7C3AED"})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:16}}>{(job.company_name||"?")[0]}</div>
                      <div>
                        <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,color:"#fff",fontSize:15}}>{job.title}</div>
                        <div style={{color:"rgba(255,255,255,.4)",fontSize:12}}>{job.company_name} - {job.location}</div>
                      </div>
                    </div>
                    <div style={{display:"flex",gap:8,alignItems:"center"}}>
                      <span style={{padding:"6px 14px",borderRadius:8,background:"rgba(0,229,255,.1)",color:"#00E5FF",fontWeight:700,fontSize:11,fontFamily:"Space Mono,monospace"}}>✓ APPLIED</span>
                      <span style={{padding:"6px 14px",borderRadius:8,background:"rgba(255,183,0,.1)",color:"#FFB700",fontWeight:700,fontSize:11,fontFamily:"Space Mono,monospace"}}>⏳ REVIEWING</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {nav==="resume"&&<ResumeBuilderPage user={user} onAuthRequired={()=>setShowAuth(true)}/>}
        {nav==="tracker"&&<ApplicationTracker user={user} onAuthRequired={()=>setShowAuth(true)}/>}
        {nav==="companies"&&<CompanyReviews user={user} onAuthRequired={()=>setShowAuth(true)} jobs={jobs}/>}
        {nav==="companyPages"&&<CompanyPages jobs={jobs} user={user} onAuthRequired={()=>setShowAuth(true)}/>}
        {nav==="foryou"&&<JobRecommendations user={user} onAuthRequired={()=>setShowAuth(true)} jobs={jobs}/>}
        {nav==="salary"&&<SalaryInsights jobs={jobs}/>}
        {nav==="interview"&&<MockInterview/>}
        {nav==="skills"&&<SkillGapAnalyzer/>}
        {nav==="profile"&&<CandidateProfile user={user} onAuthRequired={()=>setShowAuth(true)} onToast={showToast}/>}
        {nav==="profile"&&user&&<div style={{maxWidth:900,margin:"0 auto",padding:"0 16px 24px"}}><ReferralCard user={user} onToast={showToast}/></div>}
        {nav==="hr"&&<HRDashboard user={user} onAuthRequired={()=>setShowAuth(true)}/>}
        {nav==="analytics"&&<AnalyticsDashboard user={user}/>}

        {nav==="saved"&&(
          <div style={{maxWidth:1100,margin:"0 auto",padding:"28px 20px"}}>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:34,color:"#fff",letterSpacing:.5,marginBottom:6}}>SAVED JOBS 🔖</div>
            <div style={{fontSize:13,color:C.muted,marginBottom:24}}>Saved to your Supabase account - Synced across devices</div>
            {!user ? (
              <div style={{padding:"60px 20px",textAlign:"center",background:C.card,borderRadius:20,border:`1px solid ${C.border}`}}>
                <div style={{fontSize:48,marginBottom:12}}>🔐</div>
                <div style={{fontFamily:"Syne,sans-serif",fontSize:22,color:"#fff",marginBottom:12}}>Sign In to Save Jobs</div>
                <div onClick={()=>setShowAuth(true)} className="btn" style={{display:"inline-block",padding:"14px 32px",borderRadius:16,background:`linear-gradient(135deg,${C.lime},#00C8E0)`,color:C.bg,fontWeight:900,fontSize:15,cursor:"pointer"}}>Sign In / Create Account →</div>
              </div>
            ) : savedJobs.length===0 ? (
              <div style={{padding:"60px 20px",textAlign:"center",background:C.card,borderRadius:20,border:`1px solid ${C.border}`}}>
                <div style={{fontSize:48,marginBottom:12}}>🏷️</div>
                <div style={{fontFamily:"Syne,sans-serif",fontSize:22,color:"#fff",marginBottom:12}}>NO SAVED JOBS</div>
                <div onClick={()=>setNav("jobs")} className="btn" style={{display:"inline-block",padding:"14px 32px",borderRadius:16,background:`linear-gradient(135deg,${C.lime},#00C8E0)`,color:C.bg,fontWeight:900,fontSize:15,cursor:"pointer"}}>Browse Jobs →</div>
              </div>
            ) : (
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(320px,1fr))",gap:14}}>
                {savedJobs.map(job=><JobCard key={job.id} job={job} onOpen={setSelectedJob} saved={true} onSave={toggleSave} user={user} onAuthRequired={()=>setShowAuth(true)}/>)}
              </div>
            )}
          </div>
        )}

        {/* POST JOB MODAL */}
        {showPost&&(
          <div style={{position:"fixed",inset:0,zIndex:300,display:"flex",alignItems:"center",justifyContent:"center",padding:20}}>
            <div onClick={()=>{setShowPost(false);setPostDone(false);}} style={{position:"absolute",inset:0,background:"rgba(0,0,0,.85)",backdropFilter:"blur(8px)"}}/>
            <div style={{position:"relative",background:C.surface,borderRadius:28,maxWidth:560,width:"100%",overflow:"hidden",maxHeight:"90vh",display:"flex",flexDirection:"column",border:`1px solid ${C.border}`}}>
              <div style={{background:C.card,padding:"22px 24px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <div>
                  <div style={{fontFamily:"Syne,sans-serif",fontSize:22,color:"#fff",letterSpacing:.5}}>POST A JOB - FREE</div>
                  <div style={{fontSize:11,color:"#00E5FF",marginTop:2}}>✅ Candidates apply DIRECTLY to your HR email!</div>
                </div>
                <div onClick={()=>{setShowPost(false);setPostDone(false);}} className="btn" style={{width:36,height:36,borderRadius:12,background:C.surface,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",border:`1px solid ${C.border}`,color:C.muted,fontSize:18}}>✕</div>
              </div>
              {!postDone?(
                <div style={{padding:24,overflowY:"auto",flex:1,display:"flex",flexDirection:"column",gap:12}}>
                  {[["Job Title *","title","e.g. Senior React Developer"],["Company Name *","company_name","e.g. Your Company"],["Location","location","e.g. Bengaluru / Remote"],["Salary Range *","salary_range","e.g. ₹8-15 LPA"],["Contact Email *","contact_email","hr@company.com"],["Job Description","description","Describe the role..."]].map(([lb,key,ph])=>(
                    <div key={key}>
                      <label style={{fontSize:11,fontWeight:800,color:C.muted,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:.6}}>{lb}</label>
                      {key==="description"?(
                        <textarea value={postForm[key]} onChange={e=>setPostForm(f=>({...f,[key]:e.target.value}))} placeholder={ph} className="input-z"
                          style={{width:"100%",padding:"12px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:13,fontFamily:"Plus Jakarta Sans,sans-serif",background:C.card,color:"#fff",height:80,resize:"none"}}/>
                      ):(
                        <input value={postForm[key]} onChange={e=>setPostForm(f=>({...f,[key]:e.target.value}))} placeholder={ph} className="input-z"
                          style={{width:"100%",padding:"12px 16px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:14,fontFamily:"Plus Jakarta Sans,sans-serif",background:C.card,color:"#fff"}}/>
                      )}
                    </div>
                  ))}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                    {[["Work Type","work_type",["Remote","WFH","Hybrid","In-Office"]],["Region","region",["India","USA","UK","Canada","Australia","Singapore","Global"]]].map(([lb,key,opts])=>(
                      <div key={key}>
                        <label style={{fontSize:11,fontWeight:800,color:C.muted,display:"block",marginBottom:5,textTransform:"uppercase",letterSpacing:.6}}>{lb}</label>
                        <select value={postForm[key]} onChange={e=>setPostForm(f=>({...f,[key]:e.target.value}))} className="input-z"
                          style={{width:"100%",padding:"11px 14px",borderRadius:12,border:`1.5px solid ${C.border}`,fontSize:13,fontFamily:"Plus Jakarta Sans,sans-serif",background:C.card,color:"#fff",cursor:"pointer"}}>
                          {opts.map(o=><option key={o}>{o}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              ):(
                <div style={{padding:40,textAlign:"center"}}>
                  <div style={{fontSize:64,marginBottom:16}} className="float">🎊</div>
                  <div style={{fontFamily:"Syne,sans-serif",fontSize:26,color:"#00E5FF",letterSpacing:.5}}>JOB IS LIVE! 🎉</div>
                  <div style={{fontSize:13,color:C.muted,margin:"12px 0 24px",lineHeight:1.8}}>
                    ✅ Job posted on UdyamPath<br/>
                    ✅ Alerts sent to matching candidates<br/>
                    ✅ Applications will land directly in your HR inbox!
                  </div>
                </div>
              )}
              {!postDone&&(
                <div style={{padding:"16px 24px 24px",borderTop:`1px solid ${C.border}`}}>
                  <button onClick={handlePostJob} disabled={postLoading} className="btn glow-pulse"
                    style={{width:"100%",padding:16,borderRadius:14,background:`linear-gradient(135deg,${C.lime},#00C8E0)`,color:C.bg,border:"none",fontFamily:"Syne,sans-serif",fontSize:20,letterSpacing:1,cursor:postLoading?"not-allowed":"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
                    {postLoading?<><Spinner size={20} color={C.bg}/> Posting...</>:"🚀 POST JOB FREE"}
                  </button>
                  {!user&&<div style={{textAlign:"center",marginTop:8,fontSize:11,color:C.muted}}>You'll be asked to sign in first</div>}
                </div>
              )}
            </div>
          </div>
        )}

        {/* JOB DETAIL */}
        {selectedJob&&<JobDetail job={selectedJob} onClose={()=>setSelectedJob(null)} user={user} onAuthRequired={()=>setShowAuth(true)}/>}
        {showPricing&&<PricingModal onClose={()=>setShowPricing(false)} user={user} onAuthRequired={()=>setShowAuth(true)} jobId={pricingJobId}/>}

        {/* AUTH MODAL */}
        {showAuth&&<AuthModal onClose={()=>setShowAuth(false)} onAuth={u=>{setUser(u);showToast(`Welcome, ${u.user_metadata?.full_name||u.email}! 🎉`,"success");}}/>}

        {/* TOAST */}
        {toast&&<Toast msg={toast.msg} type={toast.type} onClose={()=>setToast(null)}/>}

        {/* RESUME BUILDER */}
        {showResumeBuilder&&<ResumeBuilder user={user} onClose={()=>setShowResumeBuilder(false)}/>}

        {/* AI CHATBOT */}
        <AIChatbot jobs={jobs} />

        {/* BOTTOM NAV - Mobile only */}
        <div className="bottom-nav">
          {NAV.map(item=>(
            <div key={item.id} onClick={()=>setNav(item.id)}
              style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"6px 6px",borderRadius:10,
                color:nav===item.id?"#00E5FF":"rgba(255,255,255,.35)",
                background:nav===item.id?"rgba(0,229,255,.08)":"transparent",
                cursor:"pointer",flex:1,maxWidth:52,transition:"all .2s"}}>
              <span style={{fontSize:20}}>{item.icon}</span>
              <span style={{fontSize:7,fontWeight:700,letterSpacing:.2,textAlign:"center",lineHeight:1.2}}>{item.label.split(" ")[0]}</span>
            </div>
          ))}
          <div onClick={()=>setShowPricing(true)}
            style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2,padding:"6px 6px",borderRadius:10,
              background:"rgba(255,183,0,0.1)",cursor:"pointer",flex:1,maxWidth:52}}>
            <span style={{fontSize:16}}>💎</span>
            <span style={{fontSize:7,fontWeight:700,color:"#FFB700",letterSpacing:.2}}>PRO</span>
          </div>
        </div>

        {/* FOOTER */}
        <footer style={{background:"#05050A",borderTop:`1px solid ${C.border}`,padding:"24px 20px",marginTop:20,paddingBottom:"calc(100px + env(safe-area-inset-bottom, 20px))"}}>
          <div style={{maxWidth:1400,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <div style={{width:30,height:30,borderRadius:10,background:`linear-gradient(135deg,${C.lime},#00C8E0)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🚀</div>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:18,color:"#fff",letterSpacing:1}}>UDYAM PATH</div>
            </div>
            <div style={{fontSize:11,color:"rgba(255,255,255,.2)",textAlign:"center"}}>
              Real-time via Supabase WebSocket - Jobs via Adzuna API - Emails via Resend - Hosted on Vercel
              <div style={{marginTop:6,fontSize:13,color:"rgba(255,255,255,.5)"}}>
                Made with ❤️ by <span style={{color:"#00E5FF",fontWeight:900}}>Sanjeev & Vedha Nikitha</span>
              </div>
            </div>
            <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
              <Chip color={C.lime}>Supabase ✓</Chip>
              <Chip color={C.sky}>Adzuna API ✓</Chip>
              <Chip color={C.gold}>Resend ✓</Chip>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════
   CANDIDATE PROFILE PAGE
══════════════════════════════════════════════════ */
const CandidateProfile = ({ user, onAuthRequired }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ full_name:"", email:"", phone:"", location:"", linkedin:"", skills:"", experience:"", education:"", open_to_work:true });
  const [resumeFile, setResumeFile] = useState(null);
  const [saved2, setSaved2] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [parseFile, setParseFile] = useState(null);

  const parseResume = async () => {
    if (!parseFile) return;
    setParsing(true);
    try {
      const text = await parseFile.text();
      const res = await fetch("/api/parse-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeText: text })
      });
      const { data } = await res.json();
      if (data) {
        setForm(f => ({ ...f,
          full_name: data.full_name || f.full_name,
          email: data.email || f.email,
          phone: data.phone || f.phone,
          location: data.location || f.location,
          linkedin: data.linkedin || f.linkedin,
          skills: data.skills || f.skills,
          experience: data.experience || f.experience,
          education: data.education || f.education,
        }));
      }
    } catch(e) { console.error(e); }
    finally { setParsing(false); }
  };

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    supabase.from("candidate_profiles").select("*").eq("user_id", user.id).single()
      .then(({ data }) => {
        if (data) { setProfile(data); setForm(data); }
        else setForm(f => ({ ...f, full_name: user.user_metadata?.full_name||"", email: user.email||"" }));
        setLoading(false);
      });
  }, [user]);

  const save = async () => {
    if (!user) return onAuthRequired();
    setSaving(true);
    try {
      let resumeUrl = profile?.resume_url || null;
      if (resumeFile) {
        const ext = resumeFile.name.split(".").pop();
        const fileName = `profile-${user.id}.${ext}`;
        await supabase.storage.from("resumes").upload(fileName, resumeFile, { upsert: true });
        const { data: urlData } = supabase.storage.from("resumes").getPublicUrl(fileName);
        resumeUrl = urlData?.publicUrl;
      }
      const payload = { ...form, user_id: user.id, resume_url: resumeUrl };
      const { error } = await supabase.from("candidate_profiles").upsert(payload, { onConflict: "user_id" });
      if (error) throw error;
      setSaved2(true);
      setTimeout(() => setSaved2(false), 3000);
    } catch(e) { console.error(e); }
    finally { setSaving(false); }
  };

  const C2 = { bg:"#04040C", card:"#0D0D1F", border:"rgba(0,229,255,.08)", cyan:"#00E5FF", muted:"rgba(255,255,255,.4)", surface:"#080816" };
  const inputStyle = { width:"100%", padding:"11px 14px", borderRadius:12, border:`1.5px solid ${C2.border}`, background:C2.surface, color:"#fff", fontSize:13, fontFamily:"Plus Jakarta Sans,sans-serif", boxSizing:"border-box" };

  if (!user) return (
    <div style={{maxWidth:600,margin:"60px auto",padding:24,textAlign:"center"}}>
      <div style={{fontSize:56,marginBottom:16}}>👤</div>
      <div style={{fontFamily:"Syne,sans-serif",fontSize:24,color:"#fff",marginBottom:12}}>Create Your Profile</div>
      <div style={{color:C2.muted,fontSize:14,marginBottom:24}}>Sign in to build your candidate profile and get found by top companies!</div>
      <div onClick={onAuthRequired} style={{display:"inline-block",padding:"14px 32px",borderRadius:14,background:"linear-gradient(135deg,#00E5FF,#7C3AED)",color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer"}}>Sign In / Sign Up →</div>
    </div>
  );

  if (loading) return <div style={{textAlign:"center",padding:60}}><div className="spin" style={{width:40,height:40,border:"3px solid rgba(0,229,255,.2)",borderTop:"3px solid #00E5FF",borderRadius:"50%",margin:"0 auto"}}/></div>;

  return (
    <div style={{maxWidth:800,margin:"0 auto",padding:"24px 20px"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:28,color:"#fff"}}>👤 MY PROFILE</div>
          <div style={{color:C2.muted,fontSize:13}}>Get discovered by top companies hiring on UdyamPath</div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <span style={{fontSize:12,color:C2.muted}}>Open to work</span>
          <div onClick={()=>setForm(f=>({...f,open_to_work:!f.open_to_work}))} style={{width:44,height:24,borderRadius:99,background:form.open_to_work?"#00E5FF":"rgba(255,255,255,.1)",cursor:"pointer",position:"relative",transition:"all .3s"}}>
            <div style={{position:"absolute",top:2,left:form.open_to_work?22:2,width:20,height:20,borderRadius:"50%",background:"#fff",transition:"all .3s"}}/>
          </div>
        </div>
      </div>

      {/* Profile preview card */}
      <div style={{background:"linear-gradient(135deg,rgba(0,229,255,.1),rgba(124,58,237,.1))",borderRadius:20,padding:24,border:"1px solid rgba(0,229,255,.15)",marginBottom:24,display:"flex",gap:16,alignItems:"center"}}>
        <div style={{width:64,height:64,borderRadius:20,background:"linear-gradient(135deg,#00E5FF,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:900,fontSize:28,fontFamily:"Syne,sans-serif",flexShrink:0}}>
          {(form.full_name||user.email||"U")[0].toUpperCase()}
        </div>
        <div style={{flex:1}}>
          <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:20,color:"#fff"}}>{form.full_name||"Your Name"}</div>
          <div style={{color:C2.muted,fontSize:13}}>{form.location||"Location"} - {form.experience||"Experience"}</div>
          <div style={{marginTop:6,display:"flex",gap:6,flexWrap:"wrap"}}>
            {(form.skills||"").split(",").slice(0,4).map(s=>s.trim()).filter(Boolean).map(s=>(
              <span key={s} style={{padding:"2px 8px",borderRadius:4,background:"rgba(0,229,255,.1)",color:"#00E5FF",fontSize:10,fontFamily:"Space Mono,monospace"}}>{s}</span>
            ))}
          </div>
        </div>
        {form.open_to_work && <div style={{padding:"6px 14px",borderRadius:8,background:"rgba(0,214,143,.15)",color:"#00D68F",fontSize:11,fontWeight:700,border:"1px solid rgba(0,214,143,.2)"}}>🟢 OPEN TO WORK</div>}
      </div>

      {/* AI Resume Parser */}
      <div style={{background:"linear-gradient(135deg,rgba(0,229,255,.06),rgba(124,58,237,.06))",borderRadius:16,padding:20,border:"1px solid rgba(0,229,255,.12)",marginBottom:20}}>
        <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,color:"#fff",fontSize:15,marginBottom:4}}>🤖 AI Resume Parser</div>
        <div style={{color:"rgba(255,255,255,.4)",fontSize:12,marginBottom:12}}>Upload your resume (TXT format) → AI auto-fills your profile!</div>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          <input type="file" accept=".txt,.md" onChange={e=>setParseFile(e.target.files[0])}
            style={{flex:1,padding:"8px 12px",borderRadius:10,border:"1px solid rgba(0,229,255,.15)",background:"rgba(0,0,0,.3)",color:"rgba(255,255,255,.5)",fontSize:12,minWidth:0}}/>
          <div onClick={parseResume} style={{padding:"10px 20px",borderRadius:10,background:parsing?"rgba(0,229,255,.2)":"linear-gradient(135deg,#00E5FF,#7C3AED)",color:"#fff",fontWeight:800,fontSize:13,cursor:"pointer",whiteSpace:"nowrap",flexShrink:0}}>
            {parsing?"🤖 Parsing...":"⚡ Auto-Fill"}
          </div>
        </div>
        {parsing && <div style={{marginTop:10,color:"#00E5FF",fontSize:12}}>🤖 AI is reading your resume...</div>}
      </div>

      <div style={{display:"flex",flexDirection:"column",gap:14}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {[["FULL NAME","full_name","Sanjeev Kumar"],["EMAIL","email","you@email.com"],["PHONE","phone","+91 9999999999"],["LOCATION","location","Bangalore, India"],["LINKEDIN","linkedin","linkedin.com/in/yourname"],["EXPERIENCE","experience","3 years React Developer"]].map(([lb,key,ph])=>(
            <div key={key}>
              <div style={{fontSize:10,fontWeight:800,color:C2.muted,marginBottom:5,letterSpacing:.6}}>{lb}</div>
              <input style={inputStyle} value={form[key]||""} onChange={e=>setForm(f=>({...f,[key]:e.target.value}))} placeholder={ph}/>
            </div>
          ))}
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:800,color:C2.muted,marginBottom:5,letterSpacing:.6}}>SKILLS (comma separated)</div>
          <input style={inputStyle} value={form.skills||""} onChange={e=>setForm(f=>({...f,skills:e.target.value}))} placeholder="React, Node.js, Python, AWS..."/>
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:800,color:C2.muted,marginBottom:5,letterSpacing:.6}}>EDUCATION</div>
          <input style={inputStyle} value={form.education||""} onChange={e=>setForm(f=>({...f,education:e.target.value}))} placeholder="B.Tech CSE, VIT (2020)"/>
        </div>
        <div>
          <div style={{fontSize:10,fontWeight:800,color:C2.muted,marginBottom:5,letterSpacing:.6}}>UPLOAD RESUME (PDF)</div>
          <input type="file" accept=".pdf,.doc,.docx" onChange={e=>setResumeFile(e.target.files[0])}
            style={{...inputStyle,padding:"8px 14px",color:C2.muted}}/>
          {(profile?.resume_url||form.resume_url) && <a href={profile?.resume_url||form.resume_url} target="_blank" rel="noreferrer" style={{fontSize:11,color:"#00E5FF",marginTop:4,display:"block"}}>📄 View current resume</a>}
        </div>
        <div onClick={save} style={{padding:14,borderRadius:14,background:saving?"rgba(0,229,255,.2)":"linear-gradient(135deg,#00E5FF,#7C3AED)",color:"#fff",fontFamily:"Syne,sans-serif",fontSize:18,fontWeight:800,cursor:"pointer",textAlign:"center"}}>
          {saving?"Saving...":saved2?"✅ Profile Saved!":"💾 SAVE PROFILE"}
        </div>
      </div>

      {/* Share profile */}
      <div style={{marginTop:20,padding:16,borderRadius:14,background:"rgba(0,229,255,.05)",border:"1px solid rgba(0,229,255,.1)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10}}>
        <div>
          <div style={{fontWeight:800,color:"#fff",fontSize:13}}>📣 Share your profile</div>
          <div style={{color:C2.muted,fontSize:12}}>Let companies find you on WhatsApp & LinkedIn</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          {[["WhatsApp","https://wa.me/?text=Check out my profile on UdyamPath! https://udyampath.vercel.app","#25D366"],
            ["LinkedIn","https://www.linkedin.com/sharing/share-offsite/?url=https://udyampath.vercel.app","#0077B5"]].map(([name,url,color])=>(
            <a key={name} href={url} target="_blank" rel="noreferrer" style={{padding:"8px 16px",borderRadius:10,background:color,color:"#fff",fontSize:12,fontWeight:700,textDecoration:"none"}}>{name}</a>
          ))}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════════
   HR DASHBOARD
══════════════════════════════════════════════════ */
const HRDashboard = ({ user, onAuthRequired }) => {
  const [tab, setTab] = useState("applications");
  const [applications, setApplications] = useState([]);
  const [myJobs, setMyJobs] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [companyForm, setCompanyForm] = useState({ company_name:"", company_email:"", company_website:"", company_size:"1-10", industry:"Tech", about:"" });
  const [company, setCompany] = useState(null);
  const [savingCompany, setSavingCompany] = useState(false);
  const [searchCandidates, setSearchCandidates] = useState("");

  const C2 = { bg:"#04040C", card:"#0D0D1F", border:"rgba(0,229,255,.08)", cyan:"#00E5FF", muted:"rgba(255,255,255,.4)", surface:"#080816", violet:"#7C3AED" };

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    loadData();
  }, [user]);

  const loadData = async () => {
    setLoading(true);
    try {
      // Load company profile
      const { data: comp } = await supabase.from("company_profiles").select("*").eq("user_id", user.id).single();
      if (comp) { setCompany(comp); setCompanyForm(comp); }

      // Load my posted jobs
      const { data: jobs } = await supabase.from("jobs").select("*").eq("posted_by", user.id).order("created_at", { ascending: false });
      setMyJobs(jobs || []);

      // Load applications for my jobs
      if (jobs && jobs.length > 0) {
        const jobIds = jobs.map(j => j.id);
        const { data: apps } = await supabase.from("applications").select("*").in("job_id", jobIds).order("created_at", { ascending: false });
        setApplications(apps || []);
      }

      // Load candidates open to work
      const { data: cands } = await supabase.from("candidate_profiles").select("*").eq("open_to_work", true).order("created_at", { ascending: false });
      setCandidates(cands || []);
    } catch(e) { console.error(e); }
    finally { setLoading(false); }
  };

  const updateStatus = async (appId, status) => {
    await supabase.from("applications").update({ hr_status: status }).eq("id", appId);
    setApplications(prev => prev.map(a => a.id === appId ? { ...a, hr_status: status } : a));
  };

  const saveCompany = async () => {
    if (!user) return;
    setSavingCompany(true);
    try {
      const payload = { ...companyForm, user_id: user.id };
      const { error } = await supabase.from("company_profiles").upsert(payload, { onConflict: "user_id" });
      if (!error) { setCompany(payload); alert("Company profile saved!"); }
    } catch(e) { console.error(e); }
    finally { setSavingCompany(false); }
  };

  const statusColor = { pending:"#FFB700", shortlisted:"#00D68F", rejected:"#FF3D71", hired:"#00E5FF" };

  if (!user) return (
    <div style={{maxWidth:600,margin:"60px auto",padding:24,textAlign:"center"}}>
      <div style={{fontSize:56,marginBottom:16}}>🏢</div>
      <div style={{fontFamily:"Syne,sans-serif",fontSize:24,color:"#fff",marginBottom:12}}>HR Dashboard</div>
      <div style={{color:C2.muted,fontSize:14,marginBottom:24}}>Sign in to post jobs, see applications and find candidates!</div>
      <div onClick={onAuthRequired} style={{display:"inline-block",padding:"14px 32px",borderRadius:14,background:"linear-gradient(135deg,#00E5FF,#7C3AED)",color:"#fff",fontWeight:800,fontSize:15,cursor:"pointer"}}>Sign In →</div>
    </div>
  );

  if (loading) return <div style={{textAlign:"center",padding:60}}><div className="spin" style={{width:40,height:40,border:"3px solid rgba(0,229,255,.2)",borderTop:"3px solid #00E5FF",borderRadius:"50%",margin:"0 auto"}}/></div>;

  const filteredCandidates = candidates.filter(c =>
    !searchCandidates || (c.skills||"").toLowerCase().includes(searchCandidates.toLowerCase()) ||
    (c.full_name||"").toLowerCase().includes(searchCandidates.toLowerCase()) ||
    (c.location||"").toLowerCase().includes(searchCandidates.toLowerCase())
  );

  return (
    <div style={{maxWidth:1200,margin:"0 auto",padding:"24px 20px"}}>
      {/* Header */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
        <div>
          <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:28,color:"#fff"}}>🏢 HR DASHBOARD</div>
          <div style={{color:C2.muted,fontSize:13}}>{company?.company_name||"Set up your company"} - {myJobs.length} jobs - {applications.length} applications</div>
        </div>
        <div style={{display:"flex",gap:8}}>
          {[["applications","📋 Applications"],["candidates","👥 Find Talent"],["jobs","💼 My Jobs"],["company","🏢 Company"]].map(([t,lb])=>(
            <div key={t} onClick={()=>setTab(t)} className="btn" style={{padding:"8px 16px",borderRadius:10,background:tab===t?"linear-gradient(135deg,#00E5FF,#7C3AED)":"rgba(255,255,255,.05)",color:tab===t?"#fff":"rgba(255,255,255,.5)",fontSize:12,fontWeight:700,border:tab===t?"none":"1px solid rgba(255,255,255,.08)"}}>
              {lb}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:12,marginBottom:24}}>
        {[[applications.length,"Total Applications","📋","#00E5FF"],[applications.filter(a=>a.hr_status==="shortlisted").length,"Shortlisted","✅","#00D68F"],[applications.filter(a=>a.hr_status==="hired").length,"Hired","🎉","#FFB700"],[candidates.length,"Open Candidates","👥","#7C3AED"]].map(([val,lb,ic,color])=>(
          <div key={lb} style={{background:C2.card,borderRadius:16,padding:20,border:`1px solid ${C2.border}`,textAlign:"center"}}>
            <div style={{fontSize:28,marginBottom:4}}>{ic}</div>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:28,fontWeight:800,color}}>{val}</div>
            <div style={{fontSize:11,color:C2.muted,fontFamily:"Space Mono,monospace"}}>{lb}</div>
          </div>
        ))}
      </div>

      {/* Applications Tab */}
      {tab==="applications" && (
        <div>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:18,color:"#fff",fontWeight:800,marginBottom:16}}>📋 All Applications</div>
          {applications.length === 0 ? (
            <div style={{textAlign:"center",padding:60,background:C2.card,borderRadius:20,border:`1px solid ${C2.border}`}}>
              <div style={{fontSize:48,marginBottom:12}}>📭</div>
              <div style={{fontFamily:"Syne,sans-serif",fontSize:20,color:"#fff",marginBottom:8}}>No applications yet</div>
              <div style={{color:C2.muted,fontSize:13}}>Post a job with your HR email to start receiving applications!</div>
            </div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {applications.map(app => {
                const job = myJobs.find(j => j.id === app.job_id);
                const status = app.hr_status || "pending";
                return (
                  <div key={app.id} style={{background:C2.card,borderRadius:16,padding:20,border:`1px solid ${C2.border}`,display:"flex",gap:16,alignItems:"flex-start",flexWrap:"wrap"}}>
                    <div style={{width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,#00E5FF,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:18,flexShrink:0}}>
                      {(app.applicant_name||"?")[0].toUpperCase()}
                    </div>
                    <div style={{flex:1,minWidth:200}}>
                      <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,color:"#fff",fontSize:15}}>{app.applicant_name}</div>
                      <div style={{color:C2.muted,fontSize:12,marginBottom:4}}>{app.applicant_email}</div>
                      <div style={{color:"rgba(0,229,255,.6)",fontSize:11,fontFamily:"Space Mono,monospace"}}>{job?.title||"Job"} - {new Date(app.created_at).toLocaleDateString("en-IN")}</div>
                      {app.cover_note && <div style={{color:C2.muted,fontSize:12,marginTop:6,lineHeight:1.5}}>{app.cover_note.substring(0,120)}...</div>}
                    </div>
                    <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
                      {app.resume_url && <a href={app.resume_url} target="_blank" rel="noreferrer" style={{padding:"6px 12px",borderRadius:8,background:"rgba(0,229,255,.1)",color:"#00E5FF",fontSize:11,fontWeight:700,textDecoration:"none"}}>📄 Resume</a>}
                      <a href={`mailto:${app.applicant_email}`} style={{padding:"6px 12px",borderRadius:8,background:"rgba(255,183,0,.1)",color:"#FFB700",fontSize:11,fontWeight:700,textDecoration:"none"}}>✉️ Email</a>
                      {["pending","shortlisted","rejected","hired"].map(s=>(
                        <div key={s} onClick={()=>updateStatus(app.id,s)} style={{padding:"6px 12px",borderRadius:8,background:status===s?`${statusColor[s]}20`:"rgba(255,255,255,.05)",color:status===s?statusColor[s]:"rgba(255,255,255,.3)",fontSize:10,fontWeight:700,cursor:"pointer",border:`1px solid ${status===s?statusColor[s]+"30":"transparent"}`,textTransform:"uppercase",fontFamily:"Space Mono,monospace"}}>
                          {s}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Find Talent Tab */}
      {tab==="candidates" && (
        <div>
          <div style={{display:"flex",gap:12,marginBottom:20,alignItems:"center"}}>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:18,color:"#fff",fontWeight:800}}>👥 Find Talent</div>
            <input value={searchCandidates} onChange={e=>setSearchCandidates(e.target.value)} placeholder="Search by skill, name, location..."
              style={{flex:1,padding:"10px 14px",borderRadius:12,border:"1px solid rgba(0,229,255,.15)",background:C2.surface,color:"#fff",fontSize:13,fontFamily:"Plus Jakarta Sans,sans-serif"}}/>
          </div>
          {filteredCandidates.length === 0 ? (
            <div style={{textAlign:"center",padding:60,background:C2.card,borderRadius:20}}>
              <div style={{fontSize:48,marginBottom:12}}>👥</div>
              <div style={{color:C2.muted}}>No candidates found. Try different search terms.</div>
            </div>
          ) : (
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:14}}>
              {filteredCandidates.map(c=>(
                <div key={c.id} style={{background:C2.card,borderRadius:16,padding:20,border:`1px solid ${C2.border}`}}>
                  <div style={{display:"flex",gap:12,marginBottom:12}}>
                    <div style={{width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,#00E5FF,#7C3AED)",display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontWeight:800,fontSize:18,flexShrink:0}}>
                      {(c.full_name||"?")[0].toUpperCase()}
                    </div>
                    <div>
                      <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,color:"#fff",fontSize:14}}>{c.full_name||"Anonymous"}</div>
                      <div style={{color:C2.muted,fontSize:12}}>{c.location||"Location not set"}</div>
                    </div>
                  </div>
                  <div style={{color:C2.muted,fontSize:12,marginBottom:10}}>{c.experience||"Experience not set"}</div>
                  <div style={{display:"flex",gap:4,flexWrap:"wrap",marginBottom:12}}>
                    {(c.skills||"").split(",").slice(0,4).map(s=>s.trim()).filter(Boolean).map(s=>(
                      <span key={s} style={{padding:"2px 8px",borderRadius:4,background:"rgba(0,229,255,.08)",color:"#00E5FF",fontSize:10,fontFamily:"Space Mono,monospace"}}>{s}</span>
                    ))}
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    {c.resume_url && <a href={c.resume_url} target="_blank" rel="noreferrer" style={{padding:"7px 14px",borderRadius:8,background:"rgba(0,229,255,.1)",color:"#00E5FF",fontSize:11,fontWeight:700,textDecoration:"none"}}>📄 Resume</a>}
                    {c.linkedin && <a href={`https://${c.linkedin}`} target="_blank" rel="noreferrer" style={{padding:"7px 14px",borderRadius:8,background:"rgba(0,119,181,.2)",color:"#0077B5",fontSize:11,fontWeight:700,textDecoration:"none"}}>LinkedIn</a>}
                    {c.email && <a href={`mailto:${c.email}`} style={{padding:"7px 14px",borderRadius:8,background:"rgba(255,183,0,.1)",color:"#FFB700",fontSize:11,fontWeight:700,textDecoration:"none"}}>✉️ Email</a>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* My Jobs Tab */}
      {tab==="jobs" && (
        <div>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:18,color:"#fff",fontWeight:800,marginBottom:16}}>💼 My Posted Jobs</div>
          {myJobs.length === 0 ? (
            <div style={{textAlign:"center",padding:60,background:C2.card,borderRadius:20}}>
              <div style={{fontSize:48,marginBottom:12}}>💼</div>
              <div style={{color:C2.muted}}>No jobs posted yet. Click "+ POST JOB" to start!</div>
            </div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              {myJobs.map(job=>{
                const appCount = applications.filter(a=>a.job_id===job.id).length;
                return (
                  <div key={job.id} style={{background:C2.card,borderRadius:16,padding:20,border:`1px solid ${C2.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
                    <div>
                      <div style={{fontFamily:"Syne,sans-serif",fontWeight:700,color:"#fff",fontSize:15}}>{job.title}</div>
                      <div style={{color:C2.muted,fontSize:12}}>{job.location} - {job.work_type} - {job.salary_range}</div>
                    </div>
                    <div style={{display:"flex",gap:10,alignItems:"center"}}>
                      <span style={{padding:"6px 14px",borderRadius:8,background:"rgba(0,229,255,.1)",color:"#00E5FF",fontSize:12,fontWeight:700}}>{appCount} applications</span>
                      <span style={{padding:"6px 14px",borderRadius:8,background:job.is_active?"rgba(0,214,143,.1)":"rgba(255,61,113,.1)",color:job.is_active?"#00D68F":"#FF3D71",fontSize:12,fontWeight:700}}>{job.is_active?"● Active":"○ Inactive"}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Company Profile Tab */}
      {tab==="company" && (
        <div style={{maxWidth:600}}>
          <div style={{fontFamily:"Syne,sans-serif",fontSize:18,color:"#fff",fontWeight:800,marginBottom:20}}>🏢 Company Profile</div>
          <div style={{display:"flex",flexDirection:"column",gap:14}}>
            {[["COMPANY NAME","company_name","e.g. TechCorp India"],["HR EMAIL","company_email","hr@company.com"],["WEBSITE","company_website","https://company.com"],["ABOUT","about","What does your company do?"]].map(([lb,key,ph])=>(
              <div key={key}>
                <div style={{fontSize:10,fontWeight:800,color:C2.muted,marginBottom:5,letterSpacing:.6}}>{lb}</div>
                {key==="about"
                  ? <textarea value={companyForm[key]||""} onChange={e=>setCompanyForm(f=>({...f,[key]:e.target.value}))} placeholder={ph} style={{width:"100%",padding:"11px 14px",borderRadius:12,border:"1.5px solid rgba(0,229,255,.08)",background:C2.surface,color:"#fff",fontSize:13,fontFamily:"Plus Jakarta Sans,sans-serif",height:80,resize:"none",boxSizing:"border-box"}}/>
                  : <input value={companyForm[key]||""} onChange={e=>setCompanyForm(f=>({...f,[key]:e.target.value}))} placeholder={ph} style={{width:"100%",padding:"11px 14px",borderRadius:12,border:"1.5px solid rgba(0,229,255,.08)",background:C2.surface,color:"#fff",fontSize:13,fontFamily:"Plus Jakarta Sans,sans-serif",boxSizing:"border-box"}}/>
                }
              </div>
            ))}
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              {[["COMPANY SIZE","company_size",["1-10","11-50","51-200","201-500","500+"]],["INDUSTRY","industry",["Tech","Finance","Healthcare","Education","E-commerce","Manufacturing","Other"]]].map(([lb,key,opts])=>(
                <div key={key}>
                  <div style={{fontSize:10,fontWeight:800,color:C2.muted,marginBottom:5,letterSpacing:.6}}>{lb}</div>
                  <select value={companyForm[key]||""} onChange={e=>setCompanyForm(f=>({...f,[key]:e.target.value}))} style={{width:"100%",padding:"11px 14px",borderRadius:12,border:"1.5px solid rgba(0,229,255,.08)",background:C2.surface,color:"#fff",fontSize:13,fontFamily:"Plus Jakarta Sans,sans-serif",cursor:"pointer"}}>
                    {opts.map(o=><option key={o}>{o}</option>)}
                  </select>
                </div>
              ))}
            </div>
            <div onClick={saveCompany} style={{padding:14,borderRadius:14,background:savingCompany?"rgba(0,229,255,.2)":"linear-gradient(135deg,#00E5FF,#7C3AED)",color:"#fff",fontFamily:"Syne,sans-serif",fontSize:18,fontWeight:800,cursor:"pointer",textAlign:"center"}}>
              {savingCompany?"Saving...":"💾 SAVE COMPANY PROFILE"}
            </div>
          </div>

          {/* Marketing Tools */}
          <div style={{marginTop:24,padding:20,borderRadius:16,background:C2.card,border:`1px solid ${C2.border}`}}>
            <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,color:"#fff",fontSize:16,marginBottom:16}}>📣 Share Your Jobs</div>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {[
                ["WhatsApp",`https://wa.me/?text=We're hiring! Check our jobs on UdyamPath: https://udyampath.vercel.app`,"#25D366"],
                ["LinkedIn",`https://www.linkedin.com/sharing/share-offsite/?url=https://udyampath.vercel.app`,"#0077B5"],
                ["Twitter",`https://twitter.com/intent/tweet?text=We're hiring! Check our jobs on UdyamPath&url=https://udyampath.vercel.app`,"#1DA1F2"],
                ["Copy Link","copy","#7C3AED"],
              ].map(([name,url,color])=>(
                <div key={name} onClick={()=>url==="copy"?navigator.clipboard.writeText("https://udyampath.vercel.app"):window.open(url,"_blank")}
                  style={{padding:"10px 18px",borderRadius:10,background:color,color:"#fff",fontSize:12,fontWeight:700,cursor:"pointer"}}>
                  {name==="WhatsApp"?"📱 ":name==="LinkedIn"?"💼 ":name==="Twitter"?"🐦 ":"🔗 "}{name}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════════════════
   ANALYTICS DASHBOARD (Admin only)
══════════════════════════════════════════════════ */
const AnalyticsDashboard = ({ user }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const ADMIN_EMAIL = "sanjeevnagaraj9003@gmail.com";

  useEffect(() => {
    fetch("/api/analytics").then(r => r.json()).then(data => { setStats(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const C2 = { card:"#0D0D1F", border:"rgba(0,229,255,.08)", muted:"rgba(255,255,255,.4)", surface:"#080816" };

  if (!user || user.email !== ADMIN_EMAIL) return (
    <div style={{maxWidth:500,margin:"80px auto",textAlign:"center",padding:24}}>
      <div style={{fontSize:56,marginBottom:16}}>🔒</div>
      <div style={{fontFamily:"Syne,sans-serif",fontSize:22,color:"#fff"}}>Admin Only</div>
      <div style={{color:C2.muted,fontSize:13,marginTop:8}}>Analytics dashboard is only accessible to admins.</div>
    </div>
  );

  if (loading) return <div style={{textAlign:"center",padding:60}}><div className="spin" style={{width:40,height:40,border:"3px solid rgba(0,229,255,.2)",borderTop:"3px solid #00E5FF",borderRadius:"50%",margin:"0 auto"}}/></div>;

  return (
    <div style={{maxWidth:1000,margin:"0 auto",padding:"24px 20px"}}>
      <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,fontSize:28,color:"#fff",marginBottom:8}}>📊 ANALYTICS</div>
      <div style={{color:C2.muted,fontSize:13,marginBottom:24}}>Real-time platform stats</div>

      {/* Key metrics */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,marginBottom:28}}>
        {[
          [stats?.totalViews||0,"Page Views","👁️","#00E5FF"],
          [stats?.totalApps||0,"Applications","📋","#00D68F"],
          [stats?.totalJobs||0,"Live Jobs","💼","#FFB700"],
          [`${stats?.mobilePercent||0}%`,"Mobile Users","📱","#7C3AED"],
        ].map(([val,lb,ic,color])=>(
          <div key={lb} style={{background:C2.card,borderRadius:18,padding:22,border:`1px solid ${C2.border}`,textAlign:"center"}}>
            <div style={{fontSize:28,marginBottom:6}}>{ic}</div>
            <div style={{fontFamily:"Syne,sans-serif",fontSize:32,fontWeight:900,color}}>{val}</div>
            <div style={{fontSize:11,color:C2.muted,marginTop:4,fontFamily:"Space Mono,monospace"}}>{lb}</div>
          </div>
        ))}
      </div>

      {/* Event breakdown */}
      <div style={{background:C2.card,borderRadius:18,padding:24,border:`1px solid ${C2.border}`,marginBottom:20}}>
        <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,color:"#fff",fontSize:16,marginBottom:16}}>🎯 Events Breakdown</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:10}}>
          {Object.entries(stats?.eventCounts||{}).map(([event,count])=>(
            <div key={event} style={{padding:"10px 16px",borderRadius:12,background:C2.surface,border:`1px solid ${C2.border}`}}>
              <div style={{fontFamily:"Space Mono,monospace",fontSize:10,color:C2.muted,marginBottom:4}}>{event}</div>
              <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,color:"#00E5FF",fontSize:20}}>{count}</div>
            </div>
          ))}
          {Object.keys(stats?.eventCounts||{}).length===0 && <div style={{color:C2.muted,fontSize:13}}>No events yet - events will appear as users interact.</div>}
        </div>
      </div>

      {/* Recent activity */}
      <div style={{background:C2.card,borderRadius:18,padding:24,border:`1px solid ${C2.border}`}}>
        <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,color:"#fff",fontSize:16,marginBottom:16}}>⚡ Recent Activity</div>
        {(stats?.recentEvents||[]).length===0 ? (
          <div style={{color:C2.muted,fontSize:13}}>No activity yet.</div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:8}}>
            {(stats?.recentEvents||[]).map((e,i)=>(
              <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",borderRadius:10,background:C2.surface,alignItems:"center"}}>
                <div style={{display:"flex",gap:10,alignItems:"center"}}>
                  <span style={{fontSize:16}}>{e.is_mobile?"📱":"💻"}</span>
                  <span style={{fontFamily:"Space Mono,monospace",fontSize:11,color:"#00E5FF"}}>{e.event}</span>
                </div>
                <span style={{fontSize:11,color:C2.muted}}>{new Date(e.created_at).toLocaleTimeString("en-IN")}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* SEO Status */}
      <div style={{background:C2.card,borderRadius:18,padding:24,border:`1px solid ${C2.border}`,marginTop:20}}>
        <div style={{fontFamily:"Syne,sans-serif",fontWeight:800,color:"#fff",fontSize:16,marginBottom:16}}>🔍 SEO Status</div>
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {[
            ["sitemap.xml","https://udyampath.vercel.app/sitemap.xml","✅ Live"],
            ["robots.txt","https://udyampath.vercel.app/robots.txt","✅ Live"],
            ["React Developer Jobs","https://udyampath.vercel.app/jobs/react-developer","🔗 SEO Page"],
            ["Python Jobs Bangalore","https://udyampath.vercel.app/jobs/python-developer/bangalore","🔗 SEO Page"],
            ["Google Search Console","https://search.google.com/search-console","🔗 Submit sitemap"],
            ["Bing Webmaster","https://www.bing.com/webmasters","🔗 Submit sitemap"],
          ].map(([name,url,status])=>(
            <div key={name} style={{display:"flex",justifyContent:"space-between",padding:"10px 14px",borderRadius:10,background:C2.surface,alignItems:"center"}}>
              <span style={{color:"#fff",fontSize:13,fontWeight:700}}>{name}</span>
              <a href={url} target="_blank" rel="noreferrer" style={{color:"#00E5FF",fontSize:12,textDecoration:"none"}}>{status} →</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
