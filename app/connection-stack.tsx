"use client";

import { useEffect, useRef } from "react";

const chapters = [
  {
    title: "Find your people.",
    label: "Creator discovery",
    description: "The best fit is more than a follower count. Find voices that share your values, speak to your audience and feel like a natural extension of your brand.",
    details: ["Audience & interests", "Creative style & brand fit", "A shortlist with intention"],
    image: "https://images.unsplash.com/photo-1517256742927-ccff23d76be8?auto=format&fit=crop&w=900&q=85",
    alt: "Woman enjoying a quiet moment in a café",
    caption: "A shared point of view.",
  },
  {
    title: "Make it mean something.",
    label: "Creative collaboration",
    description: "Give a good connection somewhere to go. Bring your ideas, your brief and your creators together around a story worth telling.",
    details: ["A clear creative brief", "Content & campaign planning", "Every next step, together"],
    image: "https://images.unsplash.com/photo-1698854607842-83327fd8690b?auto=format&fit=crop&w=900&q=85",
    alt: "Woman sitting thoughtfully at a café table",
    caption: "Their voice. Your next chapter.",
  },
  {
    title: "Leave a lasting impression.",
    label: "Campaign insights",
    description: "Good stories keep working after they are shared. Understand what connects, learn from each collaboration and make the next one even better.",
    details: ["Content performance", "Audience engagement", "Insights for your next move"],
    image: "https://images.unsplash.com/photo-1557165658-2b9ac2b7da63?auto=format&fit=crop&w=900&q=85",
    alt: "Woman in a bright café looking toward the camera",
    caption: "More than a passing moment.",
  },
];

export default function ConnectionStack() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const region = root.current;
    if (!region) return;
    const slots = Array.from(region.querySelectorAll<HTMLElement>(".stack-slot"));
    const cards = slots.map(slot => slot.querySelector<HTMLElement>(".stack-card")!);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 760px), (max-height: 620px)");
    let frame = 0;
    const update = () => {
      frame = 0;
      const disabled = reduced.matches || compact.matches;
      const top = Math.max(32, window.innerHeight * 0.12);
      slots.forEach((slot, index) => {
        const next = slots[index + 1];
        const distance = next ? next.getBoundingClientRect().top - top : window.innerHeight;
        const progress = disabled ? 0 : Math.min(1, Math.max(0, 1 - distance / (window.innerHeight * 0.8)));
        cards[index].style.transform = `translateY(${-18 * progress}px) scale(${1 - 0.07 * progress}) rotate(${(index % 2 ? -1 : 1) * 4 * progress}deg)`;
        cards[index].style.filter = `brightness(${1 - progress * 0.12})`;
      });
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduced.addEventListener("change", schedule);
    compact.addEventListener("change", schedule);
    update();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduced.removeEventListener("change", schedule);
      compact.removeEventListener("change", schedule);
    };
  }, []);

  return <section className="connection-section wrap" ref={root} aria-labelledby="connection-title">
    <div className="connection-heading">
      <div><p className="eyebrow">From the first spark to what comes next</p><h2 id="connection-title">Good chemistry.<br />A world of possibilities.</h2></div>
      <span className="stack-hint">Three chapters. One connection. <span aria-hidden="true">↓</span></span>
    </div>
    <div className="stack-track">
      {chapters.map((chapter, index) => <div className="stack-slot" key={chapter.label} style={{ zIndex: index + 1 }}>
        <article className={"stack-card stack-tone-" + index}>
          <div className="stack-copy">
            <div className="stack-kicker"><span>0{index + 1} / {chapter.label}</span><span aria-hidden="true">✳</span></div>
            <h3>{chapter.title}</h3>
            <p>{chapter.description}</p>
            <ol>{chapter.details.map((detail, detailIndex) => <li key={detail}><span>0{detailIndex + 1}</span>{detail}</li>)}</ol>
            <a href="#demo">Explore the preview <span aria-hidden="true">↗</span></a>
          </div>
          <figure><img src={chapter.image} alt={chapter.alt} loading="lazy" /><figcaption>{chapter.caption}<span aria-hidden="true">↗</span></figcaption></figure>
        </article>
      </div>)}
    </div>
  </section>;
}
