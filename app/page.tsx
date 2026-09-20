"use client";

import { useState } from "react";
import ConnectionStack from "./connection-stack";

const photos = [
  "https://images.unsplash.com/photo-1517256742927-ccff23d76be8?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1698854607842-83327fd8690b?auto=format&fit=crop&w=900&q=85",
  "https://images.unsplash.com/photo-1557165658-2b9ac2b7da63?auto=format&fit=crop&w=900&q=85",
];
const niches = ["Lifestyle", "Beauty", "Food & drink"] as const;
type Niche = typeof niches[number];
const profiles: Record<Niche, string[]> = {
  Lifestyle: ["Everyday rituals", "Slow living", "Objects with a story"],
  Beauty: ["An honest routine", "Everyday essentials", "Considered beauty"],
  "Food & drink": ["The morning edit", "Coffee conversations", "A seat at the table"],
};

function Mark() { return <span className="mark" aria-hidden="true">s</span>; }
function Arrow() { return <span aria-hidden="true">↗</span>; }

export default function Home() {
  const [niche, setNiche] = useState<Niche>("Lifestyle");
  const [saved, setSaved] = useState<string[]>([]);
  const [menu, setMenu] = useState(false);
  function toggle(id: string) { setSaved(items => items.includes(id) ? items.filter(item => item !== id) : [...items, id]); }

  return <main>
    <div className="hero-frame">
    <header className="nav wrap">
      <a href="#" className="brand" aria-label="Sillage home"><Mark />sillage<span className="brand-period">.</span></a>
      <button className="menu-button" onClick={() => setMenu(!menu)} aria-expanded={menu} aria-controls="nav-links">Menu {menu ? "−" : "+"}</button>
      <nav id="nav-links" className={menu ? "nav-links open" : "nav-links"} aria-label="Main navigation">
        <a href="#how" onClick={() => setMenu(false)}>How it works</a>
        <a href="#creators" onClick={() => setMenu(false)}>The creators</a>
        <a href="#demo" onClick={() => setMenu(false)}>Explore Sillage</a>
      </nav>
      <a className="button small nav-cta" href="#demo">Find your people <Arrow /></a>
    </header>

    <section className="hero wrap">
      <div className="hero-copy">
        <span className="eyebrow"><span className="tiny-flower">✳</span> Good brands. Real people.</span>
        <h1>A good brand.<br />The right people.<br /><span>A lasting impression.</span></h1>
        <p>Meet the creators who get your brand.<br className="desktop-break" /> Make something worth sharing. Grow together.</p>
        <div className="hero-actions"><a href="#demo" className="button">Find your people <Arrow /></a><a className="text-link" href="#how">See how it works <span aria-hidden="true">↓</span></a></div>
        <div className="hero-note"><span className="mini-avatars">{photos.map((src, i) => <img key={src} src={src} alt="" />)}</span><span>Human connections.<br /><b>A lasting impression.</b></span></div>
      </div>
      <div className="hero-art" aria-label="Illustrative creator collaboration">
        <div className="art-label">THE START OF SOMETHING GOOD</div>
        <div className="portrait-back"><img src={photos[1]} alt="A relaxed moment in a café" /><span>Stories that feel like life.</span></div>
        <div className="portrait-main"><img src={photos[0]} alt="A woman enjoying coffee in a sunlit café" /><div className="portrait-caption"><span>Lifestyle & everyday rituals</span><b>A natural connection.</b></div><span className="photo-corner">↗</span></div>
        <div className="match-note"><span className="note-icon">✳</span><div><b>Same energy.</b><span>Your brand, their point of view.</span></div></div>
        <span className="art-stamp">Made of<br /><strong>real</strong><br />connections.</span>
        <span className="art-footnote">A glimpse of what could be · illustrative profiles</span>
      </div>
    </section>
    </div>


    <section className="intro wrap" id="how">
      <div><p className="eyebrow">A more human way to grow</p><h2>Reach is a number.<br /><span>Resonance is a feeling.</span></h2></div>
      <p>The best partnerships start with something in common. Sillage brings your brand and the right creative voices together, from the first spark to the next campaign.</p>
    </section>
    <section className="steps wrap" aria-label="How Sillage works">
      {[["01", "Find your kind of people.", "Start with your audience, your values and your ambition. Discover creators whose world belongs next to yours."], ["02", "Make something together.", "Turn a promising connection into a clear brief. Keep ideas, people and next steps in one shared view."], ["03", "See what leaves a mark.", "Learn which stories resonate. Take those insights into your next collaboration and build on what works."]].map(([n,t,p], i) => <article key={n}>
        <div className={"step-preview preview-" + n} aria-hidden="true">
          {i === 0 ? <><div className="mini-profile"><img src={photos[2]} alt="" /><span>A shared point of view.<small>Lifestyle · Storytelling</small></span><b>✳</b></div><div className="interest-pills"><span>Thoughtful living</span><span>Everyday rituals</span></div></> : i === 1 ? <div className="brief-paper"><span>THE NEXT CHAPTER <b>↗</b></span><strong>Something good<br />is taking shape.</strong><div><i /> Creative brief <span>Ready</span></div><div><i /> Creator shortlist <span>In progress</span></div></div> : <div className="insight-paper"><span>THE BIGGER PICTURE</span><strong>Small moments.<br />Lasting connections.</strong><div className="insight-bars">{[28,42,36,58,54,73,86,98].map((height,index) => <i key={index} style={{height: height + "%"}} />)}</div><small>Illustrative campaign activity</small></div>}
        </div>
        <div className="step-copy"><span className="step-number">{n} /</span><h3>{t}</h3><p>{p}</p></div>
      </article>)}
    </section>

    <ConnectionStack />

    <section className="demo-section" id="demo">
      <div className="wrap">
        <div className="section-head"><div><p className="eyebrow">A little less searching. A little more finding.</p><h2>Your next connection<br />starts with an idea.</h2></div><p>Take a look around.<br />Choose a world to explore.</p></div>
        <div className="demo-window">
          <div className="window-bar"><span><Mark /> Sillage discovery</span><span className="demo-badge">Interactive preview</span></div>
          <div className="demo-content">
            <div className="brief"><span className="brief-icon">✳</span><div><span className="eyebrow">Your next chapter</span><h3>Let’s find your kind of creator.</h3><p>What world does your brand belong to?</p></div></div>
            <div className="filter-row" aria-label="Creator categories">{niches.map(item => <button key={item} aria-pressed={niche === item} className={niche === item ? "filter active" : "filter"} onClick={() => setNiche(item)}>{item}</button>)}</div>
            <div className="results-heading"><span>Some connections to imagine</span><span aria-live="polite">{saved.length ? saved.length + " saved to your shortlist" : "3 example profiles"}</span></div>
            <div className="creator-grid" id="creators">{profiles[niche].map((title,i) => { const id=niche+i; return <article className="creator" key={id}><div className="creator-photo"><img src={photos[i]} alt={["Woman holding a coffee in a café","Woman sitting thoughtfully at a café table","Woman in a bright café"][i]} loading="lazy" /><span className="creator-tag">{niche}</span><button className={saved.includes(id) ? "save saved" : "save"} aria-label={(saved.includes(id) ? "Remove " : "Save ") + title} aria-pressed={saved.includes(id)} onClick={() => toggle(id)}>{saved.includes(id) ? "✓" : "+"}</button></div><div className="creator-info"><h3>{title}</h3><p>{["Warm stories, small moments.","A fresh perspective on the familiar.","Thoughtful content, naturally."][i]}</p><div><span>Example creator</span><span>Explore the fit <Arrow /></span></div></div></article>; })}</div>
            <p className="demo-disclaimer">An interactive concept with illustrative profiles and stock photography. No live creator search or outreach.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="closing wrap"><span className="closing-flower" aria-hidden="true">✳</span><p className="eyebrow">There’s someone out there who gets it.</p><h2>Your brand has a story.<br />Let’s find its people.</h2><a href="#demo" className="button cream">Explore the preview <Arrow /></a><p className="closing-note">A good connection is a good beginning.</p></section>
    <div className="signature wrap" aria-hidden="true">sillage<span>✳</span></div>
    <footer className="footer wrap"><a className="brand" href="#"><Mark />sillage.</a><p>Good things leave a trace.</p><a href="#how">How it works</a><span>© {new Date().getFullYear()} Sillage</span></footer>
    <div className="credits wrap">Photography via <a href="https://unsplash.com/collections/8882352/my-places-my-people" target="_blank" rel="noreferrer">Unsplash</a> · <a href="https://unsplash.com/pt-br/fotografias/uma-mulher-sentada-em-uma-mesa-com-uma-xicara-de-cafe-z7uRO4W3kXc" target="_blank" rel="noreferrer">Karsten Winegeart</a> · <a href="https://unsplash.com/photos/woman-wearing-white-blouse-sitting-on-chair-in-front-of-brown-wooden-table-Epc2gHpvDYQ" target="_blank" rel="noreferrer">Jeanie de Klerk</a></div>
  </main>;
}
