'use client';
import { FormEvent, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };
const starters = ["Jelaskan konsep yang sulit dengan sederhana", "Bantu saya mengerjakan tugas sekolah", "Buatkan kode website modern"];

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function send(e?: FormEvent, prompt?: string) {
    e?.preventDefault();
    const content = (prompt ?? input).trim();
    if (!content || busy) return;
    const next: Message[] = [...messages, { role: "user", content }];
    setMessages(next); setInput(""); setError(""); setBusy(true);
    try {
      const response = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Permintaan gagal.");
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally { setBusy(false); }
  }

  return <main className="shell">
    <aside className="sidebar">
      <div className="brand"><span className="brandMark">✦</span><span>InferX<span className="muted"> AI</span></span></div>
      <button className="newChat" onClick={() => {setMessages([]);setError("");}}>＋ Chat baru</button>
      <div className="sideLabel">RUANG KERJA</div>
      <div className="sideItem active">✧ <span>Asisten AI</span></div>
      <div className="sideFoot"><div className="statusDot"/> OpenRouter connected via server</div>
    </aside>
    <section className="main">
      <header><div className="mobileBrand">✦ InferX AI</div><div className="modelTag"><span className="statusDot"/> AI Assistant</div></header>
      <div className="conversation">
        {messages.length === 0 ? <div className="welcome">
          <div className="orb">✦</div><p className="eyebrow">YOUR INTELLIGENT WORKSPACE</p>
          <h1>Halo, ada yang bisa<br/><span>InferX bantu?</span></h1>
          <p className="sub">Tanyakan apa saja. Mulai dari belajar, ide kreatif, hingga coding.</p>
          <div className="suggestions">{starters.map(s => <button key={s} onClick={() => send(undefined,s)}>{s}<span>↗</span></button>)}</div>
        </div> : <div className="messages">{messages.map((m,i)=><div className={"message "+m.role} key={i}><div className="avatar">{m.role==="user"?"K":"✦"}</div><div className="bubble"><div className="role">{m.role==="user"?"KAMU":"INFERX AI"}</div><div className="content">{m.content}</div></div></div>)}{busy && <div className="message assistant"><div className="avatar">✦</div><div className="bubble"><div className="role">INFERX AI</div><div className="typing"><i/><i/><i/></div></div></div>}<div id="bottom"/></div>}
      </div>
      <div className="composerWrap">
        {error && <div className="error">{error}</div>}
        <form className="composer" onSubmit={send}>
          <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Ketik pesan untuk InferX AI..." rows={1}/>
          <button className="send" disabled={busy || !input.trim()} aria-label="Kirim">↑</button>
        </form>
        <p className="disclaimer">InferX AI dapat membuat kesalahan. Periksa kembali informasi penting.</p>
      </div>
    </section>
  </main>;
}
