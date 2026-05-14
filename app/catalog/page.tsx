"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Tool {
  id: number;
  name: string;
  description: string;
  category: string;
  downloadUrl: string;
  fileName: string;
}

const API_KEY = "$2a$10$oHU2FwqpVRMsaa22tSabt.3rDdfQjyTwnpbSF25DCpfeVG9.AuX8W";
const BIN_ID = "6a050660250b1311c348162d";

export default function CatalogPage() {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}/latest`, {
          headers: { "X-Master-Key": API_KEY },
        });
        const data = await res.json();
        setTools(data.record.tools || []);
      } catch (err) {
        console.error("Ошибка загрузки тулзов:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTools();
  }, []);

  const filtered = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = async (tool: Tool) => {
    setDownloadingId(tool.id);
    try {
      const response = await fetch(tool.downloadUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = tool.fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Ошибка скачивания:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  const getCategoryLabel = (cat: string) => {
    switch (cat) {
      case "stealer":
        return { label: "СТИЛЕР", color: "#ef4444" };
      case "rat":
        return { label: "РАТ", color: "#3b82f6" };
      case "binder":
        return { label: "БИНДЕР", color: "#22c55e" };
      default:
        return { label: cat.toUpperCase(), color: "#a855f7" };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white text-xl font-mono animate-pulse">
          ЗАГРУЗКА...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* НАВБАР */}
      <nav className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="text-sm font-mono tracking-widest text-white/60 hover:text-white transition-colors"
            >
              ← НАЗАД
            </Link>

            <div className="flex items-center gap-4">
              <a
                href="https://discord.gg/entropysquad"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-1.5 text-sm font-mono tracking-wider rounded border border-[#5865f2]/30 text-[#5865f2] hover:bg-[#5865f2]/10 transition-all"
              >
                JOIN DISCORD
              </a>

              <Link
                href="/admin"
                className="px-4 py-1.5 text-sm font-mono tracking-wider rounded border border-white/10 text-white/40 hover:text-white/70 hover:border-white/20 transition-all"
              >
                ADMIN
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ЗАГОЛОВОК */}
      <div className="text-center pt-16 pb-8 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold font-mono tracking-tight bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-400 text-transparent bg-clip-text">
          КАТАЛОГ ИНСТРУМЕНТОВ
        </h1>
        <p className="mt-3 text-white/40 text-sm font-mono tracking-wider">
          ENTROPY SQUAD // TOOLS DATABASE
        </p>
      </div>

      {/* ПОИСК */}
      <div className="max-w-xl mx-auto px-4 pb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="ПОИСК ИНСТРУМЕНТОВ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 pl-10 text-sm font-mono text-white placeholder-white/20 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* ФИЛЬТР ПО КАТЕГОРИЯМ */}
      <div className="flex justify-center gap-2 flex-wrap px-4 pb-10">
        {[
          { key: "all", label: "ВСЕ" },
          { key: "stealer", label: "СТИЛЕРЫ" },
          { key: "rat", label: "РАТКИ" },
          { key: "binder", label: "БИНДЕРЫ" },
        ].map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-5 py-2 rounded-lg text-xs font-mono tracking-widest border transition-all ${
              activeCategory === cat.key
                ? "bg-purple-600/20 border-purple-500/50 text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                : "bg-white/5 border-white/10 text-white/40 hover:text-white/70 hover:border-white/20"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* СЕТКА КАРТОЧЕК */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-white/20 font-mono text-sm tracking-widest">
              НИЧЕГО НЕ НАЙДЕНО
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tool) => {
              const { label, color } = getCategoryLabel(tool.category);

              return (
                <div
                  key={tool.id}
                  className="group relative bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)]"
                >
                  {/* ID */}
                  <div className="absolute top-3 right-3 text-[10px] font-mono text-white/10">
                    #{tool.id}
                  </div>

                  {/* НАЗВАНИЕ */}
                  <h3 className="text-lg font-bold font-mono tracking-tight text-white/90 mb-3">
                    {tool.name}
                  </h3>

                  {/* КАТЕГОРИЯ */}
                  <span
                    className="inline-block px-3 py-1 rounded text-[10px] font-mono tracking-widest font-semibold mb-4"
                    style={{
                      backgroundColor: `${color}15`,
                      color: color,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    {label}
                  </span>

                  {/* ОПИСАНИЕ */}
                  <p className="text-sm text-white/50 font-mono leading-relaxed mb-5 min-h-[40px]">
                    {tool.description}
                  </p>

                  {/* СКАЧАТЬ */}
                  <button
                    onClick={() => handleDownload(tool)}
                    disabled={downloadingId === tool.id}
                    className="w-full py-2.5 rounded-lg text-sm font-mono tracking-widest bg-gradient-to-r from-purple-600/30 to-blue-600/30 border border-purple-500/30 text-white/80 hover:from-purple-600/50 hover:to-blue-600/50 hover:border-purple-500/60 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {downloadingId === tool.id
                      ? "СКАЧИВАНИЕ..."
                      : "СКАЧАТЬ"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ФУТЕР */}
      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-xs font-mono tracking-widest text-white/10">
          ENTROPY SQUAD // ALL RIGHTS RESERVED
        </p>
      </footer>
    </div>
  );
}