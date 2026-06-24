'use client';

import { useState, useEffect, useRef } from 'react';

const simulatedLogs = [
  "SYSTEM INIT // DEPLOYING BROADCAST UPLINKS",
  "UPLINK SECURED // PNSYED ACTIVE VECTOR (115.0K SUBS)",
  "UPLINK SECURED // IMROCKY ACTIVE VECTOR (52.0K SUBS)",
  "LATENCY CALIBRATION // AP-SOUTH-1 ROUTE VERIFIED: 24MS",
  "LOGISTICS RELAY STABLE // BROADCAST ENVELOPE SECURED",
  "MEMCACHED REVALIDATION // CACHE REFRESH COMPLETE (24H BOUND)",
  "METRICS SYNC // COMPILING AGGREGATE REACH: 460K+",
  "LIVE DETECTOR // POLL TRIGGERED ON /API/STATUS",
];

const chatMessages = [
  { sender: "Admin_System", text: "TRANSMITTING TACTICAL OVERLAY TELEMETRY...", time: "00:01", color: "#c8102e" },
  { sender: "PNSYED_Fan", text: "This stream overlay looks insane!", time: "00:02", color: "#E3C287" },
  { sender: "iMRocky_Sub", text: "Hydrasaurus infrastructure is built diff", time: "00:03", color: "#53FC18" },
];

