"use client";

import { useState } from "react";

const creators = [
  { initials: "SC", name: "Sofia Chen", handle: "@sofia.builds", platform: "in", tone: "linkedin", followers: "184K", engagement: "6.8%", fit: 96, theme: "B2B · Future of work", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=85" },
  { initials: "JO", name: "Jordan Okafor", handle: "@jordanonproduct", platform: "▶", tone: "youtube", followers: "421K", engagement: "8.2%", fit: 94, theme: "SaaS · Product growth", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=85" },
  { initials: "MP", name: "Maya Patel", handle: "@mayamakesmoves", platform: "♪", tone: "tiktok", followers: "98K", engagement: "11.4%", fit: 91, theme: "Startups · Creator economy", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=85" },
  { initials: "AD", name: "Alex Dubois", handle: "@alexfromparis", platform: "◎", tone: "instagram", followers: "67K", engagement: "7.9%", fit: 89, theme: "AI · Design systems", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&q=85" },
];

const deals = [
  { name: "Sofia Chen", campaign: "Autumn product launch", value: "$4,500", status: "Negotiating", color: "sand", initials: "SC" },
  { name: "Jordan Okafor", campaign: "Founder story series", value: "$6,800", status: "Content review", color: "blue", initials: "JO" },
  { name: "Maya Patel", campaign: "Creator tools push", value: "$2,250", status: "Brief sent", color: "lavender", initials: "MP" },
];

function Icon({ children }: { children: React.ReactNode }) { return <span className="icon">{children}</span>; }

export default function Home() {
  const [saved, setSaved] = useState<string[]>(["Sofia Chen"]);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [toast, setToast] = useState("");
  const visible = creators.filter((c) => `${c.name} ${c.handle} ${c.theme}`.toLowerCase().includes(search.toLowerCase()));
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2200); };

  return (
    <main className="app-shell">
      <aside className={`sidebar slick-sidebar ${collapsed ? "collapsed" : ""}`}>
        <div className="side-top"><div className="brand"><span className="brand-mark">d</span><span className="side-copy">distroa</span></div><button className="sidebar-toggle" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? "Open navigation" : "Collapse navigation"}><span className="panel-icon"/></button></div>
        <div className="workspace-switch"><span className="workspace-dot">A</span><span className="side-copy">Arden Labs</span><span className="chevron side-copy">⌄</span></div>
        <nav>
          <p className="nav-label side-copy">Workspace</p>
          <a className="nav-item active"><Icon>◈</Icon><span className="side-copy">Overview</span></a>
          <a className="nav-item" href="/discover"><Icon>⌁</Icon><span className="side-copy">Discover</span></a>
          <a className="nav-item" href="/campaigns"><Icon>◫</Icon><span className="side-copy">Campaigns</span><span className="nav-count side-copy">3</span></a>
          <a className="nav-item"><Icon>♧</Icon><span className="side-copy">Content studio</span></a>
          <a className="nav-item"><Icon>⌇</Icon><span className="side-copy">Analytics</span></a>
          <p className="nav-label second side-copy">Manage</p>
          <a className="nav-item"><Icon>◌</Icon><span className="side-copy">Creator lists</span></a>
          <a className="nav-item"><Icon>✦</Icon><span className="side-copy">AI consultant</span></a>
        </nav>
        <div className="sidebar-bottom">
          <button className="ai-card" onClick={() => notify("Opening your AI distribution consultant…")}><span className="spark">✦</span><span className="side-copy"><b>Ask Distroa AI</b><small>Your distribution partner</small></span><span className="side-copy">→</span></button>
          <div className="profile"><div className="profile-avatar">FA</div><div className="side-copy"><b>Farell A.</b><small>Admin</small></div><span className="side-copy">•••</span></div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar"><div className="crumb">Overview <span>/</span> <b>Influencer discovery</b></div><div className="top-actions"><button className="round-button">⌘ K</button><button className="round-button bell">♧<i /></button><button className="new-button" onClick={() => notify("A new campaign brief is ready to create.")}>+ New campaign</button></div></header>
        <div className="page">
          <div className="page-heading"><div><p className="eyebrow">DISTRIBUTION OVERVIEW</p><h1>Find your next advocates.</h1><p className="subhead">The people and conversations moving your brand forward.</p></div><div className="date-pill">September 2026 <span>⌄</span></div></div>

          <section className="stats-grid">
            <div className="stat-card"><div className="stat-top"><span>Creators in pipeline</span><span className="trend">+12.5%</span></div><strong>48</strong><p><i className="tiny-dot sage" /> 14 new matches this week</p></div>
            <div className="stat-card"><div className="stat-top"><span>Active partnerships</span><span className="trend">+3</span></div><strong>12</strong><p><i className="tiny-dot blue" /> Across 4 live campaigns</p></div>
            <div className="stat-card"><div className="stat-top"><span>Potential reach</span><span className="trend">+18.2%</span></div><strong>2.4M</strong><p><i className="tiny-dot amber" /> Your curated creator network</p></div>
            <div className="stat-card"><div className="stat-top"><span>Pipeline value</span><span className="trend neutral">This month</span></div><strong>$38.6K</strong><p><i className="tiny-dot lavender" /> 9 deals in motion</p></div>
          </section>

          <section className="insight-banner"><div className="insight-symbol">✦</div><div><p><b>Distribution signal:</b> Product-led creators are driving 2.3× stronger saves than your average partnership.</p><span>We found 18 high-fit voices in the productivity and future-of-work space.</span></div><button onClick={() => notify("18 product-led creator matches added to your discovery queue.")}>Explore matches <span>→</span></button></section>

          <div className="section-title"><div><h2>Recommended for Arden Labs</h2><p>AI-ranked creators based on your product, audience, and current goals.</p></div><button className="link-button" onClick={() => notify("Showing all 186 creator matches.")}>View all matches <span>→</span></button></div>
          <div className="toolbar"><label className="search"><span>⌕</span><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search creators, topics, or platforms" /></label><div className="toolbar-actions"><button className={filterOpen ? "filter selected" : "filter"} onClick={() => setFilterOpen(!filterOpen)}>☷ Filters <b>3</b></button><button className="sort" onClick={() => notify("Sorted by best fit.")}>Best fit <span>⌄</span></button></div>{filterOpen && <div className="filter-popover"><b>Applied signals</b><span>• B2B audience</span><span>• Product / SaaS</span><span>• High engagement</span></div>}</div>
          <div className="creator-grid">{visible.map((creator) => <article className="creator-card" key={creator.name}><div className="creator-card-top"><div className="creator-identity"><img src={creator.image} alt="" /><div><h3>{creator.name}</h3><p>{creator.handle}</p></div></div><button className={saved.includes(creator.name) ? "save saved" : "save"} aria-label="Save creator" onClick={() => setSaved((items) => items.includes(creator.name) ? items.filter((n) => n !== creator.name) : [...items, creator.name])}>{saved.includes(creator.name) ? "♥" : "♡"}</button></div><div className="creator-meta"><span className={`platform ${creator.tone}`}>{creator.platform}</span><span>{creator.theme}</span></div><div className="metrics"><div><span>Followers</span><b>{creator.followers}</b></div><div><span>Engagement</span><b>{creator.engagement}</b></div><div className="fit"><span>Fit score</span><b>{creator.fit}</b></div></div><div className="fit-bar"><i style={{ width: `${creator.fit}%` }} /></div><a className="card-action" href="/discover/sofia-chen">View profile <span>→</span></a></article>)}</div>

          <div className="bottom-grid"><section className="deal-card"><div className="section-title compact"><div><h2>Deals in motion</h2><p>Keep conversations progressing.</p></div><button className="icon-more">•••</button></div><div className="deal-list">{deals.map((deal) => <div className="deal-row" key={deal.name}><div className={`deal-avatar ${deal.color}`}>{deal.initials}</div><div className="deal-info"><b>{deal.name}</b><span>{deal.campaign}</span></div><b className="deal-value">{deal.value}</b><span className={`status ${deal.color}`}>{deal.status}</span><button onClick={() => notify(`Opening deal with ${deal.name}.`)}>→</button></div>)}</div><button className="wide-link" onClick={() => notify("Opening all 9 deals in your pipeline.")}>View deal pipeline <span>→</span></button></section>
          <section className="activity-card"><div className="section-title compact"><div><h2>Recent activity</h2><p>Your distribution pulse.</p></div><button className="link-button small" onClick={() => notify("All activity is up to date.")}>See all</button></div><div className="activity"><div className="activity-icon green">↗</div><p><b>14 new creator matches</b><span>Added to “AI productivity creators”</span></p><time>12m</time></div><div className="activity"><div className="activity-icon peach">✉</div><p><b>Sofia Chen replied</b><span>Re: Autumn product launch</span></p><time>1h</time></div><div className="activity"><div className="activity-icon purple">✦</div><p><b>AI found a content opportunity</b><span>“Building in public” is trending</span></p><time>3h</time></div></section></div>
        </div>
      </section>
      {toast && <div className="toast"><span>✦</span>{toast}</div>}
    </main>
  );
}
