"use client";

export default function ProductTopbar({ page, action, onAction }: { page: string; action: string; onAction: () => void }) {
  return <header className="topbar"><div className="crumb">Workspace <span>/</span><b>{page}</b></div><div className="top-actions"><button className="round-button">⌘ K</button><button className="round-button bell">♧<i /></button><button className="new-button" onClick={onAction}>+ {action}</button></div></header>;
}
