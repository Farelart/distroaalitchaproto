"use client";

import { useState } from "react";

const links = [
  ["ai", "✦", "AI consultant", "/ai-consultant"],
  ["overview", "◈", "Overview", "/"],
  ["discover", "⌁", "Discover", "/discover"],
  ["campaigns", "◫", "Campaigns", "/campaigns"],
  ["content", "♧", "Content studio", "/content-studio"],
  ["analytics", "⌇", "Analytics", "/analytics"],
  ["lists", "◌", "Creator lists", "/creator-lists"]
] as const;

export default function AppSidebar({ active }: { active: string }) {
  const [collapsed, setCollapsed] = useState(false);
  return <aside className={`sidebar slick-sidebar ${collapsed ? "collapsed" : ""}`}>
    <div className="side-top"><a className="brand" href="/"><span className="brand-mark">d</span><span className="side-copy">distroa</span></a><button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Open navigation" : "Collapse navigation"}>{collapsed ? "→" : "←"}</button></div>
    <div className="workspace-switch"><span className="workspace-dot">A</span><span className="side-copy">Arden Labs</span><span className="chevron side-copy">⌄</span></div>
    <nav><p className="nav-label side-copy">Workspace</p>{links.slice(0,6).map(([id, icon, label, href]) => <a key={id} className={`nav-item ${active === id ? "active" : ""}`} href={href} title={label}><span className="icon">{icon}</span><span className="side-copy">{label}</span>{id === "campaigns" && <span className="nav-count side-copy">3</span>}</a>)}<p className="nav-label second side-copy">Manage</p>{links.slice(6).map(([id, icon, label, href]) => <a key={id} className={`nav-item ${active === id ? "active" : ""}`} href={href} title={label}><span className="icon">{icon}</span><span className="side-copy">{label}</span></a>)}</nav>
    <div className="sidebar-bottom"><a className="ai-card" href="/ai-consultant"><span className="spark">✦</span><span className="side-copy"><b>Ask Distroa AI</b><small>Your distribution partner</small></span><span className="side-copy">→</span></a><div className="profile"><div className="profile-avatar">FA</div><div className="side-copy"><b>Farell A.</b><small>Admin</small></div><span className="side-copy">•••</span></div></div>
  </aside>;
}
