"use client";
import { useEffect } from "react";

const routes: Record<string,string> = {
  "Campaigns": "/campaigns",
  "Content studio": "/content-studio",
  "Analytics": "/analytics",
  "Creator lists": "/creator-lists",
  "AI consultant": "/ai-consultant"
};

export default function LegacyNavigation(){
  useEffect(()=>{
    const cleanups: Array<()=>void> = [];
    const sidebar = document.querySelector<HTMLElement>(".sidebar");
    if (sidebar) {
      sidebar.classList.add("slick-sidebar");
      let toggle = sidebar.querySelector<HTMLButtonElement>(".sidebar-toggle");
      let injectedToggle = false;
      if (!toggle) {
        injectedToggle = true; toggle = document.createElement("button"); toggle.className = "sidebar-toggle legacy-toggle"; toggle.setAttribute("aria-label", "Collapse navigation"); toggle.innerHTML = '<span class="panel-icon"></span>'; sidebar.appendChild(toggle);
      }
      const handleToggle = () => { const collapsed = sidebar.classList.toggle("collapsed"); toggle?.setAttribute("aria-label", collapsed ? "Open navigation" : "Collapse navigation"); };
      if (injectedToggle) { toggle.addEventListener("click", handleToggle); cleanups.push(() => toggle?.removeEventListener("click", handleToggle)); }
    }
    document.querySelectorAll<HTMLElement>(".nav-item").forEach(item=>{
      const label = Object.keys(routes).find(key=>item.textContent?.includes(key));
      if(!label || item.getAttribute("href")) return;
      if (item.tagName === "A") item.setAttribute("href", routes[label]);
      const navigate = () => { window.location.href = routes[label]; };
      item.style.cursor = "pointer";
      item.setAttribute("role","link"); item.tabIndex = 0;
      const keydown = (event: KeyboardEvent) => { if(event.key === "Enter" || event.key === " "){ event.preventDefault(); navigate(); } };
      item.addEventListener("click",navigate); item.addEventListener("keydown",keydown);
      cleanups.push(()=>{item.removeEventListener("click",navigate);item.removeEventListener("keydown",keydown)});
    });
    return ()=>cleanups.forEach(cleanup=>cleanup());
  },[]);
  return null;
}
