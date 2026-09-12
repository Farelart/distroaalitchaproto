"use client";

import { useState } from "react";
import AppSidebar from "../components/AppSidebar";
import ProductTopbar from "../components/ProductTopbar";
import "./ai.css";
import "./ai-fix.css";

type Message = { role: "ai" | "user"; text: string; artifact?: "plan" | "creators" };

const starters = [
  ["✦", "Plan October", "Build an October distribution plan"],
  ["⌁", "Find creators", "Find the strongest creators for our next launch"],
  ["⌇", "Analyze performance", "What is driving our best performance?"],
  ["◫", "Review campaigns", "Where are our active campaigns at risk?"]
];

export default function AIConsultant() {
  const welcome: Message = { role: "ai", text: "Good morning, Farell. I’m connected to Arden Labs’ creator intelligence, campaigns, content, and performance signals. What should we figure out?" };
  const [messages, setMessages] = useState<Message[]>([welcome]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [toast, setToast] = useState("");

  const send = async (text = input) => {
    if (!text.trim() || thinking) return;
    const nextMessages: Message[] = [...messages, { role: "user", text }];
    setMessages(nextMessages);
    setInput(""); setThinking(true);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ messages: nextMessages.map(({ role, text }) => ({ role, text })) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The AI request failed");
      const artifact: Message["artifact"] = data.artifact === "creators" || data.artifact === "plan" ? data.artifact : undefined;
      setMessages(current => [...current, { role: "ai", text: data.text, artifact }]);
    } catch (error) {
      const detail = error instanceof Error ? error.message : "Unknown error";
      setMessages(current => [...current, { role: "ai", text: `I couldn’t reach the model just now (${detail}). Your conversation is still here—please try again.` }]);
    } finally {
      setThinking(false);
    }
  };

  const reset = () => { setMessages([welcome]); setToast("New conversation started."); window.setTimeout(() => setToast(""), 1800); };

  return <main className="app-shell"><AppSidebar active="ai"/><section className="content ai-shell"><ProductTopbar page="AI consultant" action="New conversation" onAction={reset}/><div className="full-chat"><header className="chat-header"><div className="consultant-avatar">✦</div><div><p className="eyebrow">DISTROA AI</p><h1>Your distribution partner.</h1></div><span className="live-pill"><i/> Workspace connected</span><button aria-label="Conversation options">•••</button></header>
    <div className="chat-scroll"><div className="chat-thread">{messages.length === 1 && <div className="chat-intro"><span>✦</span><h2>What are we building today?</h2><p>I can research your creator network, reason across campaigns, and turn recommendations into working plans.</p></div>}{messages.map((message,index)=><div className={`message ${message.role}`} key={`${message.role}-${index}`}>{message.role === "ai" && <span className="message-avatar">✦</span>}<div className="message-content"><p>{message.text}</p>{message.artifact === "plan" && <div className="generated-card"><div className="generated-top"><span>◫</span><div><b>Recommended distribution plan</b><small>Generated from 4 workspace sources</small></div><em>Ready</em></div><div className="plan-step"><i>01</i><span><b>Lead with the founder story</b><small>Jordan · YouTube + LinkedIn cut-down</small></span></div><div className="plan-step"><i>02</i><span><b>Build authority around the insight</b><small>Sofia · 5-slide LinkedIn carousel</small></span></div><div className="plan-step"><i>03</i><span><b>Amplify the most resonant moment</b><small>Maya · 3 short-form variations</small></span></div><button onClick={()=>setToast("Plan added to campaign workspace.")}>Add plan to campaign →</button></div>}{message.artifact === "creators" && <div className="generated-card creator-result"><div className="generated-top"><span>⌁</span><div><b>Top creator matches</b><small>Ranked for launch resonance</small></div><em>3 found</em></div>{[["SC","Sofia Chen","96 fit"],["JO","Jordan Okafor","94 fit"],["MP","Maya Patel","91 fit"]].map(person=><div className="result-person" key={person[1]}><i>{person[0]}</i><b>{person[1]}</b><span>{person[2]}</span><button>View →</button></div>)}</div>}</div></div>)}{thinking&&<div className="message ai"><span className="message-avatar">✦</span><div className="thinking"><i/><i/><i/><span>Reading workspace signals</span></div></div>}</div></div>
    {messages.length === 1 && <div className="starter-row">{starters.map(([icon,label,prompt])=><button key={label} onClick={()=>send(prompt)}><span>{icon}</span><b>{label}</b><small>→</small></button>)}</div>}
    <div className="chat-composer"><div className="composer-box"><textarea value={input} onChange={event=>setInput(event.target.value)} onKeyDown={event=>{if(event.key==="Enter"&&!event.shiftKey){event.preventDefault();send();}}} placeholder="Ask Distroa about creators, campaigns, content, or growth…" autoFocus/><div className="composer-tools"><div><button title="Attach context">＋</button><button title="Choose sources">⌁ Sources</button></div><span>Uses live workspace context</span><button className="send-button" onClick={()=>send()} disabled={!input.trim()||thinking}>↑</button></div></div><small>Distroa AI can make mistakes. Review campaign changes before publishing.</small></div>
  </div></section>{toast&&<div className="toast"><span>✦</span>{toast}</div>}</main>;
}
