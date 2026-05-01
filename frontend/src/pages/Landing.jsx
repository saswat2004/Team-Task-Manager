import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { LayoutDashboard, CheckCircle, Clock, Users, Sun, Moon, AlertTriangle, ShieldCheck, TrendingUp } from 'lucide-react';

const mockBarData = [
  { name: 'Mon', completed: 4, pending: 2 },
  { name: 'Tue', completed: 3, pending: 4 },
  { name: 'Wed', completed: 7, pending: 1 },
  { name: 'Thu', completed: 5, pending: 3 },
  { name: 'Fri', completed: 8, pending: 2 },
  { name: 'Sat', completed: 2, pending: 0 },
  { name: 'Sun', completed: 1, pending: 1 },
];

const mockAreaData = [
  { name: 'Week 1', productivity: 40 },
  { name: 'Week 2', productivity: 65 },
  { name: 'Week 3', productivity: 55 },
  { name: 'Week 4', productivity: 90 },
];

export default function Landing() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-color)', color: 'var(--text-primary)' }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes floatSlow { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(8deg)} }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.9} }
        @keyframes drift { 0%{transform:translateX(0)} 50%{transform:translateX(20px)} 100%{transform:translateX(0)} }
        @keyframes growBar { from{height:0} to{height:var(--h)} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes sparkle { 0%,100%{opacity:0;transform:scale(0.5)} 50%{opacity:1;transform:scale(1)} }
        @keyframes aurora { 0%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.08)} 66%{transform:translate(-30px,20px) scale(0.95)} 100%{transform:translate(0,0) scale(1)} }
        @keyframes wavemove { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes floatCard { 0%,100%{transform:translateY(0) rotate(-4deg)} 50%{transform:translateY(-14px) rotate(-4deg)} }
      `}</style>

      {/* ── Aurora background blobs (fixed, full-page) ── */}
      <div style={{position:'fixed',inset:0,zIndex:0,pointerEvents:'none',overflow:'hidden'}}>
        <div style={{position:'absolute',width:'600px',height:'600px',borderRadius:'50%',background:'radial-gradient(circle,rgba(99,102,241,0.18) 0%,transparent 70%)',top:'-120px',left:'-100px',animation:'aurora 14s ease-in-out infinite'}} />
        <div style={{position:'absolute',width:'500px',height:'500px',borderRadius:'50%',background:'radial-gradient(circle,rgba(16,185,129,0.14) 0%,transparent 70%)',top:'30%',right:'-80px',animation:'aurora 18s ease-in-out infinite 3s'}} />
        <div style={{position:'absolute',width:'450px',height:'450px',borderRadius:'50%',background:'radial-gradient(circle,rgba(245,158,11,0.12) 0%,transparent 70%)',bottom:'-80px',left:'30%',animation:'aurora 12s ease-in-out infinite 6s'}} />
        <div style={{position:'absolute',width:'350px',height:'350px',borderRadius:'50%',background:'radial-gradient(circle,rgba(139,92,246,0.12) 0%,transparent 70%)',bottom:'20%',left:'-60px',animation:'aurora 20s ease-in-out infinite 2s'}} />
        {/* Sparkle stars */}
        <svg style={{position:'absolute',inset:0,width:'100%',height:'100%'}} xmlns="http://www.w3.org/2000/svg">
          {[
            [8,12],[22,45],[55,8],[78,22],[91,55],[14,75],[38,88],[66,70],[82,38],[47,30],[30,60],[70,85]
          ].map(([x,y],i)=>(
            <g key={i} style={{animation:`sparkle ${2.5+i*0.4}s ease-in-out infinite ${i*0.3}s`}}>
              <line x1={`${x}%`} y1={`${y-0.5}%`} x2={`${x}%`} y2={`${y+0.5}%`} stroke="#a5b4fc" strokeWidth="2" opacity="0.7"/>
              <line x1={`${x-0.5}%`} y1={`${y}%`} x2={`${x+0.5}%`} y2={`${y}%`} stroke="#a5b4fc" strokeWidth="2" opacity="0.7"/>
            </g>
          ))}
          {/* Spinning gear/cog accent top-right */}
          <g transform="translate(93%,8%)" style={{animation:'spin 18s linear infinite',transformOrigin:'0 0'}} opacity="0.13">
            <circle cx="0" cy="0" r="22" fill="none" stroke="#6366F1" strokeWidth="3" strokeDasharray="6 4"/>
            <circle cx="0" cy="0" r="10" fill="none" stroke="#6366F1" strokeWidth="2"/>
          </g>
          {/* Spinning ring bottom-left */}
          <g transform="translate(5%,90%)" style={{animation:'spin 24s linear infinite reverse',transformOrigin:'0 0'}} opacity="0.12">
            <circle cx="0" cy="0" r="28" fill="none" stroke="#10B981" strokeWidth="3" strokeDasharray="8 5"/>
          </g>
        </svg>
      </div>
      {/* Header */}
      <header style={{ padding: '24px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--card-bg)', borderBottom: '1px solid var(--card-border)' }}>
        <div className="logo">Team Task Manager</div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="btn" 
            style={{background: 'transparent', color: 'var(--text-secondary)', padding: '8px', marginRight: '8px'}}
            title="Toggle Dark Mode"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <Link to="/login" className="btn" style={{ background: 'transparent', color: 'var(--text-primary)', border: '1px solid var(--card-border)' }}>Log In</Link>
        </div>
      </header>

        {/* Hero Section */}
        <main style={{ flex: 1 }}>
          <section style={{ padding: '80px 24px', textAlign: 'center', maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            {/* Animated SVG background */}
            <svg
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'visible' }}
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid dots */}
              {Array.from({ length: 8 }).map((_, row) =>
                Array.from({ length: 12 }).map((_, col) => (
                  <circle
                    key={`dot-${row}-${col}`}
                    cx={col * 80 + 30}
                    cy={row * 60 + 20}
                    r="2.5"
                    fill="var(--primary)"
                    opacity="0.35"
                  />
                ))
              )}
              {/* Floating circles */}
              <circle cx="8%" cy="20%" r="80" fill="var(--primary)" opacity="0.18" style={{animation:'float 6s ease-in-out infinite'}} />
              <circle cx="92%" cy="15%" r="110" fill="var(--success)" opacity="0.14" style={{animation:'float 8s ease-in-out infinite 1s'}} />
              <circle cx="85%" cy="75%" r="65" fill="var(--warning)" opacity="0.18" style={{animation:'float 7s ease-in-out infinite 2s'}} />
              <circle cx="5%" cy="80%" r="90" fill="var(--primary)" opacity="0.14" style={{animation:'float 9s ease-in-out infinite 0.5s'}} />
              {/* Floating diamond */}
              <rect x="78%" y="30%" width="40" height="40" rx="6" fill="var(--primary)" opacity="0.22" transform="rotate(45)" style={{animation:'floatSlow 7s ease-in-out infinite'}} />
              <rect x="15%" y="55%" width="30" height="30" rx="4" fill="var(--success)" opacity="0.25" transform="rotate(30)" style={{animation:'floatSlow 9s ease-in-out infinite 1.5s'}} />
              {/* Soft horizontal lines */}
              <line x1="0" y1="30%" x2="100%" y2="30%" stroke="var(--primary)" strokeWidth="1" opacity="0.2" strokeDasharray="8 16" />
              <line x1="0" y1="65%" x2="100%" y2="65%" stroke="var(--success)" strokeWidth="1" opacity="0.18" strokeDasharray="8 16" />
              {/* Mini bar chart silhouette */}
              <g transform="translate(72%,55%)" opacity="0.28" style={{animation:'pulse 4s ease-in-out infinite'}}>
                <rect x="0" y="40" width="18" height="30" rx="3" fill="var(--primary)" />
                <rect x="26" y="15" width="18" height="55" rx="3" fill="var(--success)" />
                <rect x="52" y="25" width="18" height="45" rx="3" fill="var(--warning)" />
                <rect x="78" y="5" width="18" height="65" rx="3" fill="var(--primary)" />
              </g>
              {/* Drifting ring */}
              <circle cx="18%" cy="40%" r="55" fill="none" stroke="var(--primary)" strokeWidth="2.5" opacity="0.25" strokeDasharray="12 8" style={{animation:'drift 10s ease-in-out infinite'}} />
              {/* Extra ring accent */}
              {/* Animated area-chart line silhouette */}
              <polyline
                points="10,280 80,220 160,250 240,180 320,200 400,140 500,160 600,100 700,130 780,80"
                fill="none" stroke="#6366F1" strokeWidth="2.5" opacity="0.18"
                strokeDasharray="8 6"
                style={{animation:'drift 8s ease-in-out infinite'}}
              />
              <polyline
                points="10,300 80,250 160,270 240,210 320,230 400,170 500,190 600,130 700,155 780,110"
                fill="none" stroke="#10B981" strokeWidth="1.5" opacity="0.13"
                strokeDasharray="6 8"
                style={{animation:'drift 11s ease-in-out infinite 1s'}}
              />
              {/* Floating mini Kanban card mockup */}
              <g style={{animation:'floatCard 7s ease-in-out infinite'}} opacity="0.22">
                <rect x="20" y="120" width="110" height="70" rx="8" fill="white" stroke="#6366F1" strokeWidth="1.5"/>
                <rect x="28" y="130" width="50" height="6" rx="3" fill="#6366F1"/>
                <rect x="28" y="142" width="80" height="4" rx="2" fill="#9ca3af"/>
                <rect x="28" y="152" width="60" height="4" rx="2" fill="#9ca3af"/>
                <rect x="28" y="167" width="28" height="14" rx="4" fill="#10B981"/>
                <text x="42" y="178" fontSize="7" fill="white" textAnchor="middle">Done</text>
              </g>
              {/* Second mini card */}
              <g transform="translate(5%,0)" style={{animation:'floatCard 9s ease-in-out infinite 2s'}} opacity="0.18">
                <rect x="620" y="200" width="110" height="70" rx="8" fill="white" stroke="#F59E0B" strokeWidth="1.5"/>
                <rect x="628" y="210" width="50" height="6" rx="3" fill="#F59E0B"/>
                <rect x="628" y="222" width="75" height="4" rx="2" fill="#9ca3af"/>
                <rect x="628" y="232" width="55" height="4" rx="2" fill="#9ca3af"/>
                <rect x="628" y="247" width="42" height="14" rx="4" fill="#F59E0B"/>
                <text x="649" y="258" fontSize="7" fill="white" textAnchor="middle">In Progress</text>
              </g>
              <circle cx="85%" cy="50%" r="40" fill="none" stroke="var(--warning)" strokeWidth="2" opacity="0.22" strokeDasharray="6 10" style={{animation:'drift 8s ease-in-out infinite 1s'}} />
            </svg>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            style={{ fontSize: '48px', marginBottom: '24px', letterSpacing: '-1px' }}
          >
            Manage Your Team's Work in One Unified Space
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            style={{ fontSize: '18px', color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: 1.6 }}
          >
            Team Task Manager is a professional-grade project management platform designed to help modern teams organize, track, and execute their goals flawlessly. Featuring real-time updates, interactive Kanban boards, and powerful visual analytics.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
          >
            <Link to="/login" className="btn" style={{ padding: '16px 32px', fontSize: '18px' }}>Get Started</Link>
          </motion.div>
        </section>

        {/* Animated Wave Divider */}
        <div style={{overflow:'hidden',lineHeight:0,position:'relative',zIndex:1,marginTop:'-2px'}}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{display:'block',width:'200%',animation:'wavemove 10s linear infinite'}}>
            <path d="M0,40 C180,80 360,0 540,40 C720,80 900,0 1080,40 C1260,80 1440,0 1440,40 L1440,80 L0,80 Z" fill="rgba(99,102,241,0.10)"/>
            <path d="M0,55 C200,20 400,70 600,45 C800,20 1000,65 1200,40 C1350,20 1440,50 1440,50 L1440,80 L0,80 Z" fill="rgba(16,185,129,0.07)"/>
          </svg>
        </div>

        {/* Analytics & Graphs Section */}
        <section style={{ padding: '60px 24px', background: 'var(--card-bg)', borderTop: '1px solid var(--card-border)', borderBottom: '1px solid var(--card-border)' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <h2>Powerful Visual Insights</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Track your team's productivity and task completion with real-time analytics.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '32px' }}>
              {/* Bar Chart Panel */}
              <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', minHeight: '350px' }}>
                <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <LayoutDashboard size={20} color="var(--primary)" /> Weekly Task Completion
                </h3>
                <div style={{ flex: 1 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockBarData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
                      <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                        itemStyle={{ color: 'var(--text-primary)' }}
                      />
                      <Bar dataKey="completed" name="Completed" fill="var(--success)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="pending" name="Pending" fill="var(--warning)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Area Chart Panel */}
              <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', minHeight: '350px' }}>
                <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle size={20} color="var(--primary)" /> Monthly Productivity Trend
                </h3>
                <div style={{ flex: 1 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockAreaData}>
                      <defs>
                        <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--card-border)" vertical={false} />
                      <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '8px', color: 'var(--text-primary)' }}
                      />
                      <Area type="monotone" dataKey="productivity" name="Productivity Score" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorProd)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Content */}
        <section style={{ padding: '80px 24px', maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
          {/* Background visuals */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none', overflow: 'visible' }}
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="95%" cy="10%" r="140" fill="var(--primary)" opacity="0.13" style={{animation:'float 10s ease-in-out infinite'}} />
            <circle cx="2%" cy="50%" r="100" fill="var(--success)" opacity="0.12" style={{animation:'float 12s ease-in-out infinite 2s'}} />
            <circle cx="50%" cy="90%" r="120" fill="var(--warning)" opacity="0.12" style={{animation:'float 8s ease-in-out infinite 1s'}} />
            {/* Diagonal lines */}
            {Array.from({length: 6}).map((_,i)=>(
              <line key={i} x1={i*200} y1="0" x2={i*200+400} y2="100%" stroke="var(--primary)" strokeWidth="1" opacity="0.1" />
            ))}
            {/* Floating mini pie chart arcs — bigger and more visible */}
            <g transform="translate(93%,25%)" opacity="0.35" style={{animation:'floatSlow 8s ease-in-out infinite'}}>
              <circle cx="0" cy="0" r="48" fill="none" stroke="var(--success)" strokeWidth="14" strokeDasharray="90 51" />
              <circle cx="0" cy="0" r="48" fill="none" stroke="var(--warning)" strokeWidth="14" strokeDasharray="40 141" strokeDashoffset="-90" />
              <circle cx="0" cy="0" r="48" fill="none" stroke="var(--primary)" strokeWidth="14" strokeDasharray="51 131" strokeDashoffset="-130" />
            </g>
            {/* Extra bar chart silhouette left side */}
            <g transform="translate(2%,40%)" opacity="0.2" style={{animation:'pulse 5s ease-in-out infinite 1s'}}>
              <rect x="0" y="50" width="16" height="30" rx="3" fill="var(--primary)" />
              <rect x="24" y="20" width="16" height="60" rx="3" fill="var(--success)" />
              <rect x="48" y="35" width="16" height="45" rx="3" fill="var(--warning)" />
            </g>
          </svg>
          <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2>Why Your Team Needs This Platform</h2>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Point 1 */}
            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <AlertTriangle size={28} color="var(--danger)" />
                <h3 style={{ margin: 0, fontSize: '20px' }}>1. Work Without Structure = Chaos</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>In most teams:</p>
                  <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', paddingLeft: '20px', lineHeight: 1.6 }}>
                    <li>Tasks are shared on WhatsApp, email, or verbally</li>
                    <li>Deadlines get missed</li>
                    <li>No one knows "who is doing what"</li>
                  </ul>
                </div>
                <div style={{ flex: 1, minWidth: '250px', background: 'rgba(34, 197, 94, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--success)' }}>
                  <p style={{ color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '500' }}>👉 A task manager brings clarity + structure:</p>
                  <ul style={{ color: 'var(--text-primary)', fontSize: '14px', paddingLeft: '20px', lineHeight: 1.6 }}>
                    <li>Each task is assigned</li>
                    <li>Deadlines are visible</li>
                    <li>Status is tracked</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Point 2 */}
            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <Users size={28} color="var(--primary)" />
                <h3 style={{ margin: 0, fontSize: '20px' }}>2. Accountability in Teams</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Without a system:</p>
                  <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', paddingLeft: '20px', lineHeight: 1.6 }}>
                    <li>Work gets delayed → blame game starts</li>
                  </ul>
                </div>
                <div style={{ flex: 1, minWidth: '250px', background: 'rgba(34, 197, 94, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--success)' }}>
                  <p style={{ color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '500' }}>With this app:</p>
                  <ul style={{ color: 'var(--text-primary)', fontSize: '14px', paddingLeft: '20px', lineHeight: 1.6 }}>
                    <li>Every task has an owner</li>
                    <li>Progress is visible to everyone</li>
                  </ul>
                  <p style={{ marginTop: '12px', fontWeight: '600', color: 'var(--success)' }}>👉 It creates responsibility and transparency</p>
                </div>
              </div>
            </div>

            {/* Point 3 */}
            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <LayoutDashboard size={28} color="var(--warning)" />
                <h3 style={{ margin: 0, fontSize: '20px' }}>3. Real-Time Progress Tracking</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Managers or team leads need answers like:</p>
                  <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', paddingLeft: '20px', lineHeight: 1.6 }}>
                    <li>What's completed?</li>
                    <li>What's pending?</li>
                    <li>What's overdue?</li>
                  </ul>
                </div>
                <div style={{ flex: 1, minWidth: '250px', background: 'rgba(34, 197, 94, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--success)' }}>
                  <p style={{ color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '500' }}>Instead of asking everyone manually, the system shows:</p>
                  <ul style={{ color: 'var(--text-primary)', fontSize: '14px', paddingLeft: '20px', lineHeight: 1.6 }}>
                    <li>Dashboards</li>
                    <li>Status indicators</li>
                    <li>Overdue alerts</li>
                  </ul>
                  <p style={{ marginTop: '12px', fontWeight: '600', color: 'var(--success)' }}>👉 Saves time + improves decision-making</p>
                </div>
              </div>
            </div>

            {/* Point 4 */}
            <div className="glass-panel" style={{ padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <ShieldCheck size={28} color="var(--primary)" />
                <h3 style={{ margin: 0, fontSize: '20px' }}>4. Role-Based Access is Critical</h3>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px' }}>
                <div style={{ flex: 1, minWidth: '250px' }}>
                  <p style={{ color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: '500' }}>Not everyone should have full control. Why?</p>
                  <ul style={{ color: 'var(--text-secondary)', fontSize: '14px', paddingLeft: '20px', lineHeight: 1.6 }}>
                    <li><strong>Admin</strong> → creates projects, assigns tasks</li>
                    <li><strong>Member</strong> → works on assigned tasks</li>
                  </ul>
                </div>
                <div style={{ flex: 1, minWidth: '250px', background: 'rgba(34, 197, 94, 0.1)', padding: '16px', borderRadius: '8px', borderLeft: '4px solid var(--success)' }}>
                  <p style={{ color: 'var(--text-primary)', marginBottom: '8px', fontWeight: '500' }}>👉 Prevents:</p>
                  <ul style={{ color: 'var(--text-primary)', fontSize: '14px', paddingLeft: '20px', lineHeight: 1.6 }}>
                    <li>Accidental changes</li>
                    <li>Misuse of data</li>
                    <li>Confusion in workflow</li>
                  </ul>
                  <p style={{ marginTop: '12px', fontSize: '12px', color: 'var(--text-secondary)', fontStyle: 'italic' }}>This is exactly how real tools like Asana and Jira operate.</p>
                </div>
              </div>
            </div>

            {/* Point 5 */}
            <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', background: 'linear-gradient(to right, rgba(79, 70, 229, 0.05), rgba(34, 197, 94, 0.05))' }}>
              <TrendingUp size={48} color="var(--success)" style={{ marginBottom: '16px' }} />
              <h3 style={{ margin: 0, fontSize: '24px', marginBottom: '16px' }}>5. Improves Productivity</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '16px', marginBottom: '16px' }}>
                When everything is: <strong>organized, tracked, and visible</strong>...
              </p>
              <div style={{ display: 'inline-block', textAlign: 'left', background: 'rgba(34, 197, 94, 0.1)', padding: '24px', borderRadius: '8px', borderLeft: '4px solid var(--success)' }}>
                <p style={{ fontWeight: '600', color: 'var(--success)', marginBottom: '8px' }}>👉 Teams:</p>
                <ul style={{ color: 'var(--text-primary)', fontSize: '16px', paddingLeft: '20px', lineHeight: 1.6, margin: 0 }}>
                  <li>Work faster</li>
                  <li>Miss fewer deadlines</li>
                  <li>Collaborate better</li>
                </ul>
              </div>
            </div>
          </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ padding: '40px 24px', background: 'var(--card-bg)', borderTop: '1px solid var(--card-border)', textAlign: 'center' }}>
        <div className="logo" style={{ marginBottom: '16px' }}>Team Task Manager</div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
          Built for teams that want to get things done. Fast, reliable, and beautifully designed.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', fontSize: '14px', color: 'var(--text-secondary)' }}>
          <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
          <span style={{ cursor: 'pointer' }}>Terms of Service</span>
          <span onClick={() => setShowContact(true)} style={{ cursor: 'pointer', color: 'var(--primary)', fontWeight: '600' }}>Contact Us</span>
        </div>
        <div style={{ marginTop: '24px', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', letterSpacing: '0.01em' }}>
          &copy; {new Date().getFullYear()} Team Task Manager. Created by <span style={{color: 'var(--primary)'}}>Saswat Kumar Das</span>. All rights reserved.
        </div>
      </footer>

      {/* Contact Us Modal */}
      {showContact && (
        <div
          onClick={() => setShowContact(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}
        >
          <div
            onClick={e => e.stopPropagation()}
            className="glass-panel"
            style={{ width: '100%', maxWidth: '420px', padding: '36px', borderRadius: '16px', textAlign: 'center', position: 'relative' }}
          >
            <button
              onClick={() => setShowContact(false)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '20px', color: 'var(--text-secondary)' }}
            >✕</button>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>✉️</div>
            <h3 style={{ marginBottom: '8px' }}>Get in Touch</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '28px', lineHeight: 1.6 }}>
              Have questions, feedback, or want to collaborate? Reach out directly — we'd love to hear from you.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="mailto:work.saswatkumardas@gmail.com"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px 20px', background: 'var(--primary)', color: 'white', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}
              >
                📧 Send an Email
              </a>
              <a
                href="https://github.com/saswatkumardas"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px 20px', background: 'var(--card-bg)', border: '1px solid var(--card-border)', color: 'var(--text-primary)', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}
              >
                🐙 GitHub Profile
              </a>
              <a
                href="https://www.linkedin.com/in/saswat-kumar-das-069a51187"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '14px 20px', background: '#0A66C2', color: 'white', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '15px' }}
              >
                💼 LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