export default function OperationsClient() {
  const [activeTab, setActiveTab] = useState<'HUD' | 'CHAT' | 'ALERT'>('HUD');
  const [logs, setLogs] = useState<string[]>(simulatedLogs);
  const [chat, setChat] = useState(chatMessages);
  const [chatInput, setChatInput] = useState('');
  const [alertActive, setAlertActive] = useState(false);
  const [alertCreator, setAlertCreator] = useState('RadBriefing');

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-append terminal logs
  useEffect(() => {
    const interval = setInterval(() => {
      const additionalLogs = [
        `[OK] STATS CHECK: ROUTE REVALIDATED`,
        `[INFO] HEARTBEAT AP-SOUTH-1 NODE OK`,
        `[ALERT] DYNAMIC OVERLAY UPDATED FOR COHORT`,
        `[SYS-03] INCOMING BRAND DISPATCH RELAY SECURED`,
        `[OK] OVERLAY RENDER EFFICIENCY: 99.98%`,
      ];
      const randomLog = additionalLogs[Math.floor(Math.random() * additionalLogs.length)];
      setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()} // ${randomLog}`]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Scroll terminal logs to bottom
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const newMsg = {
      sender: "Operator_Guest",
      text: chatInput.toUpperCase(),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      color: "#ffffff",
    };
    setChat((prev) => [...prev, newMsg]);
    setChatInput('');
  };

  const triggerAlert = () => {
    const creators = ['PN Syed', 'iMRocky', 'BacKFire', 'WhyisSelena', 'DollyIsLive', 'RadBriefing'];
    const randomCreator = creators[Math.floor(Math.random() * creators.length)];
    setAlertCreator(randomCreator);
    setAlertActive(true);
    setTimeout(() => setAlertActive(false), 4000);
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-20 relative z-10 max-w-[1600px] mx-auto">
      {/* Page Header */}
      <div className="mb-12 border-b border-white/10 pb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="w-8 h-[1px] bg-[#c8102e]"></span>
          <span className="font-label-caps text-[10px] text-secondary uppercase tracking-widest font-bold">Division 03 // Broadcast Engineering</span>
        </div>
        <h1 className="font-display-lg text-4xl md:text-6xl text-white uppercase tracking-tighter leading-none mb-4 font-bold">
          TECHNICAL OPERATIONS
        </h1>
        <p className="font-body-md text-sm text-secondary max-w-xl leading-relaxed">
          High-performance stream overlay rendering, sub-second telemetry routing, and modular digital brand components configured for Hydrasaurus talent.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Sandbox Preview */}
        <div className="lg:col-span-7 bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 flex flex-col gap-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#c8102e] font-label-caps">
              // Broadcast Overlay Sandbox
            </h2>
            {/* Tabs */}
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('HUD')}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-label-caps tracking-widest uppercase transition-all ${
                  activeTab === 'HUD' ? 'bg-[#c8102e] text-white font-bold' : 'bg-void-black text-secondary hover:text-white border border-white/5'
                }`}
              >
                HUD
              </button>
              <button 
                onClick={() => setActiveTab('CHAT')}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-label-caps tracking-widest uppercase transition-all ${
                  activeTab === 'CHAT' ? 'bg-[#c8102e] text-white font-bold' : 'bg-void-black text-secondary hover:text-white border border-white/5'
                }`}
              >
                CHAT
              </button>
              <button 
                onClick={() => setActiveTab('ALERT')}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-label-caps tracking-widest uppercase transition-all ${
                  activeTab === 'ALERT' ? 'bg-[#c8102e] text-white font-bold' : 'bg-void-black text-secondary hover:text-white border border-white/5'
                }`}
              >
                ALERT
              </button>
            </div>
          </div>

          {/* Tab Screen Area */}
          <div className="relative aspect-video bg-[#050505] rounded-xl border border-white/10 overflow-hidden flex flex-col justify-between p-6 shadow-[inset_0_0_30px_rgba(0,0,0,0.8)]">
            {/* Ambient Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]"></div>

            {/* Render Tab Contents */}
            {activeTab === 'HUD' && (
              <>
                {/* HUD Top Bar */}
                <div className="flex justify-between items-center text-[8px] font-label-caps text-secondary/60 relative z-10">
                  <span className="flex items-center gap-1.5 text-white">
                    <span className="w-1.5 h-1.5 bg-[#53FC18] rounded-full animate-ping"></span>
                    BROADCAST NODE: ONLINE
                  </span>
                  <span>1080P // 60 FPS</span>
                </div>

                {/* HUD Telemetry Overlay Mock */}
                <div className="flex justify-between items-end relative z-10 w-full mt-auto">
                  {/* Health/Shield */}
                  <div className="flex flex-col gap-1 w-1/3">
                    <div className="flex justify-between text-[7px] font-label-caps text-secondary">
                      <span>INTEGRITY</span>
                      <span>100%</span>
                    </div>
                    <div className="h-1.5 bg-void-black border border-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-full bg-[#c8102e] shadow-[0_0_10px_rgba(200,16,46,0.6)]"></div>
                    </div>
                  </div>

                  {/* Weapon Telemetry HUD */}
                  <div className="bg-void-black/80 border border-white/10 p-3 rounded-lg flex flex-col items-end gap-1">
                    <span className="text-[7px] font-label-caps text-secondary">PRIMARY DISCHARGE</span>
                    <span className="text-white font-black text-sm tracking-widest font-label-caps">M416 // 30 / 180</span>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'CHAT' && (
              <>
                {/* Scrolling Chat preview */}
                <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[80%] roster-scroll pr-2 relative z-10 flex-grow justify-end">
                  {chat.map((msg, i) => (
                    <div key={i} className="flex gap-2 text-[10px] items-baseline">
                      <span className="text-[8px] text-secondary/40 font-mono">[{msg.time}]</span>
                      <span className="font-bold font-label-caps tracking-wider" style={{ color: msg.color }}>{msg.sender}:</span>
                      <span className="text-white/80">{msg.text}</span>
                    </div>
                  ))}
                </div>

                {/* Interactive Message Input Box */}
                <form onSubmit={handleSendChat} className="flex gap-2 border-t border-white/10 pt-4 mt-auto relative z-10">
                  <input 
                    type="text" 
                    placeholder="TYPE MESSAGE TO TRANSMIT..." 
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-grow bg-void-black border border-white/10 rounded px-3 py-1.5 text-[9px] font-label-caps tracking-widest uppercase focus:outline-none focus:border-[#c8102e] text-white"
                  />
                  <button 
                    type="submit" 
                    className="bg-[#c8102e] hover:bg-[#c8102e]/85 px-4 py-1.5 rounded text-[9px] font-label-caps font-bold tracking-widest uppercase text-white transition-colors"
                  >
                    SEND
                  </button>
                </form>
              </>
            )}

            {activeTab === 'ALERT' && (
              <div className="flex flex-col items-center justify-center h-full relative z-10 gap-6">
                <button 
                  onClick={triggerAlert}
                  className="bg-transparent border border-[#c8102e]/50 hover:bg-[#c8102e] text-white text-[9px] font-label-caps font-bold tracking-widest uppercase px-6 py-3 rounded-lg transition-all duration-300 shadow-[0_0_15px_rgba(200,16,46,0.1)] hover:shadow-[0_0_20px_rgba(200,16,46,0.3)] hover:scale-105"
                >
                  Trigger Subscriber Alert
                </button>

                {/* Animated Subscriber Alert Popup */}
                <div 
                  className={`absolute inset-0 bg-[#050505] flex flex-col items-center justify-center gap-2.5 transition-all duration-500 border border-[#c8102e]/30 rounded-xl ${
                    alertActive ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'
                  }`}
                >
                  <div className="absolute top-4 left-4 text-[7px] font-label-caps text-[#c8102e] tracking-widest font-bold">
                    // NETWORK UPLINK DETECTED
                  </div>
                  {/* Alert Icon */}
                  <span className="material-symbols-outlined text-4xl text-[#E3C287] animate-bounce">
                    military_tech
                  </span>
                  <h3 className="font-display-lg text-lg text-white font-black uppercase tracking-widest text-center px-4">
                    NEW SUBSCRIBER JOINED
                  </h3>
                  <p className="text-[#53FC18] font-label-caps text-xs tracking-widest font-bold animate-pulse">
                    {alertCreator.toUpperCase()} DEPLOYED
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Console & Metrics */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Console */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-[2rem] p-8 flex flex-col gap-4">
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#c8102e] font-label-caps border-b border-white/5 pb-4">
              // Live Activity Terminal
            </h2>
            <div className="h-[220px] bg-void-black border border-white/10 rounded-xl p-4 font-mono text-[9px] text-[#53FC18]/80 overflow-y-auto roster-scroll flex flex-col gap-1.5">
              {logs.map((log, i) => (
                <div key={i} className="leading-relaxed">
                  <span className="text-secondary/40 select-none">&gt;&gt;</span> {log}
                </div>
              ))}
              <div ref={logsEndRef}></div>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
              <span className="text-white/30 text-[8px] font-bold uppercase tracking-widest mb-1.5">UPLINK LATENCY</span>
              <span className="text-2xl font-black text-white tracking-tighter">24 ms</span>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
              <span className="text-white/30 text-[8px] font-bold uppercase tracking-widest mb-1.5">FRAME DROPS</span>
              <span className="text-2xl font-black text-white tracking-tighter">0.00%</span>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
              <span className="text-white/30 text-[8px] font-bold uppercase tracking-widest mb-1.5">STREAM COMPRESS</span>
              <span className="text-2xl font-black text-white tracking-tighter">99.98%</span>
            </div>
            <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
              <span className="text-white/30 text-[8px] font-bold uppercase tracking-widest mb-1.5">AUDIO ROUTING</span>
              <span className="text-2xl font-black text-white tracking-tighter">320 KBPS</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
